import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

//----- state context provider ----- 
export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x05d6F1A3D85F00A82B28d38C1b57C0df2c6e6170');
    const { mutateAsync: CreateCampaign } = useContractWrite(contract, 'CreateCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
    try {
        const data = await CreateCampaign([
        address, // owner
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline,
        form.image
    ])

    console.log("contract call success", data)
    } catch (error) {
    console.log("contract call failure", error)
    }
}

//----- get campaigns func -----
const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaings = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
        image: campaign.image,
        pId: i
    }));

    return parsedCampaings;
}

// ----- get user campaigns -----
const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
}


// ----- donate func -----
const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', pId, {value: ethers.utils.parseEther(amount)});

    return data;
}

// ------ get donations -----
const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
    })
    }
    return parsedDonations;
}
//for the drropdown select menu - createCamapaign - not used for now 
const selectOptions = [
    {value: "education", label: "Education"},
    {value: "personnal", label: "Personnal"},
    {value: "hobby", label: "Hobby"},
    {value: "health", label: "Health"},
    {value: "school", label: "School"},
    {value: "religion", label: "Religion"},
    {value: "other", label: "Other"},
]

//----- return of state context provider -----
return (
    <StateContext.Provider
    value={{ 
        address,
        contract,
        connect,
        CreateCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        selectOptions
    }}
    >
    {children}
    </StateContext.Provider>
)
}

export const useStateContext = () => useContext(StateContext);