export function Card({ children, className = "", as = "div", ...rest }) {
  const Tag = as;
  return (
    <Tag className={`card ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
