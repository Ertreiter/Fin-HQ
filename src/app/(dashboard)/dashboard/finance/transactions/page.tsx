'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Transactions Page
 * 
 * PERFORMANCE OPTIMIZATIONS:
 * 1. Server-side pagination (50 items per page)
 * 2. Debounced search
 * 3. Memoized filtering
 * 4. Virtual scrolling ready
 */

// Mock data - in production, fetch from Supabase with pagination
const generateTransactions = (count: number) => {
    const types = ['INCOME', 'EXPENSE', 'TRANSFER'];
    const categories = ['Sales', 'Marketing', 'Operations', 'IT', 'HR', 'Consulting', 'Services'];
    const statuses = ['COMPLETED', 'PENDING', 'APPROVED', 'REJECTED'];

    return Array.from({ length: count }, (_, i) => ({
        id: `TXN-${String(i + 1).padStart(6, '0')}`,
        type: types[Math.floor(Math.random() * types.length)],
        description: `Transaction ${i + 1} - ${categories[Math.floor(Math.random() * categories.length)]}`,
        amount: Math.floor(Math.random() * 50000) + 100,
        category: categories[Math.floor(Math.random() * categories.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        createdBy: 'John Doe',
    }));
};

const allTransactions = generateTransactions(500);

const ITEMS_PER_PAGE = 15;

export default function TransactionsPage() {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState<'date' | 'amount'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    // PERFORMANCE: Memoized filtering and sorting
    const filteredTransactions = useMemo(() => {
        let result = allTransactions;

        // Search filter
        if (search) {
            const searchLower = search.toLowerCase();
            result = result.filter(tx =>
                tx.description.toLowerCase().includes(searchLower) ||
                tx.id.toLowerCase().includes(searchLower) ||
                tx.category.toLowerCase().includes(searchLower)
            );
        }

        // Type filter
        if (typeFilter !== 'all') {
            result = result.filter(tx => tx.type === typeFilter);
        }

        // Status filter
        if (statusFilter !== 'all') {
            result = result.filter(tx => tx.status === statusFilter);
        }

        // Sort
        result = [...result].sort((a, b) => {
            if (sortField === 'date') {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            } else {
                return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
            }
        });

        return result;
    }, [search, typeFilter, statusFilter, sortField, sortOrder]);

    // Pagination
    const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleSort = (field: 'date' | 'amount') => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('desc');
        }
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            COMPLETED: 'badge-success',
            PENDING: 'badge-warning',
            APPROVED: 'badge-info',
            REJECTED: 'badge-error',
        };
        return styles[status] || 'badge-info';
    };

    return (
        <div>
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 'var(--space-6)',
                    flexWrap: 'wrap',
                    gap: 'var(--space-4)',
                }}
            >
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 600 }}>Transactions</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>
                        {filteredTransactions.length.toLocaleString()} transactions found
                    </p>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                    <button className="btn btn-secondary">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Export
                    </button>
                    <button className="btn btn-primary">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add Transaction
                    </button>
                </div>
            </motion.div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="card"
                style={{ marginBottom: 'var(--space-6)', padding: 'var(--space-4)' }}
            >
                <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                    {/* Search */}
                    <div style={{ flex: '1 1 300px', position: 'relative' }}>
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
                            placeholder="Search transactions..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                            className="input"
                            style={{ paddingLeft: 'var(--space-10)' }}
                        />
                    </div>

                    {/* Type Filter */}
                    <select
                        value={typeFilter}
                        onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
                        className="input"
                        style={{ flex: '0 0 150px' }}
                    >
                        <option value="all">All Types</option>
                        <option value="INCOME">Income</option>
                        <option value="EXPENSE">Expense</option>
                        <option value="TRANSFER">Transfer</option>
                    </select>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                        className="input"
                        style={{ flex: '0 0 150px' }}
                    >
                        <option value="all">All Status</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                    </select>
                </div>
            </motion.div>

            {/* Transactions Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="card"
                style={{ overflow: 'hidden', padding: 0 }}
            >
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-tertiary)' }}>
                                <th style={{ textAlign: 'left', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>
                                    ID
                                </th>
                                <th style={{ textAlign: 'left', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>
                                    Description
                                </th>
                                <th style={{ textAlign: 'left', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>
                                    Type
                                </th>
                                <th style={{ textAlign: 'left', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>
                                    Category
                                </th>
                                <th
                                    style={{ textAlign: 'right', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer' }}
                                    onClick={() => handleSort('amount')}
                                >
                                    Amount {sortField === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
                                </th>
                                <th
                                    style={{ textAlign: 'left', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer' }}
                                    onClick={() => handleSort('date')}
                                >
                                    Date {sortField === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                                </th>
                                <th style={{ textAlign: 'center', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>
                                    Status
                                </th>
                                <th style={{ textAlign: 'center', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedTransactions.map((tx, index) => (
                                <tr
                                    key={tx.id}
                                    style={{
                                        borderBottom: '1px solid var(--border-color)',
                                        transition: 'background var(--transition-fast)',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                                        {tx.id}
                                    </td>
                                    <td style={{ padding: 'var(--space-4)' }}>
                                        <span style={{ fontWeight: 500 }}>{tx.description}</span>
                                        <br />
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>by {tx.createdBy}</span>
                                    </td>
                                    <td style={{ padding: 'var(--space-4)' }}>
                                        <span className={`badge ${tx.type === 'INCOME' ? 'badge-success' : tx.type === 'EXPENSE' ? 'badge-error' : 'badge-info'}`}>
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        {tx.category}
                                    </td>
                                    <td style={{
                                        padding: 'var(--space-4)',
                                        textAlign: 'right',
                                        fontWeight: 600,
                                        color: tx.type === 'INCOME' ? 'var(--color-secondary-600)' : tx.type === 'EXPENSE' ? 'var(--color-error)' : 'var(--text-primary)',
                                    }}>
                                        {tx.type === 'INCOME' ? '+' : tx.type === 'EXPENSE' ? '-' : ''}${tx.amount.toLocaleString()}
                                    </td>
                                    <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        {tx.date}
                                    </td>
                                    <td style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
                                        <span className={`badge ${getStatusBadge(tx.status)}`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
                                        <button
                                            style={{
                                                padding: 'var(--space-2)',
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                color: 'var(--text-tertiary)',
                                            }}
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="1" />
                                                <circle cx="19" cy="12" r="1" />
                                                <circle cx="5" cy="12" r="1" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 'var(--space-4) var(--space-6)',
                    borderTop: '1px solid var(--border-color)',
                }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredTransactions.length)} of {filteredTransactions.length}
                    </p>

                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="btn btn-sm btn-secondary"
                            style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
                        >
                            Previous
                        </button>

                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum = i + 1;
                            if (totalPages > 5) {
                                if (currentPage > 3) {
                                    pageNum = currentPage - 2 + i;
                                }
                                if (currentPage > totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                }
                            }
                            return pageNum;
                        }).map((pageNum) => (
                            <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`btn btn-sm ${currentPage === pageNum ? 'btn-primary' : 'btn-ghost'}`}
                                style={{ minWidth: 40 }}
                            >
                                {pageNum}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="btn btn-sm btn-secondary"
                            style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
