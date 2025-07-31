// 'use client';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import { Toaster } from 'react-hot-toast';
// import { useParams } from 'next/navigation';
// export default function ResetPasswordPage() {
//   const { register, handleSubmit } = useForm();
//   // const searchParams = useSearchParams();
//   // const token = searchParams.get('token');
//   const router = useRouter();

//     const params = useParams();
//     const token= params.token ;
//     console.log(token);
//   const onSubmit = async (data) => {
//     const res = await fetch('/api/auth/reset-password', {
//       method: 'POST',
//       body: JSON.stringify({ token, newPassword: data.password }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     const result = await res.json();
//     if (res.ok) {
//       toast.success('Password updated!');
//       router.push('/login');
//     } else {
//       toast.error(result.error);
//     }
//   };

//   return (
//     <div className="min-h-screen shadow-7xl flex items-center justify-center   border-2">
//           <Toaster />
//           <div className="flex lg:py-15 justify-center gap-5 border-1 w-8/12 shadow-2xl rounded-2xl bg-gradient-to-tr">
//         <form onSubmit={handleSubmit(onSubmit)}>
//       <h2>Reset Password</h2>
//       <input
//         type="password"
//         placeholder="New Password"
//         {...register('password', { required: true })}
//       />
//       <button type="submit">Update Password</button>
//     </form>

    
//       <div className="flex justify-center items-center ">
//            <DotLottieReact
//              src="https://lottie.host/65a421c6-d7e6-463b-92bb-9cd422c6dd2c/5e5F3n0mvg.lottie"
        
//               loop
//               autoplay
//             />
//           </div>
    
//           </div>
          
           
//         </div>
    
    
    
    
    
    
    
    
    
    

//   );

// }
'use client';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function ResetPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const params = useParams();
  const token = params.token;
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
     setLoading(true);
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword: data.password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await res.json();
    if (res.ok) {
       setLoading(false);
      toast.success('Password updated!');
      router.push('/login');
    } else {
      toast.error(result.error || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center px-4">
      <Toaster />
      <div className="bg-white dark:bg-gray-900 text-gray-800 px-5 py-5  border-1 dark:text-white shadow-xl rounded-2xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-10  ">
          <h2 className="text-2xl font-bold mb-6 text-center">Reset Your Password</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                {...register('password', { required: 'Password is required' })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-indigo-400'
                }`}
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
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
                        'Update Password'
                      )}
                    </button>
          </form>
        </div>

        {/* Lottie Animation */}
        <div className="hidden lg:flex w-full md:w-1/2  items-center justify-center bg-white dark:bg-gray-800 p-4 md:p-6">
          <DotLottieReact
            src="https://lottie.host/cf26ca2c-965e-4aa9-8132-17737d424f22/djuio866jg.lottie"
            loop
            autoplay
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
}
