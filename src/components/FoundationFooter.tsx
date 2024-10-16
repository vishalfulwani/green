import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-gray-100 px-8 pt-10 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Green Foundation</h3>
            <p className="text-gray-300">
              We are committed to planting trees and promoting sustainable practices to protect the environment. Join us in making the world a greener place.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-green-300">About</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-green-300">Projects</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-green-300">Contact Us</Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-green-300">Donate</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/volunteer" className="hover:text-green-300">Volunteer</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-green-300">Events</Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-green-300">Partners</Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-green-300">Shop</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-300">
              123 Greenway Lane<br />
              Green City, GC 12345<br />
              Email: <a href="mailto:info@greenfoundation.org" className="text-green-300">greenfoundation@gail.com</a><br />
              Phone: <a href="tel:+1234567890" className="text-green-300">888 888 888</a>
            </p>
          </div>
        </div>
        <div className="border-t border-gray-100 mt-10 py-6 text-center">
          <p className="text-white">&copy; {new Date().getFullYear()} Green Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
