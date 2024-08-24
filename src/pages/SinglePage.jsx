import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAxios } from '../hook/useAxios'
import CustomModal from '../components/CustomModal'
import toast, { Toaster } from 'react-hot-toast'

function SinglePage() {
  const {id} = useParams()
  const navigate = useNavigate()
  const [single, setSingle] = useState({})
  const [isOpenModal, setisOpenModal] = useState(false)

  useEffect(() => {
    useAxios().get(`/products/${id}`).then(res => {
      setSingle(res.data)
    })
  })

  function deleteProduct(){
    useAxios().delete(`/products/${id}`)
    .then(res => {
      setisOpenModal(false)
      toast.success('Successfully deleted !');
      setTimeout(() => {
        navigate(- 1)
      }, 800);
    })
    .catch(error => {
      toast.error('Failed to delete product. Please try again.');
    });
  }
  return (
    <div className='p-10'>
      <div className='flex items-center justify-between'>
      <Toaster position="top-center" reverseOrder={false} />
        <div className='flex space-x-4'>
        <button onClick={() => navigate(- 1)}><ArrowLeftOutlined  className='scale-125'/></button>
          <h2 className='text-[25px] font-bold'>{single.productName}</h2>
        </div>
        <div className='flex space-x-3'>
        <Button onClick={() => setisOpenModal (true)} size='large' type='primary' htmlType='submit' className=' w-[130px] !bg-red-500 hover:opacity-90'> Delete Product </Button>
        <Button onClick={() => navigate(`/update/${id}`)} size='large' type='primary' htmlType='submit' className=' w-[140px]'> Update Product </Button>
        </div>
      </div>
        <ul className='border p-3 flex flex-col gap-7 rounded-lg border-slate-500 w-[500px] mt-[100px]'>
          <li className='flex flex-col '>
            <span className='text-slate-500'>Product Name</span>
            <p className='text-[20px] leading-[15px]'>{single.productName}</p>
          </li>
          <li className='flex flex-col'>
            <span className='text-slate-500'>Product Price</span>
            <p className='text-[20px] leading-[15px]'>{single.productPrice}</p>
          </li>
          <li className='flex flex-col'>
            <span className='text-slate-500'>Product Type</span>
            <p className='text-[20px] leading-[15px]'>
              {single.productType == "1" && "Fruits"}
              {single.productType == "2" && "Vegetables"}
              {single.productType == "3" && "Spices"}
              </p>
          </li>
          <li className='flex flex-col'>
            <span className='text-slate-500'>Product Date</span>
            <p className='text-[20px] leading-[15px]'>{single.productData}</p>
          </li>
        </ul>
        <CustomModal title={'Do you want to delete product'} handleOk={deleteProduct} isOpenModal={isOpenModal} setisOpenModal={setisOpenModal}></CustomModal>
      </div>
  )
}

export default SinglePage
