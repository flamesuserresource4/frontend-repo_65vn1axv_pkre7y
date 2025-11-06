import { X, Minus, Plus, Trash2 } from 'lucide-react';

function Line({ children }) {
  return <div className="my-4 h-px w-full bg-white/5" />;
}

function CartDrawer({ open, onClose, items, subtotal, discount, total, onQtyChange, onRemove, onCheckout }) {
  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] transform bg-neutral-950/95 backdrop-blur border-l border-white/10 p-6 transition-all duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-neutral-100">Your Pre-order</h3>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-white/5">
            <X className="h-5 w-5" />
          </button>
        </div>

        <Line />

        <div className="space-y-4 overflow-y-auto pr-2" style={{ maxHeight: '55vh' }}>
          {items.length === 0 ? (
            <p className="text-sm text-neutral-500">Your bag is empty. Add joints or grams to start.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="rounded-xl border border-white/10 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium text-neutral-100">{item.name}</div>
                    <div className="text-xs text-neutral-500">{item.strain} • {item.type} • {item.grams}g</div>
                    {item.offer && (
                      <div className="mt-1 text-[10px] uppercase tracking-wide text-emerald-300">{item.offer.label}</div>
                    )}
                  </div>
                  <div className="text-neutral-200 font-semibold">${item.price}</div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5">
                    <button
                      className="p-2 hover:bg-white/10"
                      onClick={() => onQtyChange(item.id, Math.max(1, item.qty - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-3 text-sm">{item.qty}</span>
                    <button className="p-2 hover:bg-white/10" onClick={() => onQtyChange(item.id, item.qty + 1)}>
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    className="inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm text-red-300 hover:bg-red-500/20"
                    onClick={() => onRemove(item.id)}
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <Line />

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between text-neutral-400">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-emerald-300">
            <span>Offers</span>
            <span>- ${discount.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-neutral-200 font-semibold text-base pt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          disabled={items.length === 0}
          onClick={onCheckout}
          className="mt-6 w-full rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300 hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Proceed to Pre-order
        </button>

        <p className="mt-3 text-[11px] text-neutral-500">Pre-orders are confirmed via message. Age 21+ only.</p>
      </aside>
    </div>
  );
}

export default CartDrawer;
