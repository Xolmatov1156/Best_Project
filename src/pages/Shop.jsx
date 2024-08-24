import React, { useEffect, useState } from 'react';
import TableCustom from '../components/Table';
import axios from 'axios';
import { DeleteOutlined, EditOutlined, MoreOutlined, SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Input from 'antd/es/input/Input';

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setisLoading] = useState(false)
  const [refResh, setRefresh] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:3000/products")
    .then(res => {
        res.data.map(item => {
          switch(item.productType){
            case "1":
              item.productType = "Fruits"
              break;
              case "2":
              item.productType = "Vegetables"
              break;
              case "3":
              item.productType = "Spices"
              break;
          }
        })
        res.data.map((item, index) => {item.key = Math.random()
        item.ID = index + 1
        item.action = 
        <div className='flex space-x-3'>
          <button onClick={() => handleDelete(item.id)} className='w-[30px] h-[30px] hover:text-white hover:bg-red-500 hover:shadow-lg duration-500 hover:shadow-red-500 text-red-500 rounded-lg border border-red-500'><DeleteOutlined /></button>
          <button onClick={() => navigate(`update/${item.id}`)} className='w-[30px] h-[30px] hover:text-white hover:bg-green-500 hover:shadow-lg duration-500 hover:shadow-green-500 rounded-lg text-green-500 border border-green-500'><EditOutlined /></button>
          <button onClick={() => navigate(item.id)} className='w-[30px] h-[30px] hover:text-white hover:bg-violet-500 hover:shadow-lg duration-500 hover:shadow-violet-500 rounded-lg text-violet-500 border border-violet-500'><MoreOutlined className='scale-125'/></button>
        </div>
        })
        setProducts(res.data);
        setisLoading(false)
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, [refResh]);
  function handleDelete(id){
    axios.delete(`http://localhost:3000/products/${id}`)
    setisLoading(true)
    setTimeout(() => 
      setRefresh(!refResh)
    ,800)
  }

  function handleChange(e){
    const value = e.target.value.toLowerCase()
    const filteredProducts = products.filter(item => item.productName.toLowerCase().includes(value))
    setisLoading(true)
    if (value) {
      setTimeout(() => {
        setProducts(filteredProducts)
        setisLoading(false)
      },800)
    }
    else{
      setTimeout(() => {
        setRefresh(!refResh)
        setisLoading(false)
      },800)
    }
  }

  return (
    <div className='p-10'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-[25px] font-bold'>Products</h2>
          <p className='text-[15px] text-slate-500'>Product ({products.length})</p>
        </div>
        <Button onClick={() => navigate("add-product")} size='large' type='primary' htmlType='submit' className=' w-[150px]'>
            Add Product
          </Button>
      </div>
      <label className='relative'>
      <Input onChange={handleChange} placeholder='Search . . .' size='large' allowClear className='mt-[15px] border border-slate-400'/>
      <SearchOutlined  className='absolute top-1 right-4'/>
      </label>
      <div className='mt-[10px]'>
        <TableCustom loading={loading} products={products} />
      </div>
    </div>
  );
}

export default Shop;