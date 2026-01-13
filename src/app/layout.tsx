import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';

/**
 * Root Layout
 * 
 * PERFORMANCE OPTIMIZATIONS:
 * 1. Inter font loaded via next/font for zero FOUT
 * 2. Metadata configured for SEO
 * 3. Viewport optimized for mobile
 */

export const metadata: Metadata = {
    title: {
        default: 'AdminForAll - Enterprise Administration Platform',
        template: '%s | AdminForAll',
    },
    description: 'Industrial-grade administration and finance platform with enterprise security, multi-level authentication, and real-time analytics.',
    keywords: ['admin', 'dashboard', 'finance', 'enterprise', 'management', 'analytics'],
    authors: [{ name: 'AdminForAll Team' }],
    robots: 'index, follow',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        siteName: 'AdminForAll',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* PERFORMANCE: Preconnect to Supabase */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                {/* Inter font - optimized loading */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
