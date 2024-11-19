// components/Tabs.tsx
import React, { useState } from 'react';
import styles from '../components/css/Header.module.css'; // Create this CSS module for styling

const Tabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Overview');

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'amenities', label: 'Amenities' },
        { id: 'policies', label: 'Policies' },
    ];

    const handleTabClick = (tabLabel: string) => {
        setActiveTab(tabLabel);
    };

    return (
        <div>
            <div className={styles.tabs}>
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`${styles.tab} ${activeTab === tab.label ? styles.active : ''}`}
                        onClick={() => handleTabClick(tab.label)}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>
            <div className={styles.content}>
                {activeTab === 'Overview' && <div></div>}
                {activeTab === 'Amenities' && <div></div>}
                {activeTab === 'Policies' && <div></div>}
            </div>
        </div>
    );
};

export default Tabs;