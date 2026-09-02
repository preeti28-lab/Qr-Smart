import React from 'react';
import { MdOutlineQrCode } from 'react-icons/md';
import { TbDeviceIpad } from 'react-icons/tb';

const QRMedium = ({
    size = 10
}) => {
    return <>
        <div className='relative'>
            <MdOutlineQrCode size={"50%"} className='absolute top-[20%] left-[22%]' />
            <TbDeviceIpad size={size} />
        </div>
    </>
}

export default QRMedium;