import { Github, Linkedin } from "lucide-react";
import { Button } from "@/component/ui/button";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full py-12 mt-20">
      <div className="container px-4">
        <div className="glass glass-hover rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">DevBazaar</h3>
              <p className="text-sm text-muted-foreground">
                Empowering developers with ready-to-use SaaS toolkits and marketplace solutions.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" onClick={() => window.open("https://www.linkedin.com/in/awais-rasool713/", "_blank")}>
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => window.open("https://github.com/M-awais-rasool")}>
                  <Github className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Marketplace</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/viewAll" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Browse Toolkits
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Seller Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/blogs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacyPolicy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/termsOfService" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} DevBazaar Toolkit Store. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;