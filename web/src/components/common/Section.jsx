export function Section({ children, className = "", as = "section" }) {
  const Tag = as;
  return <Tag className={`section ${className}`}>{children}</Tag>;
}
