import { ClerkProvider } from '@clerk/nextjs'; // This is the missing piece!
import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import { fontVariables } from '@/components/themes/font.config';
import { DEFAULT_THEME, THEMES } from '@/components/themes/theme.config';
import ThemeProvider from '@/components/themes/theme-provider';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'ARC | Economic Ecosystem',
  description: 'The Digital Harvard Operating System'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get('active_theme')?.value;
  const themeToApply = THEMES.some((t) => t.value === activeThemeValue) ? activeThemeValue! : DEFAULT_THEME;

  return (
    // ClerkProvider wraps everything to keep the "Economic Loop" secure
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning data-theme={themeToApply}>
        <body
          className={cn(
            'bg-black overflow-x-hidden overscroll-none font-sans antialiased selection:bg-amber-500',
            fontVariables
          )}
        >
          <NextTopLoader color='#f59e0b' showSpinner={false} />
          <NuqsAdapter>
            <ThemeProvider
              attribute='class'
              defaultTheme='dark' // Set to dark for that 4K Realism look
              enableSystem={false}
              disableTransitionOnChange
            >
              <Providers activeThemeValue={themeToApply}>
                <Toaster />
                {children}
              </Providers>
            </ThemeProvider>
          </NuqsAdapter>
        </body>
      </html>
    </ClerkProvider>
  );
}

