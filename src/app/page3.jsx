'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../routes/header';
import Footer from '../routes/footer';
import AppImage from '../routes/AppImage';
import Icon from '../routes/AppIcon';
import { useCart } from '../routes/CartContext';

const menuItems = [
  {
    id: 1,
    name: 'The Classic Smash Burger',
    description:
      'Two hand-smashed beef patties, double American cheese, pickled jalapeños, shredded iceberg, smoky sauce in a toasted brioche bun',
    price: 11.49,
    originalPrice: 13.99,
    rating: 4.8,
    reviews: 200,
    image:
      'https://img.rocket.new/generatedImages/rocket_gen_img_1c1dee6d0-1772911041733.png',
    alt: 'Classic smash burger with double beef patties, melted cheese and fresh toppings on brioche bun',
    badge: '🔥 Bestseller',
    prepTime: '15–25 min',
    category: 'Burgers',
    calories: '680 kcal',
  },
  {
    id: 2,
    name: 'Double Bacon Stack',
    description:
      'Double smash patty, six rashers of crispy streaky bacon, aged cheddar, beef-dripping mayo',
    price: 13.99,
    rating: 4.8,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1603322617163-cc100d141345',
    alt: 'Double bacon burger stacked high with crispy bacon and melted cheese on sesame bun',
    badge: '🔥 Popular',
    prepTime: '18–25 min',
    category: 'Burgers',
    calories: '820 kcal',
  },
  {
    id: 3,
    name: 'Crispy Chicken Deluxe',
    description:
      'Southern-fried chicken fillet, slaw, pickles, honey mustard on a toasted brioche bun',
    price: 10.99,
    originalPrice: 12.99,
    rating: 4.7,
    reviews: 89,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a5076b27-1772350969922.png',
    alt: 'Crispy fried chicken burger with coleslaw and pickles on toasted brioche bun',
    badge: '💰 Deal',
    prepTime: '15–22 min',
    category: 'Burgers',
    calories: '720 kcal',
  },
  {
    id: 4,
    name: 'Halloumi Stack',
    description:
      'Grilled halloumi, roasted peppers, pesto aioli, rocket on a seeded bun',
    price: 10.49,
    rating: 4.6,
    reviews: 44,
    image: 'https://images.unsplash.com/photo-1641601905519-70554cb7b8c1',
    alt: 'Vegetarian halloumi burger with grilled cheese, roasted red peppers and green rocket on seeded bun',
    badge: '🌱 Veggie',
    prepTime: '15–20 min',
    category: 'Burgers',
    calories: '590 kcal',
  },
  {
    id: 5,
    name: 'Margherita Classic',
    description:
      'San Marzano tomato base, fresh mozzarella, basil, extra virgin olive oil on a hand-stretched dough',
    price: 10.99,
    rating: 4.7,
    reviews: 134,
    image: 'https://images.unsplash.com/photo-1703784022146-b72677752ce5',
    alt: 'Classic margherita pizza with fresh mozzarella, tomato sauce and basil leaves on stone-baked crust',
    badge: '🌱 Veggie',
    prepTime: '20–30 min',
    category: 'Pizzas',
    calories: '780 kcal',
  },
  {
    id: 6,
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
    category: 'Pizzas',
    calories: '960 kcal',
  },
  {
    id: 7,
    name: 'BBQ Chicken Pizza',
    description:
      'Smoky BBQ base, grilled chicken, red onion, sweetcorn, mozzarella and fresh coriander',
    price: 13.99,
    rating: 4.7,
    reviews: 97,
    image:
      'https://img.rocket.new/generatedImages/rocket_gen_img_1cc9e02a6-1765395122404.png',
    alt: 'BBQ chicken pizza with grilled chicken pieces, red onion and sweetcorn on smoky BBQ sauce base',
    prepTime: '20–30 min',
    category: 'Pizzas',
    calories: '890 kcal',
  },
  {
    id: 8,
    name: 'Meat Lovers',
    description:
      'Pepperoni, beef mince, smoked bacon, sausage, mozzarella on a rich tomato base',
    price: 14.99,
    rating: 4.8,
    reviews: 162,
    image: 'https://images.unsplash.com/photo-1717049955368-abce63945ee0',
    alt: 'Meat lovers pizza piled with pepperoni, beef mince, bacon and sausage on thick tomato base',
    badge: '🔥 Popular',
    prepTime: '22–32 min',
    category: 'Pizzas',
    calories: '1080 kcal',
  },
  {
    id: 9,
    name: 'Classic Buffalo Wings',
    description:
      '8 crispy chicken wings tossed in tangy buffalo sauce, served with blue cheese dip and celery',
    price: 9.99,
    rating: 4.8,
    reviews: 175,
    image:
      'https://img.rocket.new/generatedImages/rocket_gen_img_1c39b8004-1773192310795.png',
    alt: 'Crispy buffalo chicken wings coated in tangy red sauce served with blue cheese dip and celery sticks',
    badge: '🔥 Bestseller',
    prepTime: '15–22 min',
    category: 'Wings',
    calories: '620 kcal',
  },
  {
    id: 10,
    name: 'Honey Garlic Wings',
    description:
      '8 wings glazed in sticky honey garlic sauce, sesame seeds, spring onions',
    price: 10.49,
    rating: 4.7,
    reviews: 88,
    image: 'https://images.unsplash.com/photo-1612443016520-314f09b3d449',
    alt: 'Honey garlic glazed chicken wings with sesame seeds and spring onion garnish on dark plate',
    prepTime: '15–22 min',
    category: 'Wings',
    calories: '580 kcal',
  },
  {
    id: 11,
    name: 'Lemon Pepper Wings',
    description:
      '8 wings dusted in zesty lemon pepper seasoning, served with ranch dip',
    price: 9.99,
    rating: 4.6,
    reviews: 63,
    image:
      'https://img.rocket.new/generatedImages/rocket_gen_img_12671b5dc-1765694208615.png',
    alt: 'Lemon pepper seasoned chicken wings with golden crispy coating served with ranch dipping sauce',
    badge: '🌟 New',
    prepTime: '15–22 min',
    category: 'Wings',
    calories: '540 kcal',
  },
  {
    id: 12,
    name: 'Boneless Wings Bucket',
    description:
      '12 boneless chicken bites in your choice of sauce — buffalo, BBQ or sweet chilli',
    price: 11.99,
    rating: 4.7,
    reviews: 110,
    image: 'https://images.unsplash.com/photo-1690622081505-ae8eb49662d0',
    alt: 'Boneless chicken wing bites in a bucket with dipping sauces on the side',
    badge: '💰 Value',
    prepTime: '15–20 min',
    category: 'Wings',
    calories: '680 kcal',
  },
  {
    id: 13,
    name: 'Loaded Fries',
    description:
      'Skin-on fries, pulled beef, cheese sauce, spring onions, chipotle drizzle',
    price: 7.49,
    rating: 4.9,
    reviews: 211,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_11f60102a-1772419526645.png',
    alt: 'Loaded fries topped with pulled beef, melted cheese sauce and fresh spring onions in paper tray',
    badge: '⭐ Top Rated',
    prepTime: '10–15 min',
    category: 'Chips & Sides',
    calories: '720 kcal',
  },
  {
    id: 14,
    name: 'Classic Chips',
    description:
      'Thick-cut golden chips seasoned with sea salt and cracked black pepper',
    price: 3.49,
    rating: 4.5,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1733843869781-a52c32238ded',
    alt: 'Thick golden chips seasoned with sea salt in a paper cone with ketchup on the side',
    prepTime: '8–12 min',
    category: 'Chips & Sides',
    calories: '380 kcal',
  },
  {
    id: 15,
    name: 'Cheesy Chips',
    description: 'Golden chips smothered in our signature cheddar cheese sauce',
    price: 4.99,
    rating: 4.7,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1719377160205-0a69ae7425e8',
    alt: 'Golden chips covered in thick melted cheddar cheese sauce in a takeaway box',
    badge: '🧀 Fan Fave',
    prepTime: '8–12 min',
    category: 'Chips & Sides',
    calories: '520 kcal',
  },
  {
    id: 16,
    name: 'Onion Rings',
    description:
      'Thick-cut onion rings in a crispy golden batter, served with smoky dip',
    price: 4.49,
    rating: 4.6,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1714894691483-e4cde0f7486d',
    alt: 'Crispy golden battered onion rings stacked in a basket with smoky dipping sauce',
    prepTime: '8–12 min',
    category: 'Chips & Sides',
    calories: '410 kcal',
  },
  {
    id: 17,
    name: 'Coleslaw',
    description:
      'Creamy homemade coleslaw with shredded cabbage, carrot and our house dressing',
    price: 2.49,
    rating: 4.4,
    reviews: 55,
    image: 'https://images.unsplash.com/photo-1617343257769-e425deafd01e',
    alt: 'Creamy coleslaw with shredded cabbage and carrot in a small white pot',
    badge: '🌱 Veggie',
    prepTime: '2–5 min',
    category: 'Chips & Sides',
    calories: '180 kcal',
  },
  {
    id: 18,
    name: 'Strawberry Milkshake',
    description:
      'Thick and creamy strawberry milkshake made with real ice cream and fresh strawberries',
    price: 4.99,
    rating: 4.8,
    reviews: 92,
    image: 'https://images.unsplash.com/photo-1660951288277-4dd9826bc849',
    alt: 'Thick pink strawberry milkshake in a tall glass with whipped cream and a straw',
    badge: '🍓 Popular',
    prepTime: '5–8 min',
    category: 'Drinks',
    calories: '420 kcal',
  },
  {
    id: 19,
    name: 'Chocolate Milkshake',
    description:
      'Rich chocolate milkshake blended with Belgian chocolate ice cream and topped with cream',
    price: 4.99,
    rating: 4.9,
    reviews: 108,
    image: 'https://images.unsplash.com/photo-1727339373630-20e3623ffbeb',
    alt: 'Rich chocolate milkshake in a tall glass topped with whipped cream and chocolate drizzle',
    badge: '🍫 Bestseller',
    prepTime: '5–8 min',
    category: 'Drinks',
    calories: '480 kcal',
  },
  {
    id: 20,
    name: 'Soft Drinks',
    description:
      'Coca-Cola, Diet Coke, Sprite, Fanta Orange or Fanta Lemon — 500ml bottle',
    price: 2.49,
    rating: 4.5,
    reviews: 200,
    image: 'https://images.unsplash.com/photo-1651307426653-2b63a236ece5',
    alt: 'Selection of cold soft drink cans including Coca-Cola, Sprite and Fanta on ice',
    prepTime: '1–2 min',
    category: 'Drinks',
    calories: '140–210 kcal',
  },
];

