import { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
// import FloatingShape from "../../Components/Floating/FloatingShape";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MyCalendar.css'; // Custom CSS for additional styling

const MyCalendar = () => {
    const [date, setDate] = useState(new Date());
    const calendarRef = useRef(null);

    const onChange = (newDate) => {
        setDate(newDate);
    };

    const handleClickOutside = (event) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target)) {
            setDate(new Date()); // Reset to current date
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside, true);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
        };
    }, []);

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className='max-w-md w-full mx-auto mt-20 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
            >
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>
                    Calendar
                </h2>

                <div className='space-y-6'>
                    <motion.div
                        className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="dark:bg-black dark:text-white flex justify-center items-center h-full">
                            <div ref={calendarRef} className="w-full p-5 rounded-lg">
                                <Calendar
                                    onChange={onChange}
                                    value={date}
                                    tileClassName={({ date, view }) => {
                                        const isCurrentMonth = date.getMonth() === new Date().getMonth();
                                        const isToday = date.toDateString() === new Date().toDateString();
                                        let classes = 'rounded-full transition-all duration-300 ease-in-out';

                                        if (view === 'month') {
                                            if (isToday) {
                                                classes += ' bg-green-900 text-white'; // Current date in deep green
                                            } else if (date.toDateString() === date.toDateString()) {
                                                classes += ' bg-green-500 text-white'; // Selected date in light green
                                            } else if (!isCurrentMonth) {
                                                classes += ' text-gray-500'; // Days of other months in gray
                                            } else {
                                                classes += ' text-white'; // Days of the current month in white
                                            }
                                        }

                                        return classes;
                                    }}
                                    className="dark:text-white"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>


            </motion.div>
        </div>


    );
};

export default MyCalendar;