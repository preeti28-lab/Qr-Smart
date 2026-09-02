import React from 'react';
import MyModal from '../../components/modals/MyModal';
import "../../styles/multiselect.scss";
import { Select } from 'antd';
import profileOptions from '../../constants/profileOptions';
import MyButton from '../../components/buttons/MyButton';

const AddUser = ({
    isOpen = false,
    setIsOpen = () => { },
}) => {
    return <>
        <MyModal
            title='Add User'
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <div className='w-full py-4 flex flex-col justify-center gap-y-5 items-center'>
                <div className='w-full grid grid-cols-2 gap-x-4 gap-y-5'>
                    <div className='flex flex-col justify-start w-full items-start gap-y-1'>
                        <label className='font-semibold text-gray-700 text-[14px]'>Email</label>
                        <input
                            type="text"
                            className='outline-none border-2 px-4 text-slate-800 placeholder:text-gray-700 hover:border-slate-700 focus:border-blue-700 transition-all duration-300 font-medium border-solid border-gray-400 rounded-full py-1.5 w-full'
                        />
                    </div>

                    <div className='flex flex-col justify-start w-full items-start gap-y-1'>
                        <label className='font-semibold text-gray-700 text-[14px]'>Role</label>
                        <Select
                            className='my-select-field w-full'
                            options={profileOptions}
                            dropdownStyle={{
                                zIndex: 1000000000,
                            }}
                            placeholder="Select"
                        />
                    </div>
                </div>

                <div className='flex justify-end w-full items-center gap-x-2'>
                    <MyButton className='rounded-full bg-white px-6 border-2 text-[16px] py-2 text-blue-700 font-semibold border-blue-700 border-solid'>
                        Cancel
                    </MyButton>

                    <MyButton className='rounded-full bg-blue-700 px-6 border-2 text-[16px] py-2 text-white font-semibold border-blue-700 border-solid'>
                        Save
                    </MyButton>
                </div>
            </div>
        </MyModal>
    </>
}

export default AddUser;