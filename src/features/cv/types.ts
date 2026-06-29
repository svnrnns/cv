export type HexColor = `#${string}`;

export interface CvIconConfig {
  bg: HexColor;
  iconKey: 'lion' | 'zeus';
}

export interface CvPositionEntry {
  htmlId: string;
  from: Date;
  to?: Date;
  imageSrc?: string;
  icon: CvIconConfig;
}
