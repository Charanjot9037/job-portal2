"use client";
import React, { useEffect, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setsearchquery } from "@/redux/jobSlice";
import Gemini from "@/app/components/gemini";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

const category = [
  "Java Developer",
  "Python Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const scrollRef = useRef(null);

  const searchhandler = (query) => {
    dispatch(setsearchquery(query));
    router.push("/Browse");
  };

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const interval = setInterval(() => {
      if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
        // Reset to beginning
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Scroll to next section
        scrollContainer.scrollBy({ left: 200, behavior: "smooth" });
      }
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row justify-end items-center gap-10 px-4 sm:px-10 py-10 w-full">
      {/* Category Carousel */}

      
      <div className="w-full lg:w-5/12 ">
        <Carousel className="w-full">
          <CarouselContent ref={scrollRef} className="flex overflow-x-auto no-scrollbar scroll-smooth">
            {category.map((cat, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-2/6 p-2"
              >
                <button
                  onClick={() => searchhandler(cat)}
                  className="w-full bg-[#6A38C2] text-white px-2 py-2 rounded-2xl hover:bg-[#4d3d69] transition-colors duration-200 text-sm sm:text-base"
                >
                  {cat}
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Lottie with Popover */}
      <div className="w-full lg:w-[300px] flex justify-center lg:mx-[2%]">
        <Popover>
          <PopoverTrigger asChild>
            <div className="w-56 sm:w-64 md:w-72 cursor-pointer">
              <DotLottieReact
                src="https://lottie.host/205b7b26-0059-433b-824c-fc1a594afb85/FE4E0vsSuL.lottie"
                className="shadow-2xl border-1 rounded-full"
                loop
                autoplay
              />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="p-2 shadow-md bg-white lg:w-[800px] border-1  sm:w-[400px] z-10"
            side="top"
            align="end"
            sideOffset={8}
          >
            <Gemini />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default CategoryCarousel;

// "use client";
// import React from "react";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { AvatarImage } from "./ui/avatar";
// import Gemini from "@/app/components/gemini";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@radix-ui/react-popover";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { setsearchquery } from "@/redux/jobSlice";

// const category = [
//   "Java Developer",
//   "Python Developer",
//   "Data Science",
//   "Graphic Designer",
//   "FullStack Developer",
// ];

// const CategoryCarousel = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const searchhandler = (query) => {
//     dispatch(setsearchquery(query));
//     router.push("/Browse");
//   };

//   return (
//     <div className="flex flex-col lg:flex-row  justify-end  items-center gap-10 px-4 sm:px-10 py-10 w-full">
//       {/* Category Carousel */}
//       <div className="w-full lg:w-5/12 border-3">
//         <Carousel className="w-full">
//           <CarouselContent>
//             {category.map((cat, index) => (
//               <CarouselItem
//                 key={index}
//                 className="basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-2/6 p-2"
//               >
//                 <button
//                   onClick={() => searchhandler(cat)}
//                   className="w-full bg-[#6A38C2] text-white px-2 py-2 rounded-2xl hover:bg-[#4d3d69] transition-colors duration-200 text-sm sm:text-base"
//                 >
//                   {cat}
//                 </button>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           {/* <CarouselPrevious />
//           <CarouselNext /> */}
//         </Carousel>
//       </div>

//       {/* Lottie with Popover */}
//       <div className="w-full lg:w-[300px] flex justify-center lg:mx-[2%]">
//         <Popover>
//           <PopoverTrigger asChild>
//             <div className="w-56 sm:w-64 md:w-72 cursor-pointer">
//               <DotLottieReact
//                 src="https://lottie.host/205b7b26-0059-433b-824c-fc1a594afb85/FE4E0vsSuL.lottie"
//                 className="shadow-2xl border-1 rounded-full"
//                 loop
//                 autoplay
//               />
//             </div>
//           </PopoverTrigger>
//           <PopoverContent
//             className="p-2 shadow-md bg-white w-[90vw] sm:w-[400px] z-10"
//             side="top"
//             align="end"
//             sideOffset={8}
//           >
//             <Gemini />
//           </PopoverContent>
//         </Popover>
//       </div>
//     </div>
//   );
// };

// export default CategoryCarousel;

// // import React from "react";
// // import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// // import {
// //   Carousel,
// //   CarouselContent,
// //   CarouselItem,
// //   CarouselNext,
// //   CarouselPrevious,
// // } from "@/components/ui/carousel";
// // import {Avatar} from './ui/avatar'
// // import { AvatarImage } from "./ui/avatar";
// // import Gemini from "@/app/components/gemini"
// // import {
// //   Popover,
// //   PopoverContent,
// //   PopoverTrigger,
// // } from "@radix-ui/react-popover";
// // const category = [
// //   "Java Developer",
// //   "python developer",
// //   "Data Science",
// //   "Graphic Designer",
// //   "FullStack Developer",
// // ];import { useRouter } from 'next/navigation';
// // import { useDispatch } from "react-redux";
// // import { setsearchquery } from "@/redux/jobSlice";
// // const CategoryCarousel = () => {
// //   const dispatch=useDispatch();
// //   const router=useRouter();
// //   const searchhandler=(query)=>{
// //   dispatch(setsearchquery(query));
// //   router.push("/Browse");
// //   }
// //   return (
// //     <div className="flex  gap-25  justify-end mx-10">
// // <div className=" ">
// //    <Carousel  className=" max-w-xl mx-auto my-20 ">
// //         <CarouselContent>
// //           {category.map((cat, index) => (
// //             <CarouselItem className="md:basis-1/2 lg:basis-1/3">
// //               <button onClick={()=>searchhandler(cat)} className="bg-[#6A38C2] text-white p-2 rounded-2xl hover:bg-[#4d3d69] transition-colors delay-100">
// //                 {cat}
// //               </button>
// //             </CarouselItem>
// //           ))}
// //         </CarouselContent>
// //         <CarouselPrevious />
// //         <CarouselNext />
// //       </Carousel>
// // </div>
// // <div className=" flex  items-end justify-end ">
// //    <div className=" bg-white " >
 
// //                      <Popover className="border-5 border-black">
// //   <PopoverTrigger asChild>
// //                   <div className="w-[270px]">
// //        <DotLottieReact
// //      src="https://lottie.host/205b7b26-0059-433b-824c-fc1a594afb85/FE4E0vsSuL.lottie"
// //   className="shadow-2xl  border-purple-800 rounded-full "
// //       loop
// //       autoplay
// //     />
// //          </div>      
            

// //               </PopoverTrigger>
// //               <PopoverContent className=" p-2 shadow-md bg-white w-auto z-10"
// //                side="top" // or "bottom", "left", "right"
// //     align="end" // keeps it from flowing off screen on wide views
// //     sideOffset={8} // distance from trigger
// //     >
// //                 <div className="bg-white">
// //                   <Gemini/>
                  
// //                  </div>
// //                </PopoverContent>
// //            </Popover>     </div>
// // </div>
 
     
// //     </div>
// //   );
// // };

// // export default CategoryCarousel;
// // //  <div className="flex justify-end mr-20" >
 
           
// // //          <Popover>
// // //               <PopoverTrigger asChild>
               
// // //    <div>                                             <DotLottieReact
// // //       src="https://lottie.host/205b7b26-0059-433b-824c-fc1a594afb85/FE4E0vsSuL.lottie"
  
// // //       loop
// // //       autoplay
// // //     />
// // //          </div>      
            

// // //               </PopoverTrigger>
// // //               <PopoverContent className="w-80 p-2 shadow-md bg-white mt-3">
// // //                 <div>
// // //                   <div className="flex gap-4 space-y-2">
// // //                     <Avatar className="cursor-pointer">

// // //                                <AvatarImage src="https://github.com/shadcn.png" />
            
// // //                     </Avatar>
// // //                     <div>
// // //                       <h4 className="font-medium">name</h4>
// // //                       <p className="text-sm text-muted-foreground">
// // //                     role   
// // //                       </p>
// // //                     </div>
// // //                   </div>
// // //                   <div>
// // //                         <div className="lg:flex w-fit items-center  cursor-pointer">
                      
// // //                       <button variant="link">
// // //                         <a>View Profile</a>
// // //                       </button>
// // //                     </div>
                      
                  
// // //                     <div className="lg:flex w-fit items-center cursor-pointer">
                      
// // //                       <button variant="link" >
// // //                         Logout
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </PopoverContent>
// // //             </Popover>
// // //       </div>