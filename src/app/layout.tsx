import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
// @ts-expect-error Next.js handles global CSS imports at build time.
import './globals.css';

import { FilterButtonProvider } from '@/contexts/useFilterButtonContext';
import { FavoriteCardsProvider } from '@/contexts/useFavoriteCardsContext';
import { CategoryModalProvider } from '@/contexts/useCategoryModalContext';
import { CategoryProvider } from '@/contexts/useCategoryContext';
import { Toaster } from 'sonner';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    default: 'Linkrary',
    template: '%s | Linkrary',
  },
  description:
    'Linkrary is the ultimate resource hub, bringing together a curated selection of the best web tools, design inspiration, development utilities, and more.',
  alternates: { canonical: 'https://aibiansari.github.io/Linkrary/' },
  openGraph: {
    title: 'Linkrary',
    url: 'https://aibiansari.github.io/Linkrary/',
    siteName: 'Linkrary',
    type: 'website',
    images: ['https://aibiansari.github.io/Linkrary/logo.svg'],
  },
  authors: [{ name: 'Abdullah Ansari' }],
  keywords: [
    'linkrary',
    'curator app',
    'utilities collection',
    'graphic design',
    'graphics',
    'web design',
    'web development tools',
    'web design tools',
    'web utilities',
    'web resources',
    'web inspiration',
    'web design curation',
    'web design aggregator',
    'music tools',
    'video tools',
    'design tools',
    'download resources',
    'free movies',
    'image editing tools',
    'image utilities',
    'ai resources',
    'ai tools',
    'free games',
    'game resources',
    'font resources',
    'svg icons',
    'file converters',
    'useful websites',
    'streaming services',
    'free resources',
    'free stock images',
    'pdf utilities',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CategoryProvider>
      <FilterButtonProvider>
        <FavoriteCardsProvider>
          <CategoryModalProvider>
            <html lang="en" suppressHydrationWarning>
              <body className={`${raleway.className} antialiased`}>
                <Toaster
                  toastOptions={{
                    style: {
                      background: '#e5e5e5',
                      padding: '12px',
                      paddingLeft: '24px',
                    },
                  }}
                />
                <ThemeProvider
                  themes={['light', 'dark', 'system']}
                  defaultTheme="system"
                  attribute="class"
                >
                  <main>{children}</main>
                </ThemeProvider>
              </body>
            </html>
          </CategoryModalProvider>
        </FavoriteCardsProvider>
      </FilterButtonProvider>
    </CategoryProvider>
  );
}
