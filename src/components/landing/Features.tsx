'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Features Section
 * 
 * PERFORMANCE:
 * - Lazy animations with useInView
 * - GPU-accelerated transforms
 */

const features = [
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        title: 'Enterprise Security',
        description: 'Bank-grade encryption, 2FA authentication, and role-based access control to protect your data.',
        color: 'var(--color-primary-500)',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
        title: 'Financial Dashboard',
        description: 'Track revenue, expenses, and budgets with real-time charts and comprehensive reports.',
        color: 'var(--color-secondary-500)',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        title: 'Team Management',
        description: 'Organize users by departments, assign roles, and manage permissions at every level.',
        color: '#8b5cf6',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                <path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z" />
            </svg>
        ),
        title: 'Invoice & Billing',
        description: 'Create professional invoices, track payments, and automate billing workflows.',
        color: '#f59e0b',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" />
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
        ),
        title: 'Analytics & Reports',
        description: 'Gain insights with executive dashboards, KPIs, and customizable reports.',
        color: '#ec4899',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        title: 'Real-Time Updates',
        description: 'Live data synchronization ensures everyone sees the latest information instantly.',
        color: '#06b6d4',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
};

export default function Features() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section
            id="features"
            ref={ref}
            style={{
                padding: 'var(--space-24) 0',
                background: 'var(--bg-primary)',
            }}
        >
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}
                >
                    <span style={{
                        display: 'inline-block',
                        padding: 'var(--space-2) var(--space-4)',
                        background: 'var(--color-primary-100)',
                        color: 'var(--color-primary-600)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        marginBottom: 'var(--space-4)',
                    }}>
                        FEATURES
                    </span>
                    <h2 style={{ marginBottom: 'var(--space-4)' }}>
                        Everything You Need to Succeed
                    </h2>
                    <p style={{
                        fontSize: '1.125rem',
                        color: 'var(--text-secondary)',
                        maxWidth: '600px',
                        margin: '0 auto',
                    }}>
                        Powerful tools designed for modern businesses. From security to analytics,
                        we&apos;ve got you covered.
                    </p>
                </motion.div>

                {/* Feature Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            variants={cardVariants}
                            style={{
                                padding: 'var(--space-8)',
                                background: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-xl)',
                                border: '1px solid var(--border-color)',
                                transition: 'all var(--transition-base)',
                                cursor: 'pointer',
                            }}
                            whileHover={{
                                y: -8,
                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                                borderColor: feature.color,
                            }}
                        >
                            {/* Icon */}
                            <div style={{
                                width: 56,
                                height: 56,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: `${feature.color}15`,
                                color: feature.color,
                                borderRadius: 'var(--radius-lg)',
                                marginBottom: 'var(--space-5)',
                            }}>
                                {feature.icon}
                            </div>

                            {/* Title */}
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 600,
                                marginBottom: 'var(--space-3)',
                            }}>
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p style={{
                                color: 'var(--text-secondary)',
                                lineHeight: 1.6,
                            }}>
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
