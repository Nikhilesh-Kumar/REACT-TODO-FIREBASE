import React from 'react'
import hero from '../assets/hero_img.png'

function Intro() {
  return (
    <div className='max-w-3xl mx-auto mt-36 text-center'>
      <img src={hero} className='h-32 inline' alt="" />
      <h1 className='text-3xl font-black text-neutral-700'>Organize you work here, finally</h1>
      <p className="text-lg font-light text-neutral-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor voluptatem esse est eos dicta distinctio provident modi ex ut unde.</p>
    </div>
  )
}

export default Intro
