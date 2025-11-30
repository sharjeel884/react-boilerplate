import type { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export const H1 = ({ children, className = "" }: TypographyProps) => <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 ${className}`}>{children}</h1>;

export const H2 = ({ children, className = "" }: TypographyProps) => <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 ${className}`}>{children}</h2>;

export const H3 = ({ children, className = "" }: TypographyProps) => <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 ${className}`}>{children}</h3>;

export const H4 = ({ children, className = "" }: TypographyProps) => <h4 className={`text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 ${className}`}>{children}</h4>;

export const H5 = ({ children, className = "" }: TypographyProps) => <h5 className={`text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 ${className}`}>{children}</h5>;

export const H6 = ({ children, className = "" }: TypographyProps) => <h6 className={`text-base sm:text-lg lg:text-xl font-semibold text-gray-900 ${className}`}>{children}</h6>;

export const P = ({ children, className = "" }: TypographyProps) => <p className={`text-base text-gray-700 ${className}`}>{children}</p>;

export const Text = ({ children, className = "" }: TypographyProps) => <span className={`text-base text-gray-700 ${className}`}>{children}</span>;

export const Small = ({ children, className = "" }: TypographyProps) => <small className={`text-sm text-gray-600 ${className}`}>{children}</small>;
