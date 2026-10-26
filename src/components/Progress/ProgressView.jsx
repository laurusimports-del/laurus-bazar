import React, { useState } from 'react';
import { 
  BarChart3, 
  Flame, 
  BookOpen, 
  Layers, 
  Clock, 
  Award, 
  Calendar, 
  Sparkles, 
  CheckCircle,
  TrendingUp,
  Heart,
  Volume2
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

export const ProgressView = () => {
  const { 
    currentProfileData, 
    currentProfileName, 
    currentProfileEmoji,
    spouseProfileData,
    spouseProfileName,
    spouseProfileEmoji,
    data 
  } = useUser();

  const [viewMode, setViewMode] = useState('mine'); // 'mine' | 'couple'

  const activeData = viewMode === 'mine' ? currentProfileData : spouseProfileData;
  const activeName = viewMode === 'mine' ? currentProfileName : spouseProfileName;
  const activeEmoji = viewMode === 'mine' ? currentProfileEmoji : spouseProfileEmoji;

  const flashcards = activeData?.flashcards || [];

  // Group flashcards by SRS Box (Level 1 to 5)
  const boxCounts = {
    1: flashcards.filter(c => (c.box || 1) === 1).length,
    2: flashcards.filter(c => c.box === 2).length,
    3: flashcards.filter(c => c.box === 3).length,
    4: flashcards.filter(c => c.box === 4).length,
    5: flashcards.filter(c => c.box === 5).length,
  };

  const totalWords = flashcards.length;
  const masteredWords = boxCounts[4] + boxCounts[5];
  const learningWords = boxCounts[1] + boxCounts[2] + boxCounts[3];

  // Calculate study days in last 28 days
  const today = new Date();
  const past28Days = [];
  for (let i = 27; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const studied = activeData?.studyHistory?.some(h => h.date === dateStr);
    past28Days.push({
      dateStr,
      dayNum: d.getDate(),
      dayOfWeek: d.toLocaleDateString('pt-BR', { weekday: 'narrow' }),
      studied
    });
  }

  // Calculate estimated total study minutes
  const totalMinutes = (activeData?.studyHistory || []).reduce((acc, curr) => acc + (curr.minutes || 0), 0);

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span className="badge badge-emerald">
              <TrendingUp size={13} />
              Fluency Analytics
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Acompanhamento de Metas
            </span>
          </div>
          <h1 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.35rem' }}>
            Área de Progresso & Crescimento
          </h1>
          <p style={{ fontSize: '0.96rem', color: 'var(--color-text-muted)' }}>
            Veja a evolução das palavras memorizadas, dias de estudo e domínio do inglês bíblico e cotidiano.
          </p>
        </div>

        {/* Toggle View: Mine vs Spouse */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--border-radius-full)',
          padding: '0.3rem',
          display: 'flex',
          gap: '0.3rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <button
            onClick={() => setViewMode('mine')}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: 'var(--border-radius-full)',
              fontSize: '0.86rem',
              fontWeight: 700,
              background: viewMode === 'mine' ? 'var(--color-primary)' : 'transparent',
              color: viewMode === 'mine' ? '#fff' : 'var(--color-text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <span>{currentProfileEmoji}</span>
            <span>{currentProfileName}</span>
          </button>
          <button
            onClick={() => setViewMode('couple')}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: 'var(--border-radius-full)',
              fontSize: '0.86rem',
              fontWeight: 700,
              background: viewMode === 'couple' ? 'var(--color-gold)' : 'transparent',
              color: viewMode === 'couple' ? '#fff' : 'var(--color-text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <span>{spouseProfileEmoji}</span>
            <span>{spouseProfileName}</span>
          </button>
        </div>
      </div>

      {/* 4 Big Numbers KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
        {/* Streak */}
        <div className="card" style={{ borderLeft: '4px solid var(--color-gold)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
              Ofensiva Atual
            </span>
            <span style={{ background: 'var(--color-gold-light)', color: 'var(--color-gold)', padding: '0.35rem', borderRadius: '50%' }}>
              <Flame size={18} fill="currentColor" />
            </span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-gold)', lineHeight: 1 }}>
            {activeData?.streak || 0} dias
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>
            Meta semanal: 5 de 7 dias mantidos
          </div>
        </div>

        {/* Words in deck */}
        <div className="card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
              Palavras no Baralho
            </span>
            <span style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '0.35rem', borderRadius: '50%' }}>
              <Layers size={18} />
            </span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}>
            {totalWords} palavras
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>
            {masteredWords} memorizadas com firmeza
          </div>
        </div>

        {/* Devotionals Completed */}
        <div className="card" style={{ borderLeft: '4px solid var(--color-emerald)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
              Devocionais Lidos
            </span>
            <span style={{ background: 'var(--color-emerald-light)', color: 'var(--color-emerald)', padding: '0.35rem', borderRadius: '50%' }}>
              <BookOpen size={18} />
            </span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-emerald)', lineHeight: 1 }}>
            {activeData?.completedDevotionals?.length || 0} lições
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>
            {activeData?.memorizedVerses?.length || 0} versículos gravados
          </div>
        </div>

        {/* Study Time */}
        <div className="card" style={{ borderLeft: '4px solid var(--color-rose)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
              Tempo Praticado
            </span>
            <span style={{ background: 'var(--color-rose-light)', color: 'var(--color-rose)', padding: '0.35rem', borderRadius: '50%' }}>
              <Clock size={18} />
            </span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-rose)', lineHeight: 1 }}>
            ~{totalMinutes} min
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>
            {activeData?.points || 0} pontos acumulados
          </div>
        </div>
      </div>

      {/* Study Frequency Calendar Heatmap (Last 28 Days) */}
      <div className="card" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} color="var(--color-gold)" />
              Frequência de Estudo nos Últimos 28 Dias ({activeName})
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              Cada bloquinho dourado representa um dia de oração, escuta ou revisão de inglês.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', display: 'inline-block' }} />
            <span>Descanso</span>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--color-gold)', display: 'inline-block' }} />
            <span>Estudou</span>
          </div>
        </div>

        {/* 28 Days Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(14, 1fr)',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem'
        }}>
          {past28Days.map((d, idx) => (
            <div
              key={idx}
              title={`${d.dateStr}: ${d.studied ? 'Estudo Concluído! ✨' : 'Sem registro'}`}
              style={{
                aspectRatio: '1',
                borderRadius: 'var(--border-radius-sm)',
                background: d.studied 
                  ? 'linear-gradient(135deg, #b45309 0%, #f59e0b 100%)' 
                  : 'var(--bg-app)',
                border: d.studied ? 'none' : '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: d.studied ? '#ffffff' : 'var(--color-text-muted)',
                fontWeight: 700,
                fontSize: '0.75rem',
                boxShadow: d.studied ? '0 2px 6px rgba(180, 83, 9, 0.25)' : 'none',
                minWidth: '32px'
              }}
            >
              <span style={{ fontSize: '0.62rem', opacity: 0.8 }}>{d.dayOfWeek}</span>
              <span>{d.dayNum}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SRS Leitner Box Distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Leitner Boxes Progress Bar */}
        <div className="card">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.35rem' }}>
            Distribuição de Memorização (SRS)
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
            Palavras avançam do Nível 1 até a memória de longo prazo (Nível 5).
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { level: 1, label: 'Nível 1 (Aprendendo agora)', count: boxCounts[1], color: '#f43f5e' },
              { level: 2, label: 'Nível 2 (Revisão 1-2 dias)', count: boxCounts[2], color: '#f59e0b' },
              { level: 3, label: 'Nível 3 (Consolidando 3-4 dias)', count: boxCounts[3], color: '#6366f1' },
              { level: 4, label: 'Nível 4 (Quase Dominada 7 dias)', count: boxCounts[4], color: '#3b82f6' },
              { level: 5, label: 'Nível 5 (Dominada / Memória Permanente)', count: boxCounts[5], color: '#10b981' }
            ].map((box) => {
              const pct = totalWords > 0 ? Math.round((box.count / totalWords) * 100) : 0;
              return (
                <div key={box.level}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    <span>{box.label}</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>{box.count} ({pct}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--bg-app)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: box.color, borderRadius: '999px', transition: 'width 0.4s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills Radar / Breakdown */}
        <div className="card">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.35rem' }}>
            Habilidades Linguísticas & Espirituais
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
            Equilíbrio entre leitura, escuta, vocabulário e oração em inglês.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <BookOpen size={15} color="var(--color-primary)" /> Leitura Bíblica (Scripture Reading)
                </span>
                <span style={{ color: 'var(--color-primary)' }}>85%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--bg-app)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, #312e81, #6366f1)', borderRadius: '999px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Volume2 size={15} color="var(--color-gold)" /> Compreensão Auditiva (Listening & Worship)
                </span>
                <span style={{ color: 'var(--color-gold)' }}>75%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--bg-app)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: '75%', height: '100%', background: 'linear-gradient(90deg, #b45309, #f59e0b)', borderRadius: '999px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Layers size={15} color="var(--color-emerald)" /> Vocabulário Ativo (Flashcards)
                </span>
                <span style={{ color: 'var(--color-emerald)' }}>68%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--bg-app)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: '68%', height: '100%', background: 'linear-gradient(90deg, #059669, #10b981)', borderRadius: '999px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Heart size={15} color="var(--color-rose)" fill="currentColor" /> Prática em Casal & Oração
                </span>
                <span style={{ color: 'var(--color-rose)' }}>92%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--bg-app)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg, #e11d48, #f43f5e)', borderRadius: '999px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
