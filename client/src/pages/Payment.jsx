import React from 'react'
import {gear} from "../assets"
import { Link } from 'react-router-dom'
import { useStateContext } from "../context"


const Payment = () => {
    const { lightMode } = useStateContext();

    return (
        <div className={`mt-[20px] flex flex-col p-4 ${lightMode ? "bg-[#D3D3D9]" : "bg-[#1c1c24]"} rounded-[10px]`}>
            <h1 className={`font-rubik font-bold sm:text-[25px] text-[18px] leading-[38px] ${lightMode ? "text-[#5C5C5C]" : "text-[#AAAAAA] "} text-center`}>Payment Temporarily Deactivated</h1>
            <p className='font-rubik font-medium text-[20px] leading-[30px] text-[#808191] text-center mt-4'>
                Oh no! My cat walked on my keyboard and disabled the payment option...
            </p>
            <p className='font-rubik font-medium text-[20px] leading-[30px] text-[#808191] text-center mt-4'>
                I'm working on a fix!
            </p>
        </div>
)
}

export default Payment