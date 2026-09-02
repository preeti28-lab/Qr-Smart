import React from 'react';
import { FaHandHolding } from 'react-icons/fa';
import { VscHeartFilled } from 'react-icons/vsc';

const HandWithHeart = () => {
    return <>
        <div className='flex flex-col justify-center items-center relative'>
            <VscHeartFilled size={25} className='text-blue-700 absolute -top-0.5 right-0' />
            <FaHandHolding size={40} className='text-[#0000000]' />
        </div>
    </>
}

export default HandWithHeart;