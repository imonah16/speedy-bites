'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../Header';
import Footer from '../Footer';
import MenuItemGallery from './MenuItemGallery';
import MenuItemInfo from './MenuItemInfo';
import MenuItemCustomizer from './MenuItemCustomizer';
import MenuItemReviews from './MenuItemReviews';
import RelatedItems from './RelatedItems';
import Icon from '../../components/ui/AppIcon';

export default function MenuItemPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <Header />

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-0">
          <nav
            className="flex items-center gap-2 text-sm text-brand-muted font-500 py-3"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Icon name="ChevronRightIcon" size={12} className="text-brand-muted" />
            <Link href="/#menu" className="hover:text-primary transition-colors">
              Menu
            </Link>
            <Icon name="ChevronRightIcon" size={12} className="text-brand-muted" />
            <span className="text-brand-foreground font-600">
              The Classic Smash Burger
            </span>
          </nav>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <MenuItemGallery />

            <div className="flex flex-col gap-6">
              <MenuItemInfo />
              <MenuItemCustomizer />
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <MenuItemReviews />
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
          <RelatedItems />
        </section>
      </main>

      <Footer />
    </div>
  );
}