export default function Input({ label, hint, className = "", ...props }) {
    return (
        <label className="block">
            {label ? (
                <div className="mb-1 text-xs font-semibold tracking-wider text-zinc-300">
                    {label}
                </div>
            ) : null}
            <input
                className={`w-full rounded-lg border border-white/10 bg-festival-panel px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-festival-accent/60 focus:outline-none focus:ring-2 focus:ring-festival-accent/20 ${className}`}
                {...props}
            />
            {hint ? (
                <div className="mt-1 text-xs text-zinc-500">{hint}</div>
            ) : null}
        </label>
    );
}
