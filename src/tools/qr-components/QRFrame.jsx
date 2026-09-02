import React from 'react';
import QRMenu from '../../components/menu/QRMenu';
import { MdOutlineBlock } from 'react-icons/md';
import { Checkbox, Switch } from '@material-tailwind/react';
import ColorField from '../../components/fields/ColorField';

// assets/images
import qrphoneframeimage from '../../assets/qrphoneframeimage.png';
import qrnormalframeimage from '../../assets/qrnormalframeimage.png';

const QRFrame = ({
    selected = false,
    setSelected = () => { },
}) => {
    const FrameButton = ({
        children,
        active = false,
        value = "",
    }) => {
        return <>
            <div
                className={`border-2 border-solid ${selected === value ? "border-orange-700" : "border-slate-200 hover:border-slate-400"} transition-all duration-300 rounded-md h-[110px] w-[90px] flex justify-center items-center cursor-pointer`}
                onClick={() => setSelected(value)}
            >
                {children}
            </div>
        </>
    }

    return <>
        <QRMenu
            title='Frame'
            iconShow={false}
            defualt={true}
            maxHeight='max-h-[800px]'
        >
            <div className='w-full flex justify-start items-center gap-x-3'>
                <FrameButton value=''>
                    <MdOutlineBlock size={30} />
                </FrameButton>

                <FrameButton value='normalframe'>
                    <img src={qrnormalframeimage} alt='image' className='select-none w-14 h-auto' />
                </FrameButton>

                <FrameButton value='phoneframe'>
                    <img src={qrphoneframeimage} alt='image' className='select-none w-14 h-auto' />
                </FrameButton>

                {/* <FrameButton>
                                    <ScanMeFrame
                                        size={30}
                                        qrcode={<BsQrCode size={40} />}
                                    />
                                </FrameButton> */}
            </div>

            {/* <div className='my-4 w-full flex flex-col justify-start px-4 items-start gap-y-4'>
                <h2 className='font-semibold text-gray-800 text-[14px]'>Colour</h2>

                <div className='flex justify-start items-center gap-x-4'>
                    <Switch color='blue' />
                    <p className='font-semibold text-[14px] text-gray-800 cursor-pointer hover:text-[#000000] transition-all duration-300'>Use gradients?</p>
                </div>

                <ColorField />
            </div>

            <div className='my-4 w-full flex flex-col justify-start px-4 items-start gap-y-4'>
                <h2 className='font-semibold text-gray-800 text-[14px]'>Background Colour</h2>

                <div className='flex justify-start items-center gap-x-4'>
                    <Switch color='blue' />
                    <p className='font-semibold text-[14px] text-gray-800 cursor-pointer hover:text-[#000000] transition-all duration-300'>Use gradients?</p>
                </div>
                <div className='flex justify-start items-center gap-x-4'>
                    <ColorField />
                    <div className='flex justify-center items-center gap-x-2'>
                        <Checkbox color='blue' />
                        <p className='font-semibold text-[14px] text-gray-800 cursor-pointer hover:text-[#000000] transition-all duration-300'>Transparent background</p>
                    </div>
                </div>
            </div> */}
        </QRMenu>
    </>
}

export default QRFrame;