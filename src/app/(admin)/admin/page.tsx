'use client'

import Image from 'next/image';
import { useSession } from 'next-auth/react';

const Page = () => {
  const { data: session } = useSession()
  let userName;
  if (session) {
    userName = session.user?.userName
  }

  return (
    <div className="p-4 min-h-screen mt-16">
      <div >
        <h1 className="text-2xl my-4 font-bold">Dashboard</h1>
      </div>

      <section className="">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Left side columns */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Sales Card */}
              <div className="col-span-2 md:col-span-1">
                <div className="card info-card sales-card p-4 bg-white shadow rounded-lg">

                  <div className="card-body">
                    <h5 className="card-title text-xl font-semibold">Welcome To the Dashboard</h5>
                    <div className="profile-card flex items-center mt-4">
                      <Image
                        src="/img/profile-img.jpg"
                        alt="Profile"
                        className="rounded-full"
                        width={50}
                        height={50}
                      />
                      <div className="ml-4">
                        <h4 className="font-bold text-blue-800">{userName}</h4>
                        <h5 className="text-sm text-gray-500">Web Designer</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>



      </section>
    </ div>
  );
};

export default Page;
