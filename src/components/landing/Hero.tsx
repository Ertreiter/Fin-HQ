'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Hero Section
 * 
 * PERFORMANCE:
 * - CSS animations over JS when possible
 * - Lazy-loaded background effects
 * - Optimized gradient rendering
 */

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
};

export default function Hero() {
    return (
        <section
            style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                paddingTop: 'var(--space-20)',
                paddingBottom: 'var(--space-16)',
            }}
        >
            {/* Animated Background */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
                    zIndex: 0,
                }}
            >
                {/* Gradient Orbs */}
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    animation: 'float 8s ease-in-out infinite',
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '15%',
                    width: '350px',
                    height: '350px',
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    animation: 'float 10s ease-in-out infinite reverse',
                }} />
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    right: '30%',
                    width: '250px',
                    height: '250px',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    animation: 'float 12s ease-in-out infinite',
                }} />

                {/* Grid Pattern Overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                }} />
            </div>

            {/* Content */}
            <motion.div
                className="container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center',
                    maxWidth: '900px',
                }}
            >
                {/* Badge */}
                <motion.div variants={itemVariants}>
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        padding: 'var(--space-2) var(--space-4)',
                        background: 'rgba(59, 130, 246, 0.15)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: 'var(--radius-full)',
                        color: 'var(--color-primary-300)',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                    }}>
                        <span style={{
                            width: 8,
                            height: 8,
                            background: 'var(--color-secondary-400)',
                            borderRadius: '50%',
                            animation: 'pulse 2s infinite',
                        }} />
                        Enterprise-Grade Security
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    variants={itemVariants}
                    style={{
                        marginTop: 'var(--space-6)',
                        color: 'white',
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        fontWeight: 700,
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                    }}
                >
                    Administration &{' '}
                    <span style={{
                        background: 'linear-gradient(135deg, var(--color-primary-400), var(--color-secondary-400))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                        Finance
                    </span>
                    <br />Made Simple
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    variants={itemVariants}
                    style={{
                        marginTop: 'var(--space-6)',
                        fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                        color: 'var(--color-neutral-300)',
                        maxWidth: '650px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        lineHeight: 1.7,
                    }}
                >
                    Industrial-level security combined with intuitive design. Manage your team,
                    track finances, and make data-driven decisions—all from one powerful dashboard.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        marginTop: 'var(--space-10)',
                        display: 'flex',
                        gap: 'var(--space-4)',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    <Link
                        href="/register"
                        className="btn btn-primary btn-lg"
                        style={{
                            background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600))',
                            boxShadow: '0 4px 30px rgba(59, 130, 246, 0.4)',
                        }}
                    >
                        Start Free Trial
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <Link
                        href="#demo"
                        className="btn btn-lg"
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            color: 'white',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(8px)',
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        Watch Demo
                    </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        marginTop: 'var(--space-16)',
                        display: 'flex',
                        gap: 'var(--space-12)',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    {[
                        { value: '10K+', label: 'Companies' },
                        { value: '99.9%', label: 'Uptime' },
                        { value: '$2B+', label: 'Processed' },
                    ].map((stat) => (
                        <div key={stat.label} style={{ textAlign: 'center' }}>
                            <div style={{
                                fontSize: '2.5rem',
                                fontWeight: 700,
                                color: 'white',
                                lineHeight: 1,
                            }}>
                                {stat.value}
                            </div>
                            <div style={{
                                marginTop: 'var(--space-2)',
                                fontSize: '0.875rem',
                                color: 'var(--color-neutral-400)',
                            }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* CSS Keyframes */}
            <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
      `}</style>
        </section>
    );
}
