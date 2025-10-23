import React from 'react'
import MovieEditIcon from '@mui/icons-material/MovieEdit';

const labelClass = "text-[12px] leading-5 text-gray-500";
const valueClass = "text-[12px] leading-5 text-gray-900 font-medium text-right";

const DetailHeader = ({ batch }) => {
  console.log('DetailHeader received batch:', batch)
  
  // Default values if batch data is not available
  // const studioData = batch?.studio || {
  //   name: "Studio",
  //   contact: "7845632100",
  //   email: "xxx@gmail.com"
  // };

  // const trainerData = batch?.trainer || {
  //   name: "Rahul",
  //   contact: "7845632100",
  //   email: "xxx@gmail.com"
  // };

  // const packageData = batch?.package || {
  //   name: "3 months",
  //   classDays: "Mon, Fri, Sat",
  //   startDate: "12-Apr-2024",
  //   category: "Private, Duo Classes"
  // };

  // console.log('DetailHeader using data:', { studioData, trainerData, packageData })

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
            <span className={valueClass}>{batch?.name||"--"}</span>

            <span className={labelClass}>Contact Number:</span>
            <span className={valueClass}>{batch?.contact||"--"}</span>

            <span className={labelClass}>Studio Email:</span>
            <span className={valueClass}>{batch?.email||"--"}</span>
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
            <span className={valueClass}>{batch?.name||"--"}</span>

            <span className={labelClass}>Contact Number:</span>
            <span className={valueClass}>{batch?.contact||"--"}</span>

            <span className={labelClass}>Email:</span>
            <span className={valueClass}>{batch?.email||"--"}</span>
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
            <span className={valueClass}>{batch?.name}</span>

            <span className={labelClass}>Class Days:</span>
            <span className={valueClass}>{batch?.classDays}</span>

            <span className={labelClass}>Start Date:</span>
            <span className={valueClass}>{batch?.startDate}</span>

            <span className={labelClass}>Category:</span>
            <span className={valueClass}>{batch?.category}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailHeader
