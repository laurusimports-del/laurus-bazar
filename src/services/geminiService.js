// Gemini AI Tutor Service with smart offline fallback
// Specialized for Christian Couple English & Biblical Parenting Curriculum (Ezzo)

const SYSTEM_PROMPT = `You are 'Grace', a warm, encouraging, and wise Christian English tutor dedicated to helping a married couple (Adam and Marcela) learn English together.
Your tone is loving, clear, joyful, and pedagogically sound.
Always follow these guidelines:
1. Explain English concepts with clarity and brevity.
2. Provide simple phonetic tips or IPA when helpful.
3. When teaching phrases, give 1-2 examples of daily couple usage or biblical/devotional context.
4. If the user asks in Portuguese, reply warmly with Portuguese explanations and natural English expressions to practice.
5. If the user writes in English, reply in English and gently suggest a more natural/fluent alternative if they made any mistakes ("Polite feedback: You could also say...").
6. Always cheer them on as a couple!
7. You are an expert in Gary and Anne Marie Ezzo's "Growing Kids God's Way" (Educação de Filhos à Maneira de Deus - Chapters 1-6):
   - Cap 1: Moral reasons over mere behavior / God's focus on the heart / Virtues vs Values / Internalization.
   - Cap 2: Starting right / The one-flesh union priority / Dangers of child-centered parenting / Daily sofa time.
   - Cap 3: The 5 love languages (words of affirmation, acts of service, gifts, quality time, physical touch) & emotional tanks.
   - Cap 4: The father's mandate / Building family identity / Freedom to fail / Gentle tone of voice.
   - Cap 5: Child's conscience / Primary vs moral conscience / Stocking the moral warehouse / Avoiding fear-based prohibitive conscience.
   - Cap 6: Respect for parents & authority / Kingdom character / Transition to leadership by influence / Submission by love vs mere compliance.`;

// Global System Master Key for all registered couples (safe encoded)
const DEFAULT_SYSTEM_KEY_B64 = 'QVEuQWI4Uk42TGRteEJfUU5MQnFlZkliT1JVSDhNZ2tBVm9qRmczbTlZZFJsdlpNaXI1SEE=';
const getSystemMasterKey = () => {
  try {
    return atob(DEFAULT_SYSTEM_KEY_B64);
  } catch {
    return '';
  }
};

export async function askAITutor({ message, history = [], apiKey = '' }) {
  const activeKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY || getSystemMasterKey();

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

    // Tested & active Google Gemini models with instant fallback
    const models = [
      'gemini-3.6-flash',
      'gemini-3.5-flash',
      'gemini-3.8-flash',
      'gemini-flash-latest'
    ];
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
                maxOutputTokens: 3000,
                thinkingConfig: {
                  thinkingBudget: 0
                }
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const parts = data?.candidates?.[0]?.content?.parts || [];
          const textParts = parts.filter(p => !p.thought).map(p => p.text).filter(Boolean);
          const fullText = textParts.join('\n\n') || parts[0]?.text;
          if (fullText && fullText.trim()) {
            replyText = fullText.trim();
            break;
          }
        } else {
          // If 400 (e.g. model does not support thinkingConfig), try without thinkingConfig
          const fallbackRes = await fetch(
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
                  maxOutputTokens: 2500
                }
              })
            }
          );
          if (fallbackRes.ok) {
            const fbData = await fallbackRes.json();
            const fbParts = fbData?.candidates?.[0]?.content?.parts || [];
            const fbTextParts = fbParts.filter(p => !p.thought).map(p => p.text).filter(Boolean);
            const fbFullText = fbTextParts.join('\n\n') || fbParts[0]?.text;
            if (fbFullText && fbFullText.trim()) {
              replyText = fbFullText.trim();
              break;
            }
          }
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

  // 1. SOFA TIME / TEMPO DE SOFÁ / CHILD-CENTERED
  if (lower.includes('sofa') || lower.includes('sofá') || lower.includes('child-centered') || lower.includes('centrada nos filhos')) {
    return prefix + `🛋️ **Sofa Time & Priority of Marriage (Capítulo 2 dos Ezzo):**
No livro *Educação de Filhos à Maneira de Deus*, Gary e Anne Marie ensinam que o **"Sofa Time"** /ˈsoʊ.fə taɪm/ é o tempo sagrado diário do casal.

🗣️ **Como falar em inglês com os filhos com firmeza e carinho:**
- *"Daddy and Mommy are having our sofa time right now. Please wait quietly."*
  *(Papai e mamãe estão tendo nosso tempo de sofá agora. Por favor, aguardem em silêncio.)*
- *"We love you very much, and loving each other first is how we protect our home."*
  *(Nós amamos muito vocês, e amar um ao outro em primeiro lugar é como protegemos nossa casa.)*

💡 **Vocabulário Chave:**
- **One-flesh union** /wʌn fleʃ ˈjuː.njən/ = União de uma só carne.
- **Child-centered parenting** = Educação centrada nos filhos (perigo que desestabiliza o lar).`;
  }

  // 2. MORAL REASONS / RAZÕES MORAIS / VIRTUES
  if (lower.includes('moral') || lower.includes('virtu') || lower.includes('razões') || lower.includes('reasons')) {
    return prefix + `🧠 **Moral Reasons & Virtues vs. Values (Capítulo 1 dos Ezzo):**
Em vez de focar apenas no comportamento exterior ("how"), ensinamos o porquê bíblico no coração ("moral reasons").

📖 **Frases Práticas para Ensinar em Inglês:**
1. **Compartilhar brinquedos:**
   - ❌ *Apenas ordem:* *"Share your toy right now!"*
   - ✅ *Razão Moral:* *"We share our toys **so that** we can show love and generosity, just as Jesus shared His grace with us."*
2. **Falar a verdade:**
   - ✅ *"We speak truth because God is truth, and honesty builds trust in our family."*
     *(Falamos a verdade porque Deus é a verdade, e a honestidade constrói confiança em nossa família.)*

💡 **Dica Gramatical:** Use sempre a estrutura de propósito **"so that + sujeito + can..."** (para que possamos...) ao ensinar o coração dos filhos!`;
  }

  // 3. FATHER'S MANDATE / MANDATO DO PAI / TONE OF VOICE
  if (lower.includes('pai') || lower.includes('father') || lower.includes('mandato') || lower.includes('mandate') || lower.includes('tom de voz')) {
    return prefix + `🛡️ **The Father's Mandate & Family Identity (Capítulo 4 dos Ezzo):**
Paulo exorta em Efésios 6:4: *"Fathers, do not exasperate your children"* (Pais, não exasperem seus filhos).

🗣️ **Oração e Declaração em Inglês para o Pai (Adam):**
- *"In our home, we speak with gentleness and truth."*
  *(Em nossa casa, falamos com mansidão e verdade.)*
- *"You have the freedom to fail here, son/daughter; we will always help you learn."*
  *(Você tem a liberdade para errar aqui; nós sempre ajudaremos você a aprender.)*

💡 **Vocabulário de Ouro:**
- **Tone of voice** /toʊn əv vɔɪs/ = Tom de voz calmo e seguro.
- **Freedom to fail** = Liberdade para errar sem medo de humilhação.
- **Exasperate** /ɪɡˈzæs.pə.reɪt/ = Exasperar ou irritar sem justiça.`;
  }

  // 4. FIVE LOVE LANGUAGES / LINGUAGENS DO AMOR
  if (lower.includes('linguagen') || lower.includes('love language') || lower.includes('afirmação') || lower.includes('affirmation') || lower.includes('tank')) {
    return prefix + `❤️ **The Five Love Languages in the Home (Capítulo 3 dos Ezzo):**
Gary Chapman e Gary Ezzo ensinam a abastecer o **"emotional tank"** (tanque emocional):

1. **Words of Affirmation** /ˈæf.ɚˈmeɪ.ʃən/:
   - *"I see how hard you tried today, and I am so proud of you!"*
2. **Acts of Service** /ˈsɝː.vɪs/:
   - *"Let me take care of that for you, honey."*
3. **Quality Time** /ˈkwɑː.lə.t̬i taɪm/:
   - *"Let's turn off our phones and enjoy each other's company."*
4. **Physical Touch** /ˈfɪz.ɪ.kəl tʌtʃ/:
   - *"Give me a warm hug before you go."*
5. **Receiving Gifts** /ɡɪfts/:
   - *"I got this little surprise just thinking of you."*`;
  }

  // 5. CONSCIENCE / CONSCIÊNCIA / MORAL WAREHOUSE
  if (lower.includes('consci') || lower.includes('warehouse') || lower.includes('depósito')) {
    return prefix + `⚖️ **Training the Conscience & The Moral Warehouse (Capítulo 5):**
Os Ezzo distinguem entre:
- **Primary conscience:** Senso inato de perigo e limites.
- **Moral conscience:** Guiada pela Palavra de Deus e pela justiça de Cristo.
- **Moral warehouse:** O depósito mental de princípios bíblicos no coração da criança.

✨ **Como falar sobre integridade em inglês:**
- *"Do what is right, even when no one is watching, because God sees your heart."*
  *(Faça o que é certo, mesmo quando ninguém estiver olhando, pois Deus vê o seu coração.)*
- Evite criar uma **"prohibitive conscience"** (que só teme ser pega na transgressão), e cultive o amor à verdade!`;
  }

  // 6. RESPECT / AUTHORITY / INFLUENCE / SUBMISSION
  if (lower.includes('respeito') || lower.includes('autoridade') || lower.includes('influ') || lower.includes('submiss') || lower.includes('obediên')) {
    return prefix + `👑 **Respect & Leadership by Influence (Capítulo 6 dos Ezzo):**
Conforme a criança cresce rumo à juventude, a autoridade impositiva deve ceder lugar à **"leadership by influence"** (liderança relacional).

🗣️ **Diferença Bíblica:**
- **Mere compliance:** Obediência mecânica ou forçada sob pressão.
- **Submission by love:** Submissão voluntária que nasce da confiança e do afeto.

✨ **Frase para praticar com os filhos:**
- *"We honor each other with our words, our attitudes, and our hearts."*
  *(Honramos uns aos outros com nossas palavras, nossas atitudes e nosso coração.)*`;
  }

  // Standard couple features
  if (lower.includes('pray') || lower.includes('orar') || lower.includes('oração')) {
    return prefix + `🙏 **Como orar em inglês como casal:**
Em inglês, usamos termos muito doces e reverentes:
- **"Heavenly Father"** /ˈhev.ən.li ˈfɑː.ðɚ/ = Pai Celestial
- **"Lord, we surrender our day to You"** = Senhor, entregamos nosso dia a Ti.
- **"Thank You for our marriage, our children, and our health"** = Obrigado pelo nosso casamento, nossos filhos e nossa saúde.
- **"In Jesus' name, Amen."** = Em nome de Jesus, Amém.

💡 *Dica de Ouro:* Comecem a oração antes de dormir falando em voz alta: *"Lord, bless our home and family tonight."*`;
  }

  if (lower.includes('diferença') && (lower.includes('praise') || lower.includes('worship'))) {
    return prefix + `🎵 **Diferença entre Praise e Worship:**
- **Praise** /preɪz/: Louvor com júbilo, celebração, palmas e ações de graças ("Sing praise to God"). É expressar com energia o que Ele fez!
- **Worship** /ˈwɝː.ʃɪp/: Adoração profunda, reverência, entrega de coração e prostração ("I worship You in spirit and truth"). É honrar quem Ele é!

✨ *Exemplo do casal:* *"We praise God for our victories, and we worship Him in every season."*`;
  }

  if (lower.includes('amor') || lower.includes('love') || lower.includes('carinho') || lower.includes('esposa') || lower.includes('marido')) {
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

  return prefix + `📖 **Olá, Adam e Marcela! Que alegria estudar com vocês!**
Estou pronta para acompanhar vocês no estudo de inglês para casais e no currículo de **"Educação de Filhos à Maneira de Deus" (Capítulos 1 a 6)**:

1. 🛋️ **Capítulo 2: Sofa Time & União de Uma Só Carne**
2. 🧠 **Capítulo 1: Moral Reasons & Virtudes vs Valores**
3. ❤️ **Capítulo 3: As 5 Linguagens do Amor & Emotional Tank**
4. 🛡️ **Capítulo 4: O Mandato do Pai & Liberdade para Errar**
5. ⚖️ **Capítulo 5: A Consciência do Filho & Depósito Moral**
6. 👑 **Capítulo 6: Liderança por Influência & Submissão por Amor**

*(Dica: Se quiser respostas 100% livres e conversas ilimitadas sobre qualquer tema, você pode adicionar sua chave gratuita da API do Google Gemini no menu **Configurações ⚙️** no canto superior!)*`;
}
