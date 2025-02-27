import React, { createContext, useContext, useState } from "react";
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from "ethers";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user:null,
    isLoggedIn: false
  });
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [displayedCampaigns, setDisplayedCampaigns] = useState([]);
    const { contract } = useContract('0x348753155C36bc1A40096573D7468691630C8B6a');
    
    
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async(form) => {
        try {
            if (!contract) {
                throw new Error("Contract is not initialized yet");
            }
            
            
            const data = await createCampaign({
                args: [
                    address, 
                    form.title,
                    form.description, 
                    form.target,
                    new Date(form.deadline).getTime(), 
                    form.image 
                ]
            });
            
            console.log("contract call success", data);
            return data;
        } catch (err) {
            console.log("contract call failure", err);
            throw err;
        }
    }

    const getCampagins = async () => {
        const campaigns = await contract.call("getCampagins");
        const parsedCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign[0], // Address
            title: campaign[1], // String
            description: campaign[2], // String
            target: ethers.utils.formatEther(campaign[3].toString()), // Number (Ether conversion)
            deadline: campaign[4].toNumber(), // Number
            amountCollected: ethers.utils.formatEther(campaign[5].toString()), // Number (Ether conversion)
            image: campaign[6], // String (URL)
            pId: i
          }));
          return parsedCampaigns;

      }
    
      const getUserCampaigns = async () => {
        const allCampaigns = await getCampagins();
    
        const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
    
        return filteredCampaigns;
      }
    
      const donate = async (pId, amount) => {
        const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount)});
    
        return data;
      }
    
      const getDonations = async (pId) => {
        const donations = await contract.call('getDonators', [pId]);
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
    
    return (
        <StateContext.Provider
        value={{
             address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampagins,
        getUserCampaigns,
        donate,
        getDonations,
        authState,
        setAuthState,
        allCampaigns,
        setAllCampaigns,
        displayedCampaigns,
        setDisplayedCampaigns
        }}
        >
        {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => {
   return useContext(StateContext);
};