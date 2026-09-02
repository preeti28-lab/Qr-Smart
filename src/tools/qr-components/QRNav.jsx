import React from 'react';
import { CgBrowser } from 'react-icons/cg';

const QRNav = () => {
    const TypeButton = ({
        text = '',
        icon,
    }) => {
        return <>
            <button className='px-3 py-2 '>

            </button>
        </>
    }

    return <>
        <div className='w-full flex justify-center items-center bg-white rounded-md p-2'>
            <TypeButton
                icon={<CgBrowser size={18} />}
                text="Website"
            />
        </div>
    </>
}

export default QRNav;