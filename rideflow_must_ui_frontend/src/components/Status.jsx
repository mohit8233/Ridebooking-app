export default function Status({ children }) {
  const value = String(children || "pending").toLowerCase();
  return <span className={`status ${value}`}>{children || "pending"}</span>;
}
