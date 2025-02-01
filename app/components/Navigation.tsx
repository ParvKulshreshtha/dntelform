"use client"
import React, { useState } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'
import { IoIosArrowDown, IoMdArrowBack } from 'react-icons/io'
import { PiFilePdfThin } from 'react-icons/pi'
import { TbEdit } from 'react-icons/tb'

// Define types for the props
interface NavigationProps {
  expandAll: () => void;
  collapseAll: () => void;
  reset: () => void;
  clearLS: () => void;
  setEditMode: (editMode: boolean) => void;
  FormComponent: React.ComponentType; // You can define a more specific type if needed
}

const Navigation: React.FC<NavigationProps> = ({
  expandAll,
  collapseAll,
  reset,
  clearLS,
  setEditMode,
  FormComponent,
}) => {
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
            {/* Actions */}
            <div className="flex gap-4">
              <button 
                className='px-4 py-1 bg-white rounded-md hover:bg-green-800 hover:text-white shadow-md focus:outline-none'
                onClick={expandAll}
              >
                Expand All
              </button>
              <button 
                className='px-4 py-1 bg-white rounded-md hover:bg-green-800 hover:text-white shadow-md focus:outline-none'
                onClick={collapseAll}
              >
                Collapse All
              </button>
              <button 
                className='px-4 py-1 bg-white rounded-md hover:bg-green-800 hover:text-white shadow-md focus:outline-none'
                onClick={reset}
              >
              </button>
              <button 
                className='px-4 py-1 bg-white rounded-md hover:bg-green-800 hover:text-white shadow-md focus:outline-none'
                onClick={clearLS}
              >
                Clear LS
              </button>
            </div>

            {/* Dropdown and Edit Buttons */}
            <button 
              className='px-4 py-1 bg-white rounded-md hover:bg-green-800 hover:text-white shadow-md focus:outline-none flex items-center gap-1 relative'
              onClick={() => setIsDropdownOpen(true)}
              onBlur={() => setIsDropdownOpen(false)}
            >
                Action
                <IoIosArrowDown />
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className='absolute top-10 right-0 bg-white shadow-lg text-black rounded-md mt-2 w-48'>
                    <ul className='flex flex-col'>
                      <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer' onClick={reset}>Reset</li>
                      <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer' onClick={clearLS}>ClearLS</li>
                      <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>Option 3</li>
                    </ul>
                  </div>
                )}
            </button>
            <button 
              className='px-4 py-1 bg-white rounded-md hover:bg-green-800 hover:text-white shadow-md focus:outline-none flex items-center gap-1'
              onClick={() => setEditMode(true)}
            >
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
