'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Finance Reports Page - Generate and view financial reports
 */

const reportTypes = [
    { id: 'income', name: 'Income Statement', icon: '📈', description: 'Revenue, expenses, and net income' },
    { id: 'balance', name: 'Balance Sheet', icon: '⚖️', description: 'Assets, liabilities, and equity' },
    { id: 'cashflow', name: 'Cash Flow', icon: '💰', description: 'Cash inflows and outflows' },
    { id: 'budget', name: 'Budget Report', icon: '📊', description: 'Budget vs actual comparison' },
    { id: 'expense', name: 'Expense Report', icon: '🧾', description: 'Detailed expense breakdown' },
    { id: 'tax', name: 'Tax Summary', icon: '📋', description: 'Tax obligations and deductions' },
];

const recentReports = [
    { id: 1, name: 'Q4 2023 Income Statement', type: 'income', date: '2024-01-10', status: 'ready' },
    { id: 2, name: 'Annual Budget Review 2023', type: 'budget', date: '2024-01-08', status: 'ready' },
    { id: 3, name: 'December 2023 Cash Flow', type: 'cashflow', date: '2024-01-05', status: 'ready' },
    { id: 4, name: 'Q4 2023 Expense Analysis', type: 'expense', date: '2024-01-03', status: 'processing' },
];

export default function ReportsPage() {
    const [selectedReport, setSelectedReport] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-01-31' });

    return (
        <div>
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 'var(--space-6)' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 600 }}>Financial Reports</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>Generate, view, and download financial reports</p>
            </motion.div>

            {/* Report Types Grid */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginBottom: 'var(--space-8)' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--space-4)' }}>Generate New Report</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {reportTypes.map((report, index) => (
                        <motion.button
                            key={report.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            onClick={() => setSelectedReport(report.id)}
                            className="card"
                            style={{ padding: 'var(--space-4)', textAlign: 'center', cursor: 'pointer', border: selectedReport === report.id ? '2px solid var(--color-primary-500)' : '1px solid var(--border-color)', transition: 'all var(--transition-fast)' }}
                        >
                            <span style={{ fontSize: '2rem', display: 'block', marginBottom: 'var(--space-2)' }}>{report.icon}</span>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 'var(--space-1)' }}>{report.name}</h3>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>{report.description}</p>
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Date Range & Generate */}
            {selectedReport && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="card" style={{ marginBottom: 'var(--space-8)', padding: 'var(--space-5)' }}>
                    <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-4)' }}>Report Configuration</h3>
                    <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                        <div>
                            <label className="label">Start Date</label>
                            <input type="date" className="input" value={dateRange.start} onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} />
                        </div>
                        <div>
                            <label className="label">End Date</label>
                            <input type="date" className="input" value={dateRange.end} onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} />
                        </div>
                        <div>
                            <label className="label">Format</label>
                            <select className="input">
                                <option value="pdf">PDF</option>
                                <option value="xlsx">Excel (XLSX)</option>
                                <option value="csv">CSV</option>
                            </select>
                        </div>
                        <button className="btn btn-primary">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                            Generate Report
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Recent Reports */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--space-4)' }}>Recent Reports</h2>
                <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-tertiary)' }}>
                                <th style={{ textAlign: 'left', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Report Name</th>
                                <th style={{ textAlign: 'left', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Type</th>
                                <th style={{ textAlign: 'left', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Generated</th>
                                <th style={{ textAlign: 'center', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Status</th>
                                <th style={{ textAlign: 'center', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentReports.map((report) => (
                                <tr key={report.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: 'var(--space-4)', fontWeight: 500 }}>{report.name}</td>
                                    <td style={{ padding: 'var(--space-4)', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{report.type}</td>
                                    <td style={{ padding: 'var(--space-4)', color: 'var(--text-secondary)' }}>{report.date}</td>
                                    <td style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
                                        <span className={`badge ${report.status === 'ready' ? 'badge-success' : 'badge-warning'}`}>{report.status}</span>
                                    </td>
                                    <td style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center' }}>
                                            <button className="btn btn-sm btn-ghost" disabled={report.status !== 'ready'}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                            </button>
                                            <button className="btn btn-sm btn-ghost" disabled={report.status !== 'ready'}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
