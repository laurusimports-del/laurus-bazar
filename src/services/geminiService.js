// Gemini AI Tutor Service with smart offline fallback

const SYSTEM_PROMPT = `You are 'Grace', a warm, encouraging, and wise Christian English tutor dedicated to helping a couple learn English together.
Your tone is loving, clear, joyful, and pedagogically sound.
Always follow these guidelines:
1. Explain English concepts with clarity and brevity.
2. Provide simple phonetic tips or IPA when helpful.
3. When teaching phrases, give 1-2 examples of daily couple usage or biblical/devotional context.
4. If the user asks in Portuguese, reply warmly with Portuguese explanations and natural English expressions to practice.
5. If the user writes in English, reply in English and gently suggest a more natural/fluent alternative if they made any mistakes ("Polite feedback: You could also say...").
6. Always cheer them on as a couple!`;

export async function askAITutor({ message, history = [], apiKey = '' }) {
  const activeKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY || '';

  if (!activeKey) {
    // Smart offline simulated response
    return generateOfflineResponse(message);
  }

  try {
    const formattedHistory = history.map(item => ({
      role: item.sender === 'user' ? 'user' : 'model',
      parts: [{ text: item.text }]
    }));

    // Add current user prompt
    const contents = [
      ...formattedHistory,
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    // Model candidate endpoints
    const models = ['gemini-1.5-flash', 'gemini-2.0-flash'];
    let replyText = null;

    for (const model of models) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents,
              systemInstruction: {
                parts: [{ text: SYSTEM_PROMPT }]
              },
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 700
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) break;
        }
      } catch (e) {
        console.warn(`Attempt with ${model} failed, trying next...`, e);
      }
    }

    if (replyText) {
      return replyText;
    }
    return generateOfflineResponse(message, true);
  } catch (err) {
    console.error('Error contacting Gemini API:', err);
    return generateOfflineResponse(message);
  }
}

function generateOfflineResponse(prompt, hadError = false) {
  const lower = prompt.toLowerCase();

  let prefix = '';
  if (hadError) {
    prefix = `💡 *(Aviso: Verifique sua chave da Gemini nas Configurações. Usando resposta inteligente local:)*\n\n`;
  }

  if (lower.includes('pray') || lower.includes('orar') || lower.includes('oração')) {
    return prefix + `🙏 **Como orar em inglês como casal:**
Em inglês, usamos termos muito doces e reverentes:
- **"Heavenly Father"** /ˈhev.ən.li ˈfɑː.ðɚ/ = Pai Celestial
- **"Lord, we surrender our day to You"** = Senhor, entregamos nosso dia a Ti.
- **"Thank You for our marriage and health"** = Obrigado pelo nosso casamento e saúde.
- **"In Jesus' name, Amen."** = Em nome de Jesus, Amém.

💡 *Dica de Ouro:* Comecem a oração antes de dormir falando em voz alta: *"Lord, bless our home tonight."* (Senhor, abençoe nosso lar esta noite).`;
  }

  if (lower.includes('diferença') && (lower.includes('praise') || lower.includes('worship'))) {
    return prefix + `🎵 **Diferença entre Praise e Worship:**
- **Praise** /preɪz/: Louvor com júbilo, celebração, palmas e ações de graças ("Sing praise to God"). É expressar com energia o que Ele fez!
- **Worship** /ˈwɝː.ʃɪp/: Adoração profunda, reverência, entrega de coração e prostração ("I worship You in spirit and truth"). É honrar quem Ele é!

✨ *Exemplo do casal:* *"We praise God for our victories, and we worship Him in every season."*`;
  }

  if (lower.includes('amor') || lower.includes('love') || lower.includes('carinho') || lower.includes('esposa')) {
    return prefix + `❤️ **Expressões de Carinho em Inglês para o Casal:**
Além do clássico *"I love you"*, vocês podem usar no dia a dia:
1. **"I appreciate everything you do for us."** *(Eu valorizo tudo o que você faz por nós.)*
2. **"You make my heart smile."** *(Você alegra meu coração.)*
3. **"I am so blessed to have you by my side."** *(Sou tão abençoado(a) por ter você ao meu lado.)*
4. **"You look stunning today, honey!"** *(Você está deslumbrante hoje, meu bem!)*`;
  }

  if (lower.includes('viagem') || lower.includes('restaurante') || lower.includes('travel')) {
    return prefix + `✈️ **Frases Práticas para Casal em Viagens:**
- **"A table for two, please."** *(Uma mesa para dois, por favor.)*
- **"Could you take a picture of us, please?"** *(Você poderia tirar uma foto nossa, por favor?)*
- **"We would like to split the dessert."** *(Gostaríamos de dividir a sobremesa.)*
- **"Excuse me, where is the nearest exit?"** *(Com licença, onde fica a saída mais próxima?)*`;
  }

  return prefix + `📖 **Que alegria estudar com vocês!**
Estou pronta para ajudar você e sua esposa com:
1. ✝️ **Vocabulário Bíblico & Versículos:** Quer entender uma palavra ou orar em inglês?
2. 🗣️ **Conversação do Cotidiano:** Frases românticas, dia a dia, trabalho e viagens.
3. 📝 **Correção de Frases:** Me envie uma frase em inglês e eu mostro como soar mais natural.

*(Dica: Se quiser respostas 100% livres e conversas ilimitadas sobre qualquer tema, você pode adicionar sua chave gratuita da API do Google Gemini no menu **Configurações ⚙️** no canto superior!)*`;
}
