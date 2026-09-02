import React from 'react';

import mobileFrame from '../../assets/mobileFrame.png';

const MobileFrame = ({
    children,
    className = '',
}) => {
    return <>
        <div className='relative' style={{
            width: "250px",
            height: "400px"
        }}>
            <img src={mobileFrame} alt="image" className='absolute select-none top-0 left-0 w-full h-full' />
            <div className='absolute top-[9%] overflow-hidden left-[20%] select-none bg-white w-[61%] rounded-lg h-[81%]'>
                <div className={`w-full h-full ${className}`}>
                    {children}
                </div>
            </div>
        </div>
    </>
}

export default MobileFrame;