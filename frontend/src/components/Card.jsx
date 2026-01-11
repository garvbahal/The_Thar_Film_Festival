export default function Card({ title, action, children, className = "" }) {
    return (
        <section
            className={`rounded-2xl border border-white/10 bg-festival-card p-5 shadow-glow ${className}`}
        >
            {title ? (
                <div className="mb-4 flex items-center justify-between gap-3">
                    <h2 className="text-sm font-extrabold tracking-widest text-festival-accent">
                        {title}
                    </h2>
                    {action ? <div>{action}</div> : null}
                </div>
            ) : null}
            {children}
        </section>
    );
}
