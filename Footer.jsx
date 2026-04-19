import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const Footer = () => {
  return (
    <footer className="border-t border-brand-border bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Logo + Links */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-2">
              <AppLogo size={28} />
              <span className="font-display text-lg tracking-tight text-brand-foreground">
                SpeedyBites
              </span>
            </div>

            <nav className="flex items-center gap-5">
              {[
                { label: 'Menu', href: '/#menu' },
                { label: 'Checkout', href: '/checkout' },
                { label: 'Privacy', href: '/' },
                { label: 'Terms', href: '/' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-500 text-brand-muted hover:text-brand-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social + Copyright */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {[
                { name: 'instagram', icon: 'CameraIcon' },
                { name: 'twitter', icon: 'ChatBubbleOvalLeftIcon' },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center text-brand-muted hover:text-primary hover:bg-primary-light transition-all duration-200"
                >
                  <Icon name={social.icon} size={15} />
                </a>
              ))}
            </div>

            <span className="text-xs text-brand-muted font-500">
              © 2026 SpeedyBites
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;