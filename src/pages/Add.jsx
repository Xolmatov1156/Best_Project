import { Button, DatePicker, Input } from 'antd';
import CustomSelect from '../components/CustomSelect';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { CloseOutlined } from '@ant-design/icons';
import { useAxios } from '../hook/useAxios';
import dayjs from 'dayjs';

function Add() {
  const navigate = useNavigate();
  const {id} = useParams()
  const date = new Date()
  const nowDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, 0)}-${String(date.getDate()).padStart(2, 0)}`
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productType, setProductType] = useState("");
  const [productData, setProductData] = useState(nowDate);
  
  const onChange = (dateString) => {
    setProductData(dateString);
  };
  
  function handleSubmit(e) {
    e.preventDefault();
    const data = { productName, productPrice, productType, productData }
    if (id) {
      data.id = id
      useAxios().put(`products/${id}`, data)
        .then(res => {
          toast.success('Product updated successfully!');
          setTimeout(() => {
            navigate("/");
          }, 800);
        })
        .catch(error => {
          toast.error('Failed to updated product. Please try again.');
        });
    }
    else{
      useAxios().post("products", data)
        .then(res => {
          toast.success('Product added successfully!');
          setTimeout(() => {
            navigate("/");
          }, 800);
        })
        .catch(error => {
          toast.error('Failed to add product. Please try again.');
        });
    }
    }

  useEffect(() => {
    if (id) {
      useAxios().get(`/products/${id}`).then(res => {
        setProductName(res.data.productName)
        setProductPrice(res.data.productPrice)
        setProductType(res.data.productType)
      })
    }
  },[])
  
  return (
    <div className='flex items-center w-full h-full justify-center'>
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit} className='w-[600px] shadow h-[450px] relative bg-[#001529] border rounded-lg border-sky-500 p-[10px]'>
        <button onClick={() => navigate(- 1)} className='absolute top-4 right-5 text-white text-[20px]'><CloseOutlined /></button>
        <h1 className='text-center mx-auto text-white w-[180px] font text-[24px] my-[20px] highlight highlight-sky-500 highlight-variant-3'>{id ? "Update" : "Add"} Products</h1>
        <Input 
          value={productName} 
          onChange={(e) => setProductName(e.target.value)} 
          type='text'
          required
          name='productName'  
          placeholder='Enter your product name' 
          size='large' 
          className='border text-[#001529] mb-[30px] focus:shadow-lg focus:shadow-blue-300  placeholder:text-[#001529] border-sky-500'/>
        <Input 
          value={productPrice} 
          onChange={(e) => setProductPrice(e.target.value)} 
          type='number' 
          required
          name='productPrice'  
          placeholder='Enter your product price' 
          size='large' 
          className='border text-[#001529] focus:shadow-lg focus:shadow-blue-300  placeholder:text-[#001529] border-sky-500'/>
        <CustomSelect productType={productType} setProductType={setProductType} />
        <DatePicker 
          value={dayjs(productData)}
          size='large' 
          className='mt-[30px] w-full'
          required 
          placeholder='Enter date' 
          onChange={onChange} />
        <div className='w-[200px] mx-auto'>
          <Button size='large' type='primary' htmlType='submit' className='mt-[35px] w-[200px]'>
            {id ? "Update" : "Save"} Product
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Add;
