import { useState, useRef, useEffect } from 'react';
import './LoveLetter.css';
import { letterContent } from '../data/text';
import { loveLetterText } from '../data/text';
import pinkFlowers from '../assets/pink_flowers.png';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const heartsRef = useRef<HTMLDivElement | null>(null);

  const prevOpenRef = useRef<boolean>(false);
  const MAX_GENERATED_HEARTS = 80;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen && !prevOpenRef.current) {
      generateHearts(3);
    }
    prevOpenRef.current = isOpen;
  }, [isOpen]);

  function generateHearts(count: number) {
    const container = heartsRef.current;
    if (!container) return;
    const existingGenerated = container.querySelectorAll('.heart.generated').length;
    if (existingGenerated >= MAX_GENERATED_HEARTS) return;
    const allowed = Math.min(count, MAX_GENERATED_HEARTS - existingGenerated);
    const rect = container.getBoundingClientRect();
    const containerWidth = rect.width || 280;
    const HEART_SAFETY = 20;
    for (let i = 0; i < allowed; i++) {
      const el = document.createElement('div');
      el.className = 'heart generated';

      const minX = containerWidth * 0.1;
      const maxX = containerWidth * 0.5;
      let initPx = minX + Math.random() * (maxX - minX);

      const maxSwayLeft = initPx - HEART_SAFETY;
      const maxSwayRight = containerWidth - initPx - HEART_SAFETY;
      const maxSwayAllowed = Math.max(5, Math.min(20, Math.min(maxSwayLeft, maxSwayRight)));

      const sway = ((Math.random() * 2 - 1) * maxSwayAllowed).toFixed(1) + 'px';
      el.style.setProperty('--sway-distance', sway);

      el.style.left = `${Math.round(initPx)}px`;

      const scale = (0.5 + Math.random() * 0.5).toFixed(2);
      el.style.setProperty('--scale', scale);

      const upDur = (3 + Math.random() * 4).toFixed(2);
      const swayDur = (2 + Math.random() * 4).toFixed(2);
      el.style.animation = `slideUp ${upDur}s linear 1, sideSway ${swayDur}s ease-in-out infinite alternate`;
      el.style.bottom = '0px';
      el.addEventListener('animationend', (ev) => {
        if ((ev as AnimationEvent).animationName === 'slideUp') {
          el.remove();
        }
      });
      container.appendChild(el);
    }
  }

  const handleEnvelopeClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="love-letter-container">
      <div className="envelope-wrapper">
        <div 
          id="envelope" 
          className={isOpen ? 'open' : 'close'}
          onClick={handleEnvelopeClick}
          onTouchStart={handleEnvelopeClick}
        >
          <div className="click-here">{isMobile ? 'Swipe me!' : loveLetterText.clickMe}</div>
          <div className="front flap"></div>
          <div className="front pocket"></div>
          <div className="letter">
            <div className="letter-content">
              <div className="words line1">To: {letterContent.to}</div>
              <div className="body-lines">
                {letterContent.lines.map((line, index) => (
                  <div key={index} className="words">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="hearts" ref={heartsRef}></div>
        </div>
      <img src={pinkFlowers} alt={loveLetterText.pinkFlowersAlt} className="pink-flowers" />
      </div>
    </div>
  );
}