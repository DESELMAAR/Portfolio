export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900 ${className}`}>
      {children}
    </div>
  );
}
export function CardHeader({ children }) {
  return <div className="mb-2">{children}</div>;
}
export function CardTitle({ children }) {
  return <h3 className="font-bold text-lg">{children}</h3>;
}
export function CardContent({ children }) {
  return <div>{children}</div>;
}
