import React from "react";

function Footer() {
  return (
    <div className="">
      <footer className="bg-[#003366] text-white py-6 mt-10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About / Info */}
          <div>
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-sm">
              E-Voting Portal is a secure online voting platform made by{" "}
              <span className="font-semibold">Shehbaz Shaikh</span>. This
              platform allows citizens to securely cast their vote online,
              powered by encrypted and verified systems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
            <ul className="text-sm space-y-1">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/howItWorks" className="hover:underline">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <p className="text-sm">📧 support@evoting.gov.in</p>
            <p className="text-sm">📞 1800-123-4567</p>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="text-center text-xs mt-6 border-t border-white/30 pt-4">
          © 2025 E-Voting Portal. Made by Shehbaz Shaikh. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Footer;
