"use client"
import React, { useState } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'
import { IoIosArrowDown, IoMdArrowBack } from 'react-icons/io'
import { PiFilePdfThin } from 'react-icons/pi'
import { TbEdit } from 'react-icons/tb'

const Navigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className='px-8 py-4 border fixed top-0 left-0 w-full flex justify-between items-center bg-white'>
        <div className='flex items-center'>
            <IoMdArrowBack className='' />
            <div className='flex items-center ml-4 text-green-800'>
                <FaCircleCheck className='text-lg' />
                <span className='ml-1 '>Verification Details</span>
            </div>
        </div>

        <div className='flex space-x-4'>
            <button className='px-4 py-1 bg-white rounded-md hover:bg-green-800 hover:text-white shadow-md focus:outline-none'>
                Collapse All
            </button>
            <button className='px-4 py-1 bg-white rounded-md hover:bg-green-800 hover:text-white shadow-md focus:outline-none'>
                <PiFilePdfThin />
            </button>
            <button 
              className='px-4 py-1 bg-white rounded-md hover:bg-green-800 hover:text-white shadow-md focus:outline-none flex items-center gap-1 relative'
              onClick={()=> setIsDropdownOpen(true)}
              onBlur={()=> setIsDropdownOpen(false)}
            >
                Action
                <IoIosArrowDown />
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className='absolute top-10 right-0 bg-white shadow-lg text-black rounded-md mt-2 w-48'>
                    <ul className='flex flex-col'>
                      <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>Option 1</li>
                      <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>Option 2</li>
                      <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>Option 3</li>
                    </ul>
                  </div>
                )}
            </button>
            <button className='px-4 py-1 bg-white rounded-md hover:bg-green-800 hover:text-white shadow-md focus:outline-none flex items-center gap-1'>
                <TbEdit />
                Edit Form
            </button>
            <button className='px-4 py-1 rounded-md bg-green-950 text-green-300 focus:outline-none flex items-center gap-1'>
                Send to Author
            </button>
        </div>
    </div>
  )
}

export default Navigation;
