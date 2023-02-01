import React from 'react'
import {gear} from "../assets"
import { Link } from 'react-router-dom'

const Payment = () => {
    return (
        <div className='mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]'>
            <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-[#AAAAAA] text-center">Payment Temporarily Deactivated</h1>
            <p className='font-epilogue font-medium text-[20px] leading-[30px] text-[#808191] text-center mt-4'>
                Oh no! My cat walked on my keyboard and disabled the payment option...
            </p>
            <p className='font-epilogue font-medium text-[20px] leading-[30px] text-[#808191] text-center mt-4'>
                I'm working on a fix!
            </p>
        </div>
)
}

export default Payment