import type { CvPositionEntry } from '@/features/cv/types';

export const CV_POSITIONS: CvPositionEntry[] = [
  {
    htmlId: 'lion',
    from: new Date(2025, 9, 1),
    to: new Date(2026, 4, 1),
    icon: {
      bg: '#0F0F3A',
      iconKey: 'lion',
    },
  },
  {
    htmlId: 'zeus',
    from: new Date(2023, 2, 1),
    to: new Date(2025, 9, 1),
    imageSrc: '/home/zeus.jpg',
    icon: {
      bg: '#f93f55',
      iconKey: 'zeus',
    },
  },
];
