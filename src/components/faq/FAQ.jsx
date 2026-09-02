import React, { useMemo, useState } from 'react';
import { Menu } from 'antd';

// styles
import '../../styles/menu.scss';

/**
 * 
 * @param items Array [{}, ...] -> { title: '', values: [] }
 */
const FAQ = ({
    items = []
}) => {
    const [openKeys, setOpenKeys] = useState([]);

    const handleMenuChange = (keys) => {
        // Only allow one submenu to be open at a time
        setOpenKeys(keys.length > 0 ? [keys[keys.length - 1]] : []);
    };

    const options = useMemo(() => {
        return items?.map((item, index) => (
            {
                key: index,
                label: item?.title,
                children: Array.isArray(item?.values) ? (
                    item?.values?.map((value, i) => (
                        {
                            key: i,
                            label: value,
                        }
                    ))
                ) : [],
            }
        ))
    }, [items]);

    return <>
        <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={handleMenuChange}
            items={options}
            className="menu-custom"
        />
    </>
}

export default FAQ;