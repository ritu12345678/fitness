import React from 'react'
import MovieEditIcon from '@mui/icons-material/MovieEdit';

const labelClass = "text-[12px] leading-5 text-gray-500";
const valueClass = "text-[12px] leading-5 text-gray-900 font-medium text-right";

const DetailHeader = ({ batch }) => {
  const studio = batch?.studio;
  const pkg = batch?.package;
  const trainers = Array.isArray(batch?.trainers) ? batch.trainers : [];

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
            <span className={valueClass}>{studio?.name || 'No studio found'}</span>

            <span className={labelClass}>Contact Number:</span>
            <span className={valueClass}>{studio?.contact || '--'}</span>

            <span className={labelClass}>Studio Email:</span>
            <span className={valueClass}>{studio?.email || '--'}</span>
          </div>
        </div>

        {/* Trainer Detail */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h5 className='text-[14px] font-semibold text-gray-900'>Trainer Detail</h5>
            <MovieEditIcon sx={{ fontSize: 16, color: '#6b7280', cursor: 'pointer' }} />
          </div>
          {trainers.length === 0 ? (
            <div className='text-[12px] text-gray-500'>No trainer assigned</div>
          ) : (
            <div className='grid grid-cols-2 gap-x-4 gap-y-1'>
              <span className={labelClass}>Total Trainers:</span>
              <span className={valueClass}>{trainers.length}</span>
            </div>
          )}
        </div>

        {/* Package Detail */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h5 className='text-[14px] font-semibold text-gray-900'>Package Detail</h5>
            <MovieEditIcon sx={{ fontSize: 16, color: '#6b7280', cursor: 'pointer' }} />
          </div>
          <div className='grid grid-cols-2 gap-x-4 gap-y-1'>
            <span className={labelClass}>Name:</span>
            <span className={valueClass}>{pkg?.name || 'No package found'}</span>

            <span className={labelClass}>Class Days:</span>
            <span className={valueClass}>{pkg?.classDays || '--'}</span>

            <span className={labelClass}>Start Date:</span>
            <span className={valueClass}>{pkg?.startDate || '--'}</span>

            <span className={labelClass}>Category:</span>
            <span className={valueClass}>{pkg?.category || '--'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailHeader
