import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
  className: string;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({
  href,
  children,
  className,
}) => {
  const pathname = usePathname();
  return (
    <Link
      className={`${
        pathname === href
          ? "text-red-600 underline bg-muted-foreground"
          : "no-underline font-normal"
      } hover:text-red-300 hover:bg-muted ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
