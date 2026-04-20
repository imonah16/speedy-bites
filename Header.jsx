'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '../components/ui/AppLogo';
import Icon from '../components/ui/AppIcon';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-brand-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            <Link href="/" className="flex items-center gap-2.5 group">
              <AppLogo size={36} />
              <span className="font-display text-xl tracking-tight text-brand-foreground hidden sm:block">
                SpeedyBites
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/#menu"
                className="text-sm font-600 text-brand-muted hover:text-brand-foreground transition-colors"
              >
                Menu
              </Link>
              <Link
                href="/#menu"
                className="text-sm font-600 text-brand-muted hover:text-brand-foreground transition-colors"
              >
                Deals
              </Link>
              <Link
                href="/checkout"
                className="text-sm font-600 text-brand-muted hover:text-brand-foreground transition-colors"
              >
                Track Order
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/cart"
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary-light hover:bg-primary hover:text-white text-primary transition-all duration-200 group"
                aria-label={`Cart with ${totalItems} items`}
              >
                <Icon name="ShoppingCartIcon" size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-xs font-700 flex items-center justify-center animate-scale-in">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>

              <Link
                href="/"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-brand-border text-sm font-600 text-brand-foreground hover:border-primary hover:text-primary transition-all duration-200"
              >
                Sign In
              </Link>

              <button
                type="button"
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-brand-bg hover:bg-brand-border transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute top-0 left-0 right-0 bg-white pt-20 pb-8 px-6 shadow-xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-1">
              {[
                { label: 'Menu', href: '/#menu' },
                { label: 'Deals', href: '/#menu' },
                { label: 'Track Order', href: '/checkout' },
                { label: 'Cart', href: '/cart' },
                { label: 'Sign In', href: '/' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 px-2 text-base font-600 text-brand-foreground hover:text-primary border-b border-brand-border/50 transition-colors"
                >
                  {item.label}
                  <Icon name="ChevronRightIcon" size={16} className="text-brand-muted" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;