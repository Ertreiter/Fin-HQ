'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Users Management Page - Admin only
 */

const mockUsers = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@company.com', role: 'SUPER_ADMIN', department: 'Executive', status: 'active', lastLogin: '2024-01-12T10:30:00' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@company.com', role: 'ADMIN', department: 'IT', status: 'active', lastLogin: '2024-01-12T09:15:00' },
    { id: 3, firstName: 'Mike', lastName: 'Johnson', email: 'mike.j@company.com', role: 'MANAGER', department: 'Engineering', status: 'active', lastLogin: '2024-01-11T16:45:00' },
    { id: 4, firstName: 'Sarah', lastName: 'Wilson', email: 'sarah.w@company.com', role: 'DIRECTOR', department: 'Marketing', status: 'active', lastLogin: '2024-01-12T08:00:00' },
    { id: 5, firstName: 'Tom', lastName: 'Brown', email: 'tom.b@company.com', role: 'FINANCE', department: 'Finance', status: 'active', lastLogin: '2024-01-10T14:20:00' },
    { id: 6, firstName: 'Lisa', lastName: 'Chen', email: 'lisa.c@company.com', role: 'STAFF', department: 'Sales', status: 'inactive', lastLogin: '2024-01-05T11:30:00' },
    { id: 7, firstName: 'David', lastName: 'Lee', email: 'david.l@company.com', role: 'STAFF', department: 'Operations', status: 'active', lastLogin: '2024-01-12T07:45:00' },
    { id: 8, firstName: 'Emma', lastName: 'Davis', email: 'emma.d@company.com', role: 'MANAGER', department: 'HR', status: 'active', lastLogin: '2024-01-11T13:00:00' },
];

const roleColors: Record<string, string> = {
    SUPER_ADMIN: '#dc2626',
    ADMIN: '#ea580c',
    DIRECTOR: '#8b5cf6',
    MANAGER: '#3b82f6',
    FINANCE: '#10b981',
    STAFF: '#6b7280',
};

export default function UsersPage() {
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const filteredUsers = useMemo(() => {
        return mockUsers.filter(user => {
            const matchSearch = search === '' ||
                `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase());
            const matchRole = roleFilter === 'all' || user.role === roleFilter;
            return matchSearch && matchRole;
        });
    }, [search, roleFilter]);

    const stats = {
        total: mockUsers.length,
        active: mockUsers.filter(u => u.status === 'active').length,
        admins: mockUsers.filter(u => ['SUPER_ADMIN', 'ADMIN'].includes(u.role)).length,
    };

    return (
        <div>
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 600 }}>Users</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>Manage team members and their permissions</p>
                </div>
                <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg>
                    Add User
                </button>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ marginBottom: 'var(--space-6)' }}>
                <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                    <div style={{ width: 48, height: 48, background: 'var(--color-primary-100)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-600)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    </div>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Total Users</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>{stats.total}</p>
                    </div>
                </motion.div>
                <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                    <div style={{ width: 48, height: 48, background: 'var(--color-secondary-100)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-secondary-600)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                    </div>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Active</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-secondary-600)' }}>{stats.active}</p>
                    </div>
                </motion.div>
                <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                    <div style={{ width: 48, height: 48, background: '#fee2e2', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    </div>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Administrators</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#dc2626' }}>{stats.admins}</p>
                    </div>
                </motion.div>
            </div>

            {/* Filters */}
            <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 300px', position: 'relative' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        <input type="search" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="input" style={{ paddingLeft: 'var(--space-10)' }} />
                    </div>
                    <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="input" style={{ flex: '0 0 180px' }}>
                        <option value="all">All Roles</option>
                        <option value="SUPER_ADMIN">Super Admin</option>
                        <option value="ADMIN">Admin</option>
                        <option value="DIRECTOR">Director</option>
                        <option value="MANAGER">Manager</option>
                        <option value="FINANCE">Finance</option>
                        <option value="STAFF">Staff</option>
                    </select>
                </div>
            </motion.div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map((user, index) => (
                    <motion.div key={user.id} className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.03 }} style={{ padding: 'var(--space-5)' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
                            <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-full)', background: `${roleColors[user.role]}20`, color: roleColors[user.role], display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '1.125rem', flexShrink: 0 }}>
                                {user.firstName[0]}{user.lastName[0]}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h3 style={{ fontWeight: 600, fontSize: '1rem' }}>{user.firstName} {user.lastName}</h3>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
                                    </div>
                                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: user.status === 'active' ? 'var(--color-secondary-500)' : 'var(--color-neutral-400)', flexShrink: 0 }} title={user.status} />
                                </div>
                                <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)', flexWrap: 'wrap' }}>
                                    <span style={{ padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 500, background: `${roleColors[user.role]}20`, color: roleColors[user.role] }}>{user.role.replace('_', ' ')}</span>
                                    <span style={{ padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 500, background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>{user.department}</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Last login: {new Date(user.lastLogin).toLocaleDateString()}</span>
                            <button style={{ padding: 'var(--space-2)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
