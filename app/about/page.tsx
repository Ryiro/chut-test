import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container px-4 py-12 md:px-6 md:py-16 lg:py-24">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">About ComputerHut</h1>
            <p className="text-muted-foreground md:text-xl">
              Crafting high-performance computers since 2010
            </p>
          </div>

          <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted/20">
            <div className="flex h-full w-full items-center justify-center bg-muted">
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
                className="h-24 w-24 text-muted-foreground"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M4 9h16" />
                <path d="M6 14h.01" />
                <path d="M6 17h.01" />
                <path d="M14 14h.01" />
                <path d="M14 17h.01" />
                <path d="M10 14h.01" />
                <path d="M10 17h.01" />
                <path d="M4 4v16" />
              </svg>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold tracking-tight">Our Story</h2>
            <p>
              Founded in 2010, ComputerHut began with a simple mission: to provide gamers, creators, and professionals with reliable, high-performance computers built with precision and care. What started as a small workshop in a garage has grown into a respected custom PC builder with customers worldwide.
            </p>
            <p>
              Our founder, Alex Chen, was frustrated with mass-produced computers that didn&apos;t meet the needs of serious users. He began building custom systems for friends and colleagues, focusing on quality components, meticulous assembly, and personalized service. Word spread quickly, and ComputerHut was born.
            </p>

            <h2 className="text-2xl font-bold tracking-tight mt-8">Our Approach</h2>
            <p>
              At ComputerHut, we believe that a computer should be more than the sum of its parts. Every system we build is:
            </p>
            <ul>
              <li><strong>Custom-designed</strong> to match your specific needs and budget</li>
              <li><strong>Built with premium components</strong> from trusted manufacturers</li>
              <li><strong>Assembled by expert technicians</strong> with years of experience</li>
              <li><strong>Thoroughly tested</strong> to ensure stability and performance</li>
              <li><strong>Backed by comprehensive support</strong> for peace of mind</li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight mt-8">Our Values</h2>
            <div className="grid gap-6 md:grid-cols-3 my-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
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
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                    <line x1="12" x2="12" y1="9" y2="13" />
                    <line x1="12" x2="12.01" y1="17" y2="17" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Quality</h3>
                <p className="text-sm text-muted-foreground">
                  We never compromise on components or craftsmanship
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
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
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Reliability</h3>
                <p className="text-sm text-muted-foreground">
                  Our systems are built to perform day after day, year after year
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
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
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Support</h3>
                <p className="text-sm text-muted-foreground">
                  We&apos;re with you from purchase through the life of your system
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold tracking-tight mt-8">Our Team</h2>
            <p>
              The ComputerHut team includes experienced system builders, IT professionals, gaming enthusiasts, and customer support specialists. We share a passion for technology and a commitment to helping our customers find the perfect computing solution.
            </p>
          </div>

          <Separator className="my-8" />

          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Join the ComputerHut Community</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Follow us on social media for tech tips, build showcases, and exclusive offers.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="rounded-full bg-muted/20 p-3 hover:bg-muted/30">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="rounded-full bg-muted/20 p-3 hover:bg-muted/30">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="rounded-full bg-muted/20 p-3 hover:bg-muted/30">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="rounded-full bg-muted/20 p-3 hover:bg-muted/30">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="rounded-full bg-muted/20 p-3 hover:bg-muted/30">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm4.36 14.83c-.4.26-.96.3-1.4.09-3.15-1.91-7.11-2.34-11.78-1.28-.45.1-.9-.19-1-.64-.1-.45.19-.9.64-1 5.1-1.17 9.5-.67 13.01 1.41.44.27.56.82.29 1.26-.16.27-.46.42-.76.42zm1.16-2.89c-.5.31-1.17.37-1.74.13-3.61-2.22-9.1-2.86-13.36-1.56-.57.17-1.16-.15-1.33-.72-.17-.57.15-1.16.72-1.33 4.89-1.48 10.97-.75 15.11 1.78.57.35.74 1.1.39 1.67-.23.39-.66.59-1.08.59zm.1-3c-4.12-2.45-10.92-2.68-14.84-1.49-.63.19-1.29-.16-1.49-.79-.19-.63.16-1.29.79-1.49 4.5-1.37 11.97-1.1 16.69 1.7.71.42.95 1.33.53 2.04-.33.57-1.04.82-1.69.52z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}