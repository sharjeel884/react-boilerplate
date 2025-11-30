import { useState, useEffect } from "react";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { FiSearch } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface DebounceSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
  onSearchChange?: (value: string) => void;
}

export const DebounceSearch = ({
  value,
  onChange,
  placeholder = "Search...",
  debounceMs = 500,
  className,
  onSearchChange,
}: DebounceSearchProps) => {
  const [searchValue, setSearchValue] = useState(value);

  useEffect(() => {
    if (value !== searchValue) {
      setSearchValue(value);
    }
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== value) {
        onChange(searchValue);
        onSearchChange?.(searchValue);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchValue, debounceMs, onChange, onSearchChange, value]);

  return (
    <InputWithIcon
      type="text"
      placeholder={placeholder}
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      icon={<FiSearch className="h-5 w-5" />}
      className={cn(className)}
    />
  );
};

