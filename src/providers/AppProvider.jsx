import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {store} from '../redux/store';
import { ToastContainer } from 'react-toastify';

// styles
import 'react-toastify/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async';

const AppProvider = ({
    children
}) => {
    return <>
        <BrowserRouter>
            <Provider store={store}>
                <HelmetProvider>
                    <ToastContainer toastStyle={{ zIndex: 10000000 }} />
                    {children}
                </HelmetProvider>
            </Provider>
        </BrowserRouter>
    </>
}

export default AppProvider;