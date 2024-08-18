'use client'

import Image from 'next/image';
import { useSession } from 'next-auth/react';

const Page = () => {
    const {data:session} = useSession()
    let userName;
    if (session){
        userName = session.user?.userName
    }

  return (
    <div  className="p-4 min-h-screen mt-16">
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

              {/* data Card */}
              <div className="col-span-2 md:col-span-1">
                <div className="card info-card customers-card p-4 bg-white shadow rounded-lg">

                  <div className="filter">
                    <a className="icon" href="#" data-bs-toggle="dropdown"></a>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                      <li className="dropdown-header text-start">
                        <h6>Filter</h6>
                      </li>
                      <li><a className="dropdown-item" href="#">Today</a></li>
                      <li><a className="dropdown-item" href="#">This Month</a></li>
                      <li><a className="dropdown-item" href="#">This Year</a></li>
                    </ul>
                  </div>

                  <div className="card-body">
                    <h5 className="card-title text-xl font-semibold">Update</h5>
                    <div className="flex items-center mt-4">
                      <div className="card-icon bg-gray-200 rounded-full p-3">
                        <i className="bi bi-people text-lg text-gray-600"></i>
                      </div>
                      <div className="pl-4">
                        <h6 className="text-lg font-semibold">1244</h6>
                        <span className="text-danger text-sm font-semibold">12%</span>
                        <span className="text-muted text-sm pl-2">decrease</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Sales */}
              <div className="col-span-2">
                <div className="card recent-sales overflow-auto p-4 bg-white shadow rounded-lg">

                  <div className="filter">
                    <a className="icon" href="#" data-bs-toggle="dropdown"></a>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                      <li className="dropdown-header text-start">
                        <h6>Filter</h6>
                      </li>
                      <li><a className="dropdown-item" href="#">Today</a></li>
                      <li><a className="dropdown-item" href="#">This Month</a></li>
                      <li><a className="dropdown-item" href="#">This Year</a></li>
                    </ul>
                  </div>

                  <div className="card-body">
                    <h5 className="card-title text-xl font-semibold">Data Table</h5>

                    <table className="table-auto w-full mt-4">
                      <thead>
                        <tr>
                          <th className="border-b p-2 text-left">#</th>
                          <th className="border-b p-2 text-left">Name</th>
                          <th className="border-b p-2 text-left">Country</th>
                          <th className="border-b p-2 text-left">Id</th>
                          <th className="border-b p-2 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border-b p-2">#2457</td>
                          <td className="border-b p-2">Brandon Jacob</td>
                          <td className="border-b p-2 text-blue-500">At praesentium minu</td>
                          <td className="border-b p-2">64</td>
                          <td className="border-b p-2">
                            <span className="bg-green-500 text-white rounded-full px-2 py-1">Approved</span>
                          </td>
                        </tr>
                        {/* Add more rows here */}
                      </tbody>
                    </table>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side columns */}
          <div className="col-span-1">

            {/* Recent Activity */}
            <div className="card p-4 bg-white shadow rounded-lg">
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown"></a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>
                  <li><a className="dropdown-item" href="#">Today</a></li>
                  <li><a className="dropdown-item" href="#">This Month</a></li>
                  <li><a className="dropdown-item" href="#">This Year</a></li>
                </ul>
              </div>

              <div className="card-body">
                <h5 className="card-title text-xl font-semibold">Recent Activity</h5>
                <div className="activity mt-4">
                  <div className="activity-item flex">
                    <div className="activity-label text-sm text-gray-500">32 min</div>
                    <i className="bi bi-circle-fill activity-badge text-success ml-2"></i>
                    <div className="activity-content ml-4">
                      Quia quae rerum <a href="#" className="font-semibold text-gray-800">explicabo officiis</a> beatae
                    </div>
                  </div>
                  {/* Add more activity items here */}
                </div>
              </div>
            </div>

            {/* News & Updates */}
            <div className="card p-4 bg-white shadow rounded-lg mt-4">
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown"></a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>
                  <li><a className="dropdown-item" href="#">Today</a></li>
                  <li><a className="dropdown-item" href="#">This Month</a></li>
                  <li><a className="dropdown-item" href="#">This Year</a></li>
                </ul>
              </div>

              <div className="card-body">
                <h5 className="card-title text-xl font-semibold">News & Updates</h5>
                <div className="news mt-4">
                  <div className="post-item flex">
                    <Image
                      src="/assets/img/news-1.jpg"
                      alt="News"
                      className="w-16 h-16 rounded-lg"
                      width={64}
                      height={64}
                    />
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-800">Nihil blanditiis at in nihil autem</h4>
                      <p className="text-sm text-gray-600">Sit recusandae non aspernatur laboriosam. Quia enim eligendi sed ut harum...</p>
                    </div>
                  </div>
                  {/* Add more post items here */}
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
