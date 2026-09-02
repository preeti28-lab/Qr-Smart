import React from 'react';
import MyModal from './MyModal';
import { DatePicker, Select } from 'antd';

import "../../styles/multiselect.scss";
import "../../styles/datefield.scss";
import MyButton from '../buttons/MyButton';

const CampaignInfoModal = ({
    isOpen = false,
    setIsOpen = () => { },
}) => {
    let _array = [
        { label: "Ebooks", value: "ebooks" },
        { label: "Emails", value: "emails" },
        { label: "Flyers", value: "flyers" },
        { label: "Food packaging", value: "food-packaging" },
        { label: "Gifts", value: "gifts" },
        { label: "Infographics", value: "infographics" },
        { label: "Labels and stickers", value: "labels-and-stickers" },
        { label: "Menus", value: "menus" },
        { label: "Movie advertising", value: "movie-advertising" },
        { label: "Newspapers and magazines", value: "newspapers-and-magazines" },
        { label: "No material", value: "no-material" },
        { label: "Poster", value: "poster" },
        { label: "Product packaging", value: "product-packaging" },
        { label: "Shop windows", value: "shop-windows" },
        { label: "Social media", value: "social-media" },
        { label: "Stationary", value: "stationary" },
        { label: "Street signs", value: "street-signs" },
        { label: "TV commercials", value: "tv-commercials" },
        { label: "Table tents", value: "table-tents" },
        { label: "Tickets", value: "tickets" },
        { label: "Vehicles", value: "vehicles" },
        { label: "Video games", value: "video-games" },
        { label: "Web banners", value: "web-banners" },
        { label: "Websites", value: "websites" }
    ];

    return <>
        <MyModal
            title='Campaign information'
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
            }}
        >
            <div className='w-full py-3 flex flex-col justify-start items-start gap-y-4 px-2'>
                <div className='w-full grid grid-cols-2 gap-x-5 gap-y-6'>
                    <div className='flex flex-col justify-start w-full items-start gap-y-1'>
                        <label className='font-semibold text-gray-700 text-[14px]'>Medium</label>
                        <Select
                            className='my-select-field w-full'
                            options={_array}
                            dropdownStyle={{
                                zIndex: 1000000000,
                            }}
                            placeholder="Select"
                        />
                    </div>

                    <div className='flex flex-col justify-start w-full items-start gap-y-1'>
                        <label className='font-semibold text-gray-700 text-[14px]'>Print run</label>
                        <input
                            type="text"
                            className='outline-none border-2 px-4 text-slate-800 placeholder:text-gray-700 hover:border-slate-700 focus:border-blue-700 transition-all duration-300 font-medium border-solid border-gray-400 rounded-full py-1.5 w-full'
                            placeholder='E.g 1000'
                        />
                    </div>

                    <div className='flex flex-col justify-start w-full items-start gap-y-1'>
                        <label className='font-semibold text-gray-700 text-[14px]'>Start of Campaign</label>
                        <div className='my-date-2 w-full'>
                            <DatePicker
                                popupStyle={{
                                    zIndex: 10000000,
                                }}
                                className='w-full'
                            />
                        </div>
                    </div>

                    <div className='flex flex-col justify-start w-full items-start gap-y-1'>
                        <label className='font-semibold text-gray-700 text-[14px]'>End of Campaign</label>
                        <div className='my-date-2 w-full'>
                            <DatePicker
                                popupStyle={{
                                    zIndex: 10000000,
                                }}
                                className='w-full'
                            />
                        </div>
                    </div>
                </div>

                <div className='w-full h-[1px] bg-gray-400'></div>

                <div className='grid grid-cols-2 justify-center w-full items-center gap-x-4'>
                    <MyButton className='border-2 border-solid border-blue-700 font-semibold text-[15px] py-3 rounded-full bg-white text-blue-700'>
                        Cancel
                    </MyButton>
                    <MyButton className='border-2 border-solid border-blue-700 font-semibold text-[15px] py-3 rounded-full bg-blue-700 text-white'>
                        Save
                    </MyButton>
                </div>
            </div>
        </MyModal>
    </>
}

export default CampaignInfoModal;