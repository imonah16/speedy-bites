import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OrderSummary from './components/OrderSummary';
import CheckoutForm from './components/CheckoutForm';
import TrustBadges from './components/TrustBadges';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <Header cartCount={3} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Page heading */}
        <div className="mb-8">
          <p className="section-label mb-1">Almost there</p>
          <h1 className="font-display text-3xl sm:text-4xl text-brand-foreground">
            Complete Your Order
          </h1>
        </div>

        {/* Trust badges — mobile top */}
        <div className="lg:hidden mb-6">
          <TrustBadges />
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-start">
          {/* Left: Checkout Form */}
          <CheckoutForm />

          {/* Right: Order Summary + Trust */}
          <div className="flex flex-col gap-5">
            <OrderSummary />
            {/* Trust badges — desktop sidebar */}
            <div className="hidden lg:block">
              <TrustBadges />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}