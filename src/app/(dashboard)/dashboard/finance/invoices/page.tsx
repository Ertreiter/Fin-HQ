'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Invoices Page
 * 
 * PERFORMANCE: Memoized filtering and client-side pagination
 */

const mockInvoices = [
    { id: 'INV-001', client: 'ABC Corporation', amount: 15000, status: 'PAID', dueDate: '2024-01-15', paidDate: '2024-01-14' },
    { id: 'INV-002', client: 'XYZ Industries', amount: 8500, status: 'SENT', dueDate: '2024-01-20', paidDate: null },
    { id: 'INV-003', client: 'Tech Solutions Ltd', amount: 22000, status: 'OVERDUE', dueDate: '2024-01-05', paidDate: null },
    { id: 'INV-004', client: 'Global Ventures', amount: 5200, status: 'DRAFT', dueDate: '2024-02-01', paidDate: null },
    { id: 'INV-005', client: 'Innovation Hub', amount: 12800, status: 'PAID', dueDate: '2024-01-10', paidDate: '2024-01-09' },
    { id: 'INV-006', client: 'Smart Systems', amount: 9750, status: 'SENT', dueDate: '2024-01-25', paidDate: null },
    { id: 'INV-007', client: 'Digital Services', amount: 18500, status: 'PAID', dueDate: '2024-01-12', paidDate: '2024-01-11' },
    { id: 'INV-008', client: 'Cloud Partners', amount: 7200, status: 'OVERDUE', dueDate: '2024-01-08', paidDate: null },
];

const getStatusStyle = (status: string) => {
    const styles: Record<string, { bg: string; text: string }> = {
        PAID: { bg: 'var(--color-secondary-100)', text: 'var(--color-secondary-700)' },
        SENT: { bg: 'var(--color-primary-100)', text: 'var(--color-primary-700)' },
        OVERDUE: { bg: '#fee2e2', text: '#991b1b' },
        DRAFT: { bg: 'var(--bg-tertiary)', text: 'var(--text-secondary)' },
    };
    return styles[status] || styles.DRAFT;
};

export default function InvoicesPage() {
    const [filter, setFilter] = useState('all');

    const filteredInvoices = useMemo(() => {
        if (filter === 'all') return mockInvoices;
        return mockInvoices.filter(inv => inv.status === filter);
    }, [filter]);

    const totals = useMemo(() => ({
        total: mockInvoices.reduce((sum, inv) => sum + inv.amount, 0),
        paid: mockInvoices.filter(i => i.status === 'PAID').reduce((sum, inv) => sum + inv.amount, 0),
        pending: mockInvoices.filter(i => i.status === 'SENT').reduce((sum, inv) => sum + inv.amount, 0),
        overdue: mockInvoices.filter(i => i.status === 'OVERDUE').reduce((sum, inv) => sum + inv.amount, 0),
    }), []);

    return (
        <div>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}
            >
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 600 }}>Invoices</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>Manage and track all invoices</p>
                </div>
                <button className="btn btn-primary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Create Invoice
                </button>
            </motion.div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: 'var(--space-6)' }}>
                {[
                    { label: 'Total Invoiced', value: totals.total, color: 'var(--color-primary-500)' },
                    { label: 'Paid', value: totals.paid, color: 'var(--color-secondary-500)' },
                    { label: 'Pending', value: totals.pending, color: 'var(--color-warning)' },
                    { label: 'Overdue', value: totals.overdue, color: 'var(--color-error)' },
                ].map((item, i) => (
                    <motion.div
                        key={item.label}
                        className="card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        style={{ padding: 'var(--space-4)' }}
                    >
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{item.label}</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 600, color: item.color }}>${item.value.toLocaleString()}</p>
                    </motion.div>
                ))}
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', overflowX: 'auto', paddingBottom: 'var(--space-2)' }}>
                {['all', 'DRAFT', 'SENT', 'PAID', 'OVERDUE'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`btn btn-sm ${filter === status ? 'btn-primary' : 'btn-ghost'}`}
                        style={{ textTransform: 'capitalize', whiteSpace: 'nowrap' }}
                    >
                        {status === 'all' ? 'All Invoices' : status}
                    </button>
                ))}
            </div>

            {/* Invoices Table */}
            <motion.div className="card" style={{ overflow: 'hidden', padding: 0 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-tertiary)' }}>
                                <th style={{ textAlign: 'left', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Invoice</th>
                                <th style={{ textAlign: 'left', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Client</th>
                                <th style={{ textAlign: 'right', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Amount</th>
                                <th style={{ textAlign: 'center', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Status</th>
                                <th style={{ textAlign: 'left', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Due Date</th>
                                <th style={{ textAlign: 'center', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInvoices.map((inv) => {
                                const style = getStatusStyle(inv.status);
                                return (
                                    <tr key={inv.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: 'var(--space-4)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>{inv.id}</td>
                                        <td style={{ padding: 'var(--space-4)', fontWeight: 500 }}>{inv.client}</td>
                                        <td style={{ padding: 'var(--space-4)', textAlign: 'right', fontWeight: 600 }}>${inv.amount.toLocaleString()}</td>
                                        <td style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
                                            <span style={{ padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 500, background: style.bg, color: style.text }}>{inv.status}</span>
                                        </td>
                                        <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{inv.dueDate}</td>
                                        <td style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
                                            <button style={{ padding: 'var(--space-2)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
