import React, { useState } from 'react';
import { Search, Package2, Filter, Plus } from 'lucide-react';
import Shelf from './components/Shelf';
import AddProductModal from './components/AddProductModal';
import { Product, Category } from './types';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Air Filter', category: 'Filters', shelf: 'A', level: 1, quantity: 15, price: 29.99 },
    { id: 2, name: 'Brake Pads', category: 'Brakes', shelf: 'B', level: 2, quantity: 8, price: 89.99 },
    { id: 3, name: 'Motor Oil', category: 'Fluids', shelf: 'M', level: 3, quantity: 25, price: 39.99 },
  ]);

  const categories: Category[] = [
    { id: 'all', name: 'All Categories' },
    { id: 'filters', name: 'Filters' },
    { id: 'brakes', name: 'Brakes' },
    { id: 'fluids', name: 'Fluids' },
    { id: 'engine', name: 'Engine Parts' },
    { id: 'electrical', name: 'Electrical' },
  ];

  const shelves = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    setProducts([...products, { ...product, id: products.length + 1 }]);
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Package2 size={32} />
              <h1 className="text-2xl font-bold">AutoParts Inventory</h1>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={20} />
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-gray-300">
            <Filter size={20} className="text-gray-400" />
            <select
              className="bg-transparent focus:outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Shelving System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {shelves.map((shelfLetter) => (
            <Shelf
              key={shelfLetter}
              letter={shelfLetter}
              products={filteredProducts.filter(p => p.shelf === shelfLetter)}
            />
          ))}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddProduct}
          categories={categories.filter(c => c.id !== 'all')}
          shelves={shelves}
        />
      )}
    </div>
  );
}

export default App;