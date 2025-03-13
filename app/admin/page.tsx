'use client';

import React, { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ComponentTypes = {
  CPU: 'CPU',
  GPU: 'GPU',
  MOTHERBOARD: 'MOTHERBOARD',
  RAM: 'RAM',
  STORAGE: 'STORAGE',
  PSU: 'PSU',
  CASE: 'CASE',
  COOLER: 'COOLER',
} as const;

export default function AdminPage() {
  const [category, setCategory] = useState<keyof typeof ComponentTypes>('CPU');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    specs: {
      brand: '',
      cores: '',
      threads: '',
      baseSpeed: '',
      boostSpeed: '',
      socket: '',
      tdp: '',
      memory: '',
      memoryType: '',
      coreClock: '',
      boostClock: '',
      capacity: '',
      speed: '',
      type: '',
      timing: '',
      interface: '',
      readSpeed: '',
      writeSpeed: '',
      chipset: '',
      formFactor: '',
      memoryMax: '',
      memorySlots: '',
      wattage: '',
      efficiency: '',
      modular: false,
      maxGpuLength: '',
      maxCpuHeight: '',
      height: '',
      fanCount: '',
      radiatorSize: '',
      fanSize: '',
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          category,
        }),
      });

      if (response.ok) {
        alert('Product added successfully');
        // Reset form
        setFormData({
          name: '',
          price: '',
          stock: '',
          specs: { ...formData.specs }
        });
      } else {
        alert('Error adding product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding product');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string, isSpec: boolean = false) => {
    if (isSpec) {
      setFormData({
        ...formData,
        specs: { ...formData.specs, [field]: e.target.value }
      });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const renderSpecFields = () => {
    switch (category) {
      case 'CPU':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Brand</Label>
              <Input
                type="text"
                value={formData.specs.brand}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'brand', true)}
              />
            </div>
            <div className="space-y-2">
              <Label>Cores</Label>
              <Input
                type="number"
                value={formData.specs.cores}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, cores: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Threads</Label>
              <Input
                type="number"
                value={formData.specs.threads}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, threads: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Base Speed (GHz)</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.specs.baseSpeed}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, baseSpeed: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Boost Speed (GHz)</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.specs.boostSpeed}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, boostSpeed: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Socket</Label>
              <Input
                type="text"
                value={formData.specs.socket}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, socket: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>TDP (W)</Label>
              <Input
                type="number"
                value={formData.specs.tdp}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, tdp: e.target.value }
                })}
              />
            </div>
          </div>
        );
      case 'GPU':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Brand</Label>
              <Input
                type="text"
                value={formData.specs.brand}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, brand: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Memory (GB)</Label>
              <Input
                type="number"
                value={formData.specs.memory}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, memory: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Memory Type</Label>
              <Input
                type="text"
                value={formData.specs.memoryType}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, memoryType: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Core Clock (MHz)</Label>
              <Input
                type="number"
                value={formData.specs.coreClock}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, coreClock: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Boost Clock (MHz)</Label>
              <Input
                type="number"
                value={formData.specs.boostClock}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, boostClock: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>TDP (W)</Label>
              <Input
                type="number"
                value={formData.specs.tdp}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, tdp: e.target.value }
                })}
              />
            </div>
          </div>
        );
      case 'RAM':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Capacity (GB)</Label>
              <Input
                type="number"
                value={formData.specs.capacity}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, capacity: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Speed (MHz)</Label>
              <Input
                type="number"
                value={formData.specs.speed}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, speed: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Type (DDR4/DDR5)</Label>
              <Input
                type="text"
                value={formData.specs.type}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, type: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Timing</Label>
              <Input
                type="text"
                value={formData.specs.timing}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, timing: e.target.value }
                })}
              />
            </div>
          </div>
        );
      case 'STORAGE':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type (SSD/HDD)</Label>
              <Input
                type="text"
                value={formData.specs.type}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, type: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Capacity (GB)</Label>
              <Input
                type="number"
                value={formData.specs.capacity}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, capacity: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Interface</Label>
              <Input
                type="text"
                value={formData.specs.interface}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, interface: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Read Speed (MB/s)</Label>
              <Input
                type="number"
                value={formData.specs.readSpeed}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, readSpeed: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Write Speed (MB/s)</Label>
              <Input
                type="number"
                value={formData.specs.writeSpeed}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, writeSpeed: e.target.value }
                })}
              />
            </div>
          </div>
        );
      case 'MOTHERBOARD':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Socket</Label>
              <Input
                type="text"
                value={formData.specs.socket}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, socket: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Chipset</Label>
              <Input
                type="text"
                value={formData.specs.chipset}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, chipset: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Form Factor</Label>
              <Input
                type="text"
                value={formData.specs.formFactor}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, formFactor: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Max Memory (GB)</Label>
              <Input
                type="number"
                value={formData.specs.memoryMax}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, memoryMax: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Memory Slots</Label>
              <Input
                type="number"
                value={formData.specs.memorySlots}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, memorySlots: e.target.value }
                })}
              />
            </div>
          </div>
        );
      case 'PSU':
        return (
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label>Wattage</Label>
              <Input
                type="number"
                value={formData.specs.wattage}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, wattage: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Efficiency Rating</Label>
              <Input
                type="text"
                value={formData.specs.efficiency}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, efficiency: e.target.value }
                })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.specs.modular}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, modular: e.target.checked }
                })}
              />
              <label>Modular</label>
            </div>
          </div>
        );
      case 'CASE':
        return (
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label>Form Factor</Label>
              <Input
                type="text"
                value={formData.specs.formFactor}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, formFactor: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Max GPU Length (mm)</Label>
              <Input
                type="number"
                value={formData.specs.maxGpuLength}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, maxGpuLength: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Max CPU Cooler Height (mm)</Label>
              <Input
                type="number"
                value={formData.specs.maxCpuHeight}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, maxCpuHeight: e.target.value }
                })}
              />
            </div>
          </div>
        );
      case 'COOLER':
        return (
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label>Type (Air/Liquid)</Label>
              <Input
                type="text"
                value={formData.specs.type}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, type: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Height (mm)</Label>
              <Input
                type="number"
                value={formData.specs.height}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, height: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Radiator Size (mm)</Label>
              <Input
                type="number"
                value={formData.specs.radiatorSize}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, radiatorSize: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Fan Size (mm)</Label>
              <Input
                type="number"
                value={formData.specs.fanSize}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, fanSize: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Fan Count</Label>
              <Input
                type="number"
                value={formData.specs.fanCount}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, fanCount: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>TDP Support (W)</Label>
              <Input
                type="number"
                value={formData.specs.tdp}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, tdp: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Socket Compatibility</Label>
              <Input
                type="text"
                value={formData.specs.socket}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, socket: e.target.value }
                })}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin - Add Product</h1>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={category}
              onValueChange={(value: keyof typeof ComponentTypes) => setCategory(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(ComponentTypes).map(([key, value]) => (
                  <SelectItem key={key} value={value}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Product Name</Label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'name')}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Price</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'price')}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Stock</Label>
              <Input
                type="number"
                value={formData.stock}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'stock')}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Specifications</h3>
            {renderSpecFields()}
          </div>

          <Button type="submit" className="w-full">
            Add Product
          </Button>
        </form>
      </Card>
    </div>
  );
}