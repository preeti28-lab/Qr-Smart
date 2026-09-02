import React from 'react';
import { LuCopy } from 'react-icons/lu';
import { MdOutlineQrCode } from 'react-icons/md';

const QRPrint = ({
    size = 10
}) => {
    return <>
        <div className='relative'>
            <MdOutlineQrCode size={"42%"} className='absolute bottom-[20%] right-[18%]' />
            <LuCopy size={size} />
        </div>
    </>
}

export default QRPrint;