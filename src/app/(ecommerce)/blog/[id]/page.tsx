import { notFound } from "next/navigation";

interface BlogPageProps {
  params: {
    id: string;
  };
}

interface ContentSection {
  type: "heading" | "paragraph" | "list";
  content: string | string[]; // String for paragraph, array for list items
}

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  contentSections: ContentSection[];
  careTips: string[];
}

async function fetchBlog(id: string): Promise<Blog | null> {
  const blogs: Blog[] = [
    {
      id: "1",
      title: "5 Easy Indoor Plants for Beginners",
      excerpt: "Starting your plant journey? Here are 5 indoor plants that thrive with minimal care.",
      image: "https://plus.unsplash.com/premium_photo-1673203734665-0a534c043b7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGluZG9vciUyMHBsYW50c3xlbnwwfHwwfHx8MA%3D%3D",
      contentSections: [
        {
          type: "paragraph",
          content: "Here is the complete guide for 5 indoor plants that are perfect for beginners. These plants are not only easy to maintain but also add a touch of greenery and serenity to your living space. Whether you live in an apartment or a house, these plants will thrive with minimal care."
        },
        {
          type: "heading",
          content: "1. Snake Plant (Sansevieria)"
        },
        {
          type: "paragraph",
          content: "Often called 'Mother-in-law's Tongue,' the Snake Plant is nearly indestructible. It requires low light and minimal watering, making it ideal for beginners. It also purifies the air by removing toxins like formaldehyde and benzene."
        },
        {
          type: "heading",
          content: "2. Spider Plant (Chlorophytum Comosum)"
        },
        {
          type: "paragraph",
          content: "Known for its beautiful arching leaves and tiny offshoots, the Spider Plant thrives in indirect sunlight and tolerates occasional neglect. It's great for hanging baskets or placing on shelves."
        },
        {
          type: "heading",
          content: "3. Pothos (Epipremnum Aureum)"
        },
        {
          type: "paragraph",
          content: "Popularly called 'Devil's Ivy,' Pothos is a hardy plant that grows in almost any lighting condition. Its trailing vines and heart-shaped leaves make it a perfect decorative piece for shelves, tables, or walls."
        },
        {
          type: "heading",
          content: "4. Peace Lily (Spathiphyllum)"
        },
        {
          type: "paragraph",
          content: "A stunning plant with white blooms that resemble a calla lily, the Peace Lily is a low-maintenance beauty. It thrives in indirect light and prefers its soil to dry out slightly between waterings."
        },
        {
          type: "heading",
          content: "5. ZZ Plant (Zamioculcas Zamiifolia)"
        },
        {
          type: "paragraph",
          content: "The ZZ Plant is incredibly forgiving and can survive weeks of neglect. Its glossy green leaves add an exotic touch to any room, and it tolerates low light conditions effortlessly."
        }
      ],
      careTips: [
        "Ensure proper drainage in pots to prevent overwatering.",
        "Use a balanced liquid fertilizer once a month during the growing season (spring and summer).",
        "Dust the leaves occasionally to keep them clean and shiny.",
        "Rotate the pots occasionally to ensure even growth on all sides."
      ]
    },
    {
      id: "2",
      title: "How to Make Compost at Home",
      excerpt: "Composting is a great way to recycle kitchen waste and enrich your plants' soil.",
      image: "https://lovefoodhatewaste.co.nz/wp-content/uploads/2018/05/Compost.jpg",
      contentSections: [
        {
          type: "paragraph",
          content: "Composting is an excellent way to recycle kitchen and garden waste while enriching your soil. This guide will take you through the steps to make your compost:"
        },
        {
          type: "heading",
          content: "1. Choose a Compost Bin"
        },
        {
          type: "paragraph",
          content: "Select a bin that suits your space and needs. It could be an open pile or a closed bin for a cleaner look."
        },
        {
          type: "heading",
          content: "2. Collect Organic Waste"
        },
        {
          type: "paragraph",
          content: "Use kitchen scraps like vegetable peels, fruit scraps, coffee grounds, and garden waste. Avoid adding meat, dairy, or oily food."
        },
        {
          type: "heading",
          content: "3. Layer the Ingredients"
        },
        {
          type: "paragraph",
          content: "Alternate layers of green waste (nitrogen-rich) like food scraps with brown waste (carbon-rich) like dried leaves, cardboard, or sawdust."
        },
        {
          type: "heading",
          content: "4. Aerate Regularly"
        },
        {
          type: "paragraph",
          content: "Turn the pile weekly to ensure proper aeration, which speeds up decomposition and prevents odor."
        },
        {
          type: "heading",
          content: "5. Maintain Moisture"
        },
        {
          type: "paragraph",
          content: "The compost should feel like a damp sponge. Add water if it’s too dry or more brown materials if too wet."
        },
        {
          type: "heading",
          content: "6. Harvest Your Compost"
        },
        {
          type: "paragraph",
          content: "After a few months, the compost will turn into dark, crumbly soil. Use it to enrich your garden beds or potted plants."
        }
      ],
      careTips: [
        "Composting is simple and rewarding, helping you reduce waste while nurturing the earth.",
        "Start your composting journey today!"
      ]
    }
  ];

  return blogs.find((blog) => blog.id === id) || null;
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const blog = await fetchBlog(params.id);

  if (!blog) {
    return notFound(); // Renders the 404 page if the blog is not found
  }

  return (
    <div className="mt-10 py-12">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full object-cover h-screen xl:max-h-[600px] lg:max-h-[500px] max-h-[500px]"
      />
      <div className="sm:container px-4 py-12 mx-auto bg-white overflow-hidden">
        <div className="md:p-6">
          <h1 className="text-3xl font-bold text-green-700 mb-4">{blog.title}</h1>
          <div className="mt-4 text-gray-700 leading-relaxed space-y-6">
            {/* Render content sections dynamically */}
            {blog.contentSections.map((section, index) => {
              if (section.type === "heading") {
                return <h2 key={index} className="text-xl font-semibold">{section.content}</h2>;
              } else if (section.type === "paragraph") {
                return <p key={index}>{section.content}</p>;
              } else if (section.type === "list") {
                return (
                  <ul key={index} className="list-disc pl-5">
                    {Array.isArray(section.content) &&
                      section.content.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                );
              }
              return null;
            })}

            {/* Render care tips */}
            <h3 className="mt-8 text-lg font-bold">Caring Tips</h3>
            <ul className="list-disc pl-5 mt-2">
              {blog.careTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
