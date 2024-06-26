"use client";
import React, { useContext } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import Pay from "@/components/Pay";
import Posts from "@/components/Posts";
import { FaRegEdit } from "react-icons/fa";
import { Context } from "@/store/store";
import Link from "next/link";

const CreatorPage = ({ userDetails, pageDetails, recentDonation }) => {
  const { user } = useContext(Context);
  return (
    <>
      <div>
        <div className="  relative flex justify-center  w-full ">
          {pageDetails?.coverImage && pageDetails?.coverImage?.length > 0 ? (
            <img
              src={`${pageDetails?.coverImage}`}
              alt=""
              className="object-cover w-full h-[22rem]  "
            />
          ) : (
            <div className="w-full h-[22rem] bg-slate-800 flex justify-center items-center">
              {" "}
              <h1 className="text-2xl">No image to show</h1>
            </div>
          )}

          <div className="glass p-5 w-72 absolute -bottom-[13rem] flex flex-col justify-center items-center  ">
            <div className=" flex justify-center items-center text-center  rounded-3xl w-36 h-36  overflow-hidden ">
              {userDetails?.profilepic ? (
                <img
                  src={`${userDetails?.profilepic}`}
                  alt="Profile picture"
                  className=" object-cover  rounded-full w-36 h-36"
                />
              ) : (
                <img
                  src="/defaultProfile.webp"
                  alt="Profile picture"
                  className=" object-cover rounded-full w-36"
                />
              )}
            </div>
            <div className="flex flex-col  items-center justify-center">
              <h1 className="text-xl font-semibold">{userDetails?.username}</h1>
              <h3 className="text-center my-2">{userDetails?.bio}</h3>
              <h3>{pageDetails.donationCount} Suppoters </h3>

              <div className="flex my-3 gap-5">
                <a href="#">
                  <FaXTwitter size={25} />
                </a>
                <a href="#">
                  <AiFillInstagram size={25} />
                </a>
                <a href="#">
                  <FaFacebookSquare size={25} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center  mt-[14rem]">
          <div className="w-[80%] my-10 ">
            <div className="flex items-center ">
              <h1 className="ml-5 text-2xl w-full font-bold ">
                {pageDetails?.title}
              </h1>
              {user?._id === pageDetails?.user && (
                <Link href={`/edit/pages/c/${pageDetails?._id}`}>
                  <FaRegEdit size={20} />
                </Link>
              )}
            </div>

            <Pay pageDetails={pageDetails} recentDonation={recentDonation} />
          </div>
        </div>

        <div className="flex justify-center items-center w-full">
          <Posts pageDetails={pageDetails} />
        </div>
      </div>
    </>
  );
};

export default CreatorPage;
