'use client';

import { useEffect, useState } from 'react';

export function useStickyTitle(htmlId: string) {
  const [isTitleSticky, setIsTitleSticky] = useState(false);

  useEffect(() => {
    const titleElement = document.getElementById(htmlId);
    if (!titleElement) return;

    const checkIfTitleIsSticky = () => {
      const rect = titleElement.getBoundingClientRect();
      setIsTitleSticky(rect.y <= 0);
    };

    window.addEventListener('scroll', checkIfTitleIsSticky);
    return () => window.removeEventListener('scroll', checkIfTitleIsSticky);
  }, [htmlId]);

  return isTitleSticky;
}
