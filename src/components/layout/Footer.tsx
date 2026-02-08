import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">CF</span>
              </div>
              <span className="font-serif text-xl font-semibold">
                ChiroFind
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              Find your perfect chiropractor. Book appointments online with
              top-rated providers near you.
            </p>
          </div>

          {/* For Patients */}
          <div>
            <h3 className="font-semibold mb-4">For Patients</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/search" className="hover:text-white transition-colors">
                  Find a Chiropractor
                </Link>
              </li>
              <li>
                <Link href="/conditions" className="hover:text-white transition-colors">
                  Conditions We Treat
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Health Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* For Providers */}
          <div>
            <h3 className="font-semibold mb-4">For Providers</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/providers/join" className="hover:text-white transition-colors">
                  List Your Practice
                </Link>
              </li>
              <li>
                <Link href="/providers/pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/providers/dashboard" className="hover:text-white transition-colors">
                  Provider Dashboard
                </Link>
              </li>
              <li>
                <Link href="/providers/resources" className="hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} ChiroFind. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