const categories = ['All', 'Burgers', 'Pizzas', 'Wings', 'Chips & Sides', 'Drinks'];

const categoryEmojis = {
  All: '🍽️',
  Burgers: '🍔',
  Pizzas: '🍕',
  Wings: '🍗',
  'Chips & Sides': '🍟',
  Drinks: '🥤',
};

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

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { addItem } = useCart();

  const filtered =
    activeCategory === 'All'
      ? menuItems
      : menuItems.filter((i) => i.category === activeCategory);

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
    <div className="min-h-screen bg-brand-bg">
      <Header />

      <main>
        <section className="relative overflow-hidden bg-brand-foreground pt-24 pb-16 sm:pt-28 sm:pb-20">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl -translate-x-1/2 -translate-y-1/2 animate-blob" />
          <div
            className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl translate-x-1/3 translate-y-1/3 animate-blob"
            style={{ animationDelay: '3s' }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 animate-fade-slide-up">
              <span className="text-sm font-600 text-white/90">🚀 Fast collection · 15–35 min</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4 animate-fade-slide-up delay-100">
              Seriously Good Food,
              <br />
              <span className="text-primary">Ready Fast</span>
            </h1>

            <p className="text-lg text-white/70 font-400 max-w-xl mx-auto mb-8 animate-fade-slide-up delay-200">
              Burgers, pizzas, wings, chips and more — freshly made and ready for collection in minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-slide-up delay-300">
              <a href="#menu" className="btn-primary px-8 py-3.5 text-base">
                <Icon name="FireIcon" size={18} />
                Order Now
              </a>

              <Link
                href="/checkout"
                className="flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-white/30 text-white font-600 text-base hover:border-white/60 transition-all duration-200"
              >
                <Icon name="ShoppingCartIcon" size={18} />
                View Cart
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 animate-fade-slide-up delay-400">
              {[
                { icon: '⭐', value: '4.8', label: 'Rating' },
                { icon: '🚀', value: '20 min', label: 'Avg collection' },
                { icon: '🍽️', value: '20+', label: 'Menu items' },
                { icon: '🔥', value: 'Fresh', label: 'Made to order' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2 text-white/80">
                  <span className="text-xl">{stat.icon}</span>
                  <div className="text-left">
                    <p className="text-sm font-700 text-white leading-none">{stat.value}</p>
                    <p className="text-xs text-white/60 font-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8 animate-fade-slide-up">
            <p className="section-label mb-2">Our Menu</p>
            <h2 className="font-display text-3xl sm:text-4xl text-brand-foreground">
              What are you craving?
            </h2>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-8 justify-start sm:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-600 text-sm whitespace-nowrap transition-all duration-200 border-2 ${
                  activeCategory === cat
                    ? 'bg-primary border-primary text-white shadow-primary'
                    : 'bg-white border-brand-border text-brand-muted hover:border-primary hover:text-primary'
                }`}
              >
                <span>{categoryEmojis[cat]}</span>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((item, idx) => (
              <Link
                key={item.id}
                href="/menu-item"
                className="bg-white rounded-2xl overflow-hidden border border-brand-border shadow-card card-hover group animate-fade-slide-up flex flex-col"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-brand-border">
                  <AppImage
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {item.badge && (
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-xs font-700 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-brand-foreground shadow-sm">
                        {item.badge}
                      </span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(e, item)}
                    className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-primary"
                    aria-label={`Quick add ${item.name} to cart`}
                  >
                    <Icon name="PlusIcon" size={18} className="text-white" />
                  </button>

                  <div className="absolute bottom-2.5 left-2.5">
                    <span className="text-xs font-600 bg-black/50 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">
                      {item.calories}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm font-700 text-brand-foreground mb-1 leading-tight">
                    {item.name}
                  </h3>

                  <p className="text-xs text-brand-muted leading-relaxed mb-3 line-clamp-2 flex-1">
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
                      {item.originalPrice && (
                        <span className="text-xs text-brand-muted line-through">
                          £{item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-700 text-primary group-hover:underline">
                      View →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-10 sm:py-12 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-black/10 blur-2xl -translate-x-1/4 translate-y-1/4" />

            <div className="relative">
              <p className="text-white/80 font-600 text-sm mb-2">🎉 Limited Time Offer</p>
              <h2 className="font-display text-3xl sm:text-4xl text-white mb-3">
                Combo Savings on Selected Items
              </h2>
              <p className="text-white/80 text-base mb-6 max-w-md mx-auto">
                Mix and match from our full menu — burgers, pizzas, wings, chips and more.
              </p>
              <a
                href="#menu"
                className="inline-flex items-center gap-2 bg-white text-primary font-700 px-8 py-3.5 rounded-full hover:bg-brand-bg transition-colors duration-200"
              >
                <Icon name="FireIcon" size={18} />
                Grab the Deal
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}