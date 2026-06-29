import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import { JumpToTopButton } from '@/components/jump-to-top-button';
import { LocaleSwitcherButton } from '@/components/locale-switcher-button';
import { PageProviders } from '@/components/providers/page-providers';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeSwitcherButton } from '@/components/theme-switcher-button';
import { initServerI18n } from '@/lib/i18n/server';
import '@/styles/main.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'seven rings',
  description: 'Miguel Montesinos portfolio',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await initServerI18n();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
    >
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <ThemeProvider>
          <PageProviders
            key={locale}
            locale={locale}
          >
            <main className="px-[7.5%] py-[10%] sm:px-0 sm:py-0 mx-auto sm:my-56 flex flex-col gap-24">
              <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3">
                <LocaleSwitcherButton />
                <ThemeSwitcherButton />
                <JumpToTopButton />
              </div>
              {children}
            </main>
          </PageProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
