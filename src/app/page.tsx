import type { Metadata } from 'next';
import { CvPage } from '@/features/cv/pages/cv-page';
import { getAlternatePaths } from '@/lib/i18n/routing';
import { bindServerI18n, getServerLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await bindServerI18n();
  const locale = await getServerLocale();
  const alternates = getAlternatePaths('/');

  return {
    title: t('meta.title') as string,
    description: t('meta.description') as string,
    alternates: {
      canonical: alternates[locale],
      languages: alternates,
    },
  };
}

export default function HomePage() {
  return <CvPage />;
}
