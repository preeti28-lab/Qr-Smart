import React from 'react';
import QRNav from './qr-components/QRNav';

const QRGenerator = () => {
    return <>
        <div className='w-3/4 rounded-md p-2 bg-slate-200'>
            <QRNav />
        </div>
    </>
}

export default QRGenerator;