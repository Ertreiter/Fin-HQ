import { Header, Hero, Features, Pricing, CTA, Footer } from '@/components/landing';

/**
 * Landing Page
 * 
 * PERFORMANCE OPTIMIZATIONS:
 * - Server Component by default
 * - Client components only where needed (Header, Hero animations)
 * - Lazy loading with useInView for below-fold content
 * - Minimal JS bundle for initial load
 */
export default function LandingPage() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <Features />
                <Pricing />
                <CTA />
            </main>
            <Footer />
        </>
    );
}
