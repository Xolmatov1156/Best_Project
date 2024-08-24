import { Modal } from 'antd'
import React, { Children } from 'react'

function CustomModal({isOpenModal, setisOpenModal, handleOk, title, children}) {
  return (
    <Modal
        title={title}
        open={isOpenModal}
        onOk={handleOk}
        onCancel={() => setisOpenModal(false)}
      >
        {children}
      </Modal>
  )
}

export default CustomModal
// Do you want to delete product