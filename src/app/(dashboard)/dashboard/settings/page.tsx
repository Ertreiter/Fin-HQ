'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Settings Page - User preferences and account settings
 */

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@company.com',
        phone: '+1 (555) 123-4567',
        timezone: 'America/New_York',
        language: 'en',
        emailNotifications: true,
        pushNotifications: false,
        twoFactorEnabled: false,
    });

    const tabs = [
        { id: 'profile', label: 'Profile', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
        { id: 'security', label: 'Security', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg> },
        { id: 'notifications', label: 'Notifications', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg> },
        { id: 'preferences', label: 'Preferences', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg> },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    return (
        <div>
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 'var(--space-6)' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 600 }}>Settings</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>Manage your account settings and preferences</p>
            </motion.div>

            <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
                {/* Sidebar Tabs */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ width: 220, flexShrink: 0 }}>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                        {tabs.map((tab) => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)', border: 'none', background: activeTab === tab.id ? 'var(--color-primary-50)' : 'transparent', color: activeTab === tab.id ? 'var(--color-primary-600)' : 'var(--text-secondary)', fontWeight: activeTab === tab.id ? 500 : 400, cursor: 'pointer', transition: 'all var(--transition-fast)', textAlign: 'left' }}>
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </motion.div>

                {/* Content */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card" style={{ flex: 1, minWidth: 300, padding: 'var(--space-6)' }}>
                    {activeTab === 'profile' && (
                        <div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 'var(--space-6)' }}>Profile Information</h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
                                <div style={{ width: 80, height: 80, borderRadius: 'var(--radius-full)', background: 'var(--color-primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-600)', fontSize: '1.5rem', fontWeight: 600 }}>JD</div>
                                <div>
                                    <button className="btn btn-secondary btn-sm">Change Avatar</button>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 'var(--space-2)' }}>JPG, GIF or PNG. Max size 2MB.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">First Name</label>
                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input" />
                                </div>
                                <div>
                                    <label className="label">Last Name</label>
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input" />
                                </div>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label className="label">Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="input" />
                                </div>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label className="label">Phone</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input" />
                                </div>
                            </div>
                            <div style={{ marginTop: 'var(--space-6)', display: 'flex', justifyContent: 'flex-end' }}>
                                <button className="btn btn-primary">Save Changes</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 'var(--space-6)' }}>Security Settings</h2>
                            <div style={{ marginBottom: 'var(--space-8)' }}>
                                <h3 style={{ fontWeight: 500, marginBottom: 'var(--space-4)' }}>Change Password</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 400 }}>
                                    <div><label className="label">Current Password</label><input type="password" className="input" placeholder="••••••••" /></div>
                                    <div><label className="label">New Password</label><input type="password" className="input" placeholder="••••••••" /></div>
                                    <div><label className="label">Confirm New Password</label><input type="password" className="input" placeholder="••••••••" /></div>
                                    <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Update Password</button>
                                </div>
                            </div>
                            <div style={{ paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border-color)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ fontWeight: 500 }}>Two-Factor Authentication</h3>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>Add an extra layer of security to your account</p>
                                    </div>
                                    <button className={`btn ${formData.twoFactorEnabled ? 'btn-secondary' : 'btn-primary'}`}>{formData.twoFactorEnabled ? 'Disable' : 'Enable'} 2FA</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 'var(--space-6)' }}>Notification Preferences</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                                {[
                                    { id: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates and alerts via email' },
                                    { id: 'pushNotifications', label: 'Push Notifications', description: 'Get notified in your browser' },
                                ].map((item) => (
                                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                                        <div>
                                            <h3 style={{ fontWeight: 500 }}>{item.label}</h3>
                                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{item.description}</p>
                                        </div>
                                        <label style={{ position: 'relative', width: 48, height: 24, cursor: 'pointer' }}>
                                            <input type="checkbox" name={item.id} checked={formData[item.id as keyof typeof formData] as boolean} onChange={handleChange} style={{ opacity: 0, width: 0, height: 0 }} />
                                            <span style={{ position: 'absolute', inset: 0, background: formData[item.id as keyof typeof formData] ? 'var(--color-primary-500)' : 'var(--color-neutral-300)', borderRadius: 'var(--radius-full)', transition: 'all var(--transition-fast)' }} />
                                            <span style={{ position: 'absolute', left: formData[item.id as keyof typeof formData] ? 26 : 2, top: 2, width: 20, height: 20, background: 'white', borderRadius: '50%', transition: 'all var(--transition-fast)', boxShadow: 'var(--shadow-sm)' }} />
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'preferences' && (
                        <div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 'var(--space-6)' }}>Preferences</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 400 }}>
                                <div>
                                    <label className="label">Language</label>
                                    <select name="language" value={formData.language} onChange={handleChange} className="input">
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="fr">French</option>
                                        <option value="de">German</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="label">Timezone</label>
                                    <select name="timezone" value={formData.timezone} onChange={handleChange} className="input">
                                        <option value="America/New_York">Eastern Time (ET)</option>
                                        <option value="America/Chicago">Central Time (CT)</option>
                                        <option value="America/Denver">Mountain Time (MT)</option>
                                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                                        <option value="Europe/London">London (GMT)</option>
                                        <option value="Asia/Tokyo">Tokyo (JST)</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ marginTop: 'var(--space-6)', display: 'flex', justifyContent: 'flex-end' }}>
                                <button className="btn btn-primary">Save Preferences</button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
