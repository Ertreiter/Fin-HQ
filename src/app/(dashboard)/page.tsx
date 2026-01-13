'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Dashboard Home Page
 * 
 * Shows KPIs and quick stats for the logged-in user
 * 
 * PERFORMANCE:
 * - Client component for real-time updates
 * - Suspense boundaries for data fetching
 */

// Mock data - in production, fetch from Supabase
const mockStats = [
    {
        label: 'Total Revenue',
        value: '$284,392',
        change: '+12.5%',
        changeType: 'positive' as const,
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
    },
    {
        label: 'Total Expenses',
        value: '$148,576',
        change: '+4.2%',
        changeType: 'negative' as const,
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                <path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z" />
            </svg>
        ),
    },
    {
        label: 'Net Profit',
        value: '$135,816',
        change: '+23.1%',
        changeType: 'positive' as const,
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" />
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
        ),
    },
    {
        label: 'Pending Approvals',
        value: '12',
        change: '3 urgent',
        changeType: 'neutral' as const,
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
    },
];

const recentTransactions = [
    { id: 1, description: 'Office Supplies', amount: -245.00, category: 'Operations', date: '2024-01-12', status: 'completed' },
    { id: 2, description: 'Client Payment - ABC Corp', amount: 12500.00, category: 'Income', date: '2024-01-12', status: 'completed' },
    { id: 3, description: 'Software License', amount: -599.00, category: 'IT', date: '2024-01-11', status: 'pending' },
    { id: 4, description: 'Marketing Campaign', amount: -2340.00, category: 'Marketing', date: '2024-01-11', status: 'completed' },
    { id: 5, description: 'Consulting Fee', amount: 8500.00, category: 'Income', date: '2024-01-10', status: 'completed' },
];

export default function DashboardPage() {
    const [greeting, setGreeting] = useState('Good morning');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 18) setGreeting('Good afternoon');
        else setGreeting('Good evening');
    }, []);

    return (
        <div>
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ marginBottom: 'var(--space-8)' }}
            >
                <h1 style={{ fontSize: '1.75rem', fontWeight: 600 }}>{greeting}! 👋</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>
                    Here&apos;s what&apos;s happening with your business today.
                </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ marginBottom: 'var(--space-8)' }}>
                {mockStats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="card"
                        style={{ display: 'flex', gap: 'var(--space-4)' }}
                    >
                        <div style={{
                            width: 48,
                            height: 48,
                            background: stat.changeType === 'positive'
                                ? 'var(--color-secondary-100)'
                                : stat.changeType === 'negative'
                                    ? '#fee2e2'
                                    : 'var(--color-primary-100)',
                            borderRadius: 'var(--radius-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: stat.changeType === 'positive'
                                ? 'var(--color-secondary-600)'
                                : stat.changeType === 'negative'
                                    ? '#991b1b'
                                    : 'var(--color-primary-600)',
                            flexShrink: 0,
                        }}>
                            {stat.icon}
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{stat.label}</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: 'var(--space-1)' }}>{stat.value}</p>
                            <p style={{
                                fontSize: '0.75rem',
                                color: stat.changeType === 'positive'
                                    ? 'var(--color-secondary-600)'
                                    : stat.changeType === 'negative'
                                        ? '#991b1b'
                                        : 'var(--text-tertiary)',
                                marginTop: 'var(--space-1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-1)',
                            }}>
                                {stat.changeType !== 'neutral' && (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d={stat.changeType === 'positive' ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'} />
                                    </svg>
                                )}
                                {stat.change}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Transactions */}
                <motion.div
                    className="card"
                    style={{ gridColumn: 'span 2' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 'var(--space-6)',
                    }}>
                        <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Recent Transactions</h2>
                        <a href="/dashboard/finance/transactions" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                            View all →
                        </a>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'left', padding: 'var(--space-3)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 500, borderBottom: '1px solid var(--border-color)' }}>Description</th>
                                    <th style={{ textAlign: 'left', padding: 'var(--space-3)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 500, borderBottom: '1px solid var(--border-color)' }}>Category</th>
                                    <th style={{ textAlign: 'left', padding: 'var(--space-3)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 500, borderBottom: '1px solid var(--border-color)' }}>Date</th>
                                    <th style={{ textAlign: 'right', padding: 'var(--space-3)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 500, borderBottom: '1px solid var(--border-color)' }}>Amount</th>
                                    <th style={{ textAlign: 'center', padding: 'var(--space-3)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 500, borderBottom: '1px solid var(--border-color)' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentTransactions.map((tx) => (
                                    <tr key={tx.id}>
                                        <td style={{ padding: 'var(--space-3)', fontSize: '0.875rem' }}>{tx.description}</td>
                                        <td style={{ padding: 'var(--space-3)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{tx.category}</td>
                                        <td style={{ padding: 'var(--space-3)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{tx.date}</td>
                                        <td style={{
                                            padding: 'var(--space-3)',
                                            fontSize: '0.875rem',
                                            fontWeight: 500,
                                            textAlign: 'right',
                                            color: tx.amount > 0 ? 'var(--color-secondary-600)' : 'var(--text-primary)',
                                        }}>
                                            {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                        </td>
                                        <td style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                            <span className={`badge badge-${tx.status === 'completed' ? 'success' : 'warning'}`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    className="card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--space-6)' }}>Quick Actions</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                        {[
                            { label: 'Create Invoice', icon: '📄', href: '/dashboard/finance/invoices/new' },
                            { label: 'Add Expense', icon: '💰', href: '/dashboard/finance/expenses/new' },
                            { label: 'View Reports', icon: '📊', href: '/dashboard/finance/reports' },
                            { label: 'Manage Users', icon: '👥', href: '/dashboard/users' },
                        ].map((action) => (
                            <a
                                key={action.label}
                                href={action.href}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-3)',
                                    padding: 'var(--space-3) var(--space-4)',
                                    background: 'var(--bg-tertiary)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'var(--text-primary)',
                                    transition: 'all var(--transition-fast)',
                                }}
                            >
                                <span style={{ fontSize: '1.25rem' }}>{action.icon}</span>
                                <span style={{ fontWeight: 500 }}>{action.label}</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 'auto' }}>
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
