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
  const { components, removeFromBuild, buildTotal } = useBuild();

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
            <div className="lg:col-span-2 space-y-6">
              {/* CPU */}
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Processor (CPU)</h2>
                    <p className="text-sm text-muted-foreground">The brain of your computer</p>
                  </div>
                  <Button variant="outline" asChild>
                    <a href="/products?category=CPU">Select CPU</a>
                  </Button>
                </div>
                {components.CPU ? (
                  <div className="flex items-start gap-4">
                    {components.CPU.image && (
                      <div className="relative w-20 h-20">
                        <Image
                          src={components.CPU.image}
                          alt={components.CPU.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{components.CPU.name}</h3>
                      <p className="text-sm text-muted-foreground">${components.CPU.price}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => removeFromBuild('CPU')}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">No CPU selected</div>
                )}
              </Card>

              {/* GPU */}
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Graphics Card (GPU)</h2>
                    <p className="text-sm text-muted-foreground">Powers your gaming experience</p>
                  </div>
                  <Button variant="outline" asChild>
                    <a href="/products?category=GPU">Select GPU</a>
                  </Button>
                </div>
                {components.GPU ? (
                  <div className="flex items-start gap-4">
                    {components.GPU.image && (
                      <div className="relative w-20 h-20">
                        <Image
                          src={components.GPU.image}
                          alt={components.GPU.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{components.GPU.name}</h3>
                      <p className="text-sm text-muted-foreground">${components.GPU.price}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => removeFromBuild('GPU')}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">No GPU selected</div>
                )}
              </Card>

              {/* Motherboard */}
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Motherboard</h2>
                    <p className="text-sm text-muted-foreground">The foundation of your build</p>
                  </div>
                  <Button variant="outline" asChild>
                    <a href="/products?category=MOTHERBOARD">Select Motherboard</a>
                  </Button>
                </div>
                {components.MOTHERBOARD ? (
                  <div className="flex items-start gap-4">
                    {components.MOTHERBOARD.image && (
                      <div className="relative w-20 h-20">
                        <Image
                          src={components.MOTHERBOARD.image}
                          alt={components.MOTHERBOARD.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{components.MOTHERBOARD.name}</h3>
                      <p className="text-sm text-muted-foreground">${components.MOTHERBOARD.price}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => removeFromBuild('MOTHERBOARD')}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">No motherboard selected</div>
                )}
              </Card>

              {/* RAM */}
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Memory (RAM)</h2>
                    <p className="text-sm text-muted-foreground">Your system&apos;s short-term memory</p>
                  </div>
                  <Button variant="outline" asChild>
                    <a href="/products?category=RAM">Select RAM</a>
                  </Button>
                </div>
                {components.RAM ? (
                  <div className="flex items-start gap-4">
                    {components.RAM.image && (
                      <div className="relative w-20 h-20">
                        <Image
                          src={components.RAM.image}
                          alt={components.RAM.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{components.RAM.name}</h3>
                      <p className="text-sm text-muted-foreground">${components.RAM.price}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => removeFromBuild('RAM')}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">No RAM selected</div>
                )}
              </Card>

              {/* Storage */}
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Storage</h2>
                    <p className="text-sm text-muted-foreground">Where your data lives</p>
                  </div>
                  <Button variant="outline" asChild>
                    <a href="/products?category=STORAGE">Select Storage</a>
                  </Button>
                </div>
                {components.STORAGE ? (
                  <div className="flex items-start gap-4">
                    {components.STORAGE.image && (
                      <div className="relative w-20 h-20">
                        <Image
                          src={components.STORAGE.image}
                          alt={components.STORAGE.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{components.STORAGE.name}</h3>
                      <p className="text-sm text-muted-foreground">${components.STORAGE.price}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => removeFromBuild('STORAGE')}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">No storage selected</div>
                )}
              </Card>

              {/* CPU Cooler */}
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">CPU Cooler</h2>
                    <p className="text-sm text-muted-foreground">Keeps your CPU cool under pressure</p>
                  </div>
                  <Button variant="outline" asChild>
                    <a href="/products?category=COOLER">Select Cooler</a>
                  </Button>
                </div>
                {components.COOLER ? (
                  <div className="flex items-start gap-4">
                    {components.COOLER.image && (
                      <div className="relative w-20 h-20">
                        <Image
                          src={components.COOLER.image}
                          alt={components.COOLER.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{components.COOLER.name}</h3>
                      <p className="text-sm text-muted-foreground">${components.COOLER.price}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => removeFromBuild('COOLER')}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">No cooler selected</div>
                )}
              </Card>

              {/* Power Supply */}
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Power Supply (PSU)</h2>
                    <p className="text-sm text-muted-foreground">Reliable power for your components</p>
                  </div>
                  <Button variant="outline" asChild>
                    <a href="/products?category=PSU">Select PSU</a>
                  </Button>
                </div>
                {components.PSU ? (
                  <div className="flex items-start gap-4">
                    {components.PSU.image && (
                      <div className="relative w-20 h-20">
                        <Image
                          src={components.PSU.image}
                          alt={components.PSU.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{components.PSU.name}</h3>
                      <p className="text-sm text-muted-foreground">${components.PSU.price}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => removeFromBuild('PSU')}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">No PSU selected</div>
                )}
              </Card>

              {/* Case */}
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Case</h2>
                    <p className="text-sm text-muted-foreground">Houses and protects your components</p>
                  </div>
                  <Button variant="outline" asChild>
                    <a href="/products?category=CASE">Select Case</a>
                  </Button>
                </div>
                {components.CASE ? (
                  <div className="flex items-start gap-4">
                    {components.CASE.image && (
                      <div className="relative w-20 h-20">
                        <Image
                          src={components.CASE.image}
                          alt={components.CASE.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{components.CASE.name}</h3>
                      <p className="text-sm text-muted-foreground">${components.CASE.price}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => removeFromBuild('CASE')}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">No case selected</div>
                )}
              </Card>
            </div>

            {/* Build Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Build Summary</h2>
                <div className="space-y-4">
                  {Object.entries(components).map(([category, component]) => (
                    component && (
                      <div key={category} className="flex justify-between">
                        <span className="text-sm text-muted-foreground">{category}</span>
                        <span className="font-medium">${component.price}</span>
                      </div>
                    )
                  ))}
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${buildTotal.toFixed(2)}</span>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={addAllToCart}
                    disabled={Object.values(components).every(comp => comp === null)}
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