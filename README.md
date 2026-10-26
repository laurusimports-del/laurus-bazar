# 🕊️ Grace & Fluency — Inglês & Fé em Casal

Plataforma personalizada e interativa de aprendizado de inglês criada para o casal crescer junto na fé, no vocabulário e na conversação, com sincronização em nuvem no Supabase, inteligência artificial (Google Gemini) e controle de acesso exclusivo por código de convite e painel de administrador.

---

## ✨ Funcionalidades Principais

### 1. 📖 Devocionais & Bíblia Bilíngue Interativa (Faith & Scripture)
- Passagens inspiradoras (Filipenses 4, Jeremias 29, 1 Coríntios 13, Provérbios 3, Salmo 23, etc.).
- **Palavras Clicáveis em Destaque:** toque em qualquer palavra-chave para abrir o modal com tradução detalhada, pronúncia fonética IPA, exemplos de frases e áudio narrado bilíngue (EN & PT).
- **Áudio Narrado Nativo Duplo (Web Speech + Google TTS):** escute versículos, reflexões e termos tanto em inglês quanto em português.
- **Couple's Guided Prayer (Oração do Casal):** oração em inglês com tradução para orarem juntos em voz alta e marcarem a conclusão com celebração e pontos.
- **Check Your Understanding (Quiz):** perguntas de múltipla escolha para fixação imediata com confetes.

### 2. 🧠 Sistema de Memorização Inteligente (Flashcards SRS)
- Repetição espaçada baseada no método Leitner (Errei, Difícil, Bom, Fácil).
- Botão de áudio para escutar a pronúncia das palavras e frases de exemplo em inglês e português.
- Botão de **1 clique** para adicionar termos dos devocionais e louvores aos flashcards.
- Filtros por categorias (Fé, Dia a Dia do Casal, Emoções, Viagens).
- Modal para criar novos cartões personalizados a qualquer momento.

### 3. 🎵 Músicas & Louvores em Inglês (Worship & Lyrics)
- Canções como *Goodness of God*, *Way Maker*, *10,000 Reasons*, etc.
- Vídeos oficiais de louvor integrados.
- Letras bilíngues sincronizadas estrofe por estrofe com leitura em áudio.
- Vocabulário poético e phrasal verbs explicados com áudio.

### 4. 🤖 Tutor IA: Grace 🕊️
- Assistente carinhosa e didática para tirar dúvidas, explicar passagens bíblicas, corrigir frases e praticar conversação.
- Pronúncia em áudio integrada para escutar as respostas da Grace.
- Integração com a **Google Gemini API** (100% gratuita no Google AI Studio: 15 RPM, 1.500 requisições/dia).
- Modo inteligente com respostas locais mesmo se estiver offline ou sem chave de API.

### 5. 💑 Hub do Casal & Progresso
- Alternância instantânea de perfil no topo (Esposo 👨‍💻 ⇄ Esposa 👩‍💼).
- Ofensiva (Streak) de dias consecutivos de estudo individual e em conjunto.
- Gráficos de retenção Leitner, mapa de calor de 28 dias e horas praticadas.
- **Recadinho do Dia:** espaço para deixar mensagens de carinho e encorajamento para o cônjuge.

### 6. 🛡️ Segurança & Controle de Acesso (Anti-Desperdício de Banco)
- **Progresso 100% Zerado:** Novas contas iniciam com 0 pontos, 0 streak e 0 lições completadas.
- **Porta de Entrada com Código de Convite:** Novos casais precisam do código de convite mestre (ex: `GRACE2026`).
- **Painel do Administrador (Admin Panel):**
  - O primeiro casal cadastrado vira **Administrador Mestre** automaticamente.
  - O Admin tem uma aba exclusiva no menu onde vê todos os casais cadastrados.
  - Pode liberar acesso (`Aprovar`), bloquear (`Bloquear`) ou trocar o código mestre de convite a qualquer momento.
  - Impede que terceiros acessem a URL e consumam sua cota gratuita do Supabase ou da Gemini API.

---

## 🗄️ Configuração do Banco de Dados (Supabase)

1. Crie uma conta ou acesse seu projeto no [Supabase](https://supabase.com/).
2. Abra o menu lateral esquerdo e clique em **SQL Editor**.
3. Clique em **New query**.
4. Copie todo o conteúdo do arquivo [`supabase_schema.sql`](file:///c:/Users/adam0/OneDrive/Documents/Sistemas/Sistema%20de%20Loja/supabase_schema.sql) e cole no editor.
5. Clique em **Run**. As tabelas `couples`, `profiles_progress` e `system_config` serão criadas com as permissões de segurança necessárias.

---

## 🚀 Como Subir para o GitHub e Vercel

### 1. Enviar para o GitHub
```bash
git add .
git commit -m "feat: lancamento do Grace & Fluency com login, progresso zerado e painel admin"
git push origin main
```

### 2. Deploy na Vercel
1. Acesse [vercel.com](https://vercel.com) e conecte seu repositório do GitHub.
2. Nas configurações do projeto (**Settings > Environment Variables**), adicione as seguintes variáveis:
   - `VITE_SUPABASE_URL`: Sua URL do Supabase (ex: `https://rluojbfoimbpoimgdyqh.supabase.co`)
   - `VITE_SUPABASE_ANON_KEY`: Sua chave anon pública do Supabase
   - `VITE_GEMINI_API_KEY`: Sua chave de API gratuita do Google AI Studio (opcional)
3. Clique em **Deploy**. O arquivo [`vercel.json`](file:///c:/Users/adam0/OneDrive/Documents/Sistemas/Sistema%20de%20Loja/vercel.json) já está configurado com rewrites SPA para carregar qualquer rota perfeitamente.

---

## ⚙️ Variáveis de Ambiente (.env.local)

Exemplo disponível em [`.env.example`](file:///c:/Users/adam0/OneDrive/Documents/Sistemas/Sistema%20de%20Loja/.env.example):

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica-aqui
VITE_GEMINI_API_KEY=sua-chave-gemini-aqui
```
