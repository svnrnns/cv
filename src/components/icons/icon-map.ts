import type { ComponentType, SVGProps } from 'react';
import { IconLion } from '@/components/icons/icon-lion';
import { IconZeus } from '@/components/icons/icon-zeus';

export const iconMap = {
  lion: IconLion,
  zeus: IconZeus,
} as const satisfies Record<string, ComponentType<SVGProps<SVGSVGElement>>>;

export type IconKey = keyof typeof iconMap;
