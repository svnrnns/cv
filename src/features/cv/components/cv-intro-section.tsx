import { Github, Linkedin } from 'lucide-react';
import { CopyTextButton } from '@/components/copy-text-button';
import type { TranslateFunction } from '@/lib/i18n/types';

interface CvIntroSectionProps {
  t: TranslateFunction;
}

export function CvIntroSection({ t }: CvIntroSectionProps) {
  return (
    <section className="w-full page-block-raw flex flex-col gap-8">
      <h1>{t('intro.name')}</h1>

      <div className="flex flex-col gap-3">
        <h2 className="massive-text font-light text-font leading-snug">
          {t('intro.headline1')}
        </h2>
        <p className="massive-text font-light text-detail leading-snug">
          {t('intro.headline2')}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <CopyTextButton
          displayText={t('intro.copyEmail') as string}
          copy="svnrnns@gmail.com"
        />
        <a
          className="icon-btn bg-module"
          href="https://www.linkedin.com/in/svnrnns/"
        >
          <Linkedin className="size-4 sm:size-4.5 text-heading" />
        </a>
        <a
          className="icon-btn bg-module"
          href="https://www.github.com/svnrnns/"
        >
          <Github className="size-4 sm:size-4.5 text-heading" />
        </a>
      </div>
    </section>
  );
}
