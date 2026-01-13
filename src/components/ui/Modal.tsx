'use client';

import { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg';
}

/**
 * Reusable Modal Component
 * PERFORMANCE: Uses CSS transforms for smooth animations
 */
export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
    if (!isOpen) return null;

    const widths = { sm: 400, md: 500, lg: 700 };

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--space-4)',
            }}
        >
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(4px)',
                }}
            />

            {/* Modal Content */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: widths[size],
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    animation: 'slideUp 0.2s ease-out',
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 'var(--space-4) var(--space-6)',
                        borderBottom: '1px solid var(--border-color)',
                    }}
                >
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{title}</h2>
                    <button
                        onClick={onClose}
                        style={{
                            padding: 'var(--space-2)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--text-tertiary)',
                            borderRadius: 'var(--radius-md)',
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: 'var(--space-6)' }}>{children}</div>
            </div>
        </div>
    );
}
