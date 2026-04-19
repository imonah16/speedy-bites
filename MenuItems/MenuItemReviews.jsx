'use client';

import React, { useState } from 'react';
import AppImage from '../../../routes/AppImage';
import Icon from '../../../routes/AppIcon';

const reviews = [
  {
    id: 1,
    name: 'James Okafor',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_197cceb39-1772091574254.png',
    rating: 5,
    date: '8 Apr 2026',
    text: "Genuinely the best smash burger I've had for collection. The brioche bun held up perfectly and the beef dripping mayo is absolutely incredible. Ordered with extra jalapeños — highly recommend.",
    helpful: 34,
    verified: true,
    tags: ['Great flavour', 'Fast collection'],
  },
  {
    id: 2,
    name: 'Sophie Marchetti',
    avatar: 'https://images.unsplash.com/photo-1565551174524-2bb3b69fcb97',
    rating: 5,
    date: '5 Apr 2026',
    text: 'Ordered the XL size with smashed avocado and extra cheese. Ready for pickup in under 20 minutes. The customisation options are brilliant — feels like a proper restaurant experience.',
    helpful: 21,
    verified: true,
    tags: ['Worth the price', 'Ready on time'],
  },
  {
    id: 3,
    name: 'Priya Nair',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80',
    rating: 4,
    date: '1 Apr 2026',
    text: 'Really tasty burger. Went for the Hot spice level and it had a proper kick without being overwhelming. Knocked one star off only because the fries were slightly cold, but the burger itself was 10/10.',
    helpful: 15,
    verified: true,
    tags: ['Good spice level'],
  },
  {
    id: 4,
    name: 'Tom Whitfield',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_182c3721e-1772903092970.png',
    rating: 5,
    date: '28 Mar 2026',
    text: 'Third time ordering this. Consistent quality every single time. The crispy bacon add-on is a must. SpeedyBites has nailed the smash burger game.',
    helpful: 28,
    verified: true,
    tags: ['Consistent quality', 'Repeat order'],
  },
];

const ratingBreakdown = [
  { stars: 5, count: 142, pct: 71 },
  { stars: 4, count: 38, pct: 19 },
  { stars: 3, count: 14, pct: 7 },
  { stars: 2, count: 4, pct: 2 },
  { stars: 1, count: 2, pct: 1 },
];

const FILTERS = ['All', '5 Stars', '4 Stars', '3 Stars', 'Verified', 'Most Helpful'];

const StarRating = ({ rating, size = 16 }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={s <= rating ? 'star-filled' : 'star-empty'}
          style={{ width: size, height: size }}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const MenuItemReviews = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [helpfulVoted, setHelpfulVoted] = useState(new Set());

  const avgRating = 4.6;
  const totalReviews = 200;

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === '5 Stars') return r.rating === 5;
    if (activeFilter === '4 Stars') return r.rating === 4;
    if (activeFilter === '3 Stars') return r.rating === 3;
    if (activeFilter === 'Verified') return r.verified;
    if (activeFilter === 'Most Helpful') return r.helpful >= 20;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl sm:text-3xl text-brand-foreground">
          Customer Reviews
        </h2>

        <button
          type="button"
          className="flex items-center gap-2 text-sm font-600 text-primary hover:underline"
        >
          Write a review
          <Icon name="PencilSquareIcon" size={15} />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-8 p-5 bg-white rounded-2xl border border-brand-border shadow-card">
        <div className="flex flex-col items-center justify-center gap-2 py-4">
          <span className="font-display text-6xl text-brand-foreground leading-none">
            {avgRating}
          </span>
          <StarRating rating={Math.round(avgRating)} size={20} />
          <span className="text-sm text-brand-muted font-500">
            Based on {totalReviews} reviews
          </span>

          <div className="flex items-center gap-1.5 text-xs font-700 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mt-1">
            <Icon name="HandThumbUpIcon" size={12} />
            92% recommend this item
          </div>
        </div>

        <div className="flex flex-col gap-2.5 justify-center">
          {ratingBreakdown.map((row) => (
            <div key={row.stars} className="flex items-center gap-2.5">
              <span className="text-xs font-700 text-brand-muted w-6 text-right shrink-0">
                {row.stars}
              </span>

              <svg className="star-filled w-3 h-3 shrink-0" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>

              <div className="rating-bar flex-1">
                <div className="rating-bar-fill" style={{ width: `${row.pct}%` }} />
              </div>

              <span className="text-xs font-600 text-brand-muted w-8 shrink-0">
                {row.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto no-scrollbar mb-6 border-b border-brand-border">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActiveFilter(f)}
            className={`tab-btn ${activeFilter === f ? 'active' : ''}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filteredReviews.map((review, idx) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl border border-brand-border p-5 shadow-card animate-fade-slide-up"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-brand-border">
                  <AppImage
                    src={review.avatar}
                    alt={`${review.name} profile photo`}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-700 text-brand-foreground">
                      {review.name}
                    </span>

                    {review.verified && (
                      <span className="flex items-center gap-1 text-xs font-600 text-emerald-600">
                        <Icon name="CheckBadgeIcon" size={12} variant="solid" />
                        Verified
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-brand-muted font-500">{review.date}</span>
                </div>
              </div>

              <StarRating rating={review.rating} size={14} />
            </div>

            <p className="text-sm text-brand-muted leading-relaxed mb-3">{review.text}</p>

            {review.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {review.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-600 text-brand-muted bg-brand-bg px-2.5 py-1 rounded-full border border-brand-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3 pt-2 border-t border-brand-border/50">
              <span className="text-xs text-brand-muted font-500">Helpful?</span>

              <button
                type="button"
                onClick={() => {
                  setHelpfulVoted((prev) => {
                    const next = new Set(prev);
                    if (next.has(review.id)) {
                      next.delete(review.id);
                    } else {
                      next.add(review.id);
                    }
                    return next;
                  });
                }}
                className={`flex items-center gap-1.5 text-xs font-600 transition-colors ${
                  helpfulVoted.has(review.id)
                    ? 'text-primary'
                    : 'text-brand-muted hover:text-primary'
                }`}
              >
                <Icon
                  name="HandThumbUpIcon"
                  size={13}
                  variant={helpfulVoted.has(review.id) ? 'solid' : 'outline'}
                />
                {review.helpful + (helpfulVoted.has(review.id) ? 1 : 0)}
              </button>

              <button
                type="button"
                className="flex items-center gap-1.5 text-xs font-600 text-brand-muted hover:text-brand-foreground transition-colors"
              >
                <Icon name="FlagIcon" size={13} />
                Report
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          type="button"
          className="px-8 py-3 rounded-full border-2 border-brand-border text-sm font-700 text-brand-muted hover:border-primary hover:text-primary transition-all duration-200"
        >
          Load more reviews ({totalReviews - filteredReviews.length} remaining)
        </button>
      </div>
    </div>
  );
};

export default MenuItemReviews;