"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setSingleCompany } from "@/redux/companySlice";
import useCompanyById from "@/app/hooks/Companybyid";
import { uploadToCloudinary } from "@/app/lib/config/uploadToCloudinary";
import toast, { Toaster } from "react-hot-toast";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const UpdateCompany = ({ companyId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { singleCompany } = useSelector((store) => store.company);

  useCompanyById(companyId);

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        imageUrl: singleCompany.imageUrl || "",
      });
    }
  }, [singleCompany]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const changeFileHandler = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const url = await uploadToCloudinary(file);
      setInput((prev) => ({ ...prev, imageUrl: url }));
      toast.success("Logo uploaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Cloudinary upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/updatecompany/${companyId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();

      if (data?.company) {
        dispatch(setSingleCompany(data.company));
        toast.success("Company updated!");
        router.push("/admin");
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            className="flex items-center gap-2 text-gray-600 hover:text-black"
            type="button"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Button>
          <h1 className="text-2xl font-extrabold text-gray-800">Update Company</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Company Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={input.name}
                onChange={handleChange}
                placeholder="Enter company name"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                value={input.description}
                onChange={handleChange}
                placeholder="Short description"
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                type="text"
                name="website"
                id="website"
                value={input.website}
                onChange={handleChange}
                placeholder="https://company.com"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                type="text"
                name="location"
                id="location"
                value={input.location}
                onChange={handleChange}
                placeholder="City, Country"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="image">Company Logo</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="cursor-pointer"
                onChange={changeFileHandler}
              />
              {input.imageUrl && (
                <img
                  src={input.imageUrl}
                  alt="Company Logo"
                  className="h-20 mt-4 rounded-md object-contain border"
                />
              )}
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6A38C2] hover:bg-[#6A38C2] text-white font-semibold py-2 px-4 rounded-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin w-5 h-5" /> Updating...
                </span>
              ) : (
                "Update Company"
              )}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateCompany;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { setSingleCompany } from "@/redux/companySlice";
// import useCompanyById from "@/app/hooks/Companybyid";
// import { uploadToCloudinary } from "@/app/lib/config/uploadToCloudinary";
// import toast, { Toaster } from "react-hot-toast";
// import { ArrowLeft, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";

// const UpdateCompany = ({ companyId }) => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const { singleCompany } = useSelector((store) => store.company);

//   // 🪝 Call the hook to fetch and store the company
//   useCompanyById(companyId);

//   const [loading, setLoading] = useState(false);

//   const [input, setInput] = useState({
//     name: "",
//     description: "",
//     website: "",
//     location: "",
//     imageUrl: "",
//   });

//   // Sync Redux state to local form state
//   useEffect(() => {
//     if (singleCompany) {
//       setInput({
//         name: singleCompany.name || "",
//         description: singleCompany.description || "",
//         website: singleCompany.website || "",
//         location: singleCompany.location || "",
//         imageUrl: singleCompany.imageUrl || "",
//       });
//     }
//   }, [singleCompany]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInput((prev) => ({ ...prev, [name]: value }));
//   };

//   const changeFileHandler = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setLoading(true);

//     try {
//       const url = await uploadToCloudinary(file);
//       setInput((prev) => ({ ...prev, imageUrl: url }));
//       toast.success("Logo uploaded successfully");
//     } catch (err) {
//       console.error(err);
//       toast.error("Cloudinary upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch(`/api/auth/updatecompany/${companyId}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(input),
//       });

//       const data = await res.json();

//       if (data?.company) {
//         dispatch(setSingleCompany(data.company));
//         toast.success("Company updated!");
//         router.push("/admin");
//       } else {
//         toast.error(data.error || "Something went wrong");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Toaster />
//       <div className="max-w-xl my-10 mx-auto">
//         <form onSubmit={handleSubmit}>
//           <div className="flex items-center gap-5 p-8">
//             <Button
//               variant="outline"
//               className="flex items-center gap-2 text-gray-500 font-semibold"
//               type="button"
//               onClick={() => router.back()}
//             >
//               <ArrowLeft />
//               <span>Back</span>
//             </Button>
//             <h1 className="font-black text-2xl">Company Setup</h1>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Label>Company Name</Label>
//               <Input
//                 type="text"
//                 name="name"
//                 value={input.name}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <Label>Description</Label>
//               <Input
//                 type="text"
//                 name="description"
//                 value={input.description}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <Label>Website</Label>
//               <Input
//                 type="text"
//                 name="website"
//                 value={input.website}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <Label>Location</Label>
//               <Input
//                 type="text"
//                 name="location"
//                 value={input.location}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <Label>Company Logo</Label>
//               <Input
//                 id="image"
//                 name="image"
//                 type="file"
//                 accept="image/*"
//                 className="col-span-3 p-2 outline-1"
//                 onChange={changeFileHandler}
//               />
//             </div>
//           </div>

//           <Button type="submit" disabled={loading} className="w-full mt-5">
//             {loading ? <Loader2 className="animate-spin" /> : "Update"}
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateCompany;


// // "use client";
// // import React from "react";
// // import { Button } from "@/components/ui/button";
// // import { ArrowLeft } from "lucide-react";
// // import { Label } from "@/components/ui/label";
// // import { Input } from "@/components/ui/input";
// // import { useState } from "react";
// // import { setSingleCompany } from "@/redux/companySlice";
// // import { useEffect } from "react";
// // import { useRouter } from "next/navigation";
// // import { useDispatch, useSelector } from "react-redux";
// // import Companybyid from "@/app/hooks/Companybyid";
// // import { uploadToCloudinary } from "@/app/lib/config/uploadToCloudinary";
// // import { Loader2 } from "lucide-react";
// // import toast, { Toaster } from "react-hot-toast";
// // const UpdateCompany = ({ companyId }) => {
// //   const dispatch = useDispatch();
// //   Companybyid(companyId);
// //   const { singleCompany } = useSelector((store) => store.company);

// //   console.log(companyId);

// //   console.log("single",singleCompany)

// //   const router = useRouter();

// //   const [loading, setLoading] = useState(false);
  
// //   const [input, setInput] = useState(
// //     {
// //       name:singleCompany.name||  "",
// //       description:singleCompany.description||  "",
// //       website:singleCompany.website  ||"",
// //       location:  singleCompany.location||"",
// //       imageUrl:singleCompany.imageUrl||"",
// //     }
// //   );
  


// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setInput((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const changeFileHandler = async (e) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     setLoading(true);

// //     try {
// //       const url = await uploadToCloudinary(file);
// //       setInput((prev) => ({ ...prev, imageUrl: url }));

// //       console.log(url);

// //       toast.success("Logo uploaded successfully");
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Cloudinary upload failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       console.log(input);
// //       const res = await fetch(`/api/auth/updatecompany/${companyId}`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           name: input.name,
// //           description: input.description,
// //           website: input.website,
// //           location: input.location,
// //           imageUrl: input.imageUrl,
// //         }),
// //       });

// //       const data = await res.json();
// //       setLoading(false);

// //       if (data) {
// //         dispatch(setSingleCompany(data.company));
          
// //         toast.success("Company updated!");

// //         router.push("/admin");
// //       } else {
// //         toast.error(data.error || "Something went wrong");
// //       }
// //     } catch (err) {
// //       setLoading(false);
// //       console.error(err);
// //       toast.error("Server error");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       {/* updte jobs company id:{companyId} */}
// //       <Toaster />
// //       <div className="max-w-xl  my-10 mx-auto">
// //         <form onSubmit={handleSubmit}>
// //           <div className="flex items-center gap-5 p-8">
// //             <Button
// //               variant="outline"
// //               className="flex items-center gap-2 text-gray-500 font-semibold"
// //             >
// //               <ArrowLeft />
// //               <span>Back</span>
// //             </Button>
// //             <h1 className="font-black text-2xl">Company Setup</h1>
// //           </div>
// //           <div className="grid grid-cols-2 gap-4">
// //             <div>
// //               <Label>Company Name</Label>
// //               <Input
// //                 type="text"
// //                 name="name"
// //                 value={singleCompany.name}
// //                 onChange={handleChange}
// //               />
// //             </div>
// //             <div>
// //               <Label>Description</Label>
// //               <Input
// //                 type="text"
// //                 name="description"
// //                 value={singleCompany.description}
// //                 onChange={handleChange}
// //               />
// //             </div>
// //             <div>
// //               <Label>Website</Label>
// //               <Input
// //                 type="text"
// //                 name="website"
// //                 value={singleCompany.website}
// //                 onChange={handleChange}
// //               />
// //             </div>
// //             <div>
// //               <Label>Location</Label>
// //               <Input
// //                 type="text"
// //                 name="location"
// //                 value={singleCompany.location}
// //                 onChange={handleChange}
// //               />
// //             </div>
// //             <div>
// //               <input
// //                 id="image"
// //                 name="image" // 👈 important: match backend
// //                 type="file"
// //                 accept="image/*,application/pdf"
// //                 className="col-span-3 p-2 outline-1"
// //                 onChange={changeFileHandler}
// //               />
// //             </div>
// //           </div>
// //           <Button type="submit" disabled={loading} className="w-full mt-5">
// //             {loading ? <Loader2 className="animate-spin" /> : "Update"}
// //           </Button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UpdateCompany;
