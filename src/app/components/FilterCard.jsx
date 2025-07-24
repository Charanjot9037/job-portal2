

import React, { useEffect, useState } from 'react'
import { RadioGroup } from './ui/radio-group'
import { RadioGroupItem } from './ui/radio-group'
import {Label} from './ui/label'
const Filterdata=[
  {
filtertype:"location",
array:["Chandigarh","jalandhar","Pune","Mumbai"]
},
  {
filtertype:"Industry",
array:["java developer","python developer","Full Stack developer","figma developer"]
},
  {
filtertype:"Salary(LPA)",
array:["10","15","20"]
},




]
import userGetAllJobs from '../hooks/userGetAllJobs';
import {setsearchquery} from "@/redux/jobSlice"
import { setfilterquery} from "@/redux/jobSlice"
import { useDispatch } from 'react-redux'
const FilterCard = () => {
 
  const dispatch=useDispatch();
  const [selectedvalue,setselectedvalue]=useState(" ");
  const handlechange=(value)=>{
    setselectedvalue(value);
  }

useEffect(() => {
  dispatch(setfilterquery(selectedvalue));
}, [selectedvalue]); // Runs whenever the user selects a value








  return (
    <div className=" w-full max-w-sm mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-lg transition-all duration-500">
  <h1 className="font-bold text-xl text-gray-800">Filter Jobs</h1>
  <hr className="my-4 border-gray-300" />

  <RadioGroup value={selectedvalue} onValueChange={handlechange} className="space-y-6 flex lg:flex-col">
    {Filterdata.map((data, index) => (
      <div key={index}>
        <h2 className="font-semibold text-lg text-gray-700 mb-2 capitalize">{data.filtertype}</h2>

        <div className="space-y-2 flex flex-wrap lg:flex-col">
          {data.array.map((item, idx) => {
            const itemId = `${index}-${idx}`;
            return (
              <div
                key={itemId}
                className="flex items-center gap-2 transition-transform duration-300 hover:translate-x-1"
              >
                <RadioGroupItem
                  value={item}
                  id={itemId}
                  className="transition-transform duration-300 scale-100 hover:scale-105"
                />
                <Label
                  htmlFor={itemId}
                  className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-300"
                >
                  {item}
                </Label>
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </RadioGroup>
</div>

//     <div className=' h-full  p-2 w-full'>
//       <h1 className='font-bold text-lg'>Filter Jobs</h1>
//       <hr className='mt-3'/>
//       <RadioGroup value={selectedvalue} onValueChange={handlechange}>
// {
//   Filterdata.map((data,index)=>(
//     <div>
//       <h1 className='font-bold text-lg'>{data.filtertype}</h1>
//       {
//         data.array.map((item,idx)=>{
//           const ietmd=`${index}-${idx}`
//           return (
//             <div className='flex gap-1 items-center space-x-1.5 my-2' >
//            <RadioGroupItem value={item} id={ietmd}></RadioGroupItem>
//               <Label htmlFor={ietmd} >{item}</Label>
//             </div>
//           )
//         })
//       }
//     </div>
//   ))
// }

//       </RadioGroup>
//     </div>
  )
}

export default FilterCard
