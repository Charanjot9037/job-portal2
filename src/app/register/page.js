'use client';
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from "@/redux/authSlice.js";
import { Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector(store => store.auth);
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      dispatch(setLoading(true));

      const formData = {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
        phonenumber: data.phonenumber,
        role: data.role,
        profile: file?.name || "", // For now, just filename or upload separately
      };

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();

      if (res.ok) {
        toast.success('Account created successfully!');
        setTimeout(() => router.push('/login'), 2000);
      } else {
        toast.error(responseData.error || 'Registration failed');
      }
    } catch (err) {
      toast.error('Server error');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0]);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <Toaster />
      <div className="flex justify-center gap-5 border-1 w-8/12 shadow-2xl  rounded-2xl bg-gradient-to-tr">
<motion.div
        className=" w-full  max-w-lg   "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-center text-[#6A38C2] mt-2 ">Create Account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-5 gap-5 ">
          {/* Full Name */}
<div className="grid grid-cols-2 gap-2 ">
  <div >
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              {...register("fullname", { required: "Full name is required" })}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.fullname ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-[#6A38C2]"
              }`}
              placeholder="John Doe"
            />
            {errors.fullname && <p className="text-sm text-red-500">{errors.fullname.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-[#6A38C2]"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required", minLength: 3 })}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-[#6A38C2]"
              }`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", { required: "Confirm your password" })}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.confirmPassword ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-[#6A38C2]"
              }`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              {...register("phonenumber", { required: "Phone number is required" })}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.phonenumber ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-[#6A38C2]"
              }`}
              placeholder="1234567890"
            />
            {errors.phonenumber && <p className="text-sm text-red-500">{errors.phonenumber.message}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <input
              type="text"
              {...register("role", { required: "Role is required" })}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.role ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-[#6A38C2]"
              }`}
              placeholder="Student / Recruiter"
            />
            {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium mb-1">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-2 py-1 border border-gray-300 rounded bg-white text-sm file:text-sm file:mr-2 file:rounded file:p-1 file:border-none file:bg-[#6A38C2] file:text-white"
            />
          </div>
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
                Create Account
              </motion.button>
            )}
          </div>

          <p className="text-sm text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-[#6A38C2] hover:underline">
              Login
            </Link>
          </p>
        </form>
      </motion.div>
     <div className=" ">
       <DotLottieReact
         src="https://lottie.host/2b1fa07d-c9ca-4050-9e19-415304bdfdf4/bin17qgYvG.lottie"
    
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
// import { useDispatch, useSelector } from 'react-redux';
// import { setLoading } from "@/redux/authSlice.js";
// import { Loader2 } from "lucide-react";
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import toast, { Toaster } from 'react-hot-toast';
// import Navbar from '../components/shared/Navbar.jsx'
// import label from'@/components/ui/label.jsx'
// export default function SignupPage() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     fullname:'',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phonenumber:'',
//     role:'',
//     file:''
//   });
//   const {loading}=useSelector(store=>store.auth)

// const dispatch = useDispatch();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const changeFileHandler=(e)=>{
    
//     setFormData({...formData,file:e.target.Files?.[0]});
//   }

//   const handleSubmit = async (e) => {
//     if (formData.password !== formData.confirmPassword) {
//    alert("password not matched")
//       toast.error('Passwords do not match');
     
      
//       return;
//     }

//     try {
//       dispatch(setLoading(true));
//       const res = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           fullname:formData.fullname,
//           email: formData.email,
//           password: formData.password,
//           phonenumber:formData.phonenumber,
//           role:formData.role,
//           profile:formData.profile
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast.success(' Account created! Redirecting...');
//         setTimeout(() => router.push('/login'), 2000);
//       } else {
//         toast.error(data.error || ' Something went wrong');
//       }
//     } catch (err) {
      
//       toast.error(' Server error');
//     }finally{
//       dispatch(setLoading(false));
//     }
//   };
//   const notify = () => toast('Here is your toast.');

//   return (

    
//     <div >
//        <Toaster />
//        {/* <Navbar/> */}
//        <div className='lg:flex items-center justify-center max-w-7xl mx-auto '> 
//         <div className='w-[40%] border border-[#6A38C2]rounded-md p-4 my-5 shadow-2xl shadow-[#6A38C2]-900 '>
//           <h1 className='font-bold text-xl mb-1 text-center'>Sign Up</h1>
//           <div className='my-1'>
//         <label className='font-medium'>Full Name</label>
//         <input
//           name="fullname"
//           value={formData.fullname}
//           onChange={handleChange}
//           placeholder="Name"
//           className="w-full p-1 border border-gray-300 rounded mb-1"
//           type="text"
//         />

//           </div>
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

// <div className='my-1'>
//         <label className='font-medium'>Confirm Password</label>
//        <input
//           name="confirmPassword"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           placeholder="Confirm Password"
//           className="w-full p-1 border border-gray-300 rounded mb-1"
//           type="password"
//         />

//           </div>
// <div className='my-1 '>
//         <label className='font-medium'>Phone Number</label>
//         <input
//           name="phonenumber"
//           value={formData.phonenumber}
//           onChange={handleChange}
//           placeholder="Phone number"
//           className="w-full p-1 border border-gray-300 rounded mb-1"
//           type="number"
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
// <div className='flex flex-col  my-1'>
// <label className='font-medium'>Proifle</label>
// <input accept="image/*"
// name="profile"
// type="file"
// onChange={changeFileHandler}
// className="cursor-pointer w-full p-1 border border-gray-300 rounded mb-1 text-gray-500"
// />
// </div>


//   {
//   loading ?<button className="w-full text-[#6A38C2]  py-2 px-4 rounded"><Loader2 className=" animate-spin"></Loader2></button>:<div className='flex flex-col justify-center gap-2 mt-3 '>
//   <button
//           onClick={handleSubmit}
//           className=" bg-[#6A38C2] text-white w-full py-2 px-4 rounded"
//         >
//           Create Account
//         </button>
//         <span className="text-sm" >Do not  have an account?<Link href="/login" className="text-[#6A38c2]"> Login</Link> </span>
// </div>
  
// }


//         </div>



//        </div>

      
//     </div>
    
//   );
// }
