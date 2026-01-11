export default function Button({
    as: As,
    variant = "primary",
    className = "",
    children,
    ...props
}) {
    const Comp = As || "button";

    const base =
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-extrabold transition focus:outline-none focus:ring-2 focus:ring-festival-accent/40";

    const variants = {
        primary: "bg-festival-accent text-black hover:brightness-110",
        secondary:
            "border border-white/10 bg-festival-panel text-zinc-200 hover:bg-festival-card",
        ghost: "text-zinc-200 hover:text-white hover:bg-white/5",
    };

    return (
        <Comp
            className={`${base} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </Comp>
    );
}
