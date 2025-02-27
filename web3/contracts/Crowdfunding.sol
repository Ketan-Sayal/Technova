// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Crowdfunding {// Class
    struct Campaign{
        address owner;// Ethirium address:address
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 ammountCollection;
        string image;
        address[] donators;
        uint256[] donations;// uint: it is a datatupe of number 
    }

    mapping(uint256 =>Campaign) public campaigns;// Craetes an object means {0: {owner: "0x123...", title: "First Campaign", ...}}
    
    uint256 public numberOfCampaigns = 0;
    
    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256){// _ means this variable belongs to this fn only [memory: mens the variable is stored in memory until the execution of the fn only needed for strings]
        // Creates a new Campaign
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(campaign.deadline<block.timestamp, "The deadline should be a date in future"); //It will stop the code if condition is not satsfied
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.ammountCollection = 0;
        campaign.image = _image;

        numberOfCampaigns++;
        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable{// payable means we want to send crypto currency
        uint256 ammount = msg.value;// What we are trying to send

        Campaign storage campaign = campaigns[_id];
        
        campaign.donators.push(msg.sender);

        campaign.donations.push(ammount);

        // Transation handdling:
        (bool sent,) = payable(campaign.owner).call{value:ammount}("");// ',' is for other value[ammount is given to owner]
        if(sent){
            campaign.ammountCollection = campaign.ammountCollection + ammount;

        }
    }

    function getDonators(uint256 _id) view public returns(address[] memory, uint256[] memory){
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampagins()public view returns(Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);// New variable of type array of campaigns is created here
        for(uint i = 0; i<numberOfCampaigns; i++){
            Campaign storage item = campaigns[i];// fetching the item from storage
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }

}