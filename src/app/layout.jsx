/* eslint-disable react-refresh/only-export-components */
import '../../tailwind.css';
import { CartProvider } from '../context/CartContext';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL('https://speedy-bites-vads.onrender.com'),
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
      </body>
    </html>
  );
}