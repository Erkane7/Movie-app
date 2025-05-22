import React from "react";
import {
  Star,
  Play,
  Film,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-indigo-700 text-white py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Film className="text-xl" />
            <span className="font-bold italic text-lg">Movie Z</span>
          </div>
          <p className="text-sm">© 2024 Movie Z. All Rights Reserved.</p>
        </div>

        <div className="flex gap-16">
          <div>
            <h3 className="font-semibold text-lg mb-2">Contact Information</h3>
            <div className="flex items-center gap-2 mb-1 pt-4">
              <Mail />
              <div>
                <p>E-Mail:</p>
                <p>support@moviez.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-4">
              <Phone />
              <div>
                <p>Phone:</p>
                <p>+976 99770070</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 ">Follow us</h3>
            <div className="flex gap-6 ">
              <a href="#" className="hover:underline flex items-center gap-1">
                <Facebook /> Facebook
              </a>
              <a href="#" className="hover:underline flex items-center gap-1">
                <Instagram /> Instagram
              </a>
              <a href="#" className="hover:underline flex items-center gap-1">
                <Twitter /> Twitter
              </a>
              <a href="#" className="hover:underline flex items-center gap-1">
                <Youtube /> Youtube
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
