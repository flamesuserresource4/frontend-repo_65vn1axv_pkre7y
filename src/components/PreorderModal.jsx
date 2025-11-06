import { X, Mail, CalendarClock } from 'lucide-react';
import { useState } from 'react';

function PreorderModal({ open, onClose, total, onPlaced }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState('');

  const canSubmit = name.trim() && contact.trim() && date;

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      {/* Dialog */}
      <div
        className={`absolute left-1/2 top-1/2 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-neutral-950/95 p-6 backdrop-blur transition-all ${open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-neutral-100">Confirm Pre-order</h3>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-white/5">
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-2 text-sm text-neutral-400">Share your details and preferred pickup/delivery time. We'll confirm by message.</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!canSubmit) return;
            onPlaced();
          }}
          className="mt-4 space-y-4"
        >
          <div>
            <label className="mb-1 block text-xs text-neutral-400">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-emerald-400/30"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-neutral-400">Contact (phone or email)</label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
                <Mail className="h-4 w-4" />
              </span>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 py-2 text-sm outline-none focus:border-emerald-400/30"
                placeholder="you@contact"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs text-neutral-400">Preferred time</label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
                <CalendarClock className="h-4 w-4" />
              </span>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 py-2 text-sm outline-none focus:border-emerald-400/30"
              />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <span className="text-sm text-neutral-400">Estimated total</span>
            <span className="text-base font-semibold text-neutral-100">${total.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300 hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Place Pre-order
          </button>
        </form>
      </div>
    </div>
  );
}

export default PreorderModal;
