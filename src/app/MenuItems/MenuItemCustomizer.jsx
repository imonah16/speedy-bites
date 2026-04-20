'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Icon from '../../components/ui/AppIcon';

const SIZES = [
  { label: 'Regular', price: 11.49, kcal: '680 kcal' },
  { label: 'Large', price: 13.49, kcal: '820 kcal' },
  { label: 'XL', price: 15.49, kcal: '1020 kcal' },
];

const EXTRAS = [
  { id: 'bacon', label: 'Crispy Bacon', price: 1.5, emoji: '🥓' },
  { id: 'egg', label: 'Fried Egg', price: 1.0, emoji: '🍳' },
  { id: 'avocado', label: 'Smashed Avocado', price: 1.5, emoji: '🥑' },
  { id: 'extra-cheese', label: 'Extra Cheese', price: 0.75, emoji: '🧀' },
  { id: 'jalapenos', label: 'Extra Jalapeños', price: 0.5, emoji: '🌶️' },
  { id: 'onion-rings', label: 'Onion Ring Stack', price: 1.25, emoji: '🍩' },
];

const SPICE_LEVELS = ['Mild', 'Medium', 'Hot', 'Extra Hot'];

const MenuItemCustomizer = () => {
  const [selectedSize, setSelectedSize] = useState('Regular');
  const [selectedExtras, setSelectedExtras] = useState(new Set());
  const [spiceLevel, setSpiceLevel] = useState('Medium');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const toggleExtra = useCallback((id) => {
    setSelectedExtras((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const selectedSizeData = SIZES.find((s) => s.label === selectedSize);
  const basePrice = selectedSizeData ? selectedSizeData.price : 11.49;

  const extrasTotal = EXTRAS
    .filter((e) => selectedExtras.has(e.id))
    .reduce((sum, e) => sum + e.price, 0);

  const unitPrice = basePrice + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="flex flex-col gap-5 animate-fade-slide-up delay-200">
      <div className="divider" />

      <div>
        <p className="text-sm font-700 text-brand-foreground mb-3 flex items-center gap-2">
          <Icon name="ScaleIcon" size={16} className="text-primary" />
          Choose Size
        </p>

        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size.label}
              type="button"
              onClick={() => setSelectedSize(size.label)}
              className={`option-pill flex flex-col items-center gap-0.5 py-2.5 px-5 ${
                selectedSize === size.label ? 'selected' : ''
              }`}
            >
              <span className="text-sm font-700">{size.label}</span>
              <span
                className={`text-xs font-500 ${
                  selectedSize === size.label ? 'text-white/80' : 'text-brand-muted'
                }`}
              >
                £{size.price.toFixed(2)} · {size.kcal}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-700 text-brand-foreground mb-3 flex items-center gap-2">
          <Icon name="PlusCircleIcon" size={16} className="text-primary" />
          Add Extras
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {EXTRAS.map((extra) => (
            <button
              key={extra.id}
              type="button"
              onClick={() => toggleExtra(extra.id)}
              className={`extra-checkbox text-left ${
                selectedExtras.has(extra.id) ? 'selected' : ''
              }`}
            >
              <span className="text-lg leading-none">{extra.emoji}</span>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-700 text-brand-foreground truncate">
                  {extra.label}
                </p>
                <p className="text-xs text-brand-muted font-500">
                  +£{extra.price.toFixed(2)}
                </p>
              </div>

              {selectedExtras.has(extra.id) && (
                <Icon
                  name="CheckCircleIcon"
                  size={16}
                  className="text-primary flex-shrink-0"
                  variant="solid"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-700 text-brand-foreground mb-3 flex items-center gap-2">
          <span className="text-base">🌶️</span>
          Spice Level
        </p>

        <div className="flex flex-wrap gap-2">
          {SPICE_LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setSpiceLevel(level)}
              className={`option-pill ${spiceLevel === level ? 'selected' : ''}`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-700 text-brand-foreground mb-2 flex items-center gap-2">
          <Icon name="PencilSquareIcon" size={16} className="text-primary" />
          Special Instructions
          <span className="text-xs font-400 text-brand-muted">(optional)</span>
        </p>

        <textarea
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          placeholder="E.g. no onions, extra sauce on the side..."
          rows={2}
          maxLength={200}
          className="form-input resize-none text-sm"
        />

        <p className="text-xs text-brand-muted mt-1 text-right">
          {specialInstructions.length}/200
        </p>
      </div>

      <div className="divider" />

      <div className="flex flex-col gap-4">
        {selectedExtras.size > 0 && (
          <div className="flex justify-between text-sm text-brand-muted bg-brand-bg rounded-xl px-4 py-3">
            <span>Base ({selectedSize})</span>
            <span className="font-600">£{basePrice.toFixed(2)}</span>
          </div>
        )}

        {selectedExtras.size > 0 && (
          <div className="flex justify-between text-sm text-brand-muted bg-primary-light rounded-xl px-4 py-3">
            <span>Extras ({selectedExtras.size} added)</span>
            <span className="font-600 text-primary">+£{extrasTotal.toFixed(2)}</span>
          </div>
        )}

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-brand-bg rounded-full px-3 py-1.5 border border-brand-border">
            <button
              type="button"
              className="qty-btn"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              −
            </button>

            <span className="text-base font-700 text-brand-foreground w-6 text-center tabular-nums">
              {quantity}
            </span>

            <button
              type="button"
              className="qty-btn"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              disabled={quantity >= 10}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`btn-primary flex-1 ${addedToCart ? 'animate-cart-bounce' : ''}`}
            aria-label={`Add ${quantity} to cart — £${totalPrice.toFixed(2)}`}
          >
            {addedToCart ? (
              <>
                <Icon name="CheckIcon" size={18} />
                Added!
              </>
            ) : (
              <>
                <Icon name="ShoppingCartIcon" size={18} />
                Add to Cart · £{totalPrice.toFixed(2)}
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-brand-muted font-500">
          <Icon name="LockClosedIcon" size={12} />
          No account needed —
          <Link href="/checkout" className="text-primary font-700 hover:underline">
            Guest checkout available
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCustomizer;