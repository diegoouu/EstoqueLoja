import React from 'react';
import { Product } from '../types';

interface ShelfProps {
  letter: string;
  products: Product[];
}

const Shelf: React.FC<ShelfProps> = ({ letter, products }) => {
  const levels = [5, 4, 3, 2, 1];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 text-white py-2 px-4">
        <h2 className="text-xl font-bold">Shelf {letter}</h2>
      </div>
      <div className="p-4">
        {levels.map((level) => {
          const productsOnLevel = products.filter(p => p.level === level);
          return (
            <div
              key={level}
              className="border-b last:border-b-0 py-2"
            >
              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                <span>Level {level}</span>
                <span>{productsOnLevel.length} items</span>
              </div>
              {productsOnLevel.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-50 rounded p-2 mb-2 last:mb-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${product.price}</p>
                      <p className="text-sm text-gray-600">Qty: {product.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
              {productsOnLevel.length === 0 && (
                <div className="text-sm text-gray-400 italic">Empty</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shelf;