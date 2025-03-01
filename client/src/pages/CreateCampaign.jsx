import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {ethers} from 'ethers';
import { money } from '../assets';
import {CustomButton, FormFeild as  FormField, Loader} from '../components'
import {checkIfImage} from '../utils';
import { useStateContext } from '../context';

function CreateCampaign() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {createCampaign} = useStateContext();
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    name:'',
    title:'',
    description:'',
    target:'',
    deadline:'',
    image:'',
  })

  const handleFormFieldChange = (feildName, e)=>{
    setForm({...form, [feildName]: e.target.value})
  }

  const {authState} = useStateContext();

  const handleSubmit = async(e)=>{
    try{
      e.preventDefault();
    checkIfImage(form.image, async(exists)=>{
      if(exists){
        setIsLoading(true);
        await createCampaign({...form, target: ethers.utils.parseUnits(form.target, 18)});//Ethers change
        setIsLoading(false);
        navigate('/home');
      }else{
        alert('Provide a valid image url');
        setForm({...form, image:''});
      }
    })
    }catch(err){
      setError(true);
    }

  }


  return (<div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
    {error && <div className='error absolute top-3 bg-[rgba(0,0,0,0.7)] text-white p-4 rounded-lg'><span>Something Went Wrong</span></div>}
    {isLoading && <Loader/>}
    <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
      <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
    </div>

   {authState.isLoggedIn ? (
     <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
     <div className="flex flex-wrap gap-[40px]">
       <FormField 
         labelName="Your Name*"
         placeholder="John Doe"
         inputType="text"
         value={form.name}
         handleChange={(e) => handleFormFieldChange('name', e)}
       />
       <FormField 
         labelName="Campaign Title *"
         placeholder="Write a title"
         inputType="text"
         value={form.title}
         handleChange={(e) => handleFormFieldChange('title', e)}
       />
     </div>

     <FormField 
         labelName="Story *"
         placeholder="Write your story"
         isTextArea
         value={form.description}
         handleChange={(e) => handleFormFieldChange('description', e)}
       />

     <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
       <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
       <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% of the raised amount</h4>
     </div>

     <div className="flex flex-wrap gap-[40px]">
       <FormField 
         labelName="Goal *"
         placeholder="ETH 0.50"
         inputType="text"
         value={form.target}
         handleChange={(e) => handleFormFieldChange('target', e)}
       />
       <FormField 
         labelName="End Date *"
         placeholder="End Date"
         inputType="date"
         value={form.deadline}
         handleChange={(e) => handleFormFieldChange('deadline', e)}
       />
     </div>

     <FormField 
         labelName="Campaign image *"
         placeholder="Place image URL of your campaign"
         inputType="url"
         value={form.image}
         handleChange={(e) => handleFormFieldChange('image', e)}
       />

       <div className="flex justify-center items-center mt-[40px]">
         <CustomButton 
           btnType="submit"
           title="Submit new campaign"
           styles="bg-[#1dc071]"
         />
       </div>
   </form>
   ):(
     <div className="flex justify-center items-center mt-[40px]">
       <h3 className="font-epilogue font-bold text-[25px] text-white">Please log in to create a campaign</h3>
     </div>
   )}
  </div>
  )
}

export default CreateCampaign;
