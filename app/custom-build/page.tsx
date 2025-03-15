import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

export default function CustomBuildPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:py-24">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
              Build Your Custom PC
            </h1>
            <p className="mt-2 text-muted-foreground md:text-lg">
              Configure your perfect system with our easy-to-use PC builder
            </p>
          </div>

          <Tabs defaultValue="builder" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="builder">PC Builder</TabsTrigger>
              <TabsTrigger value="packages">Pre-Configured Packages</TabsTrigger>
            </TabsList>
            
            <TabsContent value="builder" className="space-y-8">
              <div className="flex flex-col space-y-8">
                {/* CPU Selection */}
                <div className="rounded-lg border p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">1. Choose Your Processor</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="cpu-brand" className="text-sm font-medium">Brand</label>
                        <Select>
                          <option value="intel">Intel</option>
                          <option value="amd">AMD</option>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="cpu-model" className="text-sm font-medium">Model</label>
                        <Select>
                          <option value="i5-13600k">Intel Core i5-13600K</option>
                          <option value="i7-13700k">Intel Core i7-13700K</option>
                          <option value="i9-13900k">Intel Core i9-13900K</option>
                          <option value="ryzen-5-7600x">AMD Ryzen 5 7600X</option>
                          <option value="ryzen-7-7700x">AMD Ryzen 7 7700X</option>
                          <option value="ryzen-9-7950x">AMD Ryzen 9 7950X</option>
                        </Select>
                      </div>
                      
                      <div className="pt-2">
                        <h3 className="text-sm font-medium mb-2">Performance Level</h3>
                        <Slider
                          defaultValue={[50]}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-muted-foreground">Entry-Level</span>
                          <span className="text-xs text-muted-foreground">Professional</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4 bg-muted/20">
                      <h3 className="font-medium mb-2">Selected CPU</h3>
                      <div className="space-y-2 text-sm">
                        <p className="font-semibold">Intel Core i7-13700K</p>
                        <p>16 Cores (8P + 8E) / 24 Threads</p>
                        <p>Up to 5.4 GHz Turbo Frequency</p>
                        <p>30MB Cache</p>
                        <p className="mt-4 text-primary font-semibold">+ $429.99</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Additional component sections would go here... */}
                
                {/* Summary Section */}
                <div className="rounded-lg border p-6 shadow-sm bg-muted/20">
                  <h2 className="text-xl font-semibold mb-4">Your Custom PC Build</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Intel Core i7-13700K</span>
                      <span className="font-semibold">$429.99</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>NVIDIA GeForce RTX 4070 12GB</span>
                      <span className="font-semibold">$599.99</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>32GB DDR5 RAM (2x16GB)</span>
                      <span className="font-semibold">$169.99</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>1TB NVMe SSD</span>
                      <span className="font-semibold">$89.99</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>ComputerHut 850W Gold PSU</span>
                      <span className="font-semibold">$119.99</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Premium Mid-Tower Case</span>
                      <span className="font-semibold">$129.99</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>System Assembly & Testing</span>
                      <span className="font-semibold">$99.00</span>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="flex justify-between items-center font-bold">
                      <span>Total</span>
                      <span>$1,639.94</span>
                    </div>
                    
                    <div className="pt-4">
                      <Button className="w-full">Complete Your Build</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="packages" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-primary/10 p-4">
                    <h3 className="font-semibold text-lg">Gaming Starter</h3>
                    <p className="text-sm text-muted-foreground">Perfect for 1080p gaming</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Intel Core i5-13400F
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        NVIDIA RTX 4060 8GB
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        16GB DDR4 RAM
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        500GB NVMe SSD
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        650W Bronze PSU
                      </li>
                    </ul>
                    <div className="pt-4">
                      <p className="text-xl font-bold">$999</p>
                      <p className="text-sm text-muted-foreground">Free shipping</p>
                    </div>
                    <Button className="w-full">Select & Customize</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden border-primary">
                  <div className="bg-primary p-4">
                    <h3 className="font-semibold text-lg text-primary-foreground">Gaming Pro</h3>
                    <p className="text-sm text-primary-foreground/80">High-performance 1440p gaming</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Intel Core i7-13700KF
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        NVIDIA RTX 4070 12GB
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        32GB DDR5 RAM
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        1TB NVMe SSD
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        850W Gold PSU
                      </li>
                    </ul>
                    <div className="pt-4">
                      <p className="text-xl font-bold">$1,599</p>
                      <p className="text-sm text-muted-foreground">Free shipping</p>
                    </div>
                    <Button className="w-full">Select & Customize</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-primary/10 p-4">
                    <h3 className="font-semibold text-lg">Gaming Ultra</h3>
                    <p className="text-sm text-muted-foreground">Ultimate 4K gaming experience</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Intel Core i9-13900K
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        NVIDIA RTX 4080 16GB
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        64GB DDR5 RAM
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        2TB NVMe SSD
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        1000W Platinum PSU
                      </li>
                    </ul>
                    <div className="pt-4">
                      <p className="text-xl font-bold">$2,499</p>
                      <p className="text-sm text-muted-foreground">Free shipping</p>
                    </div>
                    <Button className="w-full">Select & Customize</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
}