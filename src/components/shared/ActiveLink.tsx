import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  return (
    <Link
      className={`${
        pathname === href ? "underline font-bold" : "no-underline font-normal"
      }`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
