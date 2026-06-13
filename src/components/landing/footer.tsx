import Link from "next/link"
import { Box, Globe, Mail, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/20 pt-16 pb-8">
      <div className="container px-4 md:px-8 mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Box className="size-4" />
              </div>
              <span className="font-bold tracking-tight">BusinessPilot AI</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              The premier AI business operating system for modern retail and e-commerce companies.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Globe className="size-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Mail className="size-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors"><MessageCircle className="size-5" /></Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Integrations</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} BusinessPilot AI. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Designed for the future of business.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
