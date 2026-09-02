import React, { useMemo } from 'react';
import MyModal from './MyModal';
import { MdQrCode2 } from 'react-icons/md';
import { IoIosPause } from 'react-icons/io';
import { GrQr } from 'react-icons/gr';
import MyButton from '../buttons/MyButton';
import { FaPlay } from 'react-icons/fa';

const PausedResumedModal = ({
    isOpen = false,
    setIsOpen = () => { },
    type = "paused",
}) => {
    const myType = useMemo(() => {
        return type === "resumed";
    }, [type]);

    return <>
        <MyModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <div className='py-10 w-full flex flex-col justify-center items-center gap-y-8'>
                <div className='relative text-slate-800'>
                    <GrQr size={120} />
                    <div className='w-16 h-16 bg-white flex justify-center items-center absolute -bottom-1 -right-2 rounded-full border-2 border-solid border-slate-800'>
                        {
                            myType ? <FaPlay size={22} />: <IoIosPause size={30} />
                        }
                    </div>
                </div>
                <p className='font-medium text-slate-700'>The selected QR codes will be {myType ? "resumed" : "paused"}. Are you sure?</p>

                <div className='flex justify-center w-full items-center gap-x-4'>
                    <MyButton
                        className='rounded-full font-semibold text-[15px] bg-white text-blue-700 border-blue-700 border-2 border-solid'
                    >Cancel</MyButton>
                    <MyButton
                        className='rounded-full font-semibold text-[15px] bg-blue-700 text-white border-blue-700 border-2 border-solid'
                    >{myType ? "Resume" : "Pause"}</MyButton>
                </div>
            </div>
        </MyModal>
    </>
}

export default PausedResumedModal;