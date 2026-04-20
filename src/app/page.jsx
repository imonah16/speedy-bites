'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import Icon from '../components/ui/AppIcon';
import AppImage from '../components/ui/AppImage';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabaseClient';

const categoryEmojis = {
  All: '🍽️',
  Burgers: '🍔',
  Pizza: '🍕',
  Pizzas: '🍕',
  Wings: '🍗',
  Sides: '🍟',
  'Chips & Sides': '🍟',
  Drinks: '🥤',
};

const features = [
  {
    icon: 'BoltIcon',
    title: 'Fast Collection',
    text: 'Freshly prepared and ready for pickup in as little as 15–25 minutes.',
  },
  {
    icon: 'SparklesIcon',
    title: 'Premium Ingredients',
    text: 'From smashed patties to loaded fries, every order is made fresh.',
  },
  {
    icon: 'HandThumbUpIcon',
    title: 'Local Favourite',
    text: 'Built for easy ordering, bold flavours, and a smooth collection experience.',
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

const HeroStat = ({ value, label }) => (
  <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-4 py-3 text-left min-w-[120px]">
    <p className="text-lg font-700 text-white leading-none">{value}</p>
    <p className="text-xs text-white/70 mt-1">{label}</p>
  </div>
);

const MenuCard = ({ item, idx, onAddToCart }) => {
  return (
    <div
      className="group rounded-[28px] border border-brand-border bg-white shadow-card overflow-hidden card-hover animate-fade-slide-up flex flex-col"
      style={{ animationDelay: `${idx * 50}ms` }}
    >
      <Link href="/menu-item" className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-brand-border">
          <AppImage
            src={item.image}
            alt={item.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {item.badge && (
            <div className="absolute top-3 left-3">
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-700 text-brand-foreground shadow-sm backdrop-blur-sm">
                {item.badge}
              </span>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent p-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2 text-xs">
                <StarMini rating={item.rating} />
                <span className="font-600">{item.rating}</span>
                <span className="text-white/80">({item.reviews})</span>
              </div>

              <div className="flex items-center gap-1 text-xs text-white/90">
                <Icon name="ClockIcon" size={11} />
                {item.prepTime}
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-700 uppercase tracking-[0.18em] text-primary/80 mb-1">
              {item.category}
            </p>
            <h3 className="text-lg font-700 text-brand-foreground leading-tight">
              {item.name}
            </h3>
          </div>

          <span className="rounded-full bg-brand-bg px-2.5 py-1 text-xs font-700 text-brand-muted shrink-0">
            {item.calories}
          </span>
        </div>

        <p className="text-sm text-brand-muted leading-relaxed mb-5 line-clamp-3 flex-1">
          {item.description}
        </p>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-700 text-brand-foreground">
              £{item.price.toFixed(2)}
            </span>
            {item.originalPrice && (
              <span className="text-sm text-brand-muted line-through">
                £{item.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/menu-item"
              className="rounded-full border border-brand-border px-4 py-2 text-sm font-700 text-brand-foreground hover:border-primary hover:text-primary transition-colors"
            >
              View
            </Link>

            <button
              type="button"
              onClick={(e) => onAddToCart(e, item)}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-700 text-white hover:opacity-95 transition"
            >
              <Icon name="PlusIcon" size={16} />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    let isMounted = true;

    const loadMenuItems = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('menu_items')
        .select(
          `
          id,
          name,
          description,
          price,
          image,
          available,
          category_id,
          categories (
            name
          )
        `
        )
        .eq('available', true)
        .order('name', { ascending: true });

      if (!isMounted) return;

      if (error) {
        console.error('Error loading menu items:', error);
        setMenuItems([]);
        setLoading(false);
        return;
      }

      const formattedItems = (data || []).map((item, index) => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        price: Number(item.price),
        originalPrice: index % 3 === 0 ? Number(item.price) + 2.5 : null,
        rating: 4.8,
        reviews: 100 + index * 7,
        image: item.image || 'https://via.placeholder.com/400x300?text=No+Image',
        alt: item.name,
        badge: index % 4 === 0 ? '🔥 Bestseller' : index % 4 === 1 ? '⭐ Top Rated' : '',
        prepTime: index % 2 === 0 ? '15–25 min' : '20–30 min',
        category: item.categories?.name || 'Uncategorized',
        calories: ['620 kcal', '680 kcal', '740 kcal', '—'][index % 4],
      }));

      setMenuItems(formattedItems);
      setLoading(false);
    };

    loadMenuItems();

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const dbCategories = [...new Set(menuItems.map((item) => item.category).filter(Boolean))];
    return ['All', ...dbCategories];
  }, [menuItems]);

  const filtered =
    activeCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const featuredItems = useMemo(() => filtered.slice(0, 8), [filtered]);

  const handleAddToCart = (e, item) => {
    e.preventDefault();

    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      alt: item.alt,
      category: item.category,
      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <Header />

      <main>
        <section className="relative overflow-hidden bg-[#16120f] pt-28 pb-16 sm:pt-32 sm:pb-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,123,0,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(230,0,126,0.12),transparent_24%)]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 backdrop-blur-md mb-6">
                  <span>🔥</span>
                  <span className="font-600">Fresh collection food, built for speed</span>
                </div>

                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.95] tracking-tight mb-5">
                  Bold flavour.
                  <br />
                  Fast pickup.
                  <br />
                  <span className="text-primary">Zero hassle.</span>
                </h1>

                <p className="max-w-2xl text-base sm:text-lg text-white/70 leading-relaxed mb-8 mx-auto lg:mx-0">
                  Discover handcrafted burgers, loaded fries, wings, pizzas and more —
                  designed for a premium collection-first experience with clean ordering
                  and standout visuals.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start mb-10">
                  <a
                    href="#menu"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-700 text-white hover:opacity-95 transition"
                  >
                    <Icon name="FireIcon" size={18} />
                    Explore Menu
                  </a>

                  <Link
                    href="/menu-item"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-base font-700 text-white hover:border-white/40 transition"
                  >
                    <Icon name="SparklesIcon" size={18} />
                    Featured Item
                  </Link>
                </div>

                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <HeroStat value="4.8/5" label="Customer rating" />
                  <HeroStat value="15–25 min" label="Collection time" />
                  <HeroStat value={`${menuItems.length}+`} label="Menu choices" />
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 rounded-[36px] bg-primary/15 blur-3xl" />

                <div className="relative rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
                  <div className="grid sm:grid-cols-[1.2fr_0.8fr] gap-0">
                    <div className="relative min-h-[360px] sm:min-h-[520px]">
                      <AppImage
                        src={
                          featuredItems[0]?.image ||
                          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'
                        }
                        alt={featuredItems[0]?.name || 'Featured menu item'}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                      <div className="absolute left-5 right-5 bottom-5">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-700 text-brand-foreground mb-3">
                          <span>Chef’s pick</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-display text-white leading-tight">
                          {featuredItems[0]?.name || 'Signature Smash Burger'}
                        </h2>

                        <p className="text-white/80 text-sm mt-2 max-w-md">
                          {featuredItems[0]?.description ||
                            'Big flavour, crisp textures, premium ingredients and a polished collection experience.'}
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#f8f2ea] p-5 sm:p-6 flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-700 uppercase tracking-[0.18em] text-primary mb-3">
                          Why SpeedyBites
                        </p>

                        <div className="space-y-4">
                          {features.map((feature) => (
                            <div
                              key={feature.title}
                              className="rounded-2xl border border-brand-border bg-white px-4 py-4"
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-primary-light flex items-center justify-center text-primary shrink-0">
                                  <Icon name={feature.icon} size={18} />
                                </div>

                                <div>
                                  <h3 className="text-sm font-700 text-brand-foreground">
                                    {feature.title}
                                  </h3>
                                  <p className="text-sm text-brand-muted mt-1 leading-relaxed">
                                    {feature.text}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 rounded-2xl bg-brand-foreground px-4 py-4 text-white">
                        <p className="text-xs uppercase tracking-[0.18em] text-white/60 mb-2">
                          Collection first
                        </p>
                        <p className="text-sm text-white/85 leading-relaxed">
                          Built for quick ordering, faster handover, and a more realistic
                          food service experience for your project demo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: 'Made for collection',
                text: 'No delivery clutter. Just quick ordering and clean pickup flow.',
              },
              {
                title: 'Designed for conversion',
                text: 'Strong visuals, clear pricing, and standout CTA patterns across the page.',
              },
              {
                title: 'Demo-friendly structure',
                text: 'Homepage, product detail, cart logic and Supabase-backed menu data.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-brand-border bg-white px-6 py-6 shadow-card"
              >
                <h3 className="text-lg font-700 text-brand-foreground mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-brand-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
            <div>
              <p className="text-xs font-700 uppercase tracking-[0.2em] text-primary mb-2">
                Menu spotlight
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-brand-foreground">
                Pick your next favourite
              </h2>
              <p className="text-brand-muted mt-3 max-w-2xl">
                Browse by category, view standout items, and add straight to cart from the
                homepage.
              </p>
            </div>

            <Link
              href="/menu-item"
              className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-5 py-3 text-sm font-700 text-brand-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Icon name="ArrowRightIcon" size={16} />
              View featured product page
            </Link>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-700 whitespace-nowrap border transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-foreground border-brand-foreground text-white'
                    : 'bg-white border-brand-border text-brand-muted hover:border-primary hover:text-primary'
                }`}
              >
                <span>{categoryEmojis[cat] || '🍽️'}</span>
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="rounded-[28px] border border-brand-border bg-white py-14 text-center shadow-card">
              <p className="text-brand-muted">Loading menu...</p>
            </div>
          ) : featuredItems.length === 0 ? (
            <div className="rounded-[28px] border border-brand-border bg-white py-14 text-center shadow-card">
              <p className="text-brand-muted">No items found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {featuredItems.map((item, idx) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  idx={idx}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="rounded-[32px] overflow-hidden bg-gradient-to-br from-primary via-[#ff5d00] to-[#de006e] px-8 py-10 sm:px-10 sm:py-12">
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <p className="text-sm font-700 uppercase tracking-[0.16em] text-white/70 mb-3">
                  Limited offer
                </p>
                <h2 className="font-display text-3xl sm:text-5xl text-white leading-tight mb-4">
                  Combo deals that feel worth clicking.
                </h2>
                <p className="max-w-2xl text-white/85 text-base leading-relaxed">
                  Use this section as your promotional banner, discount CTA, or featured
                  campaign area during demo and presentation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#menu"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-700 text-primary hover:bg-brand-bg transition-colors"
                >
                  <Icon name="ShoppingBagIcon" size={16} />
                  Shop Menu
                </a>

                <Link
                  href="/menu-item"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 px-7 py-3.5 text-sm font-700 text-white hover:border-white/60 transition-colors"
                >
                  <Icon name="ArrowTopRightOnSquareIcon" size={16} />
                  Open Product View
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}