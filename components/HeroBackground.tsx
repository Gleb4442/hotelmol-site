export default function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
      <div className="hero-spotlight" />
      <div className="hero-sheen" />
      <div className="hero-grain" />
    </div>
  );
}
