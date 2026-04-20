'use client';

import React, { useState } from 'react';
import AppImage from '../../components/ui/AppImage';
import Icon from '../../components/ui/AppIcon';

const initialItems = [
  {
    id: 1,
    name: 'The Classic Smash Burger',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_19eedcdf1-1772088182866.png',
    alt: 'Classic smash burger with sesame bun and melted cheese on dark slate board',
    size: 'Large',
    extras: ['Crispy Bacon', 'Extra Cheese'],
    spice: 'Hot',
    quantity: 2,
    unitPrice: 14.74,
  },
  {
    id: 2,
    name: 'Loaded Fries',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1aca2dde1-1772419528711.png',
    alt: 'Loaded fries with pulled beef and cheese sauce in paper tray',
    size: 'Regular',
    extras: [],
    spice: 'Mild',
    quantity: 1,
    unitPrice: 7.49,
  },
];

const PROMO_CODES = {
  SPEEDY10: 10,
  NEWBIE5: 5,
  STUDENT15: 15,
};

const OrderSummary = () => {
  const [items, setItems] = useState(initialItems);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(10, item.quantity + delta)) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const collectionFee = 0;
  const promoDiscount = appliedPromo ? subtotal * (appliedPromo.discount / 100) : 0;
  const total = subtotal + collectionFee - promoDiscount;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const applyPromo = () => {
    setPromoLoading(true);
    setPromoError('');

    setTimeout(() => {
      const upper = promoCode.toUpperCase().trim();

      if (PROMO_CODES[upper]) {
        setAppliedPromo({ code: upper, discount: PROMO_CODES[upper] });
        setPromoCode('');
      } else {
        setPromoError('Invalid promo code. Try SPEEDY10 for 10% off!');
      }

      setPromoLoading(false);
    }, 600);
  };

  return (
    <div className="checkout-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-brand-foreground">Order Summary</h2>
        <span className="text-sm font-semibold text-brand-muted">{totalItems} items</span>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-brand-border bg-brand-bg px-4 py-6 text-center">
          <p className="text-sm font-medium text-brand-muted">Your basket is empty.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id} className="order-item flex items-start gap-3">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-brand-border">
                <AppImage
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-brand-foreground leading-tight mb-1 truncate">
                  {item.name}
                </p>

                <div className="flex flex-wrap gap-1 mb-2">
                  <span className="text-xs text-brand-muted font-medium">{item.size}</span>
                  {item.extras.map((extra) => (
                    <span key={extra} className="text-xs text-brand-muted">
                      · {extra}
                    </span>
                  ))}
                  <span className="text-xs text-brand-muted">· {item.spice}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-brand-bg rounded-full px-2 py-1 border border-brand-border">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      disabled={item.quantity <= 1}
                      className="qty-btn w-6 h-6 text-sm"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      −
                    </button>

                    <span className="text-xs font-bold text-brand-foreground w-4 text-center tabular-nums">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQty(item.id, 1)}
                      disabled={item.quantity >= 10}
                      className="qty-btn w-6 h-6 text-sm"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>

                  <span className="text-sm font-bold text-brand-foreground">
                    £{(item.unitPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-bg flex items-center justify-center text-brand-muted hover:text-red-500 hover:bg-red-50 transition-all"
                aria-label={`Remove ${item.name}`}
              >
                <Icon name="XMarkIcon" size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 mb-4">
        {appliedPromo ? (
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-700">
              <Icon name="TagIcon" size={15} />
              <span>
                {appliedPromo.code} — {appliedPromo.discount}% off applied!
              </span>
            </div>

            <button
              onClick={() => setAppliedPromo(null)}
              className="text-emerald-600 hover:text-emerald-800 transition-colors"
              aria-label="Remove promo code"
            >
              <Icon name="XMarkIcon" size={14} />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => {
                setPromoCode(e.target.value.toUpperCase());
                setPromoError('');
              }}
              placeholder="Promo code"
              className="form-input flex-1 py-2.5 text-sm uppercase"
              onKeyDown={(e) => {
                if (e.key === 'Enter') applyPromo();
              }}
            />

            <button
              onClick={applyPromo}
              disabled={!promoCode.trim() || promoLoading}
              className="px-4 py-2.5 rounded-xl bg-brand-dark text-white text-sm font-bold hover:bg-brand-dark-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 whitespace-nowrap"
            >
              {promoLoading ? (
                <Icon name="ArrowPathIcon" size={14} className="animate-spin" />
              ) : (
                'Apply'
              )}
            </button>
          </div>
        )}

        {promoError && (
          <p className="text-xs text-red-500 font-semibold mt-1.5 flex items-center gap-1">
            <Icon name="ExclamationCircleIcon" size={12} />
            {promoError}
          </p>
        )}
      </div>

      <div className="border-t border-brand-border pt-4 flex flex-col gap-2.5">
        <div className="flex justify-between text-sm text-brand-muted font-medium">
          <span>Subtotal</span>
          <span className="font-semibold text-brand-foreground">£{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm text-brand-muted font-medium">
          <span>Collection</span>
          <span className="font-semibold text-emerald-600">Free</span>
        </div>

        {appliedPromo && (
          <div className="flex justify-between text-sm text-emerald-600 font-semibold">
            <span>Promo ({appliedPromo.code})</span>
            <span>−£{promoDiscount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between items-baseline pt-2 border-t border-brand-border mt-1">
          <span className="text-base font-bold text-brand-foreground">Total</span>
          <div className="text-right">
            <span className="text-2xl font-bold text-brand-foreground">£{total.toFixed(2)}</span>
            <p className="text-xs text-brand-muted font-medium">incl. VAT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;