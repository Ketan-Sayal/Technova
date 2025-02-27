import React, { useState, useEffect } from 'react'

import { Campaign } from '../components';
import { useStateContext } from '../context'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { address, contract, getCampagins, allCampaigns, setAllCampaigns, displayedCampaigns, setDisplayedCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampagins();
    setAllCampaigns(data);
    setDisplayedCampaigns(data); // Initially, displayed campaigns are the same as all campaigns
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <Campaign 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={displayedCampaigns} // Use the filtered campaigns for display
    />
  )
}

export default Home