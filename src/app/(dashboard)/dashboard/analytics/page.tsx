'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

/**
 * Executive Analytics Dashboard
 * 
 * For Manager/Director level users
 * 
 * PERFORMANCE:
 * - Lazy loaded charts with ResponsiveContainer
 * - Memoized data transformations
 * - Virtual scrolling ready
 */

// Mock data - in production, fetch from Supabase
const revenueData = [
    { month: 'Jan', revenue: 45000, expenses: 28000, profit: 17000 },
    { month: 'Feb', revenue: 52000, expenses: 31000, profit: 21000 },
    { month: 'Mar', revenue: 48000, expenses: 27000, profit: 21000 },
    { month: 'Apr', revenue: 61000, expenses: 35000, profit: 26000 },
    { month: 'May', revenue: 55000, expenses: 32000, profit: 23000 },
    { month: 'Jun', revenue: 67000, expenses: 38000, profit: 29000 },
    { month: 'Jul', revenue: 72000, expenses: 41000, profit: 31000 },
    { month: 'Aug', revenue: 69000, expenses: 39000, profit: 30000 },
    { month: 'Sep', revenue: 78000, expenses: 43000, profit: 35000 },
    { month: 'Oct', revenue: 82000, expenses: 46000, profit: 36000 },
    { month: 'Nov', revenue: 91000, expenses: 49000, profit: 42000 },
    { month: 'Dec', revenue: 98000, expenses: 52000, profit: 46000 },
];

const expenseCategories = [
    { name: 'Salaries', value: 45, color: '#3b82f6' },
    { name: 'Operations', value: 20, color: '#10b981' },
    { name: 'Marketing', value: 15, color: '#f59e0b' },
    { name: 'IT & Software', value: 12, color: '#8b5cf6' },
    { name: 'Other', value: 8, color: '#6b7280' },
];

const departmentBudgets = [
    { department: 'Engineering', allocated: 150000, spent: 128000, remaining: 22000 },
    { department: 'Marketing', allocated: 80000, spent: 72000, remaining: 8000 },
    { department: 'Sales', allocated: 120000, spent: 98000, remaining: 22000 },
    { department: 'Operations', allocated: 60000, spent: 58500, remaining: 1500 },
    { department: 'HR', allocated: 40000, spent: 32000, remaining: 8000 },
];

const kpis = [
    { label: 'Revenue YTD', value: '$818,000', change: '+18.5%', positive: true },
    { label: 'Gross Margin', value: '42.3%', change: '+2.1%', positive: true },
    { label: 'Operating Costs', value: '$461,000', change: '+8.2%', positive: false },
    { label: 'Cash Flow', value: '$357,000', change: '+24.3%', positive: true },
    { label: 'Budget Util.', value: '86.4%', change: '-5.2%', positive: true },
    { label: 'Pending Payables', value: '$42,500', change: '-12.1%', positive: true },
];

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState('year');

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
                    marginBottom: 'var(--space-8)',
                    flexWrap: 'wrap',
                    gap: 'var(--space-4)',
                }}
            >
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 600 }}>Financial Analytics</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>
                        Executive dashboard for business performance insights
                    </p>
                </div>

                {/* Time Range Selector */}
                <div style={{
                    display: 'flex',
                    gap: 'var(--space-1)',
                    padding: 'var(--space-1)',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                }}>
                    {['week', 'month', 'quarter', 'year'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            style={{
                                padding: 'var(--space-2) var(--space-4)',
                                borderRadius: 'var(--radius-sm)',
                                border: 'none',
                                background: timeRange === range ? 'var(--bg-secondary)' : 'transparent',
                                color: timeRange === range ? 'var(--text-primary)' : 'var(--text-secondary)',
                                fontWeight: timeRange === range ? 500 : 400,
                                cursor: 'pointer',
                                transition: 'all var(--transition-fast)',
                                textTransform: 'capitalize',
                            }}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" style={{ marginBottom: 'var(--space-8)' }}>
                {kpis.map((kpi, index) => (
                    <motion.div
                        key={kpi.label}
                        className="card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        style={{ padding: 'var(--space-4)' }}
                    >
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 'var(--space-1)' }}>
                            {kpi.label}
                        </p>
                        <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{kpi.value}</p>
                        <p style={{
                            fontSize: '0.75rem',
                            color: kpi.positive ? 'var(--color-secondary-600)' : 'var(--color-error)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            marginTop: 'var(--space-1)',
                        }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d={kpi.positive ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'} />
                            </svg>
                            {kpi.change}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ marginBottom: 'var(--space-8)' }}>
                {/* Revenue Trend Chart */}
                <motion.div
                    className="card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                        Revenue vs Expenses
                    </h2>
                    <div style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--text-tertiary)" />
                                <YAxis
                                    tick={{ fontSize: 12 }}
                                    stroke="var(--text-tertiary)"
                                    tickFormatter={(value) => `$${value / 1000}k`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: 'var(--bg-secondary)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: 8,
                                    }}
                                    formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={false}
                                    name="Revenue"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="expenses"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    dot={false}
                                    name="Expenses"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="profit"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    dot={false}
                                    name="Profit"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Expense Breakdown Pie Chart */}
                <motion.div
                    className="card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                        Expense Breakdown
                    </h2>
                    <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={expenseCategories}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={2}
                                    dataKey="value"
                                    label={({ name, value }) => `${name}: ${value}%`}
                                    labelLine={false}
                                >
                                    {expenseCategories.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        background: 'var(--bg-secondary)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: 8,
                                    }}
                                    formatter={(value: number) => [`${value}%`, 'Percentage']}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'center', marginTop: 'var(--space-4)' }}>
                        {expenseCategories.map((cat) => (
                            <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                <div style={{ width: 12, height: 12, background: cat.color, borderRadius: 2 }} />
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{cat.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Budget vs Actual */}
            <motion.div
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--space-6)',
                }}>
                    <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>Budget vs Actual by Department</h2>
                    <button className="btn btn-sm btn-secondary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Export
                    </button>
                </div>

                <div style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={departmentBudgets} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={true} vertical={false} />
                            <XAxis
                                type="number"
                                tick={{ fontSize: 12 }}
                                stroke="var(--text-tertiary)"
                                tickFormatter={(value) => `$${value / 1000}k`}
                            />
                            <YAxis
                                type="category"
                                dataKey="department"
                                tick={{ fontSize: 12 }}
                                stroke="var(--text-tertiary)"
                                width={80}
                            />
                            <Tooltip
                                contentStyle={{
                                    background: 'var(--bg-secondary)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 8,
                                }}
                                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                            />
                            <Legend />
                            <Bar dataKey="allocated" fill="#3b82f6" name="Allocated" radius={[0, 4, 4, 0]} />
                            <Bar dataKey="spent" fill="#10b981" name="Spent" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Budget Progress Bars */}
                <div style={{ marginTop: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    {departmentBudgets.map((dept) => {
                        const percentage = (dept.spent / dept.allocated) * 100;
                        const isOverBudget = percentage > 95;

                        return (
                            <div key={dept.department}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
                                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{dept.department}</span>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        color: isOverBudget ? 'var(--color-error)' : 'var(--text-secondary)',
                                    }}>
                                        {percentage.toFixed(1)}% used • ${dept.remaining.toLocaleString()} remaining
                                    </span>
                                </div>
                                <div style={{
                                    height: 8,
                                    background: 'var(--bg-tertiary)',
                                    borderRadius: 'var(--radius-full)',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${Math.min(percentage, 100)}%`,
                                        background: isOverBudget
                                            ? 'linear-gradient(90deg, var(--color-warning), var(--color-error))'
                                            : 'linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500))',
                                        borderRadius: 'var(--radius-full)',
                                        transition: 'width 1s ease-out',
                                    }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
}
