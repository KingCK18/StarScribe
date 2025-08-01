import React from 'react'

export default function () {
  return (
    <header className='flex items-center justify-between gap-4 p-4'>
          <h1 className='font-medium'>Star<span className='text-blue-600 bold'>Scribe</span></h1>
          <button className='flex items-center gap-2 specialBtn px-4 py-2 text-sm
          rounded-lg text-blue-600'>
            <p>New</p>
            <i className="fa-solid fa-plus"></i>
          </button>
    </header> 
  )
}
