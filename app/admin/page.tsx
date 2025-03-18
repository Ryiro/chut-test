'use client';

import React, { useState, ChangeEvent, useCallback, useRef } from 'react';
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
import { ComponentCategory } from '@prisma/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from 'next/image';

interface Spec {
  id: string;
  products: Product[];
}

interface CpuSpec extends Spec {
  brand: string;
  cores: number;
  threads: number;
  baseSpeed: number;
  boostSpeed?: number;
  socket: string;
  tdp: number;
}

interface GpuSpec extends Spec {
  brand: string;
  memory: number;
  memoryType: string;
  coreClock: number;
  boostClock?: number;
  tdp: number;
}

interface RamSpec extends Spec {
  capacity: number;
  speed: number;
  type: string;
  timing: string;
}

interface StorageSpec extends Spec {
  type: string;
  capacity: number;
  interface: string;
  readSpeed?: number;
  writeSpeed?: number;
}

interface MotherboardSpec extends Spec {
  socket: string;
  chipset: string;
  formFactor: string;
  memoryMax: number;
  memorySlots: number;
}

interface PsuSpec extends Spec {
  wattage: number;
  efficiency: string;
  modular: boolean;
}

interface CaseSpec extends Spec {
  formFactor: string;
  maxGpuLength: number;
  maxCpuHeight: number;
}

interface CoolerSpec extends Spec {
  type: string;
  height: number;
  radiatorSize?: number;
  fanSize: number;
  fanCount: number;
  tdp: number;
  socket: string;
}

interface MonitorSpec extends Spec {
  size: number;
  resolution: string;
  refreshRate: number;
  panelType: string;
  responseTime: number;
  aspectRatio: string;
  hdrSupport: boolean;
  ports: string;
  speakers: boolean;
  heightAdjustable: boolean;
}

interface KeyboardSpec extends Spec {
  type: string;
  layout: string;
  switchType?: string;
  backlighting: boolean;
  wireless: boolean;
  numpad: boolean;
  multimedia: boolean;
}

interface MouseSpec extends Spec {
  dpi: number;
  buttons: number;
  wireless: boolean;
  sensor: string;
  rgb: boolean;
  weight?: number;
  weightAdjustable: boolean;
}

interface SpeakerSpec extends Spec {
  type: string;
  totalWattage: number;
  wireless: boolean;
  bluetooth: boolean;
  subwoofer: boolean;
  remote: boolean;
}

interface HeadphoneSpec extends Spec {
  type: string;
  driver: string;
  wireless: boolean;
  bluetooth: boolean;
  noiseCancelling: boolean;
  microphone: boolean;
  impedance?: number;
  frequency: string;
}

interface ExternalStorageSpec extends Spec {
  capacity: number;
  type: string;
  interface: string;
  portable: boolean;
  encrypted: boolean;
  readSpeed?: number;
  writeSpeed?: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: ComponentCategory;
  image?: string;
  cpuSpec?: CpuSpec;
  gpuSpec?: GpuSpec;
  ramSpec?: RamSpec;
  storageSpec?: StorageSpec;
  motherboardSpec?: MotherboardSpec;
  psuSpec?: PsuSpec;
  caseSpec?: CaseSpec;
  coolerSpec?: CoolerSpec;
  monitorSpec?: MonitorSpec;
  keyboardSpec?: KeyboardSpec;
  mouseSpec?: MouseSpec;
  speakerSpec?: SpeakerSpec;
  headphoneSpec?: HeadphoneSpec;
  externalStorageSpec?: ExternalStorageSpec;
  updatedAt: string;
  createdAt: string;
}

const ComponentTypes = {
  CPU: 'CPU',
  GPU: 'GPU',
  MOTHERBOARD: 'MOTHERBOARD',
  RAM: 'RAM',
  STORAGE: 'STORAGE',
  PSU: 'PSU',
  CASE: 'CASE',
  COOLER: 'COOLER',
  MONITOR: 'MONITOR',
  KEYBOARD: 'KEYBOARD',
  MOUSE: 'MOUSE',
  SPEAKERS: 'SPEAKERS',
  HEADPHONES: 'HEADPHONES',
  EXTERNAL_STORAGE: 'EXTERNAL_STORAGE',
} as const;

interface FormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: keyof typeof ComponentTypes;
  image?: string;
  specs: {
    // CPU Specs
    brand?: string;
    cores?: string;
    threads?: string;
    baseSpeed?: string;
    boostSpeed?: string;
    socket?: string;
    tdp?: string;

    // GPU Specs
    memory?: string;
    memoryType?: string;
    coreClock?: string;
    boostClock?: string;

    // RAM Specs
    capacity?: string;
    speed?: string;
    type?: string;
    timing?: string;

    // Storage Specs
    interface?: string;
    readSpeed?: string;
    writeSpeed?: string;

    // Motherboard Specs
    chipset?: string;
    formFactor?: string;
    memoryMax?: string;
    memorySlots?: string;

    // PSU Specs
    wattage?: string;
    efficiency?: string;
    modular?: boolean;

    // Case Specs
    maxGpuLength?: string;
    maxCpuHeight?: string;

    // Cooler Specs
    height?: string;
    radiatorSize?: string;
    fanSize?: string;
    fanCount?: string;

    // Monitor Specs
    size?: string;
    resolution?: string;
    refreshRate?: string;
    panelType?: string;
    responseTime?: string;
    aspectRatio?: string;
    ports?: string;
    hdrSupport?: boolean;
    speakers?: boolean;
    heightAdjustable?: boolean;

    // Keyboard Specs
    layout?: string;
    switchType?: string;
    backlighting?: boolean;
    wireless?: boolean;
    numpad?: boolean;
    multimedia?: boolean;

    // Mouse Specs
    dpi?: string;
    buttons?: string;
    sensor?: string;
    rgb?: boolean;
    weight?: string;
    weightAdjustable?: boolean;

    // Speaker Specs
    totalWattage?: string;
    bluetooth?: boolean;
    subwoofer?: boolean;
    remote?: boolean;

    // Headphone Specs
    driver?: string;
    noiseCancelling?: boolean;
    microphone?: boolean;
    impedance?: string;
    frequency?: string;

    // External Storage Specs
    portable?: boolean;
    encrypted?: boolean;
  };
}

export default function AdminPage() {
  const [category, setCategory] = useState<keyof typeof ComponentTypes>('CPU');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '', // Add description field
    price: '',
    stock: '',
    category: 'CPU',
    image: '',
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
      size: '',
      resolution: '',
      refreshRate: '',
      panelType: '',
      responseTime: '',
      aspectRatio: '',
      ports: '',
      hdrSupport: false,
      speakers: false,
      heightAdjustable: false,
      layout: '',
      switchType: '',
      backlighting: false,
      wireless: false,
      numpad: false,
      multimedia: false,
      dpi: '',
      buttons: '',
      sensor: '',
      rgb: false,
      weight: '',
      weightAdjustable: false,
      totalWattage: '',
      bluetooth: false,
      subwoofer: false,
      remote: false,
      driver: '',
      noiseCancelling: false,
      microphone: false,
      impedance: '',
      frequency: '',
      portable: false,
      encrypted: false
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search function
  const debouncedSearch = useCallback(
    async (query: string) => {
      if (query.length >= 2) {
        setIsSearching(true);
        setSearchError(null);
        try {
          const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.error || 'Failed to search products');
          }

          if (data.error) {
            throw new Error(data.error);
          }

          if (!Array.isArray(data)) {
            throw new Error('Invalid response format');
          }

          setSearchResults(data);
        } catch (error) {
          console.error('Error searching products:', error);
          setSearchError(error instanceof Error ? error.message : 'Error searching products');
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    },
    []
  );

  // Handle search input change with debouncing
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Clear the previous timeout
    const timeoutId = setTimeout(() => {
      debouncedSearch(query);
    }, 300); // 300ms delay

    // Cleanup on unmount or next change
    return () => clearTimeout(timeoutId);
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setUploadError('Image size should be less than 5MB');
        if (e.target) e.target.value = '';
        setImagePreview(null);
        setFormData(prev => ({ ...prev, image: '' }));
        return;
      }

      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setUploadError('Only JPEG, PNG and WebP images are allowed');
        if (e.target) e.target.value = '';
        setImagePreview(null);
        setFormData(prev => ({ ...prev, image: '' }));
        return;
      }

      // Show preview
      setImagePreview(URL.createObjectURL(file));

      try {
        // Upload the file
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Error uploading image');
        }

        // Store the image path
        setFormData(prev => ({
          ...prev,
          image: data.path
        }));
      } catch (error) {
        console.error('Error uploading image:', error);
        setUploadError(error instanceof Error ? error.message : 'Error uploading image');
        setImagePreview(null);
        setFormData(prev => ({ ...prev, image: '' }));
        if (e.target) e.target.value = '';
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate required fields
      if (!formData.name || !formData.price || !formData.stock) {
        alert('Please fill in all required fields');
        return;
      }

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

      const data = await response.json();

      if (response.ok) {
        alert('Product added successfully');
        // Reset form and image preview
        setFormData({
          name: '',
          description: '',
          price: '',
          stock: '',
          category: 'CPU',
          image: '',
          specs: { ...formData.specs }
        });
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        throw new Error(data.details || 'Error adding product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : 'Error adding product');
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

  const socketOptions = {
    Intel: [
      'LGA 1700',
      'LGA 1200',
      'LGA 1151',
      'LGA 1150',
      'LGA 1155',
      'LGA 2066',
      'LGA 4677'
    ],
    AMD: [
      'AM5',
      'AM4',
      'AM3+',
      'TR4',
      'sTRX4',
      'SP3'
    ]
  };

  const renderSpecFields = () => {
    switch (category) {
      case 'CPU':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Brand</Label>
              <div className="flex gap-2">
                <Select
                  value={formData.specs.brand === 'AMD' || formData.specs.brand === 'Intel' ? formData.specs.brand : 'other'}
                  onValueChange={(value) => {
                    if (value === 'other') {
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, brand: '', socket: '' }
                      });
                    } else {
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, brand: value, socket: '' }
                      });
                    }
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AMD">AMD</SelectItem>
                    <SelectItem value="Intel">Intel</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {(formData.specs.brand !== 'AMD' && formData.specs.brand !== 'Intel') && (
                  <Input
                    type="text"
                    value={formData.specs.brand}
                    onChange={(e) => setFormData({
                      ...formData,
                      specs: { ...formData.specs, brand: e.target.value }
                    })}
                    placeholder="Enter brand name"
                    className="flex-1"
                  />
                )}
              </div>
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
              <div className="flex gap-2">
                <Select
                  value={formData.specs.socket}
                  onValueChange={(value) => {
                    if (value === 'other') {
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, socket: '' }
                      });
                    } else {
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, socket: value }
                      });
                    }
                  }}
                  disabled={!formData.specs.brand || (formData.specs.brand !== 'AMD' && formData.specs.brand !== 'Intel')}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select socket" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.specs.brand === 'Intel' && (
                      socketOptions.Intel.map(socket => (
                        <SelectItem key={socket} value={socket}>
                          {socket}
                        </SelectItem>
                      ))
                    )}
                    {formData.specs.brand === 'AMD' && (
                      socketOptions.AMD.map(socket => (
                        <SelectItem key={socket} value={socket}>
                          {socket}
                        </SelectItem>
                      ))
                    )}
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {formData.specs.socket && (formData.specs.socket === '' || 
                  (!socketOptions.Intel.includes(formData.specs.socket || '') && 
                   !socketOptions.AMD.includes(formData.specs.socket || ''))) && (
                  <Input
                    type="text"
                    value={formData.specs.socket || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      specs: { ...formData.specs, socket: e.target.value }
                    })}
                    placeholder="Enter socket type"
                    className="flex-1"
                  />
                )}
              </div>
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
              <div className="flex gap-2">
                <Select
                  value={formData.specs.brand === 'NVIDIA' || formData.specs.brand === 'AMD' || formData.specs.brand === 'Intel' ? formData.specs.brand : 'other'}
                  onValueChange={(value) => {
                    if (value === 'other') {
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, brand: '' }
                      });
                    } else {
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, brand: value }
                      });
                    }
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NVIDIA">NVIDIA</SelectItem>
                    <SelectItem value="AMD">AMD</SelectItem>
                    <SelectItem value="Intel">Intel</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {(formData.specs.brand !== 'NVIDIA' && formData.specs.brand !== 'AMD' && formData.specs.brand !== 'Intel') && (
                  <Input
                    type="text"
                    value={formData.specs.brand}
                    onChange={(e) => setFormData({
                      ...formData,
                      specs: { ...formData.specs, brand: e.target.value }
                    })}
                    placeholder="Enter brand name"
                    className="flex-1"
                  />
                )}
              </div>
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
      case 'MONITOR':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Size (inches)</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.specs.size}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, size: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Resolution</Label>
              <Input
                type="text"
                value={formData.specs.resolution}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, resolution: e.target.value }
                })}
                placeholder="e.g., 1920x1080"
              />
            </div>
            <div className="space-y-2">
              <Label>Refresh Rate (Hz)</Label>
              <Input
                type="number"
                value={formData.specs.refreshRate}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, refreshRate: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Panel Type</Label>
              <Select
                value={formData.specs.panelType}
                onValueChange={(value) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, panelType: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select panel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IPS">IPS</SelectItem>
                  <SelectItem value="VA">VA</SelectItem>
                  <SelectItem value="TN">TN</SelectItem>
                  <SelectItem value="OLED">OLED</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Response Time (ms)</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.specs.responseTime}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, responseTime: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Aspect Ratio</Label>
              <Input
                type="text"
                value={formData.specs.aspectRatio}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, aspectRatio: e.target.value }
                })}
                placeholder="e.g., 16:9"
              />
            </div>
            <div className="space-y-2">
              <Label>Ports</Label>
              <Input
                type="text"
                value={formData.specs.ports}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, ports: e.target.value }
                })}
                placeholder="HDMI, DisplayPort, etc."
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.specs.hdrSupport}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, hdrSupport: e.target.checked }
                })}
              />
              <label>HDR Support</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.specs.speakers}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, speakers: e.target.checked }
                })}
              />
              <label>Built-in Speakers</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.specs.heightAdjustable}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, heightAdjustable: e.target.checked }
                })}
              />
              <label>Height/Tilt Adjustable</label>
            </div>
          </div>
        );

      case 'KEYBOARD':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={formData.specs.type}
                onValueChange={(value) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, type: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select keyboard type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mechanical">Mechanical</SelectItem>
                  <SelectItem value="Membrane">Membrane</SelectItem>
                  <SelectItem value="Optical">Optical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Layout</Label>
              <Select
                value={formData.specs.layout}
                onValueChange={(value) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, layout: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-size">Full-size</SelectItem>
                  <SelectItem value="TKL">TKL</SelectItem>
                  <SelectItem value="60%">60%</SelectItem>
                  <SelectItem value="75%">75%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.specs.type === 'Mechanical' && (
              <div className="space-y-2">
                <Label>Switch Type</Label>
                <Input
                  type="text"
                  value={formData.specs.switchType}
                  onChange={(e) => setFormData({
                    ...formData,
                    specs: { ...formData.specs, switchType: e.target.value }
                  })}
                  placeholder="e.g., Cherry MX Red"
                />
              </div>
            )}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.specs.backlighting}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, backlighting: e.target.checked }
                })}
              />
              <label>Backlighting</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.specs.wireless}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, wireless: e.target.checked }
                })}
              />
              <label>Wireless</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.specs.numpad}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, numpad: e.target.checked }
                })}
              />
              <label>Numpad</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.specs.multimedia}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, multimedia: e.target.checked }
                })}
              />
              <label>Multimedia Keys</label>
            </div>
          </div>
        );

      case 'MOUSE':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>DPI</Label>
              <Input
                type="number"
                value={formData.specs.dpi}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, dpi: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Number of Buttons</Label>
              <Input
                type="number"
                value={formData.specs.buttons}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, buttons: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Sensor Type</Label>
              <Input
                type="text"
                value={formData.specs.sensor}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, sensor: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Weight (g)</Label>
              <Input
                type="number"
                value={formData.specs.weight}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, weight: e.target.value }
                })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.specs.wireless}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, wireless: e.target.checked }
                })}
              />
              <label>Wireless</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.specs.rgb}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, rgb: e.target.checked }
                })}
              />
              <label>RGB Lighting</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.specs.weightAdjustable}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, weightAdjustable: e.target.checked }
                })}
              />
              <label>Adjustable Weight</label>
            </div>
          </div>
        );

      case 'SPEAKERS':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={formData.specs.type}
                onValueChange={(value) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, type: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select speaker type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2.0">2.0</SelectItem>
                  <SelectItem value="2.1">2.1</SelectItem>
                  <SelectItem value="5.1">5.1</SelectItem>
                  <SelectItem value="7.1">7.1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Total Wattage</Label>
              <Input
                type="number"
                value={formData.specs.totalWattage}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, totalWattage: e.target.value }
                })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.specs.wireless}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, wireless: e.target.checked }
                })}
              />
              <label>Wireless</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.specs.bluetooth}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, bluetooth: e.target.checked }
                })}
              />
              <label>Bluetooth</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.specs.subwoofer}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, subwoofer: e.target.checked }
                })}
              />
              <label>Subwoofer</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.specs.remote}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, remote: e.target.checked }
                })}
              />
              <label>Remote Control</label>
            </div>
          </div>
        );

      case 'HEADPHONES':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={formData.specs.type}
                onValueChange={(value) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, type: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select headphone type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Over-ear">Over-ear</SelectItem>
                  <SelectItem value="On-ear">On-ear</SelectItem>
                  <SelectItem value="In-ear">In-ear</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Driver</Label>
              <Input
                type="text"
                value={formData.specs.driver}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, driver: e.target.value }
                })}
                placeholder="e.g., 40mm Dynamic"
              />
            </div>
            <div className="space-y-2">
              <Label>Frequency Response</Label>
              <Input
                type="text"
                value={formData.specs.frequency}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, frequency: e.target.value }
                })}
                placeholder="e.g., 20Hz-20kHz"
              />
            </div>
            <div className="space-y-2">
              <Label>Impedance (Ω)</Label>
              <Input
                type="number"
                value={formData.specs.impedance}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, impedance: e.target.value }
                })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.specs.wireless}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, wireless: e.target.checked }
                })}
              />
              <label>Wireless</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.specs.bluetooth}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, bluetooth: e.target.checked }
                })}
              />
              <label>Bluetooth</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.specs.noiseCancelling}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, noiseCancelling: e.target.checked }
                })}
              />
              <label>Active Noise Cancellation</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.specs.microphone}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, microphone: e.target.checked }
                })}
              />
              <label>Built-in Microphone</label>
            </div>
          </div>
        );

      case 'EXTERNAL_STORAGE':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={formData.specs.type}
                onValueChange={(value) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, type: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select storage type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SSD">SSD</SelectItem>
                  <SelectItem value="HDD">HDD</SelectItem>
                </SelectContent>
              </Select>
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
              <Select
                value={formData.specs.interface}
                onValueChange={(value) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, interface: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select interface" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USB 3.0">USB 3.0</SelectItem>
                  <SelectItem value="USB-C">USB-C</SelectItem>
                  <SelectItem value="Thunderbolt 3">Thunderbolt 3</SelectItem>
                  <SelectItem value="Thunderbolt 4">Thunderbolt 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.specs.type === 'SSD' && (
              <>
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
              </>
            )}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.specs.portable}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, portable: e.target.checked }
                })}
              />
              <label>Portable</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.specs.encrypted}
                onChange={(e) => setFormData({
                  ...formData,
                  specs: { ...formData.specs, encrypted: e.target.checked }
                })}
              />
              <label>Hardware Encryption</label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-8 min-h-screen max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <Tabs defaultValue="add" className="w-full">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 h-14 items-center mb-8 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-lg">
          <TabsTrigger 
            value="add" 
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:shadow-sm h-11 hover:bg-white/90 dark:hover:bg-gray-950/90 transition-colors"
          >
            Add Product
          </TabsTrigger>
          <TabsTrigger 
            value="search" 
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:shadow-sm h-11 hover:bg-white/90 dark:hover:bg-gray-950/90 transition-colors"
          >
            Search Products
          </TabsTrigger>
          <TabsTrigger 
            value="users" 
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:shadow-sm h-11 hover:bg-white/90 dark:hover:bg-gray-950/90 transition-colors"
          >
            User Information
          </TabsTrigger>
        </TabsList>

        {/* Add Product Section */}
        <TabsContent value="add" className="max-w-4xl mx-auto">
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

              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  type="text"
                  value={formData.description}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'description')}
                  placeholder="Optional product description"
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

              <div className="space-y-2">
                <Label>Product Image</Label>
                <div className="flex flex-col gap-4">
                  <Input
                   type="file"
                   accept="image/jpeg,image/png,image/webp"
                   onChange={handleImageChange}
                   className="cursor-pointer"
                   />
                   {uploadError && (
                    <p className="text-sm text-red-500">
                      {uploadError}
                    </p>
                   )}
                   {imagePreview && (
                   <div className="relative w-40 h-40">
                     <Image
                       src={imagePreview}
                       alt="Product preview"
                       width={160}
                       height={160}
                       className="object-contain rounded-lg border"
                     />
                     <button
                       type="button"
                       onClick={() => {
                          setImagePreview(null);
                          setFormData(prev => ({ ...prev, image: '' }));
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                       className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                     >
                       ✕
                     </button>
                   </div>
                   )}
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
        </TabsContent>

        {/* Search Products Section */}
        <TabsContent value="search" className="max-w-4xl mx-auto">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Search Query</Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Type 2 or more characters to search..."
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4 space-y-4">
              {searchError && (
                <div className="text-sm text-red-500 mb-4">
                  {searchError}
                </div>
              )}
              {isSearching && (
                <div className="text-sm text-gray-500">
                  Searching...
                </div>
              )}
              {!isSearching && searchQuery.length < 2 && (
                <div className="text-sm text-gray-500">
                  Type at least 2 characters to search
                </div>
              )}
              {!isSearching && searchQuery.length >= 2 && Array.isArray(searchResults) && searchResults.length === 0 && !searchError && (
                <div className="text-sm text-gray-500">
                  No products found
                </div>
              )}
              {Array.isArray(searchResults) && searchResults.map((product) => (
                <Card key={product.id} className="p-4">
                  <div className="flex gap-4">
                    {product.image ? (
                      <div className="w-24 h-24 flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={96}
                          height={96}
                          className="object-contain rounded-md"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    <div className="flex-grow flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-500">Category: {product.category}</p>
                        <p className="text-sm">Price: ₹{product.price.toFixed(2)}</p>
                        <p className="text-sm">Stock: {product.stock}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* User Information Section */}
        <TabsContent value="users" className="max-w-4xl mx-auto">
          <Card className="p-6">
            <div className="flex items-center justify-center h-[200px] text-gray-500">
              Coming Soon
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}