import React, {useEffect, useState} from 'react';
import './CountdownTimer.css';

const CountdownTimer = ({futureDate}) => {
    const calculateTimeLeft = () => {
        const difference = futureDate.getTime() - new Date().getTime();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const formatTime = (time) => {
        if (!time || Object.keys(time).length === 0) {
            return '00d 00h 00m 00s';
        }

        return `${time.days.toString().padStart(2, '0')}d ${time.hours.toString().padStart(2, '0')}h ${time.minutes.toString().padStart(2, '0')}m ${time.seconds.toString().padStart(2, '0')}s`;
    };


    return (
        <div className="countdown-timer">
            Time left: <span className="timer">{formatTime(timeLeft)}</span>
        </div>
    );
};

export default CountdownTimer;
