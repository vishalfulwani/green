"use client"

// pages/profile.tsx
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { IDonation } from '@/models/donation.models';

interface PlantationUpdate {
  treeName: string;
  status: string;
  location: string;
  plantedOn: string;
}

const ProfilePage = () => {
  //   const [updates, setUpdates] = useState<PlantationUpdate[]>([]);
  const [donations, setDonations] = useState<IDonation[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state for UX


  const { data: session, status } = useSession();


  // Fetch plantation updates when the component mounts
  useEffect(() => {
    const fetchDonations = async () => {
      // Ensure the user is authenticated and the session has a valid user ID
      if (status !== "authenticated" || !session?.user?._id) return;

      setIsLoading(true);
      try {
        // Fetch donations with userId as a parameter
        const response = await axios.get('/api/get-donation', {
          params: {
            userId: session?.user?._id, // Pass userId from session
          },
        });

        // Get all donations and filter only those belonging to the authenticated user
        const allDonations = response.data.data;
        // const userDonations = allDonations.filter((donor: any) => donor._id.toString() === session.user._id);
        console.log("**********", session.user)
        const userDonations = allDonations.filter((donor: any) => donor.donorEmail === session.user.email);
        console.log(userDonations)
        // Set the user's donations to state
        setDonations(userDonations);
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Run the effect if the user is authenticated and the session is available
    fetchDonations();
  }, [status, session]); // Added `status` and `session` to the dependency array




  return (


    <div className=" pt-32 min-h-screen p-6 bg-[#accbb7]">

      <div className="container ">

        {status === "loading" && <div className="text-center text-lg font-semibold">Loading...</div>}
        {status === "unauthenticated" && <div className="text-center text-red-600 text-lg font-semibold">Not signed in</div>}
        {status === "authenticated" && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome, {session?.user?.userName}</h1>
              <p className="text-gray-600 mb-2"><span className="font-semibold">Platform: {session?.platform?"Foundation":""}</span></p>
              <p className="text-gray-600"><span className="font-semibold">Role: Donor</span> {session?.user?.role}</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">Your Donations</h2>

              {isLoading ? (
                <div className="text-center text-lg font-semibold text-green-600 animate-pulse">Loading donations...</div>
              ) : donations.length > 0 ? (
                <ul className="space-y-8">
                  {donations.map((donation, index) => (
                    <li
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out border border-gray-200"
                    >
                      <h3 className="text-2xl font-semibold text-green-700 mb-4 text-center sm:text-left">
                        Donation #{index + 1}
                      </h3>

                      {/* Responsive Layout */}
                      <div className="flex flex-col sm:flex-row gap-7">
                        {/* Image Section */}
                        <div className="w-full sm:w-[80%]">
                          <div className="w-full h-44 sm:h-full">
                            <img
                              src={donation.plantationImage}
                              alt="Plantation"
                              className="w-full h-full object-cover rounded-md border border-gray-300"
                            />
                          </div>
                        </div>

                        {/* Text Section */}
                        <div className="flex flex-col justify-between w-full sm:w-[60%]">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                              Donation Amount:{" "}
                              <span className="text-green-600">${donation.amount}</span>
                            </h3>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                              Plantation Status:{" "}
                              <span
                                className={`${donation.plantationStatus === "completed"
                                  ? "text-green-500"
                                  : "text-yellow-500"
                                  }`}
                              >
                                {donation.plantationStatus}
                              </span>
                            </h3>
                          </div>

                          {/* Certificate Section */}
                          <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Certificate:</h3>
                            {/* Show certificate preview if it's an image */}
                            {donation.certificate && donation.certificate.endsWith(".jpg") ||
                              donation.certificate?.endsWith(".png") ? (
                              <>
                                <img
                                  src={donation.certificate}
                                  alt="Donation Certificate"
                                  className="w-full h-32 object-contain rounded-md border mb-4"
                                />




                                <a
                                  href={donation.certificate}
                                  download
                                  // className="bg-green-600 text-white font-semibold w-auto py-2 px-4 rounded-lg shadow hover:bg-green-500 transition-colors duration-300 ease-in-out flex items-center justify-center sm:justify-start"
                                  className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-green-500 transition-colors duration-300 ease-in-out flex items-center justify-center w-auto"

                                >
                                  <svg
                                    className="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 4v16m8-8H4"
                                    />
                                  </svg>
                                  Download Certificate
                                </a>
                              </>

                            ) : (
                              <div>Certificate will available soon</div>
                            )}

                          </div>
                          <div>
                            {/* <a href="https://tse2.mm.bing.net/th?id=OIP.cL1u7mr0D98LnDCGOSTMPAHaE7&pid=Api&P=0&h=180"   download> download</a> */}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}

                </ul>
              ) : (
                <p className="text-center text-gray-500 text-lg">No donation found.</p>
              )}
            </div>

          </>
        )}
      </div>
    </div >


































    // <div className="min-h-screen bg-gray-100 p-6">
    //   {/* Profile Header */}
    //   <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto">
    //     <div className="flex items-center space-x-4">
    //       <Image
    //         className="rounded-full"
    //         src="/user-avatar.jpg" // Replace with actual avatar
    //         alt="User Avatar"
    //         width={80}
    //         height={80}
    //       />
    //       <div>
    //         <h2 className="text-2xl font-semibold">John Doe</h2>
    //         <p className="text-gray-600">Plantation Donor</p>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Plantation Updates Section */}
    //   <div className="mt-10 max-w-4xl mx-auto">
    //     <h3 className="text-xl font-semibold mb-4">Your Plantation Updates</h3>

    //     {/* Show loader while fetching data */}
    //     {isLoading ? (
    //       <div className="text-center">
    //         <p className="text-gray-500">Loading plantation updates...</p>
    //       </div>
    //     ) : updates.length === 0 ? (
    //       <div className="text-center">
    //         <p className="text-gray-500">No plantation updates available.</p>
    //       </div>
    //     ) : (
    //       <div className="space-y-6">
    //         {updates.map((update, index) => (
    //           <div key={index} className="bg-white p-4 shadow rounded-lg">
    //             <div className="flex justify-between items-center">
    //               <h4 className="text-lg font-semibold">Tree Planted: {update.treeName}</h4>
    //               <p className={`font-semibold ${update.status === 'Completed' ? 'text-green-600' : 'text-yellow-500'}`}>
    //                 Status: {update.status}
    //               </p>
    //             </div>
    //             <p className="text-gray-500 mt-2">Location: {update.location}</p>
    //             <p className="text-gray-500">Planted On: {update.plantedOn}</p>
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //   </div>

    //   {/* Certificate Download Section */}
    //   <div className="mt-10 max-w-4xl mx-auto">
    //     <h3 className="text-xl font-semibold mb-4">Download Your Certificates</h3>
    //     <div className="bg-white p-6 shadow rounded-lg text-center">
    //       <p className="text-gray-500 mb-4">Download your tree plantation certificate for completed donations.</p>
    //       <a
    //         href="/certificate.pdf" // Replace with actual certificate URL
    //         download
    //         className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
    //       >
    //         Download Certificate
    //       </a>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ProfilePage;