// Professional & Resilient Bilingual Audio Speech Engine
// Combines Human Native Audio (Dictionary API) + Web Speech API (with Sentence Chunking) + High-Def Online TTS Fallback

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
    this.humanAudioCache = new Map();
    this.playbackSessionId = 0;

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
    this.playbackSessionId++;

    if (this.activeAudio) {
      try {
        this.activeAudio.pause();
        this.activeAudio.currentTime = 0;
        this.activeAudio.src = '';
        this.activeAudio.onended = null;
        this.activeAudio.onerror = null;
        this.activeAudio.onplay = null;
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

  // Divide textos longos (como artigos completos e devocionais) em trechos naturais de pontuação
  // para que o navegador nunca pare a leitura no meio do caminho
  splitTextIntoChunks(text, maxLength = 220) {
    if (!text) return [];
    const normalized = text.replace(/\r\n/g, '\n').replace(/\n+/g, '.\n');
    const rawSentences = normalized.match(/[^.!?;\n]+[.!?;\n]+/g) || [normalized];
    
    const chunks = [];
    let current = '';

    for (const raw of rawSentences) {
      const sentence = raw.trim();
      if (!sentence) continue;

      if (current.length + sentence.length + 1 <= maxLength) {
        current = current ? `${current} ${sentence}` : sentence;
      } else {
        if (current) chunks.push(current);
        if (sentence.length > maxLength) {
          const words = sentence.split(' ');
          let subChunk = '';
          for (const w of words) {
            if (subChunk.length + w.length + 1 <= maxLength) {
              subChunk = subChunk ? `${subChunk} ${w}` : w;
            } else {
              if (subChunk) chunks.push(subChunk);
              subChunk = w;
            }
          }
          current = subChunk;
        } else {
          current = sentence;
        }
      }
    }
    if (current && current.trim()) chunks.push(current.trim());
    return chunks;
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

    // Cancela qualquer áudio anterior e inicia uma nova sessão única
    this.stop();
    const sessionId = this.playbackSessionId;

    const cleanText = text.replace(/[*_#`~[\]]/g, '').trim();
    const lang = options.lang || (options.isPortuguese ? 'pt-BR' : 'en-US');
    const isPt = lang.toLowerCase().startsWith('pt');
    const rate = options.rate || (isPt ? 0.95 : this.rate);

    // 1. Para palavras isoladas em inglês (Flashcards/Vocabulário): tenta áudio humano nativo primeiro!
    const isSingleWord = !isPt && !cleanText.includes(' ') && cleanText.length < 25;
    if (isSingleWord && options.preferHuman !== false) {
      try {
        const humanAudioUrl = await this.fetchHumanAudioUrl(cleanText);
        if (sessionId !== this.playbackSessionId) return;
        if (humanAudioUrl) {
          const played = await this.playAudioUrl(humanAudioUrl, cleanText, rate, options, sessionId);
          if (played) return;
        }
      } catch (e) {}
    }

    if (sessionId !== this.playbackSessionId) return;

    // Divide em frases naturais para ler notícias completas e artigos longos até o fim
    const chunks = this.splitTextIntoChunks(cleanText, 220);
    if (chunks.length === 0) return;

    this.notifyState(true, cleanText);
    if (options.onStart) options.onStart();

    // 2. Tenta Web Speech API nativa (sem race condition de duas vozes)
    const hasSynth = typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis;
    if (hasSynth) {
      this.loadVoices();
      try {
        const synthSuccess = await this.playChunksViaSynthesis(chunks, lang, rate, sessionId, options);
        if (synthSuccess) {
          if (sessionId === this.playbackSessionId) {
            this.notifyState(false, '');
            if (options.onEnd) options.onEnd();
          }
          return;
        }
      } catch (e) {
        console.warn('SpeechSynthesis encontrou erro, tentando fallback online:', e);
      }
    }

    if (sessionId !== this.playbackSessionId) return;

    // 3. Fallback online de alta qualidade executado sequencialmente chunk por chunk
    await this.playChunksViaOnlineAudio(chunks, lang, rate, sessionId, options);
    if (sessionId === this.playbackSessionId) {
      this.notifyState(false, '');
      if (options.onEnd) options.onEnd();
    }
  }

  // Reproduz sequencialmente cada frase usando a síntese nativa do navegador
  playChunksViaSynthesis(chunks, lang, rate, sessionId, options = {}) {
    return new Promise((resolve) => {
      let idx = 0;

      const speakNextChunk = () => {
        if (sessionId !== this.playbackSessionId) {
          resolve(false);
          return;
        }
        if (idx >= chunks.length) {
          resolve(true);
          return;
        }

        const currentChunk = chunks[idx];
        idx++;

        try {
          if (this.synth.paused) this.synth.resume();

          const utterance = new SpeechSynthesisUtterance(currentChunk);
          utterance.lang = lang;
          utterance.rate = rate;
          utterance.pitch = options.pitch || this.pitch;

          const isPt = lang.toLowerCase().startsWith('pt');
          if (isPt && this.selectedPtVoice) {
            utterance.voice = this.selectedPtVoice;
          } else if (!isPt && this.selectedEnVoice) {
            utterance.voice = this.selectedEnVoice;
          }

          utterance.onend = () => {
            if (sessionId === this.playbackSessionId) {
              speakNextChunk();
            }
          };

          utterance.onerror = (e) => {
            if (e.error === 'canceled' || e.error === 'interrupted') {
              resolve(false);
              return;
            }
            console.warn('SpeechSynthesis chunk error:', e);
            if (sessionId === this.playbackSessionId) {
              speakNextChunk();
            }
          };

          this.synth.speak(utterance);
        } catch (err) {
          resolve(false);
        }
      };

      speakNextChunk();
    });
  }

  // Reproduz sequencialmente frases via serviço online quando a voz nativa falha
  playChunksViaOnlineAudio(chunks, lang, rate, sessionId, options = {}) {
    return new Promise((resolve) => {
      const isPt = lang.toLowerCase().startsWith('pt');
      const targetLang = isPt ? 'pt' : 'en';
      let idx = 0;

      const playNextChunk = () => {
        if (sessionId !== this.playbackSessionId) {
          resolve(false);
          return;
        }
        if (idx >= chunks.length) {
          resolve(true);
          return;
        }

        const currentChunk = chunks[idx];
        idx++;

        try {
          const encoded = encodeURIComponent(currentChunk);
          const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${targetLang}&client=tw-ob&q=${encoded}`;
          const audio = new Audio();
          audio.referrerPolicy = 'no-referrer';
          audio.src = audioUrl;
          audio.playbackRate = rate || 1.0;
          this.activeAudio = audio;

          audio.onended = () => {
            if (sessionId === this.playbackSessionId) {
              playNextChunk();
            }
          };

          audio.onerror = () => {
            if (sessionId === this.playbackSessionId) {
              playNextChunk();
            }
          };

          audio.play().catch(() => {
            resolve(false);
          });
        } catch (e) {
          resolve(false);
        }
      };

      playNextChunk();
    });
  }

  playAudioUrl(audioUrl, text, rate = 1.0, options = {}, sessionId) {
    return new Promise((resolve) => {
      try {
        const audio = new Audio();
        audio.referrerPolicy = 'no-referrer';
        audio.src = audioUrl;
        audio.playbackRate = Math.max(0.6, Math.min(1.5, rate));
        this.activeAudio = audio;

        audio.onplay = () => {
          if (sessionId === this.playbackSessionId) {
            this.notifyState(true, text);
            if (options.onStart) options.onStart();
          }
        };

        audio.onended = () => {
          if (sessionId === this.playbackSessionId) {
            this.notifyState(false, '');
            this.activeAudio = null;
            if (options.onEnd) options.onEnd();
            resolve(true);
          }
        };

        audio.onerror = () => {
          if (sessionId === this.playbackSessionId) {
            this.notifyState(false, '');
            this.activeAudio = null;
            resolve(false);
          }
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => resolve(true))
            .catch(() => {
              if (sessionId === this.playbackSessionId) {
                this.notifyState(false, '');
                this.activeAudio = null;
              }
              resolve(false);
            });
        }
      } catch (e) {
        resolve(false);
      }
    });
  }
}

export const speechService = new SpeechService();
