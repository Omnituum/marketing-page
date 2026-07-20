import { useEffect, useRef, useState } from 'react';

const CIPHER_GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

interface DecodeTextProps {
  text: string;
  /** Delay before decoding starts, in ms */
  delay?: number;
  /** Total decode duration, in ms */
  duration?: number;
  className?: string;
}

/**
 * Renders text that resolves left-to-right out of ciphertext glyphs.
 * Respects prefers-reduced-motion by rendering the plain text immediately.
 */
export function DecodeText({ text, delay = 350, duration = 1100, className }: DecodeTextProps) {
  const [display, setDisplay] = useState(text);
  const [done, setDone] = useState(true);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    setDone(false);
    let start: number | null = null;

    const scramble = (resolved: number) =>
      text
        .split('')
        .map((ch, i) => {
          if (i < resolved || ch === ' ') return ch;
          return CIPHER_GLYPHS[Math.floor(Math.random() * CIPHER_GLYPHS.length)];
        })
        .join('');

    const tick = (now: number) => {
      if (start === null) start = now + delay;
      const elapsed = now - start;

      if (elapsed < 0) {
        setDisplay(scramble(0));
      } else if (elapsed < duration) {
        const resolved = Math.floor((elapsed / duration) * text.length);
        setDisplay(scramble(resolved));
      } else {
        setDisplay(text);
        setDone(true);
        return;
      }
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay, duration]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
      {!done && <span className="omni-decode-caret" style={{ height: '0.85em' }} aria-hidden="true" />}
    </span>
  );
}
