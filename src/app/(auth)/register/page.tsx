'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

/**
 * Register Page
 * 
 * SECURITY:
 * - Password strength requirements
 * - Email verification via Supabase
 */
export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const validatePassword = (password: string): string | null => {
        if (password.length < 8) return 'Password must be at least 8 characters';
        if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
        if (!/[a-z]/.test(password)) return 'Password must contain a lowercase letter';
        if (!/[0-9]/.test(password)) return 'Password must contain a number';
        if (!/[!@#$%^&*]/.test(password)) return 'Password must contain a special character (!@#$%^&*)';
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        const passwordError = validatePassword(formData.password);
        if (passwordError) {
            setError(passwordError);
            setLoading(false);
            return;
        }

        if (!formData.agreeToTerms) {
            setError('You must agree to the terms and conditions');
            setLoading(false);
            return;
        }

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        role: 'STAFF', // Default role
                    },
                },
            });

            if (error) {
                setError(error.message);
                return;
            }

            setSuccess(true);
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                padding: 'var(--space-4)',
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '420px',
                    padding: 'var(--space-10)',
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: 'var(--radius-2xl)',
                    textAlign: 'center',
                }}>
                    <div style={{
                        width: 80,
                        height: 80,
                        background: 'var(--color-secondary-100)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto var(--space-6)',
                    }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary-600)" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-3)' }}>Check your email</h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
                        We&apos;ve sent a verification link to <strong>{formData.email}</strong>.
                        Click the link to activate your account.
                    </p>
                    <Link href="/login" className="btn btn-primary">
                        Back to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            padding: 'var(--space-4)',
        }}>
            {/* Decorative background */}
            <div style={{
                position: 'absolute',
                top: '20%',
                right: '10%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)',
            }} />

            {/* Register Card */}
            <div style={{
                width: '100%',
                maxWidth: '480px',
                padding: 'var(--space-8)',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: 'var(--radius-2xl)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                position: 'relative',
                zIndex: 1,
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                    <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <div style={{
                            width: 48,
                            height: 48,
                            background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600))',
                            borderRadius: 'var(--radius-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '1.5rem',
                        }}>
                            A
                        </div>
                    </Link>
                    <h1 style={{ marginTop: 'var(--space-4)', fontSize: '1.5rem' }}>Create your account</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: '0.9375rem' }}>
                        Start your 14-day free trial
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        padding: 'var(--space-3) var(--space-4)',
                        background: '#fee2e2',
                        color: '#991b1b',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: 'var(--space-6)',
                        fontSize: '0.875rem',
                    }}>
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                        <div>
                            <label className="label" htmlFor="firstName">First name</label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                className="input"
                                placeholder="John"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="label" htmlFor="lastName">Last name</label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                className="input"
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: 'var(--space-4)' }}>
                        <label className="label" htmlFor="email">Work email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="input"
                            placeholder="you@company.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: 'var(--space-4)' }}>
                        <label className="label" htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="input"
                            placeholder="Min. 8 characters"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)' }}>
                            Must include uppercase, lowercase, number, and special character
                        </p>
                    </div>

                    <div style={{ marginBottom: 'var(--space-6)' }}>
                        <label className="label" htmlFor="confirmPassword">Confirm password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            className="input"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: 'var(--space-6)' }}>
                        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                style={{ marginTop: 4, width: 18, height: 18, accentColor: 'var(--color-primary-500)' }}
                            />
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                I agree to the{' '}
                                <Link href="/terms" style={{ fontWeight: 500 }}>Terms of Service</Link>
                                {' '}and{' '}
                                <Link href="/privacy" style={{ fontWeight: 500 }}>Privacy Policy</Link>
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={loading}
                        style={{ width: '100%' }}
                    >
                        {loading ? 'Creating account...' : 'Create account'}
                    </button>
                </form>

                {/* Sign In Link */}
                <p style={{
                    textAlign: 'center',
                    marginTop: 'var(--space-6)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9375rem',
                }}>
                    Already have an account?{' '}
                    <Link href="/login" style={{ fontWeight: 600 }}>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
