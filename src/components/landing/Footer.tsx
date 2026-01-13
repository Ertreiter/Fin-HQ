import Link from 'next/link';

/**
 * Footer Component
 * 
 * PERFORMANCE:
 * - Server Component (no 'use client')
 * - Static content for fast rendering
 */

const footerLinks = {
    product: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Security', href: '#security' },
        { label: 'Roadmap', href: '#roadmap' },
    ],
    company: [
        { label: 'About', href: '#about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
    ],
    resources: [
        { label: 'Documentation', href: '/docs' },
        { label: 'API Reference', href: '/api' },
        { label: 'Help Center', href: '/help' },
        { label: 'Status', href: '/status' },
    ],
    legal: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
    ],
};

export default function Footer() {
    return (
        <footer style={{
            background: 'var(--color-neutral-900)',
            color: 'var(--color-neutral-300)',
            padding: 'var(--space-16) 0 var(--space-8)',
        }}>
            <div className="container">
                {/* Main Footer Content */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8" style={{ marginBottom: 'var(--space-12)' }}>
                    {/* Brand Column */}
                    <div style={{ gridColumn: 'span 2' }}>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                            <div style={{
                                width: 40,
                                height: 40,
                                background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600))',
                                borderRadius: 'var(--radius-lg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '1.25rem',
                            }}>
                                A
                            </div>
                            <span style={{ fontWeight: 600, fontSize: '1.25rem', color: 'white' }}>
                                AdminForAll
                            </span>
                        </Link>
                        <p style={{
                            fontSize: '0.9375rem',
                            lineHeight: 1.7,
                            maxWidth: '300px',
                            marginBottom: 'var(--space-6)',
                        }}>
                            Industrial-grade administration and finance platform trusted by thousands of businesses worldwide.
                        </p>

                        {/* Social Links */}
                        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                            {['twitter', 'linkedin', 'github'].map((social) => (
                                <a
                                    key={social}
                                    href={`https://${social}.com`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        width: 40,
                                        height: 40,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'var(--color-neutral-800)',
                                        borderRadius: 'var(--radius-md)',
                                        color: 'var(--color-neutral-400)',
                                        transition: 'all var(--transition-fast)',
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        {social === 'twitter' && <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />}
                                        {social === 'linkedin' && <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />}
                                        {social === 'github' && <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />}
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    <div>
                        <h4 style={{ color: 'white', fontWeight: 600, marginBottom: 'var(--space-4)', fontSize: '0.9375rem' }}>Product</h4>
                        <ul style={{ listStyle: 'none' }}>
                            {footerLinks.product.map((link) => (
                                <li key={link.label} style={{ marginBottom: 'var(--space-3)' }}>
                                    <Link href={link.href} style={{ fontSize: '0.875rem', color: 'inherit' }}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ color: 'white', fontWeight: 600, marginBottom: 'var(--space-4)', fontSize: '0.9375rem' }}>Company</h4>
                        <ul style={{ listStyle: 'none' }}>
                            {footerLinks.company.map((link) => (
                                <li key={link.label} style={{ marginBottom: 'var(--space-3)' }}>
                                    <Link href={link.href} style={{ fontSize: '0.875rem', color: 'inherit' }}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ color: 'white', fontWeight: 600, marginBottom: 'var(--space-4)', fontSize: '0.9375rem' }}>Resources</h4>
                        <ul style={{ listStyle: 'none' }}>
                            {footerLinks.resources.map((link) => (
                                <li key={link.label} style={{ marginBottom: 'var(--space-3)' }}>
                                    <Link href={link.href} style={{ fontSize: '0.875rem', color: 'inherit' }}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    paddingTop: 'var(--space-8)',
                    borderTop: '1px solid var(--color-neutral-800)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--space-4)',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-neutral-500)' }}>
                        © {new Date().getFullYear()} AdminForAll. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
                        {footerLinks.legal.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                style={{ fontSize: '0.875rem', color: 'var(--color-neutral-500)' }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
