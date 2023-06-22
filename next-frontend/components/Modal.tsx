'use client'

import React from 'react'



function Modal({isVisible, onClose} : {isVisible: boolean, onClose: any}) {
	console.log(isVisible)
	if (!isVisible) return null;

	const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const targetElement = e.target as HTMLElement
		if (targetElement.id === 'wrapper') onClose();
	}

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' id="wrapper" onClick={(e :  React.MouseEvent<HTMLDivElement, MouseEvent>) => handleClose(e)}>
        <div className='w-[600px] flex flex-col'>
            <button className='text-white text-xl place-self-end' onClick={() => onClose()}>x</button>
            <div className='bg-white p-2 rounded'>
							<h1 className='text-3xl mb-4'>Thank You!</h1>
							<h2 className='text-xl mb-4'>Your order has been successfully placed.</h2>
						</div>
        </div>
    </div>
  )
}

export default Modal