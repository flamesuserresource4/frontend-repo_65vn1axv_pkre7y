import { Sparkles } from 'lucide-react';

function Tag({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-wider text-emerald-300">
      <Sparkles className="h-3 w-3" /> {children}
    </span>
  );
}

function ProductCard({ product, onAdd }) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-4 hover:border-emerald-400/20 transition">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-neutral-100">{product.name}</h3>
          <p className="mt-1 text-sm text-neutral-400">{product.strain} • {product.type} • {product.grams}g • {product.thc}% THC</p>
        </div>
        {product.offer && <Tag>{product.offer.label}</Tag>}
      </div>
      <p className="mt-3 text-sm text-neutral-300/90">{product.notes}</p>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-neutral-200">
          <span className="text-lg font-semibold">${product.price}</span>
          <span className="ml-1 text-sm text-neutral-500">/ unit</span>
        </div>
        <button
          onClick={() => onAdd(product.id)}
          className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300 hover:bg-emerald-500/20"
        >
          Add to pre-order
        </button>
      </div>
    </div>
  );
}

function Catalog({ products, onAdd }) {
  return (
    <section className="py-12">
      <div className="mb-10">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-100">Tonight's Catalog</h2>
        <p className="mt-2 text-neutral-400">Minimal, curated, and ready to pre-order. Offers apply automatically.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}

export default Catalog;
