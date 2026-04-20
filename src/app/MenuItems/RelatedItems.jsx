'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import AppImage from '../../components/ui/AppImage';
import Icon from '../../components/ui/AppIcon';

const relatedItems = [
  {
    id: 1,
    name: 'Pepperoni Feast',
    description:
      'Loaded with double pepperoni, mozzarella, tomato sauce and a drizzle of chilli oil',
    price: 13.49,
    rating: 4.9,
    reviews: 218,
    image:
      'https://img.rocket.new/generatedImages/rocket_gen_img_1879a5394-1773160898008.png',
    alt: 'Pepperoni pizza loaded with double pepperoni slices and melted mozzarella on crispy base',
    badge: '⭐ Top Rated',
    prepTime: '20–30 min',
  },
  {
    id: 2,
    name: 'Classic Buffalo Wings',
    description:
      '8 crispy chicken wings tossed in tangy buffalo sauce, served with blue cheese dip',
    price: 9.99,
    rating: 4.8,
    reviews: 175,
    image:
      'https://img.rocket.new/generatedImages/rocket_gen_img_1c39b8004-1773192310795.png',
    alt: 'Crispy buffalo chicken wings coated in tangy red sauce served with blue cheese dip and celery sticks',
    badge: '🔥 Bestseller',
    prepTime: '15–22 min',
  },
  {
    id: 3,
    name: 'Loaded Fries',
    description: 'Skin-on fries, pulled beef, cheese sauce, spring onions, chipotle',
    price: 7.49,
    rating: 4.9,
    reviews: 211,
    image:
      'https://img.rocket.new/generatedImages/rocket_gen_img_11f60102a-1772419526645.png',
    alt: 'Loaded fries topped with pulled beef, melted cheese sauce and fresh spring onions in paper tray',
    badge: '⭐ Top Rated',
    prepTime: '10–15 min',
  },
  {
    id: 4,
    name: 'Double Bacon Stack',
    description: 'Double smash patty, six rashers of crispy streaky bacon, aged cheddar',
    price: 13.99,
    rating: 4.8,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1603322617163-cc100d141345',
    alt: 'Double bacon burger stacked high with crispy bacon and melted cheese on sesame bun',
    badge: '🔥 Popular',
    prepTime: '18–25 min',
  },
  {
    id: 5,
    name: 'Honey Garlic Wings',
    description:
      '8 wings glazed in sticky honey garlic sauce, sesame seeds, spring onions',
    price: 10.49,
    rating: 4.7,
    reviews: 88,
    image: 'https://images.unsplash.com/photo-1612443016520-314f09b3d449',
    alt: 'Honey garlic glazed chicken wings with sesame seeds and spring onion garnish on dark plate',
    prepTime: '15–22 min',
  },
];

const StarMini = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-3 h-3 ${s <= Math.round(rating) ? 'star-filled' : 'star-empty'}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const RelatedItems = () => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({
      left: dir === 'right' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="section-label mb-1">You might also like</p>
          <h2 className="font-display text-2xl sm:text-3xl text-brand-foreground">
            More from SpeedyBites
          </h2>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border-2 border-brand-border flex items-center justify-center text-brand-muted hover:border-primary hover:text-primary transition-all"
            aria-label="Scroll left"
          >
            <Icon name="ChevronLeftIcon" size={18} />
          </button>

          <button
            type="button"
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border-2 border-brand-border flex items-center justify-center text-brand-muted hover:border-primary hover:text-primary transition-all"
            aria-label="Scroll right"
          >
            <Icon name="ChevronRightIcon" size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory"
        style={{ scrollPaddingLeft: '0px' }}
      >
        {relatedItems.map((item, idx) => (
          <Link
            key={item.id}
            href="/menu-item"
            className="snap-start shrink-0 w-[240px] sm:w-[260px] bg-white rounded-2xl overflow-hidden border border-brand-border shadow-card card-hover group animate-fade-slide-up"
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-brand-border">
              <AppImage
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="260px"
              />

              {item.badge && (
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-xs font-700 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-brand-foreground shadow-sm">
                    {item.badge}
                  </span>
                </div>
              )}

              <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-primary">
                  <Icon name="PlusIcon" size={16} className="text-white" />
                </div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-sm font-700 text-brand-foreground mb-1 leading-tight truncate">
                {item.name}
              </h3>

              <p className="text-xs text-brand-muted leading-relaxed mb-2 line-clamp-2">
                {item.description}
              </p>

              <div className="flex items-center gap-2 mb-3">
                <StarMini rating={item.rating} />
                <span className="text-xs font-600 text-brand-muted">{item.rating}</span>
                <span className="text-xs text-brand-muted">({item.reviews})</span>

                <div className="ml-auto flex items-center gap-1 text-xs text-brand-muted">
                  <Icon name="ClockIcon" size={11} />
                  {item.prepTime}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-700 text-brand-foreground">
                    £{item.price.toFixed(2)}
                  </span>
                </div>

                <span className="text-xs font-700 text-primary">View →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedItems;