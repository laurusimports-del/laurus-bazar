// Resilient Bilingual Audio Speech Service (Web Speech API + HTML5 Audio fallback)

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.rate = 0.85; // Default rate for learning
    this.pitch = 1.0;
    this.selectedEnVoice = null;
    this.selectedPtVoice = null;
    this.isSpeaking = false;
    this.onStateChangeCallbacks = new Set();
    this.fallbackAudio = null;

    if (this.synth) {
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
      this.loadVoices();
    }
  }

  loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices() || [];

    // 1. English Voices
    const englishVoices = voices.filter(v => v.lang.startsWith('en'));
    const preferredEn = englishVoices.find(v => 
      v.name.includes('Natural') || 
      v.name.includes('Google') || 
      v.name.includes('Samantha') || 
      v.name.includes('Jenny') ||
      v.lang === 'en-US'
    );
    this.selectedEnVoice = preferredEn || englishVoices[0] || null;

    // 2. Portuguese Voices (pt-BR / pt-PT)
    const ptVoices = voices.filter(v => v.lang.startsWith('pt'));
    const preferredPt = ptVoices.find(v => 
      v.lang === 'pt-BR' || 
      v.name.includes('Brazil') ||
      v.name.includes('Luciana') ||
      v.name.includes('Yara') ||
      v.name.includes('Maria') ||
      v.name.includes('Google')
    );
    this.selectedPtVoice = preferredPt || ptVoices[0] || null;
  }

  getVoices() {
    if (!this.synth) return [];
    return this.synth.getVoices() || [];
  }

  getEnglishVoices() {
    return this.getVoices().filter(v => v.lang.startsWith('en'));
  }

  getPortugueseVoices() {
    return this.getVoices().filter(v => v.lang.startsWith('pt'));
  }

  setEnVoice(voiceURI) {
    if (!this.synth) return;
    const voices = this.getEnglishVoices();
    const match = voices.find(v => v.voiceURI === voiceURI || v.name === voiceURI);
    if (match) this.selectedEnVoice = match;
  }

  setRate(newRate) {
    this.rate = Math.max(0.5, Math.min(2.0, newRate));
  }

  subscribe(callback) {
    this.onStateChangeCallbacks.add(callback);
    return () => this.onStateChangeCallbacks.delete(callback);
  }

  notifyState(speaking, text = '') {
    this.isSpeaking = speaking;
    this.onStateChangeCallbacks.forEach(cb => {
      try { cb({ isSpeaking: speaking, text }); } catch (e) {}
    });
  }

  speak(text, options = {}) {
    if (!text || !text.trim()) return;

    this.stop();

    // Clean text of markdown, bracket symbols, IPA slashes
    const cleanText = text.replace(/[*_#`~[\]]/g, '').trim();
    const lang = options.lang || (options.isPortuguese ? 'pt-BR' : 'en-US');
    const isPt = lang.startsWith('pt');

    // Attempt Web Speech API first
    if (this.synth) {
      try {
        // Chromium bug fix: resume if paused
        if (this.synth.paused) {
          this.synth.resume();
        }

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = lang;
        utterance.rate = options.rate || (isPt ? 0.95 : this.rate);
        utterance.pitch = options.pitch || this.pitch;

        // Choose appropriate voice based on requested language
        if (isPt) {
          if (this.selectedPtVoice) {
            utterance.voice = this.selectedPtVoice;
          }
        } else {
          if (this.selectedEnVoice) {
            utterance.voice = this.selectedEnVoice;
          }
        }

        let hasStarted = false;

        utterance.onstart = () => {
          hasStarted = true;
          this.notifyState(true, cleanText);
          if (options.onStart) options.onStart();
        };

        utterance.onend = () => {
          this.notifyState(false, '');
          if (options.onEnd) options.onEnd();
        };

        utterance.onerror = (e) => {
          console.warn('SpeechSynthesis error, falling back to online TTS:', e);
          this.notifyState(false, '');
          // Fallback to online audio if synthesis fails
          this.speakViaOnlineAudio(cleanText, lang, options);
        };

        // Small timeout prevents Chrome cancel collision
        setTimeout(() => {
          try {
            this.synth.speak(utterance);

            // Timeout watchdog: If after 700ms utterance didn't start (mobile sleep or voice missing), trigger fallback
            setTimeout(() => {
              if (!hasStarted && this.isSpeaking) {
                console.warn('SpeechSynthesis hung, switching to audio fallback');
                this.speakViaOnlineAudio(cleanText, lang, options);
              }
            }, 750);
          } catch (err) {
            this.speakViaOnlineAudio(cleanText, lang, options);
          }
        }, 15);

        return;
      } catch (err) {
        console.warn('Error in SpeechSynthesis, using fallback:', err);
      }
    }

    // Direct fallback if no synth available
    this.speakViaOnlineAudio(cleanText, lang, options);
  }

  speakViaOnlineAudio(cleanText, lang, options = {}) {
    this.stop();
    try {
      // Free reliable Google TTS audio endpoint
      const encoded = encodeURIComponent(cleanText.substring(0, 200));
      const targetLang = lang.startsWith('pt') ? 'pt' : 'en';
      const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${targetLang}&client=tw-ob&q=${encoded}`;

      const audio = new Audio(audioUrl);
      this.fallbackAudio = audio;
      audio.playbackRate = options.rate || (targetLang === 'pt' ? 1.0 : this.rate);

      audio.onplay = () => {
        this.notifyState(true, cleanText);
        if (options.onStart) options.onStart();
      };

      audio.onended = () => {
        this.notifyState(false, '');
        this.fallbackAudio = null;
        if (options.onEnd) options.onEnd();
      };

      audio.onerror = (e) => {
        console.warn('Fallback audio failed:', e);
        this.notifyState(false, '');
        this.fallbackAudio = null;
        if (options.onError) options.onError(e);
      };

      audio.play().catch(e => {
        console.warn('Audio play restricted by browser:', e);
        this.notifyState(false, '');
      });
    } catch (e) {
      console.warn('Audio fallback error:', e);
      this.notifyState(false, '');
    }
  }

  stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }
    if (this.fallbackAudio) {
      try {
        this.fallbackAudio.pause();
        this.fallbackAudio.currentTime = 0;
        this.fallbackAudio = null;
      } catch (e) {}
    }
    this.notifyState(false, '');
  }

  pause() {
    if (this.synth) this.synth.pause();
    if (this.fallbackAudio) this.fallbackAudio.pause();
  }

  resume() {
    if (this.synth) this.synth.resume();
    if (this.fallbackAudio) this.fallbackAudio.play();
  }
}

export const speechService = new SpeechService();
