import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { ShoppingCart, Search } from 'lucide-react';
import ProductCard from './store/assets/ProductCard';
import ShoppingCartDrawer from './store/assets/ShoppingCartDrawer';
import CheckoutModal from './store/assets/CheckoutModal';
import StoreAuthButton from './store/assets/StoreAuthButton';

// Configure sua chave pública do Stripe via variável de ambiente
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Store = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              <span className="text-blue-600">Aks</span>Tur Store
            </h1>
            
            {/* Botões de Login e Carrinho */}
            <div className="flex items-center gap-3">
              <StoreAuthButton />
            
            </div>
          </div>

        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-4 py-8">
         
      </main>

    </div>
  );
};

export default Store;