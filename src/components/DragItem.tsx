import React, { useEffect, useRef } from 'react';
import './DragItem.css';

let highestZ = 1000;

interface Props {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const DragItem: React.FC<Props> = ({ className = '', children, style }) => {
  const elRef = useRef<HTMLDivElement | null>(null);

  const holding = useRef(false);
  const rotating = useRef(false);
  const mouseTouchX = useRef(0);
  const mouseTouchY = useRef(0);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const prevMouseX = useRef(0);
  const prevMouseY = useRef(0);
  const velX = useRef(0);
  const velY = useRef(0);
  const rotation = useRef(Math.random() * 30 - 15);
  const currentPaperX = useRef(0);
  const currentPaperY = useRef(0);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const providedLeft = style && (style as any).left != null;
    const providedTop = style && (style as any).top != null;
    currentPaperX.current = 0;
    currentPaperY.current = 0;
    el.style.transform = `translateX(0px) translateY(0px) rotateZ(${rotation.current}deg)`;

    const preventContext = (ev: Event) => ev.preventDefault();
    el.addEventListener('contextmenu', preventContext);

    const handlePointerMove = (e: PointerEvent) => {
      if (!el) return;
      if (!rotating.current) {
        mouseX.current = e.clientX;
        mouseY.current = e.clientY;

        velX.current = mouseX.current - prevMouseX.current;
        velY.current = mouseY.current - prevMouseY.current;
      }

      const dirX = e.clientX - mouseTouchX.current;
      const dirY = e.clientY - mouseTouchY.current;
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      let degrees = Math.atan2(dirNormalizedY, dirNormalizedX) * 180 / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      if (rotating.current) {
        rotation.current = degrees;
      }

      if (holding.current) {
        if (!rotating.current) {
          currentPaperX.current += velX.current;
          currentPaperY.current += velY.current;
        }
        prevMouseX.current = mouseX.current;
        prevMouseY.current = mouseY.current;

        el.style.transform = `translateX(${currentPaperX.current}px) translateY(${currentPaperY.current}px) rotateZ(${rotation.current}deg)`;
      }
    };

    const handlePointerUp = () => {
      holding.current = false;
      rotating.current = false;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      el.removeEventListener('contextmenu', preventContext);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    const el = elRef.current;
    if (!el) return;
    if (holding.current) return;
    holding.current = true;

    el.style.zIndex = String(++highestZ);

    if (e.button === 0) {
      mouseTouchX.current = e.clientX;
      mouseTouchY.current = e.clientY;
      prevMouseX.current = e.clientX;
      prevMouseY.current = e.clientY;
    }
    if (e.button === 2) {
      rotating.current = true;
    }
    try { (e.target as Element).setPointerCapture?.(e.pointerId); } catch {}
  };

  return (
    <div
      ref={elRef}
      className={`drag-item ${className}`}
      onPointerDown={handlePointerDown}
      style={{ touchAction: 'none', ...style }}
    >
      {children}
    </div>
  );
};

export default DragItem;
