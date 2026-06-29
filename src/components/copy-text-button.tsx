'use client';

import { useEffect, useId, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/ui/cn';

interface CopyTextButtonProps {
  displayText: string;
  copy: string;
}

export function CopyTextButton({ displayText, copy }: CopyTextButtonProps) {
  const buttonId = useId();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const resetStates = () => {
    setCopied(false);
    setError(false);
    timeoutRef.current = null;
  };

  const copyEmail = async () => {
    if (copied || error) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    try {
      await navigator.clipboard.writeText(copy);

      const button = document.getElementById(buttonId);
      if (!button) return;

      const rect = button.getBoundingClientRect();
      confetti({
        particleCount: 100,
        angle: 90,
        spread: 55,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
      });

      setCopied(true);
    } catch (e) {
      setError(true);
      console.warn(e);
    } finally {
      timeoutRef.current = setTimeout(resetStates, 3000);
    }
  };

  return (
    <button
      id={buttonId}
      type="button"
      className={cn(
        'icon-btn large-text bg-heading text-body font-semibold !leading-none',
        copied && '!bg-success',
        error && '!bg-danger'
      )}
      onClick={copyEmail}
    >
      {displayText}
    </button>
  );
}
