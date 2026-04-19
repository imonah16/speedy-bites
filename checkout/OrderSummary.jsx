'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const CheckoutForm = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    collectionTime: 'ASAP',
    scheduledDate: '',
    scheduledTime: '',
    notes: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
    saveCard: false,
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber] = useState(() => Math.floor(Math.random() * 90000) + 10000);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const formatCardNumber = (val) => {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    return digits.length >= 3 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const validate = () => {
    const errs = {};

    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required';

    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Enter a valid email address';
    }

    if (!form.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (form.phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Enter a valid phone number';
    }

    if (form.collectionTime === 'scheduled') {
      if (!form.scheduledDate) errs.scheduledDate = 'Please choose a date';
      if (!form.scheduledTime) errs.scheduledTime = 'Please choose a time';
    }

    if (form.cardNumber.replace(/\s/g, '').length < 16) {
      errs.cardNumber = 'Enter a valid 16-digit card number';
    }

    if (!form.cardExpiry || form.cardExpiry.length < 5) {
      errs.cardExpiry = 'Enter expiry in MM/YY format';
    }

    if (form.cardCvc.length < 3) {
      errs.cardCvc = 'Enter a valid 3-digit CVC';
    }

    if (!form.cardName.trim()) {
      errs.cardName = 'Cardholder name is required';
    }

    if (!form.agreeTerms) {
      errs.agreeTerms = 'Please accept the terms to continue';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="checkout-card flex flex-col items-center justify-center py-16 gap-5 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
          <Icon name="CheckCircleIcon" size={40} className="text-emerald-500" variant="solid" />
        </div>

        <div>
          <h2 className="font-display text-2xl text-brand-foreground mb-2">Order Confirmed! 🎉</h2>
          <p className="text-brand-muted font-500 text-sm max-w-sm">
            Your order has been placed successfully. You&apos;ll receive a confirmation email shortly.
            Estimated collection time: <strong className="text-brand-foreground">20–30 minutes</strong>.
          </p>
        </div>

        <div className="bg-brand-bg rounded-xl px-6 py-3 border border-brand-border text-sm font-700 text-brand-foreground">
          Order #SB-{orderNumber}
        </div>

        <Link href="/" className="btn-primary px-8 py-3 text-sm font-700">
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="checkout-card">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-700">
            1
          </div>
          <h2 className="font-display text-xl text-brand-foreground">Collection Details</h2>
        </div>

        <div className="flex items-center gap-3 bg-primary-light border border-primary/20 rounded-xl px-4 py-3 mb-5">
          <Icon name="UserIcon" size={18} className="text-primary flex-shrink-0" />
          <div>
            <p className="text-sm font-700 text-brand-foreground">Checking out as Guest</p>
            <p className="text-xs text-brand-muted font-500">
              No account needed.{' '}
              <Link href="/" className="text-primary hover:underline font-700">
                Sign in
              </Link>{' '}
              to save your details for next time.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-xs font-700 text-brand-foreground mb-1.5 uppercase tracking-wide"
            >
              First Name <span className="text-primary">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              value={form.firstName}
              onChange={(e) => update('firstName', e.target.value)}
              placeholder="James"
              className={`form-input ${errors.firstName ? 'border-red-400 focus:border-red-400' : ''}`}
              autoComplete="given-name"
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 font-600 mt-1 flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={12} />
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-xs font-700 text-brand-foreground mb-1.5 uppercase tracking-wide"
            >
              Last Name <span className="text-primary">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              value={form.lastName}
              onChange={(e) => update('lastName', e.target.value)}
              placeholder="Okafor"
              className={`form-input ${errors.lastName ? 'border-red-400 focus:border-red-400' : ''}`}
              autoComplete="family-name"
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 font-600 mt-1 flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={12} />
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-700 text-brand-foreground mb-1.5 uppercase tracking-wide"
            >
              Email <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                <Icon name="EnvelopeIcon" size={16} />
              </div>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="james@email.com"
                className={`form-input pl-10 ${errors.email ? 'border-red-400' : ''}`}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 font-600 mt-1 flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={12} />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-700 text-brand-foreground mb-1.5 uppercase tracking-wide"
            >
              Phone <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                <Icon name="PhoneIcon" size={16} />
              </div>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="+44 7700 900123"
                className={`form-input pl-10 ${errors.phone ? 'border-red-400' : ''}`}
                autoComplete="tel"
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-500 font-600 mt-1 flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={12} />
                {errors.phone}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="checkout-card">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-700">
            2
          </div>
          <h2 className="font-display text-xl text-brand-foreground">Collection Time</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          {[
            { value: 'ASAP', label: 'As Soon As Possible', sub: 'Ready in 20–30 min', icon: '⚡' },
            { value: 'scheduled', label: 'Schedule for Later', sub: 'Pick date & time', icon: '📅' },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => update('collectionTime', opt.value)}
              className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                form.collectionTime === opt.value
                  ? 'border-primary bg-primary-light'
                  : 'border-brand-border hover:border-primary/40 bg-white'
              }`}
            >
              <span className="text-xl">{opt.icon}</span>
              <div>
                <p
                  className={`text-sm font-700 ${
                    form.collectionTime === opt.value ? 'text-primary' : 'text-brand-foreground'
                  }`}
                >
                  {opt.label}
                </p>
                <p className="text-xs text-brand-muted font-500">{opt.sub}</p>
              </div>
              {form.collectionTime === opt.value && (
                <Icon
                  name="CheckCircleIcon"
                  size={18}
                  className="text-primary ml-auto flex-shrink-0"
                  variant="solid"
                />
              )}
            </button>
          ))}
        </div>

        {form.collectionTime === 'scheduled' && (
          <div className="grid sm:grid-cols-2 gap-4 animate-fade-slide-up">
            <div>
              <label
                htmlFor="scheduledDate"
                className="block text-xs font-700 text-brand-foreground mb-1.5 uppercase tracking-wide"
              >
                Collection Date
              </label>
              <input
                id="scheduledDate"
                type="date"
                value={form.scheduledDate}
                onChange={(e) => update('scheduledDate', e.target.value)}
                className={`form-input ${errors.scheduledDate ? 'border-red-400' : ''}`}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.scheduledDate && (
                <p className="text-xs text-red-500 font-600 mt-1 flex items-center gap-1">
                  <Icon name="ExclamationCircleIcon" size={12} />
                  {errors.scheduledDate}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="scheduledTime"
                className="block text-xs font-700 text-brand-foreground mb-1.5 uppercase tracking-wide"
              >
                Collection Time
              </label>
              <select
                id="scheduledTime"
                value={form.scheduledTime}
                onChange={(e) => update('scheduledTime', e.target.value)}
                className={`form-input ${errors.scheduledTime ? 'border-red-400' : ''}`}
              >
                <option value="">Select time</option>
                {[
                  '12:00',
                  '12:30',
                  '13:00',
                  '13:30',
                  '17:00',
                  '17:30',
                  '18:00',
                  '18:30',
                  '19:00',
                  '19:30',
                  '20:00',
                  '20:30',
                  '21:00',
                ].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {errors.scheduledTime && (
                <p className="text-xs text-red-500 font-600 mt-1 flex items-center gap-1">
                  <Icon name="ExclamationCircleIcon" size={12} />
                  {errors.scheduledTime}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mt-4">
          <label
            htmlFor="notes"
            className="block text-xs font-700 text-brand-foreground mb-1.5 uppercase tracking-wide"
          >
            Order Notes <span className="text-xs font-400 text-brand-muted normal-case">(optional)</span>
          </label>
          <textarea
            id="notes"
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
            placeholder="Any special requests for your order..."
            rows={2}
            className="form-input resize-none text-sm"
            maxLength={200}
          />
        </div>
      </div>

      <div className="checkout-card">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-700">
            3
          </div>
          <h2 className="font-display text-xl text-brand-foreground">Payment</h2>
          <div className="ml-auto flex items-center gap-1.5 text-xs font-600 text-brand-muted">
            <Icon name="LockClosedIcon" size={13} />
            Secure & Encrypted
          </div>
        </div>

        <div className="flex flex-col gap-4 animate-fade-slide-up">
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-xs font-700 text-brand-foreground mb-1.5 uppercase tracking-wide"
            >
              Card Number <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <input
                id="cardNumber"
                type="text"
                value={form.cardNumber}
                onChange={(e) => update('cardNumber', formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className={`card-field ${errors.cardNumber ? 'border-red-400' : ''}`}
                autoComplete="cc-number"
                inputMode="numeric"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5 pointer-events-none">
                {['VISA', 'MC'].map((card) => (
                  <span
                    key={card}
                    className="text-xs font-700 text-brand-muted border border-brand-border rounded px-1.5 py-0.5 bg-white"
                  >
                    {card}
                  </span>
                ))}
              </div>
            </div>
            {errors.cardNumber && (
              <p className="text-xs text-red-500 font-600 mt-1 flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={12} />
                {errors.cardNumber}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="cardExpiry"
                className="block text-xs font-700 text-brand-foreground mb-1.5 uppercase tracking-wide"
              >
                Expiry <span className="text-primary">*</span>
              </label>
              <input
                id="cardExpiry"
                type="text"
                value={form.cardExpiry}
                onChange={(e) => update('cardExpiry', formatExpiry(e.target.value))}
                placeholder="MM/YY"
                maxLength={5}
                className={`card-field ${errors.cardExpiry ? 'border-red-400' : ''}`}
                autoComplete="cc-exp"
                inputMode="numeric"
              />
              {errors.cardExpiry && (
                <p className="text-xs text-red-500 font-600 mt-1 flex items-center gap-1">
                  <Icon name="ExclamationCircleIcon" size={12} />
                  {errors.cardExpiry}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="cardCvc"
                className="block text-xs font-700 text-brand-foreground mb-1.5 uppercase tracking-wide"
              >
                CVC <span className="text-primary">*</span>
              </label>
              <input
                id="cardCvc"
                type="text"
                value={form.cardCvc}
                onChange={(e) => update('cardCvc', e.target.value.replace(/\D/g, '').slice(0, 3))}
                placeholder="123"
                maxLength={3}
                className={`card-field ${errors.cardCvc ? 'border-red-400' : ''}`}
                autoComplete="cc-csc"
                inputMode="numeric"
              />
              {errors.cardCvc && (
                <p className="text-xs text-red-500 font-600 mt-1 flex items-center gap-1">
                  <Icon name="ExclamationCircleIcon" size={12} />
                  {errors.cardCvc}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="cardName"
              className="block text-xs font-700 text-brand-foreground mb-1.5 uppercase tracking-wide"
            >
              Cardholder Name <span className="text-primary">*</span>
            </label>
            <input
              id="cardName"
              type="text"
              value={form.cardName}
              onChange={(e) => update('cardName', e.target.value)}
              placeholder="James Okafor"
              className={`card-field ${errors.cardName ? 'border-red-400' : ''}`}
              autoComplete="cc-name"
            />
            {errors.cardName && (
              <p className="text-xs text-red-500 font-600 mt-1 flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={12} />
                {errors.cardName}
              </p>
            )}
          </div>

          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all flex-shrink-0 ${
                form.saveCard ? 'bg-primary border-primary' : 'border-brand-border group-hover:border-primary/50'
              }`}
              onClick={() => update('saveCard', !form.saveCard)}
            >
              {form.saveCard && <Icon name="CheckIcon" size={12} className="text-white" />}
            </div>
            <span className="text-sm font-500 text-brand-muted">
              Save card for faster checkout next time
            </span>
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div
            className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all flex-shrink-0 mt-0.5 ${
              form.agreeTerms ? 'bg-primary border-primary' : 'border-brand-border group-hover:border-primary/50'
            } ${errors.agreeTerms ? 'border-red-400' : ''}`}
            onClick={() => update('agreeTerms', !form.agreeTerms)}
          >
            {form.agreeTerms && <Icon name="CheckIcon" size={12} className="text-white" />}
          </div>
          <span className="text-sm font-500 text-brand-muted">
            I agree to SpeedyBites&apos;{' '}
            <Link href="/" className="text-primary font-700 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/" className="text-primary font-700 hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>

        {errors.agreeTerms && (
          <p className="text-xs text-red-500 font-600 -mt-2 flex items-center gap-1">
            <Icon name="ExclamationCircleIcon" size={12} />
            {errors.agreeTerms}
          </p>
        )}

        <button type="submit" disabled={submitting} className="btn-primary w-full py-4 text-base font-700">
          {submitting ? (
            <>
              <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
              Placing your order...
            </>
          ) : (
            <>
              <Icon name="ShoppingBagIcon" size={20} />
              Place Order
            </>
          )}
        </button>

        <p className="text-center text-xs text-brand-muted font-500">
          🔒 Your payment is secured with 256-bit SSL encryption
        </p>
      </div>
    </form>
  );
};

export default CheckoutForm;