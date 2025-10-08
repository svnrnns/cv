import { useLayoutEffect, useState } from 'react';

export default function useIsMounted(delay = 0) {
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, delay);
  }, [delay]);

  return isMounted;
}
