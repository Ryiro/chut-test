'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { ComponentCategory } from '@prisma/client';

interface ValidationErrors {
  [key: string]: string;
}

interface ProductSpecs {
  // CPU specs
  brand?: string;
  cores?: number;
  threads?: number;
  baseSpeed?: number;
  boostSpeed?: number;
  socket?: string;
  tdp?: number;
  // GPU specs
  memory?: number;
  memoryType?: string;
  coreClock?: number;
  boostClock?: number;
  // RAM specs
  capacity?: number;
  speed?: number;
  type?: string;
  timing?: string;
  // Monitor specs
  size?: number;
  resolution?: string;
  refreshRate?: number;
  panelType?: string;
  responseTime?: number;
  aspectRatio?: string;
  hdrSupport?: boolean;
  speakers?: boolean;
  adjustable?: boolean;
  ports?: string;
}

interface FormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  specs: ProductSpecs;
}

export default function ProductEdit({ params }: { params: { productId: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    specs: {}
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.productId}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        setProduct(data);
        setFormData({
          name: data.name,
          description: data.description || '',
          price: data.price.toString(),
          stock: data.stock.toString(),
          category: data.category,
          specs: getSpecs(data)
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product');
        router.push('/admin');
      }
    };

    fetchProduct();
  }, [params.productId, router]);

  const getSpecs = (product: any) => {
    const categorySpecMap = {
      CPU: 'cpuSpec',
      GPU: 'gpuSpec',
      RAM: 'ramSpec',
      STORAGE: 'storageSpec',
      MOTHERBOARD: 'motherboardSpec',
      PSU: 'psuSpec',
      CASE: 'caseSpec',
      COOLER: 'coolerSpec',
      MONITOR: 'monitorSpec',
      KEYBOARD: 'keyboardSpec',
      MOUSE: 'mouseSpec',
      SPEAKERS: 'speakerSpec',
      HEADPHONES: 'headphoneSpec',
      EXTERNAL_STORAGE: 'externalStorageSpec'
    };

    const specKey = categorySpecMap[product.category as keyof typeof categorySpecMap];
    return product[specKey] || {};
  };

  const validateForm = () => {
    const newErrors: ValidationErrors = {};

    // Validate common fields
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Stock must be 0 or greater';
    }
    if (!formData.category) newErrors.category = 'Category is required';

    // Validate specs based on category
    if (formData.category) {
      switch (formData.category) {
        case 'CPU':
          if (!formData.specs.brand) newErrors['specs.brand'] = 'Brand is required';
          if (!formData.specs.socket) newErrors['specs.socket'] = 'Socket is required';
          if (!formData.specs.cores || parseInt(formData.specs.cores) <= 0) {
            newErrors['specs.cores'] = 'Cores must be greater than 0';
          }
          if (!formData.specs.threads || parseInt(formData.specs.threads) <= 0) {
            newErrors['specs.threads'] = 'Threads must be greater than 0';
          }
          if (!formData.specs.baseSpeed || parseFloat(formData.specs.baseSpeed) <= 0) {
            newErrors['specs.baseSpeed'] = 'Base speed must be greater than 0';
          }
          break;

        case 'GPU':
          if (!formData.specs.brand) newErrors['specs.brand'] = 'Brand is required';
          if (!formData.specs.memory || parseInt(formData.specs.memory) <= 0) {
            newErrors['specs.memory'] = 'Memory must be greater than 0';
          }
          if (!formData.specs.memoryType) newErrors['specs.memoryType'] = 'Memory type is required';
          if (!formData.specs.coreClock || parseInt(formData.specs.coreClock) <= 0) {
            newErrors['specs.coreClock'] = 'Core clock must be greater than 0';
          }
          break;

        case 'RAM':
          if (!formData.specs.capacity || parseInt(formData.specs.capacity) <= 0) {
            newErrors['specs.capacity'] = 'Capacity must be greater than 0';
          }
          if (!formData.specs.speed || parseInt(formData.specs.speed) <= 0) {
            newErrors['specs.speed'] = 'Speed must be greater than 0';
          }
          if (!formData.specs.type) newErrors['specs.type'] = 'Type is required';
          if (!formData.specs.timing) newErrors['specs.timing'] = 'Timing is required';
          break;

        case 'MONITOR':
          if (!formData.specs.size || parseFloat(formData.specs.size) <= 0) {
            newErrors['specs.size'] = 'Size must be greater than 0';
          }
          if (!formData.specs.resolution) newErrors['specs.resolution'] = 'Resolution is required';
          if (!formData.specs.refreshRate || parseInt(formData.specs.refreshRate) <= 0) {
            newErrors['specs.refreshRate'] = 'Refresh rate must be greater than 0';
          }
          if (!formData.specs.panelType) newErrors['specs.panelType'] = 'Panel type is required';
          if (!formData.specs.responseTime || parseFloat(formData.specs.responseTime) <= 0) {
            newErrors['specs.responseTime'] = 'Response time must be greater than 0';
          }
          break;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the validation errors');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`/api/products/${params.productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock)
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update product');
      }

      toast.success('Product updated successfully');
      router.push('/admin');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update product');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSpecChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      specs: {
        ...prev.specs,
        [name]: value
      }
    }));
    // Clear error when spec field is modified
    if (errors[`specs.${name}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`specs.${name}`];
        return newErrors;
      });
    }
  };

  const renderSpecFields = () => {
    switch (formData.category) {
      case 'CPU':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Brand</Label>
                <Input
                  value={formData.specs.brand || ''}
                  onChange={(e) => handleSpecChange('brand', e.target.value)}
                  required
                  className={errors['specs.brand'] ? 'border-red-500' : ''}
                />
                {errors['specs.brand'] && (
                  <p className="text-sm text-red-500 mt-1">{errors['specs.brand']}</p>
                )}
              </div>
              <div>
                <Label>Socket</Label>
                <Input
                  value={formData.specs.socket || ''}
                  onChange={(e) => handleSpecChange('socket', e.target.value)}
                  required
                  className={errors['specs.socket'] ? 'border-red-500' : ''}
                />
                {errors['specs.socket'] && (
                  <p className="text-sm text-red-500 mt-1">{errors['specs.socket']}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Cores</Label>
                <Input
                  type="number"
                  value={formData.specs.cores || ''}
                  onChange={(e) => handleSpecChange('cores', e.target.value)}
                  required
                  className={errors['specs.cores'] ? 'border-red-500' : ''}
                />
                {errors['specs.cores'] && (
                  <p className="text-sm text-red-500 mt-1">{errors['specs.cores']}</p>
                )}
              </div>
              <div>
                <Label>Threads</Label>
                <Input
                  type="number"
                  value={formData.specs.threads || ''}
                  onChange={(e) => handleSpecChange('threads', e.target.value)}
                  required
                  className={errors['specs.threads'] ? 'border-red-500' : ''}
                />
                {errors['specs.threads'] && (
                  <p className="text-sm text-red-500 mt-1">{errors['specs.threads']}</p>
                )}
              </div>
              <div>
                <Label>TDP (W)</Label>
                <Input
                  type="number"
                  value={formData.specs.tdp || ''}
                  onChange={(e) => handleSpecChange('tdp', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Base Speed (GHz)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.specs.baseSpeed || ''}
                  onChange={(e) => handleSpecChange('baseSpeed', e.target.value)}
                  required
                  className={errors['specs.baseSpeed'] ? 'border-red-500' : ''}
                />
                {errors['specs.baseSpeed'] && (
                  <p className="text-sm text-red-500 mt-1">{errors['specs.baseSpeed']}</p>
                )}
              </div>
              <div>
                <Label>Boost Speed (GHz)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.specs.boostSpeed || ''}
                  onChange={(e) => handleSpecChange('boostSpeed', e.target.value)}
                />
              </div>
            </div>
          </>
        );

      case 'GPU':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Brand</Label>
                <Input
                  value={formData.specs.brand || ''}
                  onChange={(e) => handleSpecChange('brand', e.target.value)}
                  required
                  className={errors['specs.brand'] ? 'border-red-500' : ''}
                />
                {errors['specs.brand'] && (
                  <p className="text-sm text-red-500 mt-1">{errors['specs.brand']}</p>
                )}
              </div>
              <div>
                <Label>Memory Type</Label>
                <Input
                  value={formData.specs.memoryType || ''}
                  onChange={(e) => handleSpecChange('memoryType', e.target.value)}
                  required
                  className={errors['specs.memoryType'] ? 'border-red-500' : ''}
                />
                {errors['specs.memoryType'] && (
                  <p className="text-sm text-red-500 mt-1">{errors['specs.memoryType']}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Memory (GB)</Label>
                <Input
                  type="number"
                  value={formData.specs.memory || ''}
                  onChange={(e) => handleSpecChange('memory', e.target.value)}
                  required
                  className={errors['specs.memory'] ? 'border-red-500' : ''}
                />
                {errors['specs.memory'] && (
                  <p className="text-sm text-red-500 mt-1">{errors['specs.memory']}</p>
                )}
              </div>
              <div>
                <Label>Core Clock (MHz)</Label>
                <Input
                  type="number"
                  value={formData.specs.coreClock || ''}
                  onChange={(e) => handleSpecChange('coreClock', e.target.value)}
                  required
                  className={errors['specs.coreClock'] ? 'border-red-500' : ''}
                />
                {errors['specs.coreClock'] && (
                  <p className="text-sm text-red-500 mt-1">{errors['specs.coreClock']}</p>
                )}
              </div>
              <div>
                <Label>TDP (W)</Label>
                <Input
                  type="number"
                  value={formData.specs.tdp || ''}
                  onChange={(e) => handleSpecChange('tdp', e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label>Boost Clock (MHz)</Label>
              <Input
                type="number"
                value={formData.specs.boostClock || ''}
                onChange={(e) => handleSpecChange('boostClock', e.target.value)}
              />
            </div>
          </>
        );

      case 'RAM':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Capacity (GB)</Label>
                <Input
                  type="number"
                  value={formData.specs.capacity || ''}
                  onChange={(e) => handleSpecChange('capacity', e.target.value)}
                  required
                  className={errors['specs.capacity'] ? 'border-red-500' : ''}
                />
                {errors['specs.capacity'] && (
                  <p className="text-sm text-red-500 mt-1">{errors['specs.capacity']}</p>
                )}
              </div>
              <div>
                <Label>Speed (MHz)</Label>
                <Input
                  type="number"
                  value={formData.specs.speed || ''}
                  onChange={(e) => handleSpecChange('speed', e.target.value)}
                  required
                  className={errors['specs.speed'] ? 'border-red-500' : ''}
                />
                {errors['specs.speed'] && (
                  <p className="text-sm text-red-500 mt-1">{errors['specs.speed']}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Type</Label>
                <Input
                  value={formData.specs.type || ''}
                  onChange={(e) => handleSpecChange('type', e.target.value)}
                  required
                  className={errors['specs.type'] ? 'border-red-500' : ''}
                />
                {errors['specs.type'] && (
                  <p className="text-sm text-red-500 mt-1">{errors['specs.type']}</p>
                )}
              </div>
              <div>
                <Label>Timing</Label>
                <Input
                  value={formData.specs.timing || ''}
                  onChange={(e) => handleSpecChange('timing', e.target.value)}
                  required
                  className={errors['specs.timing'] ? 'border-red-500' : ''}
                />
                {errors['specs.timing'] && (
                  <p className="text-sm text-red-500 mt-1">{errors['specs.timing']}</p>
                )}
              </div>
            </div>
          </>
        );

      case 'MONITOR':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Size (inches)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.specs.size || ''}
                  onChange={(e) => handleSpecChange('size', e.target.value)}
                  required
                  className={errors['specs.size'] ? 'border-red-500' : ''}
                />
                {errors['specs.size'] && (
                  <p className="text-sm text-red-500 mt-1">{errors['specs.size']}</p>
                )}
              </div>
              <div>
                <Label>Resolution</Label>
                <Input
                  value={formData.specs.resolution || ''}
                  onChange={(e) => handleSpecChange('resolution', e.target.value)}
                  required
                  className={errors['specs.resolution'] ? 'border-red-500' : ''}
                />
                {errors['specs.resolution'] && (
                  <p className="text-sm text-red-500 mt-1">{errors['specs.resolution']}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Refresh Rate (Hz)</Label>
                <Input
                  type="number"
                  value={formData.specs.refreshRate || ''}
                  onChange={(e) => handleSpecChange('refreshRate', e.target.value)}
                  required
                  className={errors['specs.refreshRate'] ? 'border-red-500' : ''}
                />
                {errors['specs.refreshRate'] && (
                  <p className="text-sm text-red-500 mt-1">{errors['specs.refreshRate']}</p>
                )}
              </div>
              <div>
                <Label>Panel Type</Label>
                <Select
                  value={formData.specs.panelType || ''}
                  onValueChange={(value) => handleSpecChange('panelType', value)}
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
                {errors['specs.panelType'] && (
                  <p className="text-sm text-red-500 mt-1">{errors['specs.panelType']}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Response Time (ms)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.specs.responseTime || ''}
                  onChange={(e) => handleSpecChange('responseTime', e.target.value)}
                  required
                  className={errors['specs.responseTime'] ? 'border-red-500' : ''}
                />
                {errors['specs.responseTime'] && (
                  <p className="text-sm text-red-500 mt-1">{errors['specs.responseTime']}</p>
                )}
              </div>
              <div>
                <Label>Aspect Ratio</Label>
                <Input
                  value={formData.specs.aspectRatio || ''}
                  onChange={(e) => handleSpecChange('aspectRatio', e.target.value)}
                  required
                  className={errors['specs.aspectRatio'] ? 'border-red-500' : ''}
                />
                {errors['specs.aspectRatio'] && (
                  <p className="text-sm text-red-500 mt-1">{errors['specs.aspectRatio']}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Features</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hdrSupport"
                    checked={formData.specs.hdrSupport || false}
                    onCheckedChange={(checked) => handleSpecChange('hdrSupport', checked)}
                  />
                  <label htmlFor="hdrSupport">HDR Support</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="speakers"
                    checked={formData.specs.speakers || false}
                    onCheckedChange={(checked) => handleSpecChange('speakers', checked)}
                  />
                  <label htmlFor="speakers">Built-in Speakers</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="adjustable"
                    checked={formData.specs.adjustable || false}
                    onCheckedChange={(checked) => handleSpecChange('adjustable', checked)}
                  />
                  <label htmlFor="adjustable">Adjustable Stand</label>
                </div>
              </div>
            </div>
            <div>
              <Label>Ports</Label>
              <Input
                value={formData.specs.ports || ''}
                onChange={(e) => handleSpecChange('ports', e.target.value)}
                placeholder="e.g., 2x HDMI 2.1, 1x DisplayPort 1.4"
                required
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className={errors.price ? 'border-red-500' : ''}
                />
                {errors.price && (
                  <p className="text-sm text-red-500 mt-1">{errors.price}</p>
                )}
              </div>
              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  className={errors.stock ? 'border-red-500' : ''}
                />
                {errors.stock && (
                  <p className="text-sm text-red-500 mt-1">{errors.stock}</p>
                )}
              </div>
            </div>

            <div>
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ComponentCategory).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500 mt-1">{errors.category}</p>
              )}
            </div>
          </div>

          {/* Product Specifications */}
          {formData.category && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Specifications</h2>
              {renderSpecFields()}
            </div>
          )}

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push('/admin')}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Updating...' : 'Update Product'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}