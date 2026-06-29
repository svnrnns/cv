import { CvExperienceIndex } from '@/features/cv/components/cv-experience-index';
import { CvIntroSection } from '@/features/cv/components/cv-intro-section';
import { CvPositionSection } from '@/features/cv/components/cv-position-section';
import { CV_POSITIONS } from '@/features/cv/constants/cv-positions';
import { bindServerI18n, getServerLocale } from '@/lib/i18n/server';

export async function CvPage() {
  const t = await bindServerI18n();
  const locale = await getServerLocale();

  return (
    <div className="flex-col-center gap-24 sm:gap-40 w-full page fade-in-blur">
      <CvIntroSection t={t} />
      <CvExperienceIndex t={t} />
      <div className="w-full flex flex-col gap-24 sm:gap-0">
        {CV_POSITIONS.map((entry, index) => (
          <CvPositionSection
            key={entry.htmlId}
            entry={entry}
            isLast={index === CV_POSITIONS.length - 1}
            locale={locale}
            t={t}
          />
        ))}
      </div>
      <span className="text-detail tiny-text w-full page-block-raw">
        {t('footer.copyright')}
      </span>
    </div>
  );
}
