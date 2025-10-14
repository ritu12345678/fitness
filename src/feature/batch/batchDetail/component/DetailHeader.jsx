import React from 'react'
import MovieEditIcon from '@mui/icons-material/MovieEdit';

const labelClass = "text-[12px] leading-5 text-gray-500";
const valueClass = "text-[12px] leading-5 text-gray-900 font-medium text-right";

const DetailHeader = () => {
  return (
    <div className='bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm'>
      <div className='grid grid-cols-3 gap-8'>
        {/* Studio Detail */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h5 className='text-[14px] font-semibold text-gray-900'>Studio Detail</h5>
            <MovieEditIcon sx={{ fontSize: 16, color: '#6b7280', cursor: 'pointer' }} />
          </div>
          <div className='grid grid-cols-2 gap-x-4 gap-y-1'>
            <span className={labelClass}>Studio Name:</span>
            <span className={valueClass}>Studion</span>

            <span className={labelClass}>Contact Number:</span>
            <span className={valueClass}>7845632100</span>

            <span className={labelClass}>Studio Email:</span>
            <span className={valueClass}>xxx@gmail.com</span>
          </div>
        </div>

        {/* Trainer Detail */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h5 className='text-[14px] font-semibold text-gray-900'>Trainer Detail</h5>
            <MovieEditIcon sx={{ fontSize: 16, color: '#6b7280', cursor: 'pointer' }} />
          </div>
          <div className='grid grid-cols-2 gap-x-4 gap-y-1'>
            <span className={labelClass}>Name:</span>
            <span className={valueClass}>Rahul</span>

            <span className={labelClass}>Contact Number:</span>
            <span className={valueClass}>7845632100</span>

            <span className={labelClass}>Email:</span>
            <span className={valueClass}>xxx@gmail.com</span>
          </div>
        </div>

        {/* Package Detail */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h5 className='text-[14px] font-semibold text-gray-900'>Package Detail</h5>
            <MovieEditIcon sx={{ fontSize: 16, color: '#6b7280', cursor: 'pointer' }} />
          </div>
          <div className='grid grid-cols-2 gap-x-4 gap-y-1'>
            <span className={labelClass}>Name:</span>
            <span className={valueClass}>3 months</span>

            <span className={labelClass}>Class Days:</span>
            <span className={valueClass}>Mon, Fri, Sat</span>

            <span className={labelClass}>Start Date:</span>
            <span className={valueClass}>12-Apr-2024</span>

            <span className={labelClass}>Category:</span>
            <span className={valueClass}>Private, Duo Classes</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailHeader
