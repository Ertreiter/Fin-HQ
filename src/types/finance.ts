/**
 * Finance-related types
 */

export type TransactionType = 'INCOME' | 'EXPENSE' | 'TRANSFER';
export type TransactionStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';

export interface Transaction {
    id: string;
    type: TransactionType;
    amount: number;
    description: string;
    category: string;
    status: TransactionStatus;
    created_by: string;
    approved_by?: string;
    reference_number?: string;
    notes?: string;
    attachments?: string[];
    created_at: string;
    updated_at: string;
}

export interface Invoice {
    id: string;
    invoice_number: string;
    client_name: string;
    client_email?: string;
    amount: number;
    tax_amount: number;
    total_amount: number;
    status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED';
    due_date: string;
    paid_date?: string;
    items: InvoiceItem[];
    created_by: string;
    created_at: string;
    updated_at: string;
}

export interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    unit_price: number;
    total: number;
}

export interface Budget {
    id: string;
    name: string;
    department?: string;
    allocated_amount: number;
    spent_amount: number;
    remaining_amount: number;
    period_start: string;
    period_end: string;
    status: 'ACTIVE' | 'EXCEEDED' | 'CLOSED';
    created_by: string;
    created_at: string;
    updated_at: string;
}

export interface Expense {
    id: string;
    title: string;
    amount: number;
    category: string;
    vendor?: string;
    receipt_url?: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'REIMBURSED';
    submitted_by: string;
    approved_by?: string;
    submitted_at: string;
    approved_at?: string;
}

// Dashboard analytics types
export interface FinancialSummary {
    total_revenue: number;
    total_expenses: number;
    net_profit: number;
    pending_invoices: number;
    pending_approvals: number;
    budget_utilization: number;
}

export interface ChartDataPoint {
    date: string;
    value: number;
    label?: string;
}

export interface CategoryBreakdown {
    category: string;
    amount: number;
    percentage: number;
    color: string;
}
