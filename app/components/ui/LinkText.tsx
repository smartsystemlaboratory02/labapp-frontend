import React from "react";
import { Link } from "react-router";
import type { ChildrenProps } from "~/types";

const LinkText: React.FC<
  ChildrenProps & { to: string; className?: string }
> = ({ children, to, className }) => {
  return (
    <Link
      to={to}
      className={`ml-1 underline hover:text-primary text-muted-foreground cursor-pointer ${className}`}
    >
      {children}
    </Link>
  );
};

export default LinkText;
