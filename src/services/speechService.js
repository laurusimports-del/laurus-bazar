// Professional & Resilient Bilingual Audio Speech Engine
// Combines Human Native Audio (Dictionary API) + Web Speech API + High-Def Online TTS Fallback

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.rate = 0.85; // Natural learning speed
    this.pitch = 1.0;
    this.selectedEnVoice = null;
    this.selectedPtVoice = null;
    this.isSpeaking = false;
    this.currentText = '';
    this.onStateChangeCallbacks = new Set();
    this.activeAudio = null;
    this.watchdogTimer = null;
    this.humanAudioCache = new Map();

    if (typeof window !== 'undefined' && this.synth) {
      if ('onvoiceschanged' in this.synth) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
      this.loadVoices();
    }
  }

  loadVoices() {
    if (!this.synth) return;
    try {
      const voices = this.synth.getVoices() || [];
      if (!voices || voices.length === 0) return;

      // 1. English Voices
      const enVoices = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith('en'));
      const preferredEn = enVoices.find(v => {
        const name = (v.name || '').toLowerCase();
        return name.includes('natural') || name.includes('google') || name.includes('jenny') || name.includes('samantha') || name.includes('guy');
      }) || enVoices.find(v => v.lang === 'en-US') || enVoices[0];

      if (preferredEn) this.selectedEnVoice = preferredEn;

      // 2. Portuguese Voices (pt-BR / pt-PT)
      const ptVoices = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith('pt'));
      const preferredPt = ptVoices.find(v => {
        const name = (v.name || '').toLowerCase();
        return name.includes('maria') || name.includes('daniel') || name.includes('luciana') || name.includes('yara') || name.includes('google') || v.lang === 'pt-BR';
      }) || ptVoices[0];

      if (preferredPt) this.selectedPtVoice = preferredPt;
    } catch (e) {
      console.warn('Erro ao carregar vozes locais:', e);
    }
  }

  getVoices() {
    if (!this.synth) return [];
    this.loadVoices();
    return this.synth.getVoices() || [];
  }

  getEnglishVoices() {
    return this.getVoices().filter(v => v.lang && v.lang.toLowerCase().startsWith('en'));
  }

  getPortugueseVoices() {
    return this.getVoices().filter(v => v.lang && v.lang.toLowerCase().startsWith('pt'));
  }

  setEnVoice(voiceURI) {
    const voices = this.getEnglishVoices();
    const match = voices.find(v => v.voiceURI === voiceURI || v.name === voiceURI);
    if (match) this.selectedEnVoice = match;
  }

  setVoice(voiceURI) {
    this.setEnVoice(voiceURI);
  }

  setRate(newRate) {
    this.rate = Math.max(0.5, Math.min(2.0, Number(newRate) || 0.85));
  }

  subscribe(callback) {
    this.onStateChangeCallbacks.add(callback);
    return () => this.onStateChangeCallbacks.delete(callback);
  }

  notifyState(speaking, text = '') {
    this.isSpeaking = speaking;
    this.currentText = text;
    this.onStateChangeCallbacks.forEach(cb => {
      try { cb({ isSpeaking: speaking, text }); } catch (e) {}
    });
  }

  stop() {
    if (this.watchdogTimer) {
      clearTimeout(this.watchdogTimer);
      this.watchdogTimer = null;
    }

    if (this.activeAudio) {
      try {
        this.activeAudio.pause();
        this.activeAudio.currentTime = 0;
        this.activeAudio.onended = null;
        this.activeAudio.onerror = null;
      } catch (e) {}
      this.activeAudio = null;
    }

    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }

    this.notifyState(false, '');
  }

  pause() {
    if (this.activeAudio) this.activeAudio.pause();
    if (this.synth) this.synth.pause();
  }

  resume() {
    if (this.activeAudio) this.activeAudio.play().catch(() => {});
    if (this.synth) this.synth.resume();
  }

  // Tenta buscar áudio humano profissional (MP3 de estúdio) para palavras em inglês
  async fetchHumanAudioUrl(rawWord) {
    const clean = rawWord.trim().toLowerCase().replace(/[^a-z-]/g, '');
    if (!clean || clean.includes(' ') || clean.length < 2) return null;

    if (this.humanAudioCache.has(clean)) {
      return this.humanAudioCache.get(clean);
    }

    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(clean)}`);
      if (!res.ok) {
        this.humanAudioCache.set(clean, null);
        return null;
      }
      const data = await res.json();
      const phonetics = data[0]?.phonetics || [];
      const audioObj = phonetics.find(p => p.audio && p.audio.startsWith('http') && p.audio.endsWith('.mp3'));
      const audioUrl = audioObj ? audioObj.audio : null;
      this.humanAudioCache.set(clean, audioUrl);
      return audioUrl;
    } catch (e) {
      this.humanAudioCache.set(clean, null);
      return null;
    }
  }

  async speak(text, options = {}) {
    if (!text || !text.trim()) return;

    this.stop();

    const cleanText = text.replace(/[*_#`~[\]]/g, '').trim();
    const lang = options.lang || (options.isPortuguese ? 'pt-BR' : 'en-US');
    const isPt = lang.toLowerCase().startsWith('pt');
    const rate = options.rate || (isPt ? 0.95 : this.rate);

    // 1. Para palavras isoladas em inglês (Flashcards/Vocabulário): tenta áudio humano nativo primeiro!
    const isSingleWord = !isPt && !cleanText.includes(' ') && cleanText.length < 25;
    if (isSingleWord && options.preferHuman !== false) {
      try {
        const humanAudioUrl = await this.fetchHumanAudioUrl(cleanText);
        if (humanAudioUrl) {
          const played = await this.playAudioUrl(humanAudioUrl, cleanText, rate, options);
          if (played) return;
        }
      } catch (e) {}
    }

    // 2. Tenta Web Speech API nativa (se houver voz compatível)
    this.loadVoices();
    const hasMatchingVoice = isPt
      ? Boolean(this.selectedPtVoice || this.getPortugueseVoices().length > 0)
      : Boolean(this.selectedEnVoice || this.getEnglishVoices().length > 0);

    if (this.synth && hasMatchingVoice) {
      const synthSuccess = await this.speakViaSynthesis(cleanText, lang, rate, options);
      if (synthSuccess) return;
    }

    // 3. Fallback online de alta qualidade (Google TTS sem restrição de Referer)
    this.speakViaOnlineAudio(cleanText, lang, rate, options);
  }

  speakViaSynthesis(cleanText, lang, rate, options = {}) {
    return new Promise((resolve) => {
      try {
        if (this.synth.paused) this.synth.resume();

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = lang;
        utterance.rate = rate;
        utterance.pitch = options.pitch || this.pitch;

        const isPt = lang.toLowerCase().startsWith('pt');
        if (isPt && this.selectedPtVoice) {
          utterance.voice = this.selectedPtVoice;
        } else if (!isPt && this.selectedEnVoice) {
          utterance.voice = this.selectedEnVoice;
        }

        let started = false;

        utterance.onstart = () => {
          started = true;
          if (this.watchdogTimer) clearTimeout(this.watchdogTimer);
          this.notifyState(true, cleanText);
          if (options.onStart) options.onStart();
        };

        utterance.onend = () => {
          if (this.watchdogTimer) clearTimeout(this.watchdogTimer);
          this.notifyState(false, '');
          if (options.onEnd) options.onEnd();
          resolve(true);
        };

        utterance.onerror = (e) => {
          if (this.watchdogTimer) clearTimeout(this.watchdogTimer);
          // Se o erro foi cancelamento intencional, ignora
          if (e.error === 'canceled' || e.error === 'interrupted') {
            resolve(false);
            return;
          }
          console.warn('SpeechSynthesis falhou, acionando áudio online:', e);
          this.notifyState(false, '');
          resolve(false);
        };

        // Watchdog rápido: se em 400ms a voz nativa não iniciou (ex: sistema sem voz instalada), cancela e usa áudio online
        this.watchdogTimer = setTimeout(() => {
          if (!started) {
            console.warn('SpeechSynthesis demorou para iniciar, alternando para áudio online.');
            try { this.synth.cancel(); } catch (e) {}
            this.notifyState(false, '');
            resolve(false);
          }
        }, 450);

        this.synth.speak(utterance);
      } catch (err) {
        if (this.watchdogTimer) clearTimeout(this.watchdogTimer);
        resolve(false);
      }
    });
  }

  playAudioUrl(audioUrl, text, rate = 1.0, options = {}) {
    return new Promise((resolve) => {
      try {
        const audio = new Audio();
        audio.referrerPolicy = 'no-referrer';
        audio.src = audioUrl;
        audio.playbackRate = Math.max(0.6, Math.min(1.5, rate));
        this.activeAudio = audio;

        audio.onplay = () => {
          this.notifyState(true, text);
          if (options.onStart) options.onStart();
        };

        audio.onended = () => {
          this.notifyState(false, '');
          this.activeAudio = null;
          if (options.onEnd) options.onEnd();
          resolve(true);
        };

        audio.onerror = () => {
          this.notifyState(false, '');
          this.activeAudio = null;
          resolve(false);
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => resolve(true))
            .catch(() => {
              this.notifyState(false, '');
              this.activeAudio = null;
              resolve(false);
            });
        }
      } catch (e) {
        resolve(false);
      }
    });
  }

  speakViaOnlineAudio(cleanText, lang, rate = 1.0, options = {}) {
    try {
      const isPt = lang.toLowerCase().startsWith('pt');
      const targetLang = isPt ? 'pt' : 'en';

      // Divide textos muito longos (ex: devocionais inteiros) para a API não cortar
      const textToPlay = cleanText.length > 200 ? cleanText.slice(0, 195) + '...' : cleanText;
      const encoded = encodeURIComponent(textToPlay);
      const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${targetLang}&client=tw-ob&q=${encoded}`;

      const audio = new Audio();
      audio.referrerPolicy = 'no-referrer';
      audio.src = audioUrl;
      audio.playbackRate = rate || 1.0;
      this.activeAudio = audio;

      audio.onplay = () => {
        this.notifyState(true, cleanText);
        if (options.onStart) options.onStart();
      };

      audio.onended = () => {
        this.notifyState(false, '');
        this.activeAudio = null;
        if (options.onEnd) options.onEnd();
      };

      audio.onerror = (e) => {
        console.warn('Falha na reprodução de áudio online:', e);
        this.notifyState(false, '');
        this.activeAudio = null;
        if (options.onError) options.onError(e);
      };

      audio.play().catch(e => {
        console.warn('Reprodução de áudio bloqueada pelo navegador:', e);
        this.notifyState(false, '');
        this.activeAudio = null;
      });
    } catch (e) {
      console.warn('Erro ao acionar áudio online:', e);
      this.notifyState(false, '');
    }
  }
}

export const speechService = new SpeechService();
