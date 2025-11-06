import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Catalog from './components/Catalog.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import PreorderModal from './components/PreorderModal.jsx';

// Static product catalog tailored to the niche
const BASE_PRODUCTS = [
  {
    id: 'j1',
    name: 'Midnight Indica Joint',
    type: 'Joint',
    strain: 'Indica',
    thc: 24,
    grams: 1,
    price: 12,
    offer: { label: '2 for $20', type: 'bundle', details: { qty: 2, bundlePrice: 20 } },
    notes: 'Smooth, heavy body feel. Perfect for late nights.',
  },
  {
    id: 'j2',
    name: 'Citrus Haze Pre-roll',
    type: 'Joint',
    strain: 'Sativa',
    thc: 22,
    grams: 1,
    price: 11,
    offer: { label: 'Buy 3, save 15%', type: 'percentage', details: { qty: 3, percent: 15 } },
    notes: 'Bright, uplifting citrus with clean burn.',
  },
  {
    id: 'g1',
    name: 'Velvet Kush (Gram)',
    type: 'Gram',
    strain: 'Hybrid',
    thc: 27,
    grams: 1,
    price: 14,
    offer: { label: 'Any 4 grams $48', type: 'mixnmatch', details: { qty: 4, bundlePrice: 48 } },
    notes: 'Silky smoke, balanced head + body.',
  },
  {
    id: 'g2',
    name: 'Pine Drift (Gram)',
    type: 'Gram',
    strain: 'Sativa',
    thc: 21,
    grams: 1,
    price: 13,
    offer: null,
    notes: 'Crisp pine, focused and airy.',
  },
  {
    id: 'g3',
    name: 'Obsidian OG (Gram)',
    type: 'Gram',
    strain: 'Indica',
    thc: 25,
    grams: 1,
    price: 15,
    offer: { label: '3 for $40', type: 'bundle', details: { qty: 3, bundlePrice: 40 } },
    notes: 'Earthy depth, slow melt relaxation.',
  },
];

function App() {
  const [cart, setCart] = useState([]); // {id, qty}
  const [isCartOpen, setCartOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const products = BASE_PRODUCTS;

  const cartDetailed = useMemo(() => {
    return cart.map((c) => {
      const p = products.find((x) => x.id === c.id);
      return { ...p, qty: c.qty };
    });
  }, [cart, products]);

  const subtotal = useMemo(() => {
    return cartDetailed.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cartDetailed]);

  // Apply simple offer logic for bundle and percentage deals
  const discount = useMemo(() => {
    let totalDiscount = 0;
    const itemMap = Object.fromEntries(cart.map((i) => [i.id, i.qty]));

    // Evaluate per-product offers
    for (const item of cartDetailed) {
      if (!item.offer) continue;
      const { type, details } = item.offer;
      if (type === 'bundle') {
        const setCount = Math.floor(item.qty / details.qty);
        const regularPrice = item.price * details.qty * setCount;
        const bundlePrice = details.bundlePrice * setCount;
        totalDiscount += Math.max(0, regularPrice - bundlePrice);
      }
      if (type === 'percentage') {
        if (item.qty >= details.qty) {
          totalDiscount += (item.price * item.qty * details.percent) / 100;
        }
      }
    }

    // Mix and match grams: any grams count toward the bundle
    const grams = cartDetailed.filter((i) => i.type === 'Gram');
    const mm = grams.find((g) => g.offer && g.offer.type === 'mixnmatch');
    if (mm) {
      const targetQty = mm.offer.details.qty;
      const bundlePrice = mm.offer.details.bundlePrice;
      const totalGramQty = grams.reduce((acc, g) => acc + g.qty, 0);
      const setCount = Math.floor(totalGramQty / targetQty);
      if (setCount > 0) {
        // Determine top-N grams by price for discount calc (worst-case discount)
        const gramUnitPrices = grams.flatMap((g) => Array.from({ length: g.qty }, () => g.price)).sort((a, b) => b - a);
        const groups = Array.from({ length: setCount }, (_, idx) => gramUnitPrices.slice(idx * targetQty, (idx + 1) * targetQty));
        for (const group of groups) {
          const regular = group.reduce((s, v) => s + v, 0);
          totalDiscount += Math.max(0, regular - bundlePrice);
        }
      }
    }

    return Math.round(totalDiscount * 100) / 100;
  }, [cart, cartDetailed]);

  const total = useMemo(() => Math.max(0, subtotal - discount), [subtotal, discount]);

  const addToCart = (id) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === id);
      if (exists) return prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { id, qty: 1 }];
    });
    setCartOpen(true);
  };

  const changeQty = (id, qty) => {
    setCart((prev) => prev
      .map((p) => (p.id === id ? { ...p, qty: Math.max(0, qty) } : p))
      .filter((p) => p.qty > 0)
    );
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));

  const handleCheckout = () => setModalOpen(true);
  const handleOrderPlaced = () => {
    setModalOpen(false);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-emerald-400/20 selection:text-emerald-200">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 via-emerald-700/5 to-transparent pointer-events-none" />

      <Header onOpenCart={() => setCartOpen(true)} cartCount={cart.reduce((s, i) => s + i.qty, 0)} />

      <main className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Catalog products={products} onAdd={addToCart} />
      </main>

      <CartDrawer
        open={isCartOpen}
        onClose={() => setCartOpen(false)}
        items={cartDetailed}
        subtotal={subtotal}
        discount={discount}
        total={total}
        onQtyChange={changeQty}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      <PreorderModal open={isModalOpen} onClose={() => setModalOpen(false)} total={total} onPlaced={handleOrderPlaced} />

      <footer className="mt-24 border-t border-white/5 py-10 text-center text-sm text-neutral-400">
        Crafted for the connoisseur. Pre-order only. Consume responsibly.
      </footer>
    </div>
  );
}

export default App;
