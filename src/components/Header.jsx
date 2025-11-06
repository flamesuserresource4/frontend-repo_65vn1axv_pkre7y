import { ShoppingBag, Leaf } from 'lucide-react';

function Header({ onOpenCart, cartCount }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60 bg-neutral-950/80 border-b border-white/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-emerald-500/15 border border-emerald-400/20 grid place-items-center">
            <Leaf className="h-4 w-4 text-emerald-300" />
          </div>
          <span className="font-semibold tracking-tight text-neutral-100">Nocturne</span>
          <span className="text-xs text-neutral-500 ml-2">Curated Joints & Grams</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-emerald-500/20 px-1 text-emerald-300 text-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
