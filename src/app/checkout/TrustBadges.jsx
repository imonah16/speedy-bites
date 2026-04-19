import React from 'react';
import Icon from '@/components/ui/AppIcon';

const badges = [
  {
    icon: 'LockClosedIcon',
    title: 'Secure Checkout',
    sub: '256-bit SSL encryption',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: 'ClockIcon',
    title: 'Fast Collection',
    sub: '20–30 min average',
    color: 'text-primary',
    bg: 'bg-primary-light',
  },
  {
    icon: 'StarIcon',
    title: '4.8 Star Rating',
    sub: '2,400+ happy customers',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: 'ShieldCheckIcon',
    title: 'Trusted Service',
    sub: 'Safe and reliable',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
];

const TrustBadges = () => {
  return (
    <div className="checkout-card">
      <p className="text-xs font-700 text-brand-muted uppercase tracking-widest mb-4">
        Why order with us?
      </p>

      <div className="grid grid-cols-2 gap-3">
        {badges.map((badge) => (
          <div
            key={badge.title}
            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-brand-bg border border-brand-border text-center"
          >
            <div
              className={`w-9 h-9 rounded-full ${badge.bg} flex items-center justify-center ${badge.color}`}
            >
              <Icon name={badge.icon} size={18} />
            </div>

            <div>
              <p className="text-xs font-700 text-brand-foreground leading-tight">
                {badge.title}
              </p>
              <p className="text-xs text-brand-muted font-500 mt-0.5">
                {badge.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-brand-border">
        <p className="text-xs font-600 text-brand-muted text-center mb-2">
          We accept
        </p>

        <div className="flex items-center justify-center gap-2 flex-wrap">
          {['VISA', 'MC', 'AMEX', 'PayPal', 'Apple Pay'].map((p) => (
            <span
              key={p}
              className="text-xs font-700 text-brand-muted border border-brand-border rounded-md px-2 py-1 bg-white"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;