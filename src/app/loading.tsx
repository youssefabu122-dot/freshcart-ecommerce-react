import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className='h-screen flex flex-wrap justify-center items-center'>
      <InfinitySpin
        width="200"
        color="#4fa94d"
      />
    </div>
  )
}

export default Loading
