// components/ShareModal.tsx
import React from 'react';
import styles from './Header.module.css'; // Importing styles
import Image from 'next/image';

interface ShareModalProps {
    onClose: () => void;
    propertyInfo: {
        title: string;
        location: string;
        rating: string;
        imageUrl: string;
    };
}

const ShareModal: React.FC<ShareModalProps> = ({ onClose, propertyInfo }) => {
    const [copied, setCopied] = React.useState(false);
    const shareUrl = "https://example.com/property/juneau-vacation";

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareOptions = [
        { platform: 'messages', icon: '/icons/messages.png', label: 'Messages' },
        { platform: 'whatsapp', icon: '/icons/whatsapp_3536445.png', label: 'WhatsApp' },
        { platform: 'messenger', icon: '/icons/messenger.png', label: 'Messenger' },
        { platform: 'facebook', icon: '/icons/facebook.png', label: 'Facebook' },
        { platform: 'instagram', icon: '/icons/instagram.png', label: 'Instagram' },
        { platform: 'x', icon: '/icons/twitter.png', label: 'X' }
    ];

    const handleShare = (platform: string) => {
        // Implement sharing logic here
        console.log(`Sharing via ${platform}`);
    };

    return (
        <div className={styles.customShareOverlay} onClick={onClose}>
            <div className={styles.customShareModal} onClick={e => e.stopPropagation()}>
                {/* Modal Header */}
                <div className={styles.customModalHeader}>
                    <div className={styles.modalTitle}>Share</div>
                    <button className={styles.customCloseBtn} onClick={onClose}>✕</button>
                </div>

                <div className={styles.propertyPreview}>
                    <Image
                        src={propertyInfo.imageUrl}
                        alt="Property"
                        width={100}
                        height={100}
                        className={styles.previewImage}
                    />
                    <div className={styles.previewInfo}>
                        <h3>{propertyInfo.title}</h3>
                        <p>{propertyInfo.location}</p>
                        <p>{propertyInfo.rating}</p>
                    </div>
                </div>

                <div className={styles.shareOptions}>
                    {shareOptions.map(option => (
                        <button
                            key={option.platform}
                            className={styles.shareOption}
                            onClick={() => handleShare(option.platform)}
                        >
                            <div className={styles.shareIcon}>
                                <Image
                                    src={option.icon}
                                    alt={option.label}
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <span className={styles.shareLabel}>{option.label}</span>
                        </button>
                    ))}
                </div>

                <div className={styles.copyLink}>
                    <span className={styles.linkText}>{shareUrl}</span>
                    <button
                        className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
                        onClick={handleCopyLink}
                    >
                        {copied ? 'Copied!' : 'Copy link'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;