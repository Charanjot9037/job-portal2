import React from 'react'
import { FaFacebookF,FaInstagram, FaLinkedinIn } from 'react-icons/fa';
const Footer = () => {
  return (
    <div className="bg-gray-100 w-full border-t border-gray-300">
      <div className="flex flex-col lg:flex-row flex-wrap items-center justify-between mx-auto max-w-7xl px-4 py-6 space-y-4 lg:space-y-0">
        {/* Branding & Copyright */}
        <div className="text-center lg:text-left">
          <h1 className="text-2xl font-bold transition-colors duration-300">
            Job <span className="text-[#6A38C2] hover:text-[#4b2797] transition-colors duration-300">Portal</span>
          </h1>
          <p className="text-gray-600 text-sm mt-1 transition-opacity duration-300 opacity-90 hover:opacity-100">
            © {new Date().getFullYear()} MyCompany. All rights reserved.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-[#3b5998] hover:text-white bg-white hover:bg-[#3b5998] transition-all duration-300 p-2 rounded-full shadow-md hover:scale-110"
          >
            <FaFacebookF className="text-xl" />
          </a>
          <a
            href="#"
            className="text-[#0077b5] hover:text-white bg-white hover:bg-[#0077b5] transition-all duration-300 p-2 rounded-full shadow-md hover:scale-110"
          >
            <FaLinkedinIn className="text-xl" />
          </a>
        </div>
      </div>
    </div>
  //   <div>
  //       <div className="bg-gray-100">
  //     <div className="flex flex-col lg:flex-row items-center justify-between mx-auto max-w-7xl h-16">
  //       <div>
  //         <h1 className="text-2xl font-bold">
  //           Job <span className="text-[#6A38C2] hover:text-[#5b30a6]  duration-100 ease-linear">Portal</span>
 

  //         </h1>
  //                    <p className='text-gray-700'>© {new Date().getFullYear()} MyCompany. All rights reserved.</p>
  //       </div>
  // <div className='flex items-center gap-4'>
  //   <FaFacebookF className='text-2xl  mx-auto'/>
  //   <FaLinkedinIn className='text-2xl  mx-auto' />

  // </div>
  //     </div>
  //   </div>
  //   </div>
  )
}

export default Footer
