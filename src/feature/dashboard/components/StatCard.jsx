import React from 'react'

const StatCard = ({title,value,icon}) => {
  return (
    <div key={title} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="">
            <div className={`h-9 w-9 rounded-lg `}>
                {icon}
              <span className={`absolute -right-1 -top-1 h-2 w-2 rounded-full`} />
            </div>
            <div>
              <p className="text-xs text-gray-500">{title}</p>
              <p className="text-xl font-semibold">{value}</p>
            </div>
          </div>
        </div>
  )
}

export default StatCard
