/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import '../tailwind.css';
import { CartProvider } from '../routes/CartContext';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL('https://speedy-bites.onrender.com'),
  title: 'SpeedyBites — Order Fresh Takeaway in Minutes',
  description:
    'SpeedyBites lets you browse a full menu, customize your order, and check out as a guest — hot food ready fast for collection.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-brand-bg">
        <CartProvider>{children}</CartProvider>

        <script
          type="module"
          async
          src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fspeedybite9540back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.18"
        />
        <script
          type="module"
          defer
          src="https://static.rocket.new/rocket-shot.js?v=0.0.2"
        />
      </body>
    </html>
  );
}