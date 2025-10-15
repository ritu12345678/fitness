import React from 'react'
import TeamListFilter from './components/TeamListFilter'
import TeamListTable from './components/TeamListTable'

const TeamList = () => {
  return (
    <div className='space-y-6'>
      <TeamListFilter/>
      <TeamListTable/>
    </div>
  )
}

export default TeamList


