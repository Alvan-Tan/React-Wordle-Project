import React from 'react'

export default function ErrorModal({errMsg}) {
  return (
    <div className='errors'>
        Error: {errMsg}
    </div>
  )
}
