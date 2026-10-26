import React, { useState } from 'react';
import { HelpCircle, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { useUser } from '../../context/UserContext';

export const DevotionalQuiz = ({ quizList = [], devotionalId }) => {
  const { triggerCelebration } = useUser();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [hasFinished, setHasFinished] = useState(false);

  if (!quizList || quizList.length === 0) return null;

  const handleSelectOption = (qIndex, optionIndex) => {
    if (selectedAnswers[qIndex] !== undefined) return; // Already answered

    const newAnswers = { ...selectedAnswers, [qIndex]: optionIndex };
    setSelectedAnswers(newAnswers);

    const isCorrect = optionIndex === quizList[qIndex].correctIndex;
    if (isCorrect && Object.keys(newAnswers).length === quizList.length) {
      triggerCelebration();
      setHasFinished(true);
    }
  };

  return (
    <div style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--border-radius-xl)',
      padding: '1.75rem',
      marginBottom: '1.75rem',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <span style={{ 
          background: 'var(--color-primary-light)', 
          color: 'var(--color-primary)', 
          padding: '0.4rem', 
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <HelpCircle size={18} />
        </span>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
            Check Your Understanding (Desafio Rápido)
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            Fixem o aprendizado do devocional e do vocabulário em inglês
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {quizList.map((q, qIdx) => {
          const userAnswer = selectedAnswers[qIdx];
          const isAnswered = userAnswer !== undefined;

          return (
            <div 
              key={qIdx} 
              style={{
                background: 'var(--bg-app)',
                borderRadius: 'var(--border-radius-md)',
                padding: '1.25rem',
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--color-text-main)', marginBottom: '0.35rem' }}>
                {qIdx + 1}. {q.question}
              </div>
              {q.questionEn && (
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontStyle: 'italic', marginBottom: '0.85rem' }}>
                  {q.questionEn}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {q.options.map((option, optIdx) => {
                  let optStyle = {
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--color-text-main)'
                  };

                  if (isAnswered) {
                    if (optIdx === q.correctIndex) {
                      optStyle = {
                        background: 'var(--color-emerald-light)',
                        border: '1px solid var(--color-emerald)',
                        color: 'var(--color-emerald)',
                        fontWeight: 700
                      };
                    } else if (userAnswer === optIdx) {
                      optStyle = {
                        background: 'var(--color-rose-light)',
                        border: '1px solid var(--color-rose)',
                        color: 'var(--color-rose)',
                        fontWeight: 600
                      };
                    } else {
                      optStyle = {
                        ...optStyle,
                        opacity: 0.5
                      };
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      style={{
                        ...optStyle,
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--border-radius-sm)',
                        textAlign: 'left',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: isAnswered ? 'default' : 'pointer'
                      }}
                    >
                      <span>{option}</span>
                      {isAnswered && optIdx === q.correctIndex && (
                        <CheckCircle size={17} color="var(--color-emerald)" />
                      )}
                      {isAnswered && userAnswer === optIdx && optIdx !== q.correctIndex && (
                        <AlertCircle size={17} color="var(--color-rose)" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation note */}
              {isAnswered && (
                <div style={{ 
                  marginTop: '0.85rem', 
                  padding: '0.75rem', 
                  borderRadius: 'var(--border-radius-sm)',
                  background: 'var(--bg-surface)',
                  fontSize: '0.84rem',
                  lineHeight: '1.45',
                  color: 'var(--color-text-muted)',
                  borderLeft: `3px solid ${userAnswer === q.correctIndex ? 'var(--color-emerald)' : 'var(--color-rose)'}`
                }}>
                  <strong>{userAnswer === q.correctIndex ? '✨ Muito bem!' : '💡 Dica de fixação:'}</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {hasFinished && (
        <div style={{
          marginTop: '1.25rem',
          padding: '1rem',
          borderRadius: 'var(--border-radius-md)',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
          border: '1px solid var(--color-emerald)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sparkles size={20} color="var(--color-emerald)" />
            <span style={{ fontWeight: 700, color: 'var(--color-emerald)', fontSize: '0.95rem' }}>
              Parabéns! Vocês completaram o desafio de compreensão do dia!
            </span>
          </div>
          <span className="badge badge-emerald">+25 Pontos</span>
        </div>
      )}
    </div>
  );
};
