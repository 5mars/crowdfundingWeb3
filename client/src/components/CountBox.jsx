import React from 'react'
import { useStateContext } from '../context'

const CountBox = ({ title, value }) => {
  const { lightMode } = useStateContext();
  return (
    <div className="flex flex-col items-center w-[150px]">
        <h4 className={`font-epilogue font-bold text-[30px] ${lightMode ? "text-black bg-[#DCDCE4]" : "text-white bg-[#1c1c24]"} p-3 rounded-t-[10px] w-full text-center truncate`}>{value}</h4>
        <p className={`font-epilogue font-normal text-[16px] text-[#808191] ${!lightMode ?  "bg-[#28282e]" : "bg-[#D3D3D9]"} px-3 py-2 w-full rounded-b-[10px] text-center`}>{title}</p>
    </div>
  )
}

export default CountBox