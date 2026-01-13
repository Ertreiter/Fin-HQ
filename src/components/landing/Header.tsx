'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * Header Component - Landing Page
 * 
 * PERFORMANCE:
 * - Sticky header with backdrop blur
 * - Minimal re-renders with useState
 */
export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`header ${isScrolled ? 'header--scrolled' : ''}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: 'var(--space-4) 0',
                transition: 'all var(--transition-base)',
                background: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(12px)' : 'none',
                borderBottom: isScrolled ? '1px solid var(--border-color)' : 'none',
            }}
        >
            <div className="container flex items-center justify-between">
                {/* Logo */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
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
                    <span style={{ fontWeight: 600, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                        AdminForAll
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="desktop-nav" style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'center' }}>
                    <Link href="#features" style={{ color: 'var(--text-secondary)', fontWeight: 500, transition: 'color var(--transition-fast)' }}>
                        Features
                    </Link>
                    <Link href="#pricing" style={{ color: 'var(--text-secondary)', fontWeight: 500, transition: 'color var(--transition-fast)' }}>
                        Pricing
                    </Link>
                    <Link href="#about" style={{ color: 'var(--text-secondary)', fontWeight: 500, transition: 'color var(--transition-fast)' }}>
                        About
                    </Link>
                    <Link href="/login" className="btn btn-ghost">Log In</Link>
                    <Link href="/register" className="btn btn-primary">Get Started</Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                    style={{
                        display: 'none',
                        padding: 'var(--space-2)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {isMobileMenuOpen ? (
                            <path d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div
                    className="mobile-menu"
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: 'var(--bg-secondary)',
                        borderBottom: '1px solid var(--border-color)',
                        padding: 'var(--space-4)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-4)',
                    }}
                >
                    <Link href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
                    <Link href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
                    <Link href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                    <Link href="/login" className="btn btn-secondary" onClick={() => setIsMobileMenuOpen(false)}>Log In</Link>
                    <Link href="/register" className="btn btn-primary" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
                </div>
            )}

            <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
        </header>
    );
}
