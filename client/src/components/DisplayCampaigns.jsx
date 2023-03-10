import React from 'react'
import { useNavigate } from 'react-router-dom'
import { loader } from "../assets"
import { FundCard } from "../components"
import { useStateContext } from '../context'

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
    const navigate = useNavigate();
    const { address, lightMode } = useStateContext();

    const handleNavigate = (campaign) => {
        navigate(`/campaign-details/${campaign.title}`, { state: campaign })
    }


    return (
        <div>
            <h1 className={`font-rubik font-semibold text-[18px] ${lightMode ? "text-black" : "text-white"} text-left`}>{title} ({campaigns.length})</h1>

            <div className="flex flex-wrap mt-[20px] gap-[26px]">
            {/* loading screen if isLoading === true */}
                {isLoading && (
                    <img src={loader} alt={loader} className="w-[100px] h-[100px] object-contain"/>
                )}
            {/* If we have no campaigns : display a message */}
                {address && !isLoading && campaigns.length === 0 && (
                    <p className="font-rubik font-semibold text-[14px] leading-[30px] text-[#818183]">You have not created any campaigns yet</p>
                )}

            {!address && !isLoading && campaigns.length === 0 && (
                <p className="font-rubik font-semibold text-[14px] leading-[30px] text-[#818183]">Please connect your Metamask Wallet in order to see your campaigns</p>
            )}
            {/* display the campaigns if length greater than 0 */}
                {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard key={campaign.id}
                {...campaign}
                handleClick={() => handleNavigate(campaign)}
                />)}
            </div>
        </div>
    )
}

export default DisplayCampaigns