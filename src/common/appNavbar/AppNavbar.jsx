import React, { useEffect, useMemo, useState } from "react";

// icons
import { MdOutlineSearch } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";

// components
import OpacityButton from "../../components/buttons/OpacityButton";
// import Notification from "./Notification";
import { IoSettingsOutline, IoWalletOutline } from "react-icons/io5";
import { Tooltip } from "antd";
import TouchableOpacity from "../../components/buttons/TouchableOpacity";
import { RxHamburgerMenu } from "react-icons/rx";
import { setAction } from "../../redux/features/action";
import { useDispatch, useSelector } from "react-redux";
import usePath from "../../hooks/usePath";
import NavProfile from "./NavProfile";
// import SearchModal from "../../components/modals/SearchModal";

const AppNavbar = () => {
    // state
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const {isAuthenticated , token , role } = useSelector( (state) => state.auth )

    const dispatch = useDispatch();
    const onClose = () => dispatch(setAction({ sidebar: true }));

    const path = usePath();

    return <>
        {/* <SearchModal
            isOpen={isSearchOpen}
            setIsOpen={setIsSearchOpen}
        /> */}

        <nav className="sticky top-0 left-0 main-bg py-3 z-30 flex justify-start items-center px-4 w-full">
            {/* <div className="flex justify-center items-center">
                <OpacityButton className="rounded-full" onClick={() => setIsSearchOpen(true)}>
                    <MdOutlineSearch size={22} className="rotate-90" />
                </OpacityButton>
            </div> */}

            <div className="flex justify-center gap-x-3 items-center w-full">
                {/* <Notification /> */}
                {/* { 
                     token ? <><NavProfile /></> : null
                } */}
                <NavProfile />
                

                <TouchableOpacity className="block lg:hidden" onClick={onClose}>
                    <RxHamburgerMenu size={22} />
                </TouchableOpacity>
            </div>
        </nav>
    </>
}

export default AppNavbar;
