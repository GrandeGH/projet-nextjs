import React from 'react'
import './Footer.scss'

export default function Footer() {
  return (
    <footer>
      <div className=' fw-bold d-flex gap-3'>
       <div className='dark'>BOOK<span className="text-primary">STORE</span></div>
        <div className='fw-light'>-</div>
        <div className='fw-light'>Georges Grande</div>
      </div>
    </footer>
  )
}
