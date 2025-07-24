'use client';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from "@/redux/authSlice.js";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector(store => store.auth);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      dispatch(setLoading(true));

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Logged in successfully!');
        dispatch(setUser(data.currentUser));
        setTimeout(() => router.push('/'), 1500);
      } else {
        toast.error(data.error || 'Invalid credentials');
      }
    } catch (err) {
      toast.error('Server error');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen shadow-7xl flex items-center justify-center  border-2">
      <Toaster />
      <div className="flex justify-center gap-5 border-1 w-8/12 shadow-2xl rounded-2xl bg-gradient-to-tr">
<motion.div
        className="bg-white w-full max-w-md rshadow-lg p-8 "
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <h1 className="text-2xl font-bold text-center text-[#6A38C2] mb-6">Welcome Back 👋</h1>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-[#6A38C2]'
              }`}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.password ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-[#6A38C2]'
              }`}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <input
              type="text"
              placeholder="Student / Recruiter"
              {...register("role", { required: "Role is required" })}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.role ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-[#6A38C2]'
              }`}
            />
            {errors.role && <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>}
          </div>

          {/* Submit */}
          <div>
            {loading ? (
              <button className="w-full flex justify-center items-center bg-[#6A38C2] text-white py-2 rounded-md">
                <Loader2 className="animate-spin" size={20} />
              </button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-[#6A38C2] hover:bg-[#5a2abf] transition text-white py-2 rounded-md font-medium"
              >
                Login
              </motion.button>
            )}
          </div>

          <p className="text-sm text-center">
            Don't have an account?{' '}
            <Link href="/register" className="text-[#6A38C2] hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
     
      </motion.div>

  <div className="flex justify-center items-center ">
       <DotLottieReact
         src="https://lottie.host/66a1f89a-f5a7-45da-8660-77b3a662e6d0/H8Yd73bAQR.lottie"
    
          loop
          autoplay
        />
      </div>

      </div>
      
       
    </div>
    
  );
}


// 'use client';
// import Link from "next/link";
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import toast, { Toaster } from 'react-hot-toast';
// import Navbar from '../components/shared/Navbar.jsx'
// import { useDispatch, useSelector } from 'react-redux';
// import { setLoading, setUser } from "@/redux/authSlice.js";
// import { Loader2 } from "lucide-react";
// import Button from "../components/ui/button.jsx"
// export default function LoginPage() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     role:''
//   });
// const {loading}=useSelector(store=>store.auth)

// const dispatch = useDispatch();

// dispatch(setLoading(false));

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     try {
// dispatch(setLoading(true));

//       const res = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
        
//       if (res.ok) {
       
//         toast.success('Logged in successfully!');
//          dispatch(setUser(data.currentUser));
//          setTimeout(() => router.push('/'), 1500);
//       } else {
//         toast.error(data.error || ' Invalid credentials');
//       }
//     } catch (err) {
//       toast.error(' Server error');
//     }finally{
//       dispatch(setLoading(false))
//     }
//   };

//   return (
//     <div>

// <Toaster />
//        {/* <Navbar/> */}
//        <div className='lg:flex items-center justify-center max-w-7xl mx-auto '> 
//         <div className='w-[40%] border border-[#6A38C2]rounded-md p-4 my-5 shadow-2xl shadow-[#6A38C2]-900 '>
//           <h1 className='font-bold text-xl mb-1 text-center'>Login </h1>
      
//  <div className='my-1'>
//         <label className='font-medium'>Email </label>
//         <input
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="w-full p-1 border border-gray-300 rounded mb-1"
//           type="email"
//         />

//           </div>

//  <div className='my-1'>
//         <label className='font-medium'>Password </label>
//         <input
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           className="w-full p-1 border border-gray-300 rounded mb-1"
//           type="password"
//         />


//           </div>


//           <div className='my-1'>
//         <label className='font-medium'>Role</label>
//      <input
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           placeholder="Student/Recruiter"
//           className="w-full p-1 border border-gray-300 rounded mb-1"
//           type="text"
//         />

//           </div>
// {
//   loading ?<button className="w-full text-[#6A38C2]  py-2 px-4 rounded"><Loader2 className=" animate-spin"></Loader2></button>:<div className='flex flex-col justify-center gap-2 mt-3 '>
//   <button
//           onClick={handleSubmit}
//           className=" bg-[#6A38C2] text-white w-full py-2 px-4 rounded"
//         >
//           Login
//         </button>
//         <span className="text-sm" >Do not  have an account?<Link href="/register" className="text-[#6A38c2]"> sign Up</Link> </span>
// </div>
  
// }




//         </div>









      
//     </div>
  
    
// </div>






    
//   );
// }

//   // <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//     //       <Toaster />
//     //   <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
//     //     <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

//     //     <input
//     //       name="email"
//     //       value={formData.email}
//     //       onChange={handleChange}
//     //       placeholder="Email"
//     //       className="w-full p-2 border border-gray-300 rounded mb-3"
//     //       type="email"
//     //     />

//     //     <input
//     //       name="password"
//     //       value={formData.password}
//     //       onChange={handleChange}
//     //       placeholder="Password"
//     //       className="w-full p-2 border border-gray-300 rounded mb-4"
//     //       type="password"
//     //     />
//     //           <input
//     //       name="role"
//     //       value={formData.role}
//     //       onChange={handleChange}
//     //       placeholder="Role"
//     //       className="w-full p-2 border border-gray-300 rounded mb-4"
//     //       type="password"
//     //     />

//     //     <button
//     //       onClick={handleSubmit}
//     //       className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
//     //     >
//     //       Log In
//     //     </button>
//     //   </div>
//     // </div>