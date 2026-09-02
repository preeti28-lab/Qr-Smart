import React from 'react';

/**
 * @param {Object} props
 * @param {'active' | 'pause' | 'delete' | 'pending' | 'finish'} props.status 
 * @param {String} props.className
 */
const Status = ({
    status = '',
    className = '',
}) => {
    switch (status) {
        case "active":
            return <div className={`rounded-full bg-green-700 text-white py-1 px-2 text-[10px] font-semibold ${className}`}>
                Active
            </div>
        case "pause":
            return <div className={`rounded-full bg-orange-700 text-white py-1 px-2 text-[10px] font-semibold ${className}`}>
                Paused
            </div>
        case "delete":
            return <div className={`rounded-full bg-red-700 text-white py-1 px-2 text-[10px] font-semibold ${className}`}>
                Delete
            </div>
        case "pending":
            return <div className={`rounded-full bg-yellow-700 text-white py-1 px-2 text-[10px] font-semibold ${className}`}>
                Pending
            </div>
        case "finish":
            return <div className={`rounded-full bg-blue-700 text-white py-1 px-2 text-[10px] font-semibold ${className}`}>
                Finished
            </div>
        default:
            return <div className={`rounded-full bg-green-700 text-white py-1 px-2 text-[10px] font-semibold ${className}`}>
                Active
            </div>
    }
}

export default Status;