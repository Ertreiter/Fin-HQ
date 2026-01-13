'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

/**
 * Forgot Password Page
 */
export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) {
                setError(error.message);
                return;
            }

            setSuccess(true);
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: 'var(--space-4)' }}>
                <div style={{ width: '100%', maxWidth: 420, padding: 'var(--space-10)', background: 'rgba(255,255,255,0.95)', borderRadius: 'var(--radius-2xl)', textAlign: 'center' }}>
                    <div style={{ width: 80, height: 80, background: 'var(--color-secondary-100)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-6)' }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary-600)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                    </div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-3)' }}>Check your email</h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>We&apos;ve sent a password reset link to <strong>{email}</strong></p>
                    <Link href="/login" className="btn btn-primary">Back to Login</Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: 'var(--space-4)' }}>
            <div style={{ position: 'absolute', top: '20%', left: '15%', width: 250, height: 250, background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }} />
            <div style={{ width: '100%', maxWidth: 420, padding: 'var(--space-10)', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', borderRadius: 'var(--radius-2xl)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
                    <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <div style={{ width: 48, height: 48, background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600))', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1.5rem' }}>A</div>
                    </Link>
                    <h1 style={{ marginTop: 'var(--space-4)', fontSize: '1.5rem' }}>Forgot password?</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: '0.9375rem' }}>No worries, we&apos;ll send you reset instructions.</p>
                </div>
                {error && <div style={{ padding: 'var(--space-3) var(--space-4)', background: '#fee2e2', color: '#991b1b', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-6)', fontSize: '0.875rem' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 'var(--space-6)' }}>
                        <label className="label" htmlFor="email">Email address</label>
                        <input id="email" type="email" className="input" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%' }}>{loading ? 'Sending...' : 'Reset password'}</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: 'var(--space-8)', color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                    <Link href="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                        Back to login
                    </Link>
                </p>
            </div>
        </div>
    );
}
