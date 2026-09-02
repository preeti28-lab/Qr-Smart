import React from 'react';
import Navbar from '../common/navbar/Navbar';
import Footer from '../common/footer/Footer';

const ScreenView = ({
    children
}) => {
    return <>
        <Navbar />
        {children}
        <Footer />
    </>
}

export default ScreenView;