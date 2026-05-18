import React from 'react'

function DashboardHomePage() {
  return (
    <div>
      <h1 className='text-foreground md:text-2xl'>Dashboard Page</h1>


      <div className='mt-15 flex gap-5'>
        <div className='bg-background w-1/2 h-55 rounded-lg'></div>
        <div className='bg-background w-1/2 h-55 rounded-lg'></div>
      </div>
    </div>
  )
}

export default DashboardHomePage