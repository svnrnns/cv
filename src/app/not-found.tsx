import Link from 'next/link';
import { bindServerI18n, getServerLocale } from '@/lib/i18n/server';
import { localizedHref } from '@/lib/i18n/routing';

export default async function NotFound() {
  const t = await bindServerI18n();
  const locale = await getServerLocale();

  return (
    <div className="flex-col-center gap-6 w-full page">
      <h1>{t('notFound.title')}</h1>
      <p className="text-detail medium-text">{t('notFound.description')}</p>
      <Link
        href={localizedHref('/', locale)}
        className="text-btn bg-module text-heading large-text"
      >
        {t('notFound.backHome')}
      </Link>
    </div>
  );
}
