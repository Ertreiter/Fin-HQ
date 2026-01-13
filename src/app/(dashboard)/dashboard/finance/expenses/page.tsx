'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Expenses Page - Track and manage company expenses
 */

const mockExpenses = [
    { id: 1, title: 'Office Supplies', amount: 245, category: 'Operations', vendor: 'Office Depot', status: 'APPROVED', date: '2024-01-12', submittedBy: 'John Doe' },
    { id: 2, title: 'Software License - Adobe CC', amount: 599, category: 'IT', vendor: 'Adobe', status: 'PENDING', date: '2024-01-11', submittedBy: 'Jane Smith' },
    { id: 3, title: 'Team Lunch Meeting', amount: 180, category: 'Meals', vendor: 'Restaurant XYZ', status: 'APPROVED', date: '2024-01-10', submittedBy: 'Mike Johnson' },
    { id: 4, title: 'Marketing Campaign - Google Ads', amount: 2500, category: 'Marketing', vendor: 'Google', status: 'REIMBURSED', date: '2024-01-09', submittedBy: 'Sarah Wilson' },
    { id: 5, title: 'Travel - Client Meeting', amount: 850, category: 'Travel', vendor: 'Delta Airlines', status: 'PENDING', date: '2024-01-08', submittedBy: 'Tom Brown' },
    { id: 6, title: 'Hardware - Monitors', amount: 1200, category: 'IT', vendor: 'Amazon', status: 'REJECTED', date: '2024-01-07', submittedBy: 'Lisa Chen' },
    { id: 7, title: 'Conference Tickets', amount: 450, category: 'Events', vendor: 'TechConf 2024', status: 'APPROVED', date: '2024-01-06', submittedBy: 'John Doe' },
    { id: 8, title: 'Cloud Hosting - AWS', amount: 890, category: 'IT', vendor: 'AWS', status: 'REIMBURSED', date: '2024-01-05', submittedBy: 'Jane Smith' },
];

const categories = ['All', 'Operations', 'IT', 'Marketing', 'Travel', 'Meals', 'Events'];

export default function ExpensesPage() {
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredExpenses = useMemo(() => {
        return mockExpenses.filter(exp => {
            const matchCategory = categoryFilter === 'All' || exp.category === categoryFilter;
            const matchStatus = statusFilter === 'all' || exp.status === statusFilter;
            return matchCategory && matchStatus;
        });
    }, [categoryFilter, statusFilter]);

    const totalByStatus = useMemo(() => ({
        pending: mockExpenses.filter(e => e.status === 'PENDING').reduce((s, e) => s + e.amount, 0),
        approved: mockExpenses.filter(e => e.status === 'APPROVED').reduce((s, e) => s + e.amount, 0),
        reimbursed: mockExpenses.filter(e => e.status === 'REIMBURSED').reduce((s, e) => s + e.amount, 0),
    }), []);

    return (
        <div>
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 600 }}>Expenses</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>Track and manage expense reports</p>
                </div>
                <button className="btn btn-primary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    Submit Expense
                </button>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ marginBottom: 'var(--space-6)' }}>
                {[
                    { label: 'Pending Approval', value: totalByStatus.pending, color: 'var(--color-warning)', icon: '⏳' },
                    { label: 'Approved', value: totalByStatus.approved, color: 'var(--color-primary-500)', icon: '✓' },
                    { label: 'Reimbursed', value: totalByStatus.reimbursed, color: 'var(--color-secondary-500)', icon: '💰' },
                ].map((stat, i) => (
                    <motion.div key={stat.label} className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                        <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
                        <div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{stat.label}</p>
                            <p style={{ fontSize: '1.25rem', fontWeight: 600, color: stat.color }}>${stat.value.toLocaleString()}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Filters */}
            <div className="card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="input" style={{ flex: '0 0 180px' }}>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input" style={{ flex: '0 0 180px' }}>
                        <option value="all">All Statuses</option>
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REIMBURSED">Reimbursed</option>
                        <option value="REJECTED">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Expenses List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {filteredExpenses.map((expense, index) => (
                    <motion.div key={expense.id} className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }} style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: 200 }}>
                            <p style={{ fontWeight: 500 }}>{expense.title}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{expense.vendor} • {expense.submittedBy}</p>
                        </div>
                        <span className="badge badge-info" style={{ fontSize: '0.75rem' }}>{expense.category}</span>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', minWidth: 80 }}>{expense.date}</p>
                        <p style={{ fontWeight: 600, minWidth: 80, textAlign: 'right' }}>${expense.amount.toLocaleString()}</p>
                        <span className={`badge ${expense.status === 'APPROVED' ? 'badge-success' : expense.status === 'PENDING' ? 'badge-warning' : expense.status === 'REIMBURSED' ? 'badge-info' : 'badge-error'}`}>
                            {expense.status}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
