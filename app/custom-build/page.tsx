"use client"

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useCart } from "@/lib/cart";

type ComponentType = {
  id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
}

export default function CustomBuildPage() {
  const { addItem } = useCart();
  const [selectedComponents, setSelectedComponents] = useState<{
    CPU: ComponentType | null;
    GPU: ComponentType | null;
    MOTHERBOARD: ComponentType | null;
    RAM: ComponentType | null;
    STORAGE: ComponentType | null;
    COOLER: ComponentType | null;
    PSU: ComponentType | null;
    CASE: ComponentType | null;
  }>({
    CPU: null,
    GPU: null,
    MOTHERBOARD: null,
    RAM: null,
    STORAGE: null,
    COOLER: null,
    PSU: null,
    CASE: null,
  });

  const calculateTotal = () => {
    return Object.values(selectedComponents)
      .reduce((total, component) => total + (component?.price || 0), 0);
  };

  const addAllToCart = () => {
    Object.values(selectedComponents).forEach(component => {
      if (component) {
        addItem({
          id: component.id,
          name: component.name,
          price: component.price,
          image: component.image,
          category: component.category,
          quantity: 1
        });
      }
    });
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
                {selectedComponents.CPU ? (
                  <div className="flex items-start gap-4">
                    {selectedComponents.CPU.image && (
                      <div className="relative w-20 h-20">
                        <Image
                          src={selectedComponents.CPU.image}
                          alt={selectedComponents.CPU.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{selectedComponents.CPU.name}</h3>
                      <p className="text-sm text-muted-foreground">${selectedComponents.CPU.price}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => setSelectedComponents(prev => ({ ...prev, CPU: null }))}
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
                {selectedComponents.GPU ? (
                  <div className="flex items-start gap-4">
                    {selectedComponents.GPU.image && (
                      <div className="relative w-20 h-20">
                        <Image
                          src={selectedComponents.GPU.image}
                          alt={selectedComponents.GPU.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{selectedComponents.GPU.name}</h3>
                      <p className="text-sm text-muted-foreground">${selectedComponents.GPU.price}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => setSelectedComponents(prev => ({ ...prev, GPU: null }))}
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
                {selectedComponents.MOTHERBOARD ? (
                  <div className="flex items-start gap-4">
                    {selectedComponents.MOTHERBOARD.image && (
                      <div className="relative w-20 h-20">
                        <Image
                          src={selectedComponents.MOTHERBOARD.image}
                          alt={selectedComponents.MOTHERBOARD.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{selectedComponents.MOTHERBOARD.name}</h3>
                      <p className="text-sm text-muted-foreground">${selectedComponents.MOTHERBOARD.price}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => setSelectedComponents(prev => ({ ...prev, MOTHERBOARD: null }))}
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
                {selectedComponents.RAM ? (
                  <div className="flex items-start gap-4">
                    {selectedComponents.RAM.image && (
                      <div className="relative w-20 h-20">
                        <Image
                          src={selectedComponents.RAM.image}
                          alt={selectedComponents.RAM.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{selectedComponents.RAM.name}</h3>
                      <p className="text-sm text-muted-foreground">${selectedComponents.RAM.price}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => setSelectedComponents(prev => ({ ...prev, RAM: null }))}
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
                {selectedComponents.STORAGE ? (
                  <div className="flex items-start gap-4">
                    {selectedComponents.STORAGE.image && (
                      <div className="relative w-20 h-20">
                        <Image
                          src={selectedComponents.STORAGE.image}
                          alt={selectedComponents.STORAGE.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{selectedComponents.STORAGE.name}</h3>
                      <p className="text-sm text-muted-foreground">${selectedComponents.STORAGE.price}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => setSelectedComponents(prev => ({ ...prev, STORAGE: null }))}
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
                {selectedComponents.COOLER ? (
                  <div className="flex items-start gap-4">
                    {selectedComponents.COOLER.image && (
                      <div className="relative w-20 h-20">
                        <Image
                          src={selectedComponents.COOLER.image}
                          alt={selectedComponents.COOLER.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{selectedComponents.COOLER.name}</h3>
                      <p className="text-sm text-muted-foreground">${selectedComponents.COOLER.price}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => setSelectedComponents(prev => ({ ...prev, COOLER: null }))}
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
                {selectedComponents.PSU ? (
                  <div className="flex items-start gap-4">
                    {selectedComponents.PSU.image && (
                      <div className="relative w-20 h-20">
                        <Image
                          src={selectedComponents.PSU.image}
                          alt={selectedComponents.PSU.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{selectedComponents.PSU.name}</h3>
                      <p className="text-sm text-muted-foreground">${selectedComponents.PSU.price}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => setSelectedComponents(prev => ({ ...prev, PSU: null }))}
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
                {selectedComponents.CASE ? (
                  <div className="flex items-start gap-4">
                    {selectedComponents.CASE.image && (
                      <div className="relative w-20 h-20">
                        <Image
                          src={selectedComponents.CASE.image}
                          alt={selectedComponents.CASE.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{selectedComponents.CASE.name}</h3>
                      <p className="text-sm text-muted-foreground">${selectedComponents.CASE.price}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => setSelectedComponents(prev => ({ ...prev, CASE: null }))}
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
                  {Object.entries(selectedComponents).map(([category, component]) => (
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
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={addAllToCart}
                    disabled={Object.values(selectedComponents).every(comp => comp === null)}
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