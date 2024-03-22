import React from 'react';
import ChartComponent from "./ChartComponent";

const ReportContainer = () => {
    const quizzes = [
        {
            startTime: new Date(2023, 5, 15, 10, 30), // Example: June 15, 2023, 10:30 AM
            duration: 45, // Duration in minutes
            percentage: 80,
            userFullName: "John Doe",
            endTime: new Date(2023, 5, 15, 11, 15), // Example: June 15, 2023, 11:15 AM
        },
        {
            startTime: new Date(2023, 6, 1, 9, 0), // Example: July 1, 2023, 9:00 AM
            duration: 60,
            percentage: 75,
            userFullName: "Jane Smith",
            endTime: new Date(2023, 6, 1, 10, 0), // Example: July 1, 2023, 10:00 AM
        },
        {
            startTime: new Date(2023, 7, 10, 14, 15), // Example: August 10, 2023, 2:15 PM
            duration: 30,
            percentage: 90,
            userFullName: "Michael Johnson",
            endTime: new Date(2023, 7, 10, 14, 45), // Example: August 10, 2023, 2:45 PM
        },
        {
            startTime: new Date(2023, 8, 5, 8, 0), // Example: September 5, 2023, 8:00 AM
            duration: 45,
            percentage: 85,
            userFullName: "Emily Davis",
            endTime: new Date(2023, 8, 5, 8, 45), // Example: September 5, 2023, 8:45 AM
        },
        {
            startTime: new Date(2023, 9, 20, 13, 0), // Example: October 20, 2023, 1:00 PM
            duration: 60,
            percentage: 70,
            userFullName: "David Williams",
            endTime: new Date(2023, 9, 20, 14, 0), // Example: October 20, 2023, 2:00 PM
        },
        {
            startTime: new Date(2023, 10, 8, 11, 30), // Example: November 8, 2023, 11:30 AM
            duration: 40,
            percentage: 95,
            userFullName: "Emma Brown",
            endTime: new Date(2023, 10, 8, 12, 10), // Example: November 8, 2023, 12:10 PM
        },
        {
            startTime: new Date(2023, 11, 3, 15, 15), // Example: December 3, 2023, 3:15 PM
            duration: 50,
            percentage: 80,
            userFullName: "John Doe",
            endTime: new Date(2023, 11, 3, 16, 5), // Example: December 3, 2023, 4:05 PM
        },
        {
            startTime: new Date(2024, 0, 12, 10, 0), // Example: January 12, 2024, 10:00 AM
            duration: 55,
            percentage: 75,
            userFullName: "Jane Smith",
            endTime: new Date(2024, 0, 12, 10, 55), // Example: January 12, 2024, 10:55 AM
        },
        {
            startTime: new Date(2024, 1, 25, 13, 30), // Example: February 25, 2024, 1:30 PM
            duration: 35,
            percentage: 85,
            userFullName: "Michael Johnson",
            endTime: new Date(2024, 1, 25, 14, 5), // Example: February 25, 2024, 2:05 PM
        },
        {
            startTime: new Date(2024, 2, 18, 9, 15), // Example: March 18, 2024, 9:15 AM
            duration: 60,
            percentage: 90,
            userFullName: "Emily Davis",
            endTime: new Date(2024, 2, 18, 10, 15), // Example: March 18, 2024, 10:15 AM
        },
    ];

    return (
        <>
            <div>Hello</div>
            <ChartComponent quizzes={quizzes}/>
        </>
    )
};

export default ReportContainer;
