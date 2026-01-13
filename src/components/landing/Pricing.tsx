'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';

/**
 * Pricing Section
 * 
 * PERFORMANCE:
 * - Minimal re-renders with useState
 * - Lazy animations with useInView
 */

const plans = [
    {
        name: 'Starter',
        description: 'Perfect for small teams getting started',
        price: { monthly: 29, yearly: 24 },
        features: [
            'Up to 5 users',
            'Basic financial tracking',
            'Email support',
            'Basic reports',
            '1GB storage',
        ],
        cta: 'Start Free Trial',
        highlighted: false,
    },
    {
        name: 'Professional',
        description: 'For growing businesses with advanced needs',
        price: { monthly: 79, yearly: 65 },
        features: [
            'Up to 25 users',
            'Full finance suite',
            'Priority support',
            'Advanced analytics',
            '10GB storage',
            '2FA authentication',
            'API access',
        ],
        cta: 'Start Free Trial',
        highlighted: true,
    },
    {
        name: 'Enterprise',
        description: 'Custom solutions for large organizations',
        price: { monthly: 199, yearly: 165 },
        features: [
            'Unlimited users',
            'Custom integrations',
            '24/7 dedicated support',
            'Executive dashboards',
            'Unlimited storage',
            'SSO & advanced security',
            'Custom training',
            'SLA guarantee',
        ],
        cta: 'Contact Sales',
        highlighted: false,
    },
];

export default function Pricing() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [isYearly, setIsYearly] = useState(false);

    return (
        <section
            id="pricing"
            ref={ref}
            style={{
                padding: 'var(--space-24) 0',
                background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-tertiary) 100%)',
            }}
        >
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
                >
                    <span style={{
                        display: 'inline-block',
                        padding: 'var(--space-2) var(--space-4)',
                        background: 'var(--color-secondary-100)',
                        color: 'var(--color-secondary-600)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        marginBottom: 'var(--space-4)',
                    }}>
                        PRICING
                    </span>
                    <h2 style={{ marginBottom: 'var(--space-4)' }}>
                        Simple, Transparent Pricing
                    </h2>
                    <p style={{
                        fontSize: '1.125rem',
                        color: 'var(--text-secondary)',
                        maxWidth: '600px',
                        margin: '0 auto var(--space-8)',
                    }}>
                        Choose the plan that fits your business. All plans include a 14-day free trial.
                    </p>

                    {/* Billing Toggle */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--space-3)',
                        padding: 'var(--space-1)',
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border-color)',
                    }}>
                        <button
                            onClick={() => setIsYearly(false)}
                            style={{
                                padding: 'var(--space-2) var(--space-4)',
                                borderRadius: 'var(--radius-full)',
                                border: 'none',
                                background: !isYearly ? 'var(--color-primary-500)' : 'transparent',
                                color: !isYearly ? 'white' : 'var(--text-secondary)',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all var(--transition-fast)',
                            }}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsYearly(true)}
                            style={{
                                padding: 'var(--space-2) var(--space-4)',
                                borderRadius: 'var(--radius-full)',
                                border: 'none',
                                background: isYearly ? 'var(--color-primary-500)' : 'transparent',
                                color: isYearly ? 'white' : 'var(--text-secondary)',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all var(--transition-fast)',
                            }}
                        >
                            Yearly
                            <span style={{
                                marginLeft: 'var(--space-2)',
                                padding: '2px 8px',
                                background: 'var(--color-secondary-500)',
                                color: 'white',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.75rem',
                            }}>
                                -20%
                            </span>
                        </button>
                    </div>
                </motion.div>

                {/* Pricing Cards */}
                <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    style={{ alignItems: 'stretch' }}
                >
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            style={{
                                padding: 'var(--space-8)',
                                background: plan.highlighted
                                    ? 'linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700))'
                                    : 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-xl)',
                                border: plan.highlighted ? 'none' : '1px solid var(--border-color)',
                                color: plan.highlighted ? 'white' : 'var(--text-primary)',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: plan.highlighted ? '0 20px 40px rgba(59, 130, 246, 0.3)' : 'var(--shadow-md)',
                            }}
                        >
                            {/* Popular Badge */}
                            {plan.highlighted && (
                                <div style={{
                                    position: 'absolute',
                                    top: 20,
                                    right: -35,
                                    padding: '4px 40px',
                                    background: 'var(--color-secondary-500)',
                                    color: 'white',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    transform: 'rotate(45deg)',
                                }}>
                                    POPULAR
                                </div>
                            )}

                            {/* Plan Name */}
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: 600,
                                marginBottom: 'var(--space-2)',
                            }}>
                                {plan.name}
                            </h3>
                            <p style={{
                                fontSize: '0.9375rem',
                                opacity: plan.highlighted ? 0.9 : 0.7,
                                marginBottom: 'var(--space-6)',
                            }}>
                                {plan.description}
                            </p>

                            {/* Price */}
                            <div style={{ marginBottom: 'var(--space-6)' }}>
                                <span style={{ fontSize: '3rem', fontWeight: 700 }}>
                                    ${isYearly ? plan.price.yearly : plan.price.monthly}
                                </span>
                                <span style={{ opacity: 0.7 }}>/month</span>
                            </div>

                            {/* CTA Button */}
                            <Link
                                href="/register"
                                className="btn btn-lg"
                                style={{
                                    width: '100%',
                                    background: plan.highlighted ? 'white' : 'var(--color-primary-500)',
                                    color: plan.highlighted ? 'var(--color-primary-600)' : 'white',
                                    marginBottom: 'var(--space-6)',
                                }}
                            >
                                {plan.cta}
                            </Link>

                            {/* Features */}
                            <ul style={{ listStyle: 'none' }}>
                                {plan.features.map((feature) => (
                                    <li
                                        key={feature}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 'var(--space-3)',
                                            padding: 'var(--space-2) 0',
                                            fontSize: '0.9375rem',
                                        }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={plan.highlighted ? 'var(--color-secondary-300)' : 'var(--color-secondary-500)'} strokeWidth="2">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
