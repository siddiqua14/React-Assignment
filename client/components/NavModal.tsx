// components/NavModal.tsx
import React, { useState } from 'react';
import styles from '../components/css/NavModal.module.css';
import { regionsWithCurrencies } from './constants'; // Importing regionsWithCurrencies
import { FaExclamationTriangle } from 'react-icons/fa';
// Type definitions
interface NavModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (region: string, currency: string) => void; // Correctly typed prop
    currentRegion: string;
}
const NavModal: React.FC<NavModalProps> = ({ isOpen, onClose, onSave, currentRegion }) => {
    const [selectedRegion, setSelectedRegion] = useState<string>(currentRegion);
    const [currency, setCurrency] = useState<string>(regionsWithCurrencies[currentRegion]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className={styles.title}>Display settings</h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-xl px-2"
                        aria-label="Close modal"
                    >
                        ×
                    </button>
                </div>

                <div className="warning-message p-4 mb-4">
                    <h3 className="flex items-center text-gray-900 font-medium">
                        <FaExclamationTriangle aria-hidden="true" />
                        Changing your region could change your rewards program
                    </h3>
                    <p className="text-gray-700 text-sm mt-1">
                        To stay with your current rewards program, keep your region the same. One Key is currently only available in select regions.
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="region-select"  className="block text-sm font-medium text-gray-700 mb-1">
                            Region
                        </label>
                        <select
                            id="region-select"
                            value={selectedRegion}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                setSelectedRegion(e.target.value);
                                setCurrency(regionsWithCurrencies[e.target.value]);
                            }}
                            className="w-full p-2 border border-gray-300 text-gray-500 rounded-md"
                        >
                            {Object.keys(regionsWithCurrencies).map((region) => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="currency-input" className="block text-sm font-medium text-gray-700 mb-1">
                            Currency
                        </label>
                        <input
                            type="text"
                            id="currency-input"
                            value={currency}
                            disabled
                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-400"
                        />
                    </div>

                    <button
                        onClick={() => {
                            onSave(selectedRegion, currency);
                            onClose();
                        }}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};
export default NavModal;