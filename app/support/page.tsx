import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SupportPage() {
  return (
    <>
      <Header />
      <main className="container px-4 py-12 md:px-6 md:py-16 lg:py-24">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">Support Center</h1>
            <p className="text-muted-foreground md:text-xl">
              Get the help you need with your ComputerHut system
            </p>
          </div>

          {/* Quick Help Section */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <path d="M12 17h.01"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium">FAQ</h3>
                <p className="text-sm text-muted-foreground">
                  Quick answers to the most common questions about your system
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="#faq">View FAQ</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Contact Support</h3>
                <p className="text-sm text-muted-foreground">
                  Get in touch with our technical support team
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="#contact">Contact Us</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Downloads</h3>
                <p className="text-sm text-muted-foreground">
                  Access drivers, manuals, and software updates
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="#downloads">Get Downloads</Link>
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* FAQ Section */}
          <div id="faq" className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-lg font-medium mb-2">How long does my warranty last?</h3>
                <p className="text-muted-foreground">
                  All ComputerHut systems come with a 3-year limited warranty that covers parts and labor. Our Premium Support package extends this to 5 years and includes priority service and annual maintenance.
                </p>
              </div>
              
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-lg font-medium mb-2">My computer won&apos;t turn on. What should I do?</h3>
                <p className="text-muted-foreground">
                  First, check that the power cable is securely connected to both the computer and the wall outlet. Try a different power outlet if possible. Ensure the power supply switch on the back of the computer is set to the &quot;on&quot; position (I). If these steps don&apos;t work, contact our technical support team.
                </p>
              </div>
              
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-lg font-medium mb-2">How do I update my drivers?</h3>
                <p className="text-muted-foreground">
                  We recommend using the ComputerHut System Updater application that came pre-installed on your system. It will automatically check for and install the latest drivers for your specific hardware configuration. You can also download individual drivers from our Downloads section.
                </p>
              </div>
              
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-lg font-medium mb-2">Can I upgrade my computer?</h3>
                <p className="text-muted-foreground">
                  Yes! All ComputerHut systems are built with upgradability in mind. Common upgrades include adding more RAM, installing additional storage drives, or upgrading your graphics card. Our support team can provide guidance on compatible components for your specific system.
                </p>
              </div>
              
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-lg font-medium mb-2">What is your return policy?</h3>
                <p className="text-muted-foreground">
                  We offer a 30-day satisfaction guarantee on all our systems. If you&apos;re not completely satisfied, you can return your computer for a full refund within 30 days of delivery. The system must be in its original condition with all accessories and packaging. Please contact our support team to initiate a return.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Section */}
          <div id="contact" className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Contact Support</h2>
            
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4">Technical Support</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-3 h-5 w-5 text-primary"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>1-888-COMPUTER (888-266-7883)</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-3 h-5 w-5 text-primary"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    <span>support@computerhut.com</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-3 h-5 w-5 text-primary mt-0.5"
                    >
                      <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z"></path>
                      <path d="M12 7v5l2.5 1.5"></path>
                    </svg>
                    <div>
                      <p className="font-medium">Support Hours:</p>
                      <p className="text-sm text-muted-foreground">Monday - Friday: 9:00 AM - 8:00 PM EST</p>
                      <p className="text-sm text-muted-foreground">Saturday: 10:00 AM - 6:00 PM EST</p>
                      <p className="text-sm text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button className="w-full">Live Chat with Support</Button>
                </div>
              </div>
              
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4">Warranty & Returns</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-3 h-5 w-5 text-primary"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>1-888-COMP-RMA (888-266-7762)</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-3 h-5 w-5 text-primary"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    <span>warranty@computerhut.com</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/support/warranty">View Warranty Information</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Downloads Section */}
          <div id="downloads" className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Downloads & Resources</h2>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-background p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" x2="12" y1="15" y2="3"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">System Drivers</h3>
                    <p className="text-sm text-muted-foreground">
                      Latest drivers for your hardware
                    </p>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4">Download</Button>
              </div>
              
              <div className="rounded-lg border bg-background p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" x2="8" y1="13" y2="13"></line>
                      <line x1="16" x2="8" y1="17" y2="17"></line>
                      <line x1="10" x2="8" y1="9" y2="9"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">User Manuals</h3>
                    <p className="text-sm text-muted-foreground">
                      Documentation for your system
                    </p>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4">Download</Button>
              </div>
              
              <div className="rounded-lg border bg-background p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Diagnostic Tools</h3>
                    <p className="text-sm text-muted-foreground">
                      Troubleshooting utilities
                    </p>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4">Download</Button>
              </div>
              
              <div className="rounded-lg border bg-background p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <path d="M12 17h.01"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Knowledge Base</h3>
                    <p className="text-sm text-muted-foreground">
                      Guides and tutorials
                    </p>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4">Browse</Button>
              </div>
              
              <div className="rounded-lg border bg-background p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polygon points="10 8 16 12 10 16 10 8"></polygon>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Video Tutorials</h3>
                    <p className="text-sm text-muted-foreground">
                      Step-by-step guides
                    </p>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4">Watch</Button>
              </div>
              
              <div className="rounded-lg border bg-background p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path>
                      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                      <circle cx="12" cy="10" r="2"></circle>
                      <line x1="8" x2="8" y1="2" y2="4"></line>
                      <line x1="16" x2="16" y1="2" y2="4"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Service Registration</h3>
                    <p className="text-sm text-muted-foreground">
                      Register your warranty
                    </p>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4">Register</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}