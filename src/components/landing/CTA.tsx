'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

/**
 * CTA Section - Final call to action
 */
export default function CTA() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <section
            ref={ref}
            style={{
                padding: 'var(--space-24) 0',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Decorative Elements */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '10%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                transform: 'translateY(-50%)',
            }} />
            <div style={{
                position: 'absolute',
                top: '50%',
                right: '10%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                transform: 'translateY(-50%)',
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        textAlign: 'center',
                    }}
                >
                    {/* Glassmorphism Card */}
                    <div style={{
                        padding: 'var(--space-16)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderRadius: 'var(--radius-2xl)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}>
                        <h2 style={{
                            color: 'white',
                            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                            fontWeight: 700,
                            marginBottom: 'var(--space-4)',
                        }}>
                            Ready to Transform Your Business?
                        </h2>
                        <p style={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '1.125rem',
                            maxWidth: '500px',
                            margin: '0 auto var(--space-8)',
                            lineHeight: 1.7,
                        }}>
                            Join thousands of companies already using AdminForAll to streamline
                            their administration and finance operations.
                        </p>

                        <div style={{
                            display: 'flex',
                            gap: 'var(--space-4)',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                        }}>
                            <Link
                                href="/register"
                                className="btn btn-lg"
                                style={{
                                    background: 'linear-gradient(135deg, var(--color-primary-400), var(--color-secondary-400))',
                                    color: 'white',
                                    boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
                                }}
                            >
                                Get Started Free
                            </Link>
                            <Link
                                href="#contact"
                                className="btn btn-lg"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    color: 'white',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                }}
                            >
                                Talk to Sales
                            </Link>
                        </div>

                        <p style={{
                            marginTop: 'var(--space-6)',
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontSize: '0.875rem',
                        }}>
                            No credit card required • 14-day free trial • Cancel anytime
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
