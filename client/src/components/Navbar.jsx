import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useStateContext } from '../context'
import { CustomButton } from "./"
import { logo, menu, search, thirdweb } from "../assets"
import { navlinks } from '../constants'

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard")
  const [toggleDrawer, setToggleDrawer] = useState(false)

  const [campaigns, setCampaigns] = useState([])
  const [searchText, setSearchText] = useState("")
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState(null)

  const { connect, address, getCampaigns, contract, lightMode } = useStateContext();
  
  //async function bc we can't call getCampaigns in useEffect since it needs to await. So we create an async function for it.
  const fetchCampaigns = async () => {
    const data = await getCampaigns();
    setCampaigns(data);
  }

  useEffect(() => {
  if(contract) fetchCampaigns();
}, [address, contract])


  //HANDLE SEARCH FUNCTION 
    const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = campaigns.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()) || item.description.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className={`lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] ${lightMode === true ? "bg-[#DCDCE4]" : "bg-[#1c1c24]"} rounded-[100px]`}>
        <input 
        type="text" 
        placeholder="Search for campaigns" 
        className={`flex w-full font-rubik font-normal text-[14px] ${ lightMode === true ? "placeholder:text-[#A2A8B9] text-black" : "placeholder:text-[#4b5264] text-white"} bg-transparent outline-none`}
        onChange={() => setSearchText(e.target.value)}
        />
        
        <button 
        className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer"
        onClick={() => handleSearchChange()}
        >
          <img src={search} alt="search" className="w-[15px] h-[15px] object-contain"/>
        </button>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
        btnType="button"
        title={address ? "Create a campaign" : "Connect"}
        styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
        handleClick={() => {
          if(address) navigate("create-campaign")
          else connect()
        }}
        />

        <Link to="/profile">
          <div className={`w-[52px] h-[52px] rounded-full ${lightMode === true ? "bg-[#D4D6D9]" : "bg-[#2c2f32]"} flex justify-center items-center cursor-pointer`}>
            <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain"/>
          </div>
        </Link>

      </div>

      {/* Small screen navigation */}

        <div className="sm:hidden flex justify-between items-center relative">
          <div className={`w-[40px] h-[40px] rounded-[10px] ${lightMode === true ? "bg-[#D4D6D9]" : "bg-[#2c2f32]"} flex justify-center items-center cursor-pointer`}>
            <img src={logo} alt="user" className="w-[60%] h-[60%] object-contain"/>
          </div>

            <img
            src={menu}
            alt="menu"
            className="w-[34px] h-[34px] object-contain cursor-pointer "
            onClick={() => setToggleDrawer(!toggleDrawer)}
            />
            <div className={`absolute top-[60px] right-0 left-0 ${lightMode === true ? "bg-[#DCDCE4]" : "bg-[#1C1C24]"} z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
              <ul className="mb-4">
                {navlinks.map((link) => (
                  <li
                  key={link.name}
                  className={`flex p-4 ${isActive === link.name && lightMode === false && "bg-[#3a3a43]"} ${isActive === link.name && lightMode === true && "bg-[#BEBEC6]"}`}
                  onClick={() => {
                    setIsActive(link.name)
                    setToggleDrawer(false)
                    navigate(link.link)
                  }}
                  >
                    <img src={link.imgUrl} alt={link.name} className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? "grayscale-0" : 'grayscale'}`}/>
                    <p className={`ml-[20px] font-rubik font-semibold text-[14px] ${isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"}`}>
                      {link.name}
                    </p>
                  </li>
                ))}
              </ul>
                
              <div className="flex mx-4">
                <CustomButton
                  btnType="button"
                  title={address ? "Create a campaign" : "Connect"}
                  styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
                  handleClick={() => {
                    if(address) navigate("create-campaign")
                    else connect();
                  }}
                />

              </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar