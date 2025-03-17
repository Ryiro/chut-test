"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { useBuild } from "@/lib/build";
import { toast } from 'sonner';

export default function CustomBuildPage() {
  const { addItem } = useCart();
  const { components, removeFromBuild, buildTotal, isCompatible, compatibilityMessage } = useBuild();

  const addAllToCart = () => {
    Object.entries(components).forEach(([category, component]) => {
      if (component) {
        addItem({
          id: component.id,
          name: component.name,
          price: component.price,
          image: component.image,
          category: category,
          quantity: 1
        });
      }
    });
    toast.success('All components added to cart');
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Build Your Custom PC</h1>
            <p className="text-muted-foreground mt-2">
              Select compatible components for your perfect build
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Component Selection Area */}
            <div className="lg:col-span-2 space-y-4">  {/* Reduced space-y from 6 to 4 */}
              {/* CPU */}
              <Card className="p-4">  {/* Reduced padding from 6 to 4 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-32">  {/* Fixed width for component type */}
                      <h2 className="text-base font-semibold">Processor (CPU)</h2>
                    </div>
                    {components.CPU ? (
                      <>
                        {components.CPU.image && (
                          <div className="relative w-12 h-12">  {/* Reduced image size */}
                            <Image
                              src={components.CPU.image}
                              alt={components.CPU.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">{components.CPU.name}</h3>
                          {components.CPU.description && (
                            <p className="text-sm text-muted-foreground mt-1">{components.CPU.description}</p>
                          )}
                        </div>
                        <div className="text-sm font-medium w-20 text-right">₹{components.CPU.price.toLocaleString()}</div>
                        <Button 
                          variant="ghost" 
                          className="text-red-500 hover:text-red-600 ml-2"
                          onClick={() => removeFromBuild('CPU')}
                          size="sm"
                        >
                          Remove
                        </Button>
                      </>
                    ) : (
                      <div className="text-sm text-muted-foreground flex-1">No CPU selected</div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" asChild className="ml-4">
                    <a href="/products?category=CPU">Select CPU</a>
                  </Button>
                </div>
              </Card>

              {/* GPU */}
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-32">
                      <h2 className="text-base font-semibold">Graphics Card</h2>
                    </div>
                    {components.GPU ? (
                      <>
                        {components.GPU.image && (
                          <div className="relative w-12 h-12">
                            <Image
                              src={components.GPU.image}
                              alt={components.GPU.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">{components.GPU.name}</h3>
                          {components.GPU.description && (
                            <p className="text-sm text-muted-foreground mt-1">{components.GPU.description}</p>
                          )}
                        </div>
                        <div className="text-sm font-medium w-20 text-right">₹{components.GPU.price.toLocaleString()}</div>
                        <Button 
                          variant="ghost" 
                          className="text-red-500 hover:text-red-600 ml-2"
                          onClick={() => removeFromBuild('GPU')}
                          size="sm"
                        >
                          Remove
                        </Button>
                      </>
                    ) : (
                      <div className="text-sm text-muted-foreground flex-1">No GPU selected</div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" asChild className="ml-4">
                    <a href="/products?category=GPU">Select GPU</a>
                  </Button>
                </div>
              </Card>

              {/* Motherboard */}
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-32">
                      <h2 className="text-base font-semibold">Motherboard</h2>
                    </div>
                    {components.MOTHERBOARD ? (
                      <>
                        {components.MOTHERBOARD.image && (
                          <div className="relative w-12 h-12">
                            <Image
                              src={components.MOTHERBOARD.image}
                              alt={components.MOTHERBOARD.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">{components.MOTHERBOARD.name}</h3>
                          {components.MOTHERBOARD.description && (
                            <p className="text-sm text-muted-foreground mt-1">{components.MOTHERBOARD.description}</p>
                          )}
                        </div>
                        <div className="text-sm font-medium w-20 text-right">₹{components.MOTHERBOARD.price.toLocaleString()}</div>
                        <Button 
                          variant="ghost" 
                          className="text-red-500 hover:text-red-600 ml-2"
                          onClick={() => removeFromBuild('MOTHERBOARD')}
                          size="sm"
                        >
                          Remove
                        </Button>
                      </>
                    ) : (
                      <div className="text-sm text-muted-foreground flex-1">No motherboard selected</div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" asChild className="ml-4">
                    <a href="/products?category=MOTHERBOARD">Select Motherboard</a>
                  </Button>
                </div>
              </Card>

              {/* RAM */}
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-32">
                      <h2 className="text-base font-semibold">Memory (RAM)</h2>
                    </div>
                    {components.RAM ? (
                      <>
                        {components.RAM.image && (
                          <div className="relative w-12 h-12">
                            <Image
                              src={components.RAM.image}
                              alt={components.RAM.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">{components.RAM.name}</h3>
                          {components.RAM.description && (
                            <p className="text-sm text-muted-foreground mt-1">{components.RAM.description}</p>
                          )}
                        </div>
                        <div className="text-sm font-medium w-20 text-right">₹{components.RAM.price.toLocaleString()}</div>
                        <Button 
                          variant="ghost" 
                          className="text-red-500 hover:text-red-600 ml-2"
                          onClick={() => removeFromBuild('RAM')}
                          size="sm"
                        >
                          Remove
                        </Button>
                      </>
                    ) : (
                      <div className="text-sm text-muted-foreground flex-1">No RAM selected</div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" asChild className="ml-4">
                    <a href="/products?category=RAM">Select RAM</a>
                  </Button>
                </div>
              </Card>

              {/* Storage */}
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-32">
                      <h2 className="text-base font-semibold">Storage</h2>
                    </div>
                    {components.STORAGE ? (
                      <>
                        {components.STORAGE.image && (
                          <div className="relative w-12 h-12">
                            <Image
                              src={components.STORAGE.image}
                              alt={components.STORAGE.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">{components.STORAGE.name}</h3>
                          {components.STORAGE.description && (
                            <p className="text-sm text-muted-foreground mt-1">{components.STORAGE.description}</p>
                          )}
                        </div>
                        <div className="text-sm font-medium w-20 text-right">₹{components.STORAGE.price.toLocaleString()}</div>
                        <Button 
                          variant="ghost" 
                          className="text-red-500 hover:text-red-600 ml-2"
                          onClick={() => removeFromBuild('STORAGE')}
                          size="sm"
                        >
                          Remove
                        </Button>
                      </>
                    ) : (
                      <div className="text-sm text-muted-foreground flex-1">No storage selected</div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" asChild className="ml-4">
                    <a href="/products?category=STORAGE">Select Storage</a>
                  </Button>
                </div>
              </Card>

              {/* CPU Cooler */}
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-32">
                      <h2 className="text-base font-semibold">CPU Cooler</h2>
                    </div>
                    {components.COOLER ? (
                      <>
                        {components.COOLER.image && (
                          <div className="relative w-12 h-12">
                            <Image
                              src={components.COOLER.image}
                              alt={components.COOLER.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">{components.COOLER.name}</h3>
                          {components.COOLER.description && (
                            <p className="text-sm text-muted-foreground mt-1">{components.COOLER.description}</p>
                          )}
                        </div>
                        <div className="text-sm font-medium w-20 text-right">₹{components.COOLER.price.toLocaleString()}</div>
                        <Button 
                          variant="ghost" 
                          className="text-red-500 hover:text-red-600 ml-2"
                          onClick={() => removeFromBuild('COOLER')}
                          size="sm"
                        >
                          Remove
                        </Button>
                      </>
                    ) : (
                      <div className="text-sm text-muted-foreground flex-1">No cooler selected</div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" asChild className="ml-4">
                    <a href="/products?category=COOLER">Select Cooler</a>
                  </Button>
                </div>
              </Card>

              {/* Power Supply */}
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-32">
                      <h2 className="text-base font-semibold">Power Supply</h2>
                    </div>
                    {components.PSU ? (
                      <>
                        {components.PSU.image && (
                          <div className="relative w-12 h-12">
                            <Image
                              src={components.PSU.image}
                              alt={components.PSU.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">{components.PSU.name}</h3>
                          {components.PSU.description && (
                            <p className="text-sm text-muted-foreground mt-1">{components.PSU.description}</p>
                          )}
                        </div>
                        <div className="text-sm font-medium w-20 text-right">₹{components.PSU.price.toLocaleString()}</div>
                        <Button 
                          variant="ghost" 
                          className="text-red-500 hover:text-red-600 ml-2"
                          onClick={() => removeFromBuild('PSU')}
                          size="sm"
                        >
                          Remove
                        </Button>
                      </>
                    ) : (
                      <div className="text-sm text-muted-foreground flex-1">No PSU selected</div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" asChild className="ml-4">
                    <a href="/products?category=PSU">Select PSU</a>
                  </Button>
                </div>
              </Card>

              {/* Case */}
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-32">
                      <h2 className="text-base font-semibold">Case</h2>
                    </div>
                    {components.CASE ? (
                      <>
                        {components.CASE.image && (
                          <div className="relative w-12 h-12">
                            <Image
                              src={components.CASE.image}
                              alt={components.CASE.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">{components.CASE.name}</h3>
                          {components.CASE.description && (
                            <p className="text-sm text-muted-foreground mt-1">{components.CASE.description}</p>
                          )}
                        </div>
                        <div className="text-sm font-medium w-20 text-right">₹{components.CASE.price.toLocaleString()}</div>
                        <Button 
                          variant="ghost" 
                          className="text-red-500 hover:text-red-600 ml-2"
                          onClick={() => removeFromBuild('CASE')}
                          size="sm"
                        >
                          Remove
                        </Button>
                      </>
                    ) : (
                      <div className="text-sm text-muted-foreground flex-1">No case selected</div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" asChild className="ml-4">
                    <a href="/products?category=CASE">Select Case</a>
                  </Button>
                </div>
              </Card>
            </div>

            {/* Build Summary */}
            <div className="lg:col-span-1">
              <Card className={`p-6 sticky top-24 ${Object.values(components).some(comp => comp !== null) ? 
                'border-2 border-opacity-50 ' + (isCompatible ? 'border-green-500' : 'border-red-500') : ''}`}>
                <h2 className="text-xl font-semibold mb-4">Build Summary</h2>
                
                {/* Compatibility Status */}
                {Object.values(components).some(comp => comp !== null) && (
                  <div className={`mb-4 p-3 rounded-lg ${
                    isCompatible 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {isCompatible ? (
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">All components are compatible!</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <span className="font-medium">Compatibility Issues:</span>
                          <p className="mt-1 text-sm">{compatibilityMessage}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-4">
                  {Object.entries(components).map(([category, component]) => (
                    component && (
                      <div key={category} className="flex justify-between">
                        <span className="text-sm text-muted-foreground">{category}</span>
                        <span className="font-medium">₹{component.price.toLocaleString()}</span>
                      </div>
                    )
                  ))}
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{buildTotal.toLocaleString()}</span>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={addAllToCart}
                    disabled={!isCompatible || Object.values(components).every(comp => comp === null)}
                  >
                    Add All to Cart
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}