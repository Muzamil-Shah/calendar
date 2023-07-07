import React from 'react'

const EventHandler = ({event}) => {
  return (
    <div className='w-full h-full p-1 '>
        <div className='w-full h-full flex flex-col justify-center items-center rounded bg-blue-500 text-white font-semibold cursor-pointer'>
            <p>{event?.title}</p>
        </div>
    </div>
  )
}

export default EventHandler