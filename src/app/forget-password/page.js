// 'use client';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';

// export default function ForgotPasswordPage() {
//   const { register, handleSubmit } = useForm();

//  const onSubmit = async (data) => {
//   try {
//     const res = await fetch('/api/auth/forgot-password', {
//       method: 'POST',
//       body: JSON.stringify({ email: data.email }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     let result = {};
//     try {
//       result = await res.json();
//     } catch (err) {
//       console.warn("No JSON in response", err);
//     }

//     if (res.ok) {
//       toast.success(result.message || "Password reset link sent");
//     } else {
//       toast.error(result.error || "Something went wrong");
//     }
//   } catch (error) {
//     console.error("Error in forgot-password:", error);
//     toast.error("Failed to send request");
//   }
// };


//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <h2>Forgot Password</h2>
//       <input
//         type="email"
//         placeholder="Enter your email"
//         {...register('email', { required: true })}
//       />
//       <button type="submit">Send Reset Link</button>
//     </form>
//   );
// }

'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
     setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email: data.email }),
        headers: { 'Content-Type': 'application/json' },
      });

      let result = {};
      try {
        result = await res.json();
      } catch (err) {
        console.warn("No JSON in response", err);
      }

      if (res.ok) {
        toast.success(result.message || "Password reset link sent");
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error in forgot-password:", error);
      toast.error("Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br   p-4">
//       <Toaster position="top-center" />
//       <div className='flex w-full justify-center dark:bg-gray-900 shadow-2xl text-gray-800 dark:text-white border-1 rounded-2xl px-8 py-10 '>
//  <motion.form
//         onSubmit={handleSubmit(onSubmit)}
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="  px-8 py-10 w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>

//         <div className="mb-5">
//           <label className="block text-sm font-medium mb-2">Email Address</label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             {...register('email', { required: 'Email is required' })}
//             className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//               errors.email
//                 ? 'border-red-500 focus:ring-red-400'
//                 : 'border-gray-300 focus:ring-indigo-400'
//             }`}
//           />
//           {errors.email && (
//             <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
//           )}
//         </div>

       
//            <button
//           type="submit"
//           disabled={loading}
//           className="w-full flex justify-center items-center gap-2 bg-[#6A38C2]  text-white font-semibold py-2 rounded-lg transition duration-300 shadow-md disabled:opacity-50"
//         >
//           {loading ? (
//             <>
//               <Loader2 className="animate-spin h-5 w-5" />
//               Sending...
//             </>
//           ) : (
//             'Send Reset Link'
//           )}
//         </button>
//       </motion.form>
   
//           <div className="flex justify-center items-center ">
//        <DotLottieReact
//          src="https://lottie.host/66a1f89a-f5a7-45da-8660-77b3a662e6d0/H8Yd73bAQR.lottie"
    
//           loop
//           autoplay
//         />
//       </div>
   


//       </div>
     
   
//     </div>


 <div className="min-h-screen shadow-7xl flex items-center justify-center   border-2">
      <Toaster />
      <div className="flex lg:py-15 justify-center gap-5 border-1 w-8/12 shadow-2xl rounded-2xl bg-gradient-to-tr">
 <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="  px-8 py-10 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register('email', { required: 'Email is required' })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-indigo-400'
            }`}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

       
           <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-[#6A38C2]  text-white font-semibold py-2 rounded-lg transition duration-300 shadow-md disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              Sending...
            </>
          ) : (
            'Send Reset Link'
          )}
        </button>
      </motion.form>

  <div className="flex justify-center items-center ">
       <DotLottieReact
         src="https://lottie.host/65a421c6-d7e6-463b-92bb-9cd422c6dd2c/5e5F3n0mvg.lottie"
    
          loop
          autoplay
        />
      </div>

      </div>
      
       
    </div>
















  );
}
   