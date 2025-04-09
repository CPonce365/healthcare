import React from 'react'
import { logo } from '../assets'
import {FaFacebookF,FaDribbble,FaLinkedinIn,FaInstagram,FaBehance} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='w-full bg-white py-24'>
        <div className='md:max-w-[1480px] m-auto grid md:grid-cols-5 max-[780px]:grid-cols-2  gap-8 max-w-[600px]  px-4 md:px-0'>
            
                <div className='col-span-2'>
        <img src={logo} alt="Logo" className="h-[460px] w-auto" />

        <h3 className='text-2xl font-bold mt-10'>Contact Us</h3>
        <h3 className='py-2 text-[#6D737A]'>Call: +1 (844) 867-3254</h3>
        <h3 className='py-2 text-[#6D737A]'>
            217 Wellness Blvd, Suite 300<br />
            San Francisco, CA 94110
        </h3>
        <h3 className='py-2 text-[#363A3D]'>Email: support@vitalsync.ai</h3>

        <div className='flex gap-4 py-4'>
            <div className='p-4 bg-[#E9F8F3] rounded-xl'><FaFacebookF size={25} style={{ color: '#4DC39E' }} /></div>
            <div className='p-4 bg-[#E9F8F3] rounded-xl'><FaDribbble size={25} style={{ color: '#4DC39E' }} /></div>
            <div className='p-4 bg-[#E9F8F3] rounded-xl'><FaLinkedinIn size={25} style={{ color: '#4DC39E' }} /></div>
            <div className='p-4 bg-[#E9F8F3] rounded-xl'><FaInstagram size={25} style={{ color: '#4DC39E' }} /></div>
            <div className='p-4 bg-[#E9F8F3] rounded-xl'><FaBehance size={25} style={{ color: '#4DC39E' }} /></div>
        </div>
        </div>

          
        
        </div>
    </div>
  )
}

export default Footer