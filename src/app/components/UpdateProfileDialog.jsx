"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { Avatar , AvatarImage} from '../components/ui/avatar'
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { uploadToCloudinary } from "../lib/config/uploadToCloudinary";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch(); // ← Added this!
  const router = useRouter();
  const { User } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    fullname: User?.fullname,
    email: User?.email,
    phonenumber: User?.phonenumber,
    skills: User?.profile.skills,
    imageUrl:User?.imageUrl,
    bio: User?.profile.bio,
    profileurl:User?.profile.profile,
  });

  // useEffect(() => {
  //   console.log("input", input);
  // }, input);

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

      console.log(url);

      toast.success("File uploaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Cloudinary upload failed");
    } finally {
      setLoading(false);
    }
  };

  const changeFileHandler2 = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setLoading(true);

  try {
    const url = await uploadToCloudinary(file);
    setInput((prev) => ({ ...prev, profileurl: url }));

    console.log("Uploaded profileurl:", url); // ✅ use url, not profileurl
    toast.success(" Profile Photo uploaded successfully");
  } catch (err) {
    console.error(err);
    toast.error("Cloudinary upload failed");
  } finally {
    setLoading(false);
  }
};


  //  const changeFileHandler2 = async (e) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   setLoading(true);

  //   try {
  //     const url = await uploadToCloudinary(file);
  //     setInput((prev) => ({ ...prev, profileurl: url }));

  //     console.log(profileurl);

  //     toast.success("File uploaded successfully");
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Cloudinary upload failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/updateProfile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: input?.fullname,
          email: input?.email,
          phonenumber: input?.phonenumber,
          bio: input?.bio,
          skills: input?.skills,
          imageUrl: input?.imageUrl,
          profileurl: input?.profileurl, 
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data && data.currentUser) {
        setOpen(false);
        toast.success("Profile updated!");
        dispatch(setUser(data.currentUser));
        router.push("/profile");
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error("Server error");
    }
  };

  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Toaster position="top-center" />
      <DialogContent className="sm:max-w-5/12">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {/* Inputs */}
          <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center">
                           <div
  className="cursor-pointer h-15 w-15 rounded-full border-2 ">
                <img className="rounded-full  shadow-2xl  "    src={
                                      User?.profile?.profilephoto?.trim() === ""
                                        ? "https://github.com/shadcn.png"
                                        : User?.profile.profilephoto
                                    } />
                 
              </div>

 <input
                id="profilurl"
                name="profileurl"
                type="file"
              
                accept="image/jpeg,image/png"
                
                className="col-span-3 p-2 outline-1"
                onChange={changeFileHandler2}
              />

          </div>

            <div className="grid grid-cols-4 items-center ">
              <Label htmlFor="fullname" className="text-right">
                {" "}
                FullName
              </Label>
              <input
                id="fullname"
                name="fullname"
                className="col-span-3 p-2 outline-1"
                required
                onChange={handleChange}
                value={input?.fullname}
              ></input>
            </div>

            <div className="grid grid-cols-4 items-center ">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <input
                id="email"
                name="email"
                className="col-span-3 p-2 outline-1"
                required
                onChange={handleChange}
                value={input?.email}
              ></input>
            </div>
            <div className="grid grid-cols-4 items-center ">
              <Label htmlFor="phonenumber" className="text-right">
                M.Number
              </Label>
              <input
                id="phonenumber"
                name="phonenumber"
                className="col-span-3 p-2 outline-1"
                required
                onChange={handleChange}
                value={input?.phonenumber}
              ></input>
            </div>

            <div className="grid grid-cols-4 items-center ">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <input
                id="bio"
                name="bio"
                className="col-span-3 p-2 outline-1"
                required
                onChange={handleChange}
                value={input?.bio}
              ></input>
            </div>

            <div className="grid grid-cols-4 items-center ">
              <Label htmlFor="skills" className="text-right">
                {" "}
                Skills
              </Label>
              <input
                id="skills"
                name="skills"
                className="col-span-3 p-2 outline-1"
                required
                onChange={handleChange}
                value={input?.skills}
              ></input>
            </div>
            <div className="grid grid-cols-4 items-center ">
              <Label htmlFor="file" className="text-right">
                {" "}
                Resume
              </Label>

              <input
                id="image"
                name="image"
                type="file"
                accept="image/*,application/pdf"
                className="col-span-3 p-2 outline-1"
                onChange={changeFileHandler}
              />
              {/* <img className="rounded-full h-10 w-10"  /> */}

            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full bg-[#6A38C2] hover:bg-[#493e5c]">
              {loading ? <Loader2 className="animate-spin" /> : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
