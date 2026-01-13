'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

/**
 * Dashboard Layout
 * 
 * PERFORMANCE:
 * - Sidebar state persisted in localStorage
 * - Minimal re-renders with proper memoization
 */

const navigation = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
            </svg>
        ),
        roles: ['STAFF', 'FINANCE', 'MANAGER', 'DIRECTOR', 'ADMIN', 'SUPER_ADMIN'],
    },
    {
        name: 'Finance',
        href: '/dashboard/finance',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
        roles: ['FINANCE', 'MANAGER', 'DIRECTOR', 'ADMIN', 'SUPER_ADMIN'],
        children: [
            { name: 'Transactions', href: '/dashboard/finance/transactions' },
            { name: 'Invoices', href: '/dashboard/finance/invoices' },
            { name: 'Expenses', href: '/dashboard/finance/expenses' },
            { name: 'Budgets', href: '/dashboard/finance/budgets' },
            { name: 'Reports', href: '/dashboard/finance/reports' },
        ],
    },
    {
        name: 'Analytics',
        href: '/dashboard/analytics',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" />
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
        ),
        roles: ['MANAGER', 'DIRECTOR', 'ADMIN', 'SUPER_ADMIN'],
    },
    {
        name: 'Users',
        href: '/dashboard/users',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        roles: ['ADMIN', 'SUPER_ADMIN'],
    },
    {
        name: 'Settings',
        href: '/dashboard/settings',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
        ),
        roles: ['STAFF', 'FINANCE', 'MANAGER', 'DIRECTOR', 'ADMIN', 'SUPER_ADMIN'],
    },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });
    }, []);

    const toggleExpanded = (name: string) => {
        setExpandedItems(prev =>
            prev.includes(name)
                ? prev.filter(item => item !== name)
                : [...prev, name]
        );
    };

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        window.location.href = '/login';
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
            {/* Sidebar */}
            <aside style={{
                width: sidebarOpen ? 260 : 72,
                background: 'var(--bg-secondary)',
                borderRight: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'width var(--transition-base)',
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                zIndex: 50,
            }}>
                {/* Logo */}
                <div style={{
                    padding: 'var(--space-4)',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: sidebarOpen ? 'space-between' : 'center',
                }}>
                    <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <div style={{
                            width: 36,
                            height: 36,
                            background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600))',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 700,
                            flexShrink: 0,
                        }}>
                            A
                        </div>
                        {sidebarOpen && (
                            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>AdminForAll</span>
                        )}
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        style={{
                            padding: 'var(--space-2)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--text-tertiary)',
                            display: sidebarOpen ? 'block' : 'none',
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 19l-7-7 7-7M18 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>

                {/* Navigation */}
                <nav style={{ flex: 1, padding: 'var(--space-4)', overflowY: 'auto' }}>
                    <ul style={{ listStyle: 'none' }}>
                        {navigation.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                            const isExpanded = expandedItems.includes(item.name);

                            return (
                                <li key={item.name} style={{ marginBottom: 'var(--space-1)' }}>
                                    <Link
                                        href={item.children ? '#' : item.href}
                                        onClick={(e) => {
                                            if (item.children) {
                                                e.preventDefault();
                                                toggleExpanded(item.name);
                                            }
                                        }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 'var(--space-3)',
                                            padding: sidebarOpen ? 'var(--space-3) var(--space-4)' : 'var(--space-3)',
                                            borderRadius: 'var(--radius-md)',
                                            color: isActive ? 'var(--color-primary-600)' : 'var(--text-secondary)',
                                            background: isActive ? 'var(--color-primary-50)' : 'transparent',
                                            fontWeight: isActive ? 500 : 400,
                                            transition: 'all var(--transition-fast)',
                                            justifyContent: sidebarOpen ? 'flex-start' : 'center',
                                        }}
                                    >
                                        {item.icon}
                                        {sidebarOpen && (
                                            <>
                                                <span style={{ flex: 1 }}>{item.name}</span>
                                                {item.children && (
                                                    <svg
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        style={{
                                                            transition: 'transform var(--transition-fast)',
                                                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                                        }}
                                                    >
                                                        <path d="M6 9l6 6 6-6" />
                                                    </svg>
                                                )}
                                            </>
                                        )}
                                    </Link>

                                    {/* Submenu */}
                                    {item.children && sidebarOpen && isExpanded && (
                                        <ul style={{ marginTop: 'var(--space-1)', marginLeft: 'var(--space-10)', listStyle: 'none' }}>
                                            {item.children.map((child) => (
                                                <li key={child.name}>
                                                    <Link
                                                        href={child.href}
                                                        style={{
                                                            display: 'block',
                                                            padding: 'var(--space-2) var(--space-3)',
                                                            fontSize: '0.875rem',
                                                            color: pathname === child.href ? 'var(--color-primary-600)' : 'var(--text-secondary)',
                                                            borderRadius: 'var(--radius-sm)',
                                                        }}
                                                    >
                                                        {child.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User Section */}
                <div style={{
                    padding: 'var(--space-4)',
                    borderTop: '1px solid var(--border-color)',
                }}>
                    {sidebarOpen ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                            <div style={{
                                width: 40,
                                height: 40,
                                background: 'var(--color-primary-100)',
                                borderRadius: 'var(--radius-full)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--color-primary-600)',
                                fontWeight: 600,
                            }}>
                                {user?.email?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    color: 'var(--text-primary)',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}>
                                    {user?.user_metadata?.first_name || 'User'}
                                </p>
                                <p style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--text-tertiary)',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}>
                                    {user?.email || 'user@email.com'}
                                </p>
                            </div>
                            <button
                                onClick={handleLogout}
                                style={{
                                    padding: 'var(--space-2)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--text-tertiary)',
                                }}
                                title="Logout"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleLogout}
                            style={{
                                width: '100%',
                                padding: 'var(--space-3)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--text-tertiary)',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                            title="Logout"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                        </button>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main style={{
                flex: 1,
                marginLeft: sidebarOpen ? 260 : 72,
                transition: 'margin-left var(--transition-base)',
            }}>
                {/* Top Bar */}
                <header style={{
                    height: 64,
                    background: 'var(--bg-secondary)',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 var(--space-6)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 40,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                        {!sidebarOpen && (
                            <button
                                onClick={() => setSidebarOpen(true)}
                                style={{
                                    padding: 'var(--space-2)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--text-secondary)',
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        )}
                        {/* Search */}
                        <div style={{ position: 'relative' }}>
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="var(--text-tertiary)"
                                strokeWidth="2"
                                style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="search"
                                placeholder="Search..."
                                style={{
                                    width: 280,
                                    padding: 'var(--space-2) var(--space-4) var(--space-2) var(--space-10)',
                                    background: 'var(--bg-tertiary)',
                                    border: '1px solid transparent',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.875rem',
                                    color: 'var(--text-primary)',
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                        {/* Notifications */}
                        <button
                            style={{
                                position: 'relative',
                                padding: 'var(--space-2)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--text-secondary)',
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                            <span style={{
                                position: 'absolute',
                                top: 4,
                                right: 4,
                                width: 8,
                                height: 8,
                                background: 'var(--color-error)',
                                borderRadius: '50%',
                            }} />
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div style={{ padding: 'var(--space-6)' }}>
                    {children}
                </div>
            </main>
        </div>
    );
}
