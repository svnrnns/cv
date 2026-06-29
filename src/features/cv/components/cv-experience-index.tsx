import { IconWithBackground } from '@/components/icon-with-background';
import { TextRightArrow } from '@/components/text-right-arrow';
import { CV_POSITIONS } from '@/features/cv/constants/cv-positions';
import type { TranslateFunction } from '@/lib/i18n/types';

interface CvExperienceIndexProps {
  t: TranslateFunction;
}

export function CvExperienceIndex({ t }: CvExperienceIndexProps) {
  return (
    <div className="w-full page-block-padding-children">
      <div className="w-full flex flex-col gap-4">
        <span className="child tiny-text text-detail">
          {t('experience.title')}
        </span>
        {CV_POSITIONS.map((position) => (
          <a
            key={position.htmlId}
            className="child-full relative cursor-pointer rounded-lg hover:bg-box transition-all duration-500 group"
            href={`#${position.htmlId}`}
          >
            <TextRightArrow
              text={t(`positions.${position.htmlId}.title`) as string}
            />
            <IconWithBackground
              iconKey={position.icon.iconKey}
              bg={position.icon.bg}
              className="absolute top-0 -translate-y-1/4 right-0 translate-x-1/4 rotate-5 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
