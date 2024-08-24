import React, { useState } from 'react';
import { ProductOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Logo from '../assets/images/logo.svg'
import { Link } from 'react-router-dom';
const items = [
  {
    key: '1',
    icon: <ProductOutlined  className='scale-[1.5]'/>,
    label: <p className='text-[20px]'>Products</p>,
    children: [
      {
        icon: <ShoppingOutlined />,
        key: '11',
        label: <Link to={"/"}>All Products</Link>,
      },
    ],
  }
];
const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);

const Navbar = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };
  return (
    <div className='w-full h-[100vh]'>
      <div className='bg-[#001529] flex items-center  space-x-[20px] h-[10vh] pl-7'>
        <Link to={'/'}><img src={Logo} alt="Logo" width={60} height={55} /></Link>
        <h2 className='text-white text-[20px]'>Buy Now </h2>
      </div>
      <Menu
    theme='dark'
      mode="inline"
      defaultSelectedKeys={['231']}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{
        width: "100%",
        height: "90vh",
      }}
      className='pt-[10px]'
      items={items}
    />
    </div>
  );
};
export default Navbar;