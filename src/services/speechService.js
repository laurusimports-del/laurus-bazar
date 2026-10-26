// Web Speech API service for natural English pronunciation

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.rate = 0.85; // slightly slower for clear language learning
    this.pitch = 1.0;
    this.selectedVoice = null;
    this.isSpeaking = false;
    this.onStateChangeCallbacks = new Set();

    if (this.synth) {
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
      this.loadVoices();
    }
  }

  loadVoices() {
    if (!this.synth) return [];
    const voices = this.synth.getVoices();
    // Prefer natural English voices (Google US English, Samantha, Microsoft Jenny, etc.)
    const englishVoices = voices.filter(v => v.lang.startsWith('en'));
    const preferred = englishVoices.find(v => 
      v.name.includes('Natural') || 
      v.name.includes('Google') || 
      v.name.includes('Samantha') || 
      v.name.includes('Jenny') ||
      v.lang === 'en-US'
    );
    this.selectedVoice = preferred || englishVoices[0] || null;
    return englishVoices;
  }

  getVoices() {
    if (!this.synth) return [];
    return this.synth.getVoices().filter(v => v.lang.startsWith('en'));
  }

  setVoice(voiceURI) {
    if (!this.synth) return;
    const voices = this.getVoices();
    const match = voices.find(v => v.voiceURI === voiceURI || v.name === voiceURI);
    if (match) this.selectedVoice = match;
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
    this.onStateChangeCallbacks.forEach(cb => cb({ isSpeaking: speaking, text }));
  }

  speak(text, options = {}) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    this.stop();

    if (!text || !text.trim()) return;

    // Clean text of markdown or bracket symbols if any
    const cleanText = text.replace(/[*_#`~[\]]/g, '').trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = options.lang || 'en-US';
    utterance.rate = options.rate || this.rate;
    utterance.pitch = options.pitch || this.pitch;

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    utterance.onstart = () => {
      this.notifyState(true, cleanText);
      if (options.onStart) options.onStart();
    };

    utterance.onend = () => {
      this.notifyState(false, '');
      if (options.onEnd) options.onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech error:', e);
      this.notifyState(false, '');
      if (options.onError) options.onError(e);
    };

    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.notifyState(false, '');
    }
  }

  pause() {
    if (this.synth) this.synth.pause();
  }

  resume() {
    if (this.synth) this.synth.resume();
  }
}

export const speechService = new SpeechService();
