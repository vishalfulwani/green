import Link from "next/link";

const BlogListing = () => {
  const blogs = [
    {
      id: 1,
      title: "5 Easy Indoor Plants for Beginners",
      excerpt: "Starting your plant journey? Here are 5 indoor plants that thrive with minimal care.",
      image: "https://plus.unsplash.com/premium_photo-1673203734665-0a534c043b7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGluZG9vciUyMHBsYW50c3xlbnwwfHwwfHx8MA%3D%3D",
      content: "Here is the complete guide for 5 indoor plants...",
    },
    {
      id: 2,
      title: "How to Make Compost at Home",
      excerpt: "Composting is a great way to recycle kitchen waste and enrich your plants' soil.",
      image: "https://lovefoodhatewaste.co.nz/wp-content/uploads/2018/05/Compost.jpg",
      content: "Step-by-step guide to making compost...",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gray-200 py-16 pt-20 mt-24 text-center">
        <h1 className="text-3xl font-bold text-green-800">Our Blog</h1>
        <p className="mt-4 text-lg">Discover tips, stories, and inspiration for your green lifestyle.</p>
      </div>

      {/* Blog Grid */}
      <div className="sm:container py-5 sm:py-6 xl:py-10 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow-lg my-4 overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Blog Image */}
            <div className="relative overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>

            {/* Blog Content */}
            <div className="p-6 flex justify-between flex-col">
              <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                {blog.title}
              </h2>
              <p className="mt-4 text-gray-600 line-clamp-3">
                {blog.excerpt}
              </p>
              <Link href={`/blog/${blog.id}`}>
                <button className="mt-4 bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors duration-300">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogListing;
