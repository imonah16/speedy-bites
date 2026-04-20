'use client';

import React, { useState } from 'react';
import Icon from '../../components/ui/AppIcon';

const MenuItemInfo = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const avgRating = 4.6;
  const totalReviews = 200;

  return (
    <div className="animate-fade-slide-up delay-100">
      <div className="flex items-center gap-2 mb-3">
        <span className="section-label">Burgers</span>
        <Icon name="ChevronRightIcon" size={12} className="text-brand-muted" />
        <span className="text-xs font-500 text-brand-muted">Classic Range</span>
      </div>

      <div className="flex items-start justify-between gap-3 mb-3">
        <h1 className="font-display text-3xl sm:text-4xl text-brand-foreground leading-tight">
          The Classic Smash Burger
        </h1>

        <button
          type="button"
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
            isWishlisted
              ? 'bg-red-50 text-red-500'
              : 'bg-brand-bg text-brand-muted hover:text-red-400 hover:bg-red-50'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Icon
            name="HeartIcon"
            size={20}
            variant={isWishlisted ? 'solid' : 'outline'}
          />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-4 h-4 ${
                star <= Math.round(avgRating) ? 'star-filled' : 'star-empty'
              }`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        <span className="text-sm font-700 text-brand-foreground">{avgRating}</span>
        <span className="text-sm text-brand-muted font-500">
          ({totalReviews} reviews)
        </span>

        <div className="h-3 w-px bg-brand-border" />

        <div className="flex items-center gap-1 text-sm text-emerald-600 font-600">
          <Icon name="ClockIcon" size={14} />
          15–25 min
        </div>

        <div className="flex items-center gap-1 text-sm text-brand-muted font-500">
          <Icon name="ShoppingBagIcon" size={14} />
          Collection only
        </div>
      </div>

      <p className="text-base text-brand-muted leading-relaxed font-400 mb-4">
        Two hand-smashed beef patties (100% British beef), double American cheese,
        crispy pickled jalapeños, shredded iceberg, beef-dripping mayo and our
        signature smoky sauce — all stacked in a toasted brioche bun.
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        {[
          { icon: '🔥', label: '680 kcal' },
          { icon: '🥩', label: '42g protein' },
          { icon: '⚡', label: 'No added MSG' },
        ].map((n) => (
          <div
            key={n.label}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-bg border border-brand-border text-xs font-600 text-brand-muted"
          >
            <span>{n.icon}</span>
            <span>{n.label}</span>
          </div>
        ))}
      </div>

      <div className="flex items-baseline gap-3 pt-1">
        <span className="font-display text-3xl text-brand-foreground">£11.49</span>
        <span className="text-base text-brand-muted line-through font-400">£13.99</span>
        <span className="text-sm font-700 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          Save £2.50
        </span>
      </div>
    </div>
  );
};

export default MenuItemInfo;