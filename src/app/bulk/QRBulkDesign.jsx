import React, { useState } from 'react';
import AppViewer from '../../layouts/AppViewer';
import QRViewer from '../../layouts/QRViewer';
import QRMenu from '../../components/menu/QRMenu';
import { MdOutlineBlock, MdOutlineMailOutline, MdQrCode2, MdWifi } from 'react-icons/md';
import ScanMeFrame from '../../components/qr-frames/ScanMeFrame';
import { BsQrCode } from 'react-icons/bs';
import { LiaQrcodeSolid } from 'react-icons/lia';
import { ImQrcode } from 'react-icons/im';
import { RiLinkM, RiWhatsappFill } from 'react-icons/ri';
import { SlLocationPin } from 'react-icons/sl';
import { TbLineScan } from 'react-icons/tb';
import { FaBitcoin } from 'react-icons/fa';
import UploadLogoButton from '../../components/buttons/UploadLogoButton';
import QRCorrectionLevel from '../../tools/qr-components/QRCorrectionLevel';
import QRAddLogo from '../../tools/qr-components/QRAddLogo';
import QRCodeStyle from '../../tools/qr-components/QRCodeStyle';
import QRFrame from '../../tools/qr-components/QRFrame';
import QRBulkViewer from '../../layouts/QRBulkViewer';

const QRBulkDesign = () => {
    const [isLevel, setIsLevel] = useState('Q');
    const [isLogo, setIsLogo] = useState('');
    const [isFrame, setIsFrame] = useState('');
    const [isCodeStyle, setIsCodeStyle] = useState('rounded');
    const [isCorner, setIsCorner] = useState('extra-rounded');
    const [isCenterStyle, setIsCenterStyle] = useState('dot');
    const [isCodeStyleBorderColor, setIsCodeStyleBorderColor] = useState('#000000');
    const [isCodeStyleDotColor, setIsCodeStyleDotColor] = useState('#000000');
    const [isCodeStyleCenterColor, setIsCodeStyleCenterColor] = useState('#000000');
    const [isCodeStyleBackgroundColor, setIsCodeStyleBackgroundColor] = useState('#ffffff');

    return <>
        <AppViewer>
            <QRBulkViewer
                current={1}
                selectedFrame={isFrame}
                selectedLogo={isLogo}
                selectedLevel={isLevel}
                selectedCodeStyle={isCodeStyle}
                selectedCorner={isCorner}
                selectedCenterStyle={isCenterStyle}
                selectedCodeStyleBorderColor={isCodeStyleBorderColor}
                selectedCodeStyleDotColor={isCodeStyleDotColor}
                selectedCodeStyleCenterColor={isCodeStyleCenterColor}
                selectedCodeStyleBackgroundColor={isCodeStyleBackgroundColor}
                nextPath='upload'
            >
                <div className='w-full flex flex-col justify-start items-start gap-y-5'>
                    <h2 className='text-[20px] font-semibold'>Design the QR</h2>

                    <div className='flex flex-col w-full justify-start items-start gap-y-4'>
                        <QRFrame
                            selected={isFrame}
                            setSelected={setIsFrame}
                        />

                        <QRCodeStyle
                            isCodeStyle={isCodeStyle}
                            setIsCodeStyle={setIsCodeStyle}
                            isCorner={isCorner}
                            setIsCorner={setIsCorner}
                            isCenterStyle={isCenterStyle}
                            setIsCenterStyle={setIsCenterStyle}
                            isCodeStyleBorderColor={isCodeStyleBorderColor}
                            setIsCodeStyleBorderColor={setIsCodeStyleBorderColor}
                            isCodeStyleDotColor={isCodeStyleDotColor} 
                            setIsCodeStyleDotColor={setIsCodeStyleDotColor}
                            isCodeStyleCenterColor={isCodeStyleCenterColor}
                            setIsCodeStyleCenterColor={setIsCodeStyleCenterColor}
                            isCodeStyleBackgroundColor={isCodeStyleBackgroundColor}
                            setIsCodeStyleBackgroundColor={setIsCodeStyleBackgroundColor}
                        />

                        <QRCorrectionLevel
                            selectedLevel={isLevel}
                            setSelectedLevel={setIsLevel}
                        />

                        <QRAddLogo
                            logo={isLogo}
                            changeLogo={setIsLogo}
                        />
                    </div>
                </div>
            </QRBulkViewer>
        </AppViewer>
    </>
}

export default QRBulkDesign;