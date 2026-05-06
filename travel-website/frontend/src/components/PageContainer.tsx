import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  return (
    <div className={`max-w-7xl mx-auto px-4 pt-16 pb-8 ${className}`}>
      {children}
    </div>
  );
}
