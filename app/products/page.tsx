import React from 'react'
import { prisma } from '@/lib/db'

async function getProducts() {
  const products = await prisma.product.findMany({
    include: {
      cpuSpec: true,
      gpuSpec: true,
      ramSpec: true,
      storageSpec: true,
      motherboardSpec: true,
      psuSpec: true,
      caseSpec: true,
    }
  })
  return products
}

export default async function Products() {
  const products = await getProducts()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">PC Components</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">Category: {product.category}</p>
            <p className="text-green-600 font-bold mt-2">${product.price}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  )
}