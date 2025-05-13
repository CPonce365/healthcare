import React from 'react';
import { heroImg } from '../assets';
import  {AiOutlineSearch} from 'react-icons/ai'

const Hero = () => {
  return (
    <div className='w-full bg-white py-24'>
        <div className='md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px]  px-4 md:px-0'>
            
            <div className='flex flex-col justify-start gap-4'>
            <p className="py-2 text-6xl text-[#20B486] font-bold">VitalSync</p>

                <h1 className='md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold'>Smarter Health Starts Here
                </h1>
                <p className='py-2 text-lg text-gray-600'>“VitalSync helps you monitor symptoms, medications, lifestyle habits, and AI-powered insights — all in one place.”</p>
                <p className='py-2 text-lg text-gray-600'>“Designed for people who want to take control of their health with clarity, not complexity.”</p>
                <p className='py-2 text-lg text-gray-600'>“From daily logs to symptom trends, we make your health data actually make sense.”

</p>

                
            </div>
            
            <img  src={heroImg} className="md:order-last  order-first" />



        </div>
        

    </div>
  )
}

export default Hero