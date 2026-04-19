'use client';

import React, { useState, useCallback } from 'react';
import AppImage from '../../../routes/AppImage';
import Icon from '../../../routes/AppIcon';

const galleryImages = [
  {
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_14694d16a-1772270583558.png',
    alt: 'Smashed beef burger with sesame bun, crisp lettuce, ripe tomato, melted cheddar and special sauce on dark slate',
    label: 'Main',
  },
  {
    src: 'https://images.unsplash.com/photo-1722076460122-1a62bc5cde0a',
    alt: 'Burger cross-section showing juicy beef patty, layered toppings and toasted bun interior',
    label: 'Inside',
  },
  {
    src: 'https://images.unsplash.com/photo-1576511053155-a98a4cb67696',
    alt: 'Burger served with golden crispy fries on wooden board, warm restaurant lighting',
    label: 'With Fries',
  },
];

const MenuItemGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const openZoom = useCallback(() => setZoomOpen(true), []);
  const closeZoom = useCallback(() => setZoomOpen(false), []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeZoom();
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'Enter' && !zoomOpen) openZoom();
  };

  return (
    <>
      <div className="flex flex-col gap-3 animate-fade-slide-up">
        <div
          className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-brand-border cursor-zoom-in group shadow-card"
          onClick={openZoom}
          role="button"
          tabIndex={0}
          aria-label="Click to zoom image"
          onKeyDown={handleKeyDown}
        >
          <AppImage
            src={galleryImages[activeIndex].src}
            alt={galleryImages[activeIndex].alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority={activeIndex === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="glass-card rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs font-600 text-brand-foreground">
              <Icon name="MagnifyingGlassPlusIcon" size={14} />
              Zoom
            </div>
          </div>

          <div className="absolute bottom-3 left-3">
            <div className="glass-card rounded-full px-3 py-1 text-xs font-700 text-brand-foreground">
              {activeIndex + 1} / {galleryImages.length}
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-card flex items-center justify-center text-brand-foreground hover:bg-white transition-all opacity-0 group-hover:opacity-100 duration-200"
            aria-label="Previous image"
          >
            <Icon name="ChevronLeftIcon" size={18} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-card flex items-center justify-center text-brand-foreground hover:bg-white transition-all opacity-0 group-hover:opacity-100 duration-200"
            aria-label="Next image"
          >
            <Icon name="ChevronRightIcon" size={18} />
          </button>
        </div>

        <div className="flex gap-2.5">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`thumb-img flex-1 aspect-[4/3] relative overflow-hidden ${
                idx === activeIndex ? 'active-thumb' : ''
              }`}
              aria-label={`View ${img.label}`}
            >
              <AppImage
                src={img.src}
                alt={img.alt}
                fill
                className={`object-cover transition-all duration-300 ${
                  idx === activeIndex ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                }`}
                sizes="120px"
              />

              <div className="absolute inset-0 flex items-end p-1.5">
                <span className="text-xs font-700 text-white drop-shadow-sm">
                  {img.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {[
            { label: 'Halal', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
            { label: '🔥 Bestseller', color: 'bg-amber-50 text-amber-700 border-amber-200' },
            { label: 'Freshly Made', color: 'bg-primary-light text-primary border-primary/20' },
          ].map((badge) => (
            <span
              key={badge.label}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-700 border ${badge.color}`}
            >
              {badge.label}
            </span>
          ))}
        </div>
      </div>

      {zoomOpen && (
        <div
          className="zoom-overlay"
          onClick={closeZoom}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-label="Image zoom view"
        >
          <div
            className="relative max-w-4xl w-full mx-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <AppImage
                src={galleryImages[activeIndex].src}
                alt={galleryImages[activeIndex].alt}
                fill
                className="object-contain"
                priority
                sizes="100vw"
              />
            </div>

            <button
              type="button"
              onClick={closeZoom}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-foreground hover:bg-brand-bg transition-colors shadow-card"
              aria-label="Close zoom"
            >
              <Icon name="XMarkIcon" size={20} />
            </button>

            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all"
              aria-label="Previous"
            >
              <Icon name="ChevronLeftIcon" size={20} />
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all"
              aria-label="Next"
            >
              <Icon name="ChevronRightIcon" size={20} />
            </button>

            <div className="flex justify-center gap-2 mt-4">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40'
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemGallery;