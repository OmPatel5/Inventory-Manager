'use client'
import React, { Fragment, useState } from 'react'
import Modal from './Modal'
import Axios from 'axios';
import { useRouter } from 'next/navigation';

function ModalContainer({email} : {email: string}) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();


  const onClose = () => {
    setShowModal(false);
    router.refresh();
  }

  const handleOnClick = async () => {
    Axios.delete(`http://localhost:8080/cart/deleteCart/${email}`);
    setShowModal(true);
  }
  return (
    <Fragment>
      <Modal isVisible={showModal} onClose={onClose}/>
        <div>
            <button onClick={handleOnClick} className='mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Confirm Order</button>
        </div>
    </Fragment>
  )
}

export default ModalContainer