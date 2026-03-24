import React from 'react';
import { saqReferenceCards } from './saqReferenceData';

type Props = {
  searchValue: string;
};

function matches(cardText: string, query: string) {
  if (!query.trim()) return true;
  return cardText.toLowerCase().includes(query.trim().toLowerCase());
}

export function SaqReferencePage({ searchValue }: Props) {
  const visibleCards = saqReferenceCards.filter((card) =>
    matches(
      [card.type, card.title, card.appliesTo, card.scan, card.storage, card.keyNote].join(' '),
      searchValue,
    ),
  );

  return (
    <section className="bridge-page saq-page">
      <div className="section-header">
        <div>
          <div className="section-title">SAQ Type Reference</div>
          <div className="section-subtitle">
            Self-Assessment Questionnaire types — who they apply to, scan requirements, and key characteristics
          </div>
        </div>
      </div>

      <div className="info-note">
        <span className="icon">ℹ️</span>
        <span>
          SAQ type is determined during the Business Profile. Always read SAQ questions from your script — not from the screen.
          If the merchant has a Special Note, check the guidance link on the portal first.
        </span>
      </div>

      <div className="saq-grid">
        {visibleCards.map((card) => (
          <article className="saq-card" key={`${card.type}-${card.title}`}>
            <div className="saq-card-header">
              <span className="saq-type-tag" style={card.tagStyle}>{card.type}</span>
              <div className="saq-card-title">{card.title}</div>
            </div>
            <div className="saq-card-body">
              <div className="row"><div className="key">Applies to</div><div className="val">{card.appliesTo}</div></div>
              <div className="row"><div className="key">Scan</div><div className="val">{card.scan}</div></div>
              <div className="row"><div className="key">Storage</div><div className="val">{card.storage}</div></div>
              <div className="row"><div className="key">Key note</div><div className="val">{card.keyNote}</div></div>
            </div>
          </article>
        ))}
      </div>

      {visibleCards.length === 0 ? (
        <div className="bridge-empty-state">No SAQ reference cards match your current search.</div>
      ) : null}
    </section>
  );
}
