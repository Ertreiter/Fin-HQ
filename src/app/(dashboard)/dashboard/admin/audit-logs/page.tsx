'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Audit Logs Page - System activity tracking
 */

const mockLogs = [
    { id: 1, action: 'USER_LOGIN', user: 'john.doe@company.com', resource: 'Auth', details: 'Successful login from 192.168.1.100', timestamp: '2024-01-12T10:30:00', level: 'info' },
    { id: 2, action: 'INVOICE_CREATED', user: 'jane.smith@company.com', resource: 'Finance', details: 'Created invoice INV-001 for $15,000', timestamp: '2024-01-12T10:25:00', level: 'info' },
    { id: 3, action: 'USER_ROLE_CHANGED', user: 'admin@company.com', resource: 'Users', details: 'Changed role for mike.j@company.com from STAFF to MANAGER', timestamp: '2024-01-12T10:20:00', level: 'warning' },
    { id: 4, action: 'LOGIN_FAILED', user: 'unknown@test.com', resource: 'Auth', details: 'Failed login attempt - invalid credentials', timestamp: '2024-01-12T10:15:00', level: 'error' },
    { id: 5, action: 'EXPENSE_APPROVED', user: 'sarah.w@company.com', resource: 'Finance', details: 'Approved expense #234 ($2,500)', timestamp: '2024-01-12T10:10:00', level: 'info' },
    { id: 6, action: 'PASSWORD_RESET', user: 'tom.b@company.com', resource: 'Auth', details: 'Password reset requested', timestamp: '2024-01-12T10:05:00', level: 'warning' },
    { id: 7, action: 'BUDGET_EXCEEDED', user: 'system', resource: 'Finance', details: 'IT department budget exceeded threshold (95%)', timestamp: '2024-01-12T10:00:00', level: 'error' },
    { id: 8, action: 'USER_CREATED', user: 'admin@company.com', resource: 'Users', details: 'Created new user: emma.d@company.com', timestamp: '2024-01-12T09:55:00', level: 'info' },
];

const levelStyles: Record<string, { bg: string; text: string }> = {
    info: { bg: 'var(--color-primary-100)', text: 'var(--color-primary-700)' },
    warning: { bg: '#fef3c7', text: '#92400e' },
    error: { bg: '#fee2e2', text: '#991b1b' },
};

export default function AuditLogsPage() {
    const [levelFilter, setLevelFilter] = useState('all');
    const [search, setSearch] = useState('');

    const filteredLogs = useMemo(() => {
        return mockLogs.filter(log => {
            const matchLevel = levelFilter === 'all' || log.level === levelFilter;
            const matchSearch = search === '' ||
                log.action.toLowerCase().includes(search.toLowerCase()) ||
                log.user.toLowerCase().includes(search.toLowerCase()) ||
                log.details.toLowerCase().includes(search.toLowerCase());
            return matchLevel && matchSearch;
        });
    }, [levelFilter, search]);

    return (
        <div>
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 600 }}>Audit Logs</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>Track all system activities and changes</p>
                </div>
                <button className="btn btn-secondary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    Export Logs
                </button>
            </motion.div>

            {/* Filters */}
            <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 300px', position: 'relative' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        <input type="search" placeholder="Search logs..." value={search} onChange={(e) => setSearch(e.target.value)} className="input" style={{ paddingLeft: 'var(--space-10)' }} />
                    </div>
                    <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} className="input" style={{ flex: '0 0 150px' }}>
                        <option value="all">All Levels</option>
                        <option value="info">Info</option>
                        <option value="warning">Warning</option>
                        <option value="error">Error</option>
                    </select>
                </div>
            </motion.div>

            {/* Logs List */}
            <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ overflow: 'hidden', padding: 0 }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-tertiary)' }}>
                                <th style={{ textAlign: 'left', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Timestamp</th>
                                <th style={{ textAlign: 'center', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Level</th>
                                <th style={{ textAlign: 'left', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Action</th>
                                <th style={{ textAlign: 'left', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>User</th>
                                <th style={{ textAlign: 'left', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.map((log) => {
                                const style = levelStyles[log.level];
                                return (
                                    <tr key={log.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                                            {new Date(log.timestamp).toLocaleString()}
                                        </td>
                                        <td style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
                                            <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', background: style.bg, color: style.text }}>{log.level}</span>
                                        </td>
                                        <td style={{ padding: 'var(--space-4)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-primary)' }}>{log.action}</td>
                                        <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{log.user}</td>
                                        <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.details}</td>
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
