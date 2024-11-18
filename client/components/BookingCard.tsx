import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';

const BookingCard: React.FC = () => {
    const [adultsCount, setAdultsCount] = useState<number>(2);
    const [childrenCount, setChildrenCount] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [showTravelersContent, setShowTravelersContent] = useState<boolean>(false);
    const [isPetsChecked, setIsPetsChecked] = useState<boolean>(false);

    useEffect(() => {
        // Load saved values from localStorage
        const savedAdults = localStorage.getItem('travelers_adults');
        const savedChildren = localStorage.getItem('travelers_children');

        if (savedAdults) setAdultsCount(parseInt(savedAdults, 10));
        if (savedChildren) setChildrenCount(parseInt(savedChildren, 10));
    }, []);

    const updateCount = (type: 'adults' | 'children', increment: boolean): void => {
        if (type === 'adults') {
            const newCount = increment ? adultsCount + 1 : Math.max(1, adultsCount - 1);
            setAdultsCount(newCount);
            localStorage.setItem('travelers_adults', newCount.toString());
        } else {
            const newCount = increment ? childrenCount + 1 : Math.max(0, childrenCount - 1);
            setChildrenCount(newCount);
            localStorage.setItem('travelers_children', newCount.toString());
        }
    };

    const formatDate = (date: string): string => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const calculateTotal = (): number => {
        const basePrice = 134;
        const nights =
            endDate && startDate
                ? Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24))
                : 4; // Default to 4 nights if no dates selected
        return basePrice * nights;
    };

    return (
        <div className={styles.bookingCard}>
            <div className={styles.memberBanner}>
                <div className={styles.bannerContainer}>
                    <div className={styles.iconColumn}>
                        <img src="/img/Capture.PNG" alt="Loading icon" className={styles.loadingIcon} />
                    </div>
                    <div className={styles.contentColumn}>
                        <p>Members get our best prices when signed in!</p>
                        <button className={styles.signInBtn}>Sign in</button>
                    </div>
                </div>
            </div>

            <div className={styles.booking}>
                <div className={styles.priceSection}>
                    <h2>
                        $134 <span>per night</span>
                    </h2>
                </div>

                <div className={styles.cancellationInfo}>
                    <span className={styles.infoIcon}>ⓘ</span>
                    <p className={styles.nonRefundable}>Non-refundable</p>
                </div>

                <div className={styles.availabilityStatus}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>Your dates are available</span>
                </div>

                <div className={styles.dates}>
                    <div className={styles.dateInput}>
                        <label>Start date</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="date"
                                value={startDate}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={(e) => {
                                    setStartDate(e.target.value);
                                    if (!endDate || new Date(e.target.value) > new Date(endDate)) {
                                        setEndDate(e.target.value);
                                    }
                                }}
                                data-formatted={formatDate(startDate)}
                            />
                        </div>
                    </div>
                    <div className={styles.dateInput}>
                        <label>End date</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="date"
                                value={endDate}
                                min={startDate || new Date().toISOString().split('T')[0]}
                                onChange={(e) => setEndDate(e.target.value)}
                                data-formatted={formatDate(endDate)}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.travelersSection}>
                    <div
                        className={styles.travelersInput}
                        onClick={() => setShowTravelersContent(!showTravelersContent)}
                    >
                        <input type="text" readOnly value={`${adultsCount + childrenCount} travelers`} />
                    </div>

                    <div
                        className={`${styles.travelersContent} ${showTravelersContent ? styles.active : ''
                            }`}
                    >
                        <div className={styles.travelerType}>
                            <div className={styles.travelerLabel}>Adults</div>
                            <div className={styles.travelerControls}>
                                <button
                                    className={styles.travelerBtn}
                                    onClick={() => updateCount('adults', false)}
                                    disabled={adultsCount <= 1}
                                >
                                    −
                                </button>
                                <span className={styles.travelerCount}>{adultsCount}</span>
                                <button className={styles.travelerBtn} onClick={() => updateCount('adults', true)}>
                                    +
                                </button>
                            </div>
                        </div>

                        <div className={styles.travelerType}>
                            <div className={styles.travelerLabel}>
                                <span>Children</span>
                                <span className={styles.ageInfo}>Ages 0-17</span>
                            </div>
                            <div className={styles.travelerControls}>
                                <button
                                    className={`${styles.travelerBtn} ${childrenCount === 0 ? styles.disabled : ''
                                        }`}
                                    onClick={() => updateCount('children', false)}
                                    disabled={childrenCount === 0}
                                >
                                    −
                                </button>
                                <span className={styles.travelerCount}>{childrenCount}</span>
                                <button className={styles.travelerBtn} onClick={() => updateCount('children', true)}>
                                    +
                                </button>
                            </div>
                        </div>

                        <div className={styles.petsOption}>
                            <label className={styles.checkboxContainer}>
                                <input
                                    type="checkbox"
                                    checked={isPetsChecked}
                                    onChange={() => setIsPetsChecked(!isPetsChecked)}
                                />
                                <span className={styles.checkboxText}>I am traveling with pets</span>
                            </label>
                        </div>

                        <button className={styles.doneBtn} onClick={() => setShowTravelersContent(false)}>
                            Done
                        </button>
                    </div>
                </div>

                {!showTravelersContent && (
                    <>
                        <div className={styles.totalSection}>
                            <div className={styles.totalRow}>
                                <span>Total</span>
                                <span className={styles.totalAmount}>${calculateTotal()}</span>
                            </div>
                            <div className={styles.totalNote}>
                                Total includes fees, not tax
                                <a href="#" className={styles.priceDetails}>
                                    Price details
                                </a>
                            </div>
                        </div>

                        <button className={styles.bookNowBtn}>Book now</button>
                        <p className={styles.chargeNotice}>You will not be charged yet</p>
                    </>
                )}
            </div>

            <div className={styles.container}>
                <a href="#" className={styles.contactLink}>
                    Contact host
                </a>
                <div className={styles.propertyId}>Property # 0832810-fha</div>
            </div>
        </div>
    );
};

export default BookingCard;
