'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Budgets Page - Department budget management
 */

const mockBudgets = [
    { id: 1, name: 'Engineering Q1 2024', department: 'Engineering', allocated: 150000, spent: 128000, period: 'Q1 2024', status: 'ACTIVE' },
    { id: 2, name: 'Marketing Campaign', department: 'Marketing', allocated: 80000, spent: 72000, period: 'Q1 2024', status: 'ACTIVE' },
    { id: 3, name: 'Sales Operations', department: 'Sales', allocated: 120000, spent: 98000, period: 'Q1 2024', status: 'ACTIVE' },
    { id: 4, name: 'IT Infrastructure', department: 'IT', allocated: 60000, spent: 58500, period: 'Q1 2024', status: 'EXCEEDED' },
    { id: 5, name: 'HR & Recruitment', department: 'HR', allocated: 40000, spent: 32000, period: 'Q1 2024', status: 'ACTIVE' },
    { id: 6, name: 'Office Maintenance', department: 'Operations', allocated: 25000, spent: 18000, period: 'Q1 2024', status: 'ACTIVE' },
];

export default function BudgetsPage() {
    const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

    const totalAllocated = mockBudgets.reduce((s, b) => s + b.allocated, 0);
    const totalSpent = mockBudgets.reduce((s, b) => s + b.spent, 0);
    const utilizationRate = ((totalSpent / totalAllocated) * 100).toFixed(1);

    return (
        <div>
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 600 }}>Budgets</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>Manage department budgets and allocations</p>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <div style={{ display: 'flex', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: 2 }}>
                        <button onClick={() => setViewMode('cards')} style={{ padding: 'var(--space-2)', background: viewMode === 'cards' ? 'var(--bg-secondary)' : 'transparent', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                        </button>
                        <button onClick={() => setViewMode('table')} style={{ padding: 'var(--space-2)', background: viewMode === 'table' ? 'var(--bg-secondary)' : 'transparent', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                        </button>
                    </div>
                    <button className="btn btn-primary">Create Budget</button>
                </div>
            </motion.div>

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ marginBottom: 'var(--space-6)' }}>
                <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ padding: 'var(--space-4)' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Total Allocated</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>${totalAllocated.toLocaleString()}</p>
                </motion.div>
                <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} style={{ padding: 'var(--space-4)' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Total Spent</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-primary-500)' }}>${totalSpent.toLocaleString()}</p>
                </motion.div>
                <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ padding: 'var(--space-4)' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Utilization Rate</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 600, color: Number(utilizationRate) > 90 ? 'var(--color-warning)' : 'var(--color-secondary-500)' }}>{utilizationRate}%</p>
                </motion.div>
            </div>

            {/* Budget Cards/Table */}
            {viewMode === 'cards' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockBudgets.map((budget, index) => {
                        const utilization = (budget.spent / budget.allocated) * 100;
                        const isOver = utilization > 95;
                        return (
                            <motion.div key={budget.id} className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} style={{ padding: 'var(--space-5)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
                                    <div>
                                        <h3 style={{ fontWeight: 600, fontSize: '1rem' }}>{budget.name}</h3>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{budget.department} • {budget.period}</p>
                                    </div>
                                    <span className={`badge ${budget.status === 'EXCEEDED' ? 'badge-error' : 'badge-success'}`}>{budget.status}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Spent: ${budget.spent.toLocaleString()}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>of ${budget.allocated.toLocaleString()}</span>
                                </div>
                                <div style={{ height: 8, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(utilization, 100)}%` }} transition={{ duration: 1, delay: index * 0.1 }} style={{ height: '100%', background: isOver ? 'linear-gradient(90deg, var(--color-warning), var(--color-error))' : 'linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500))', borderRadius: 'var(--radius-full)' }} />
                                </div>
                                <p style={{ fontSize: '0.75rem', color: isOver ? 'var(--color-error)' : 'var(--text-tertiary)', marginTop: 'var(--space-2)', textAlign: 'right' }}>{utilization.toFixed(1)}% used • ${(budget.allocated - budget.spent).toLocaleString()} remaining</p>
                            </motion.div>
                        );
                    })}
                </div>
            ) : (
                <motion.div className="card" style={{ overflow: 'hidden', padding: 0 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-tertiary)' }}>
                                <th style={{ textAlign: 'left', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Budget Name</th>
                                <th style={{ textAlign: 'left', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Department</th>
                                <th style={{ textAlign: 'right', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Allocated</th>
                                <th style={{ textAlign: 'right', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Spent</th>
                                <th style={{ textAlign: 'right', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Remaining</th>
                                <th style={{ textAlign: 'center', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockBudgets.map((budget) => (
                                <tr key={budget.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: 'var(--space-4)', fontWeight: 500 }}>{budget.name}</td>
                                    <td style={{ padding: 'var(--space-4)', color: 'var(--text-secondary)' }}>{budget.department}</td>
                                    <td style={{ padding: 'var(--space-4)', textAlign: 'right' }}>${budget.allocated.toLocaleString()}</td>
                                    <td style={{ padding: 'var(--space-4)', textAlign: 'right', color: 'var(--color-primary-500)' }}>${budget.spent.toLocaleString()}</td>
                                    <td style={{ padding: 'var(--space-4)', textAlign: 'right', color: 'var(--color-secondary-600)' }}>${(budget.allocated - budget.spent).toLocaleString()}</td>
                                    <td style={{ padding: 'var(--space-4)', textAlign: 'center' }}><span className={`badge ${budget.status === 'EXCEEDED' ? 'badge-error' : 'badge-success'}`}>{budget.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            )}
        </div>
    );
}
