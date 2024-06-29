"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

const Header = ({
  title,
  filterBy,
  sortItems,
  loading,
  serFilterBy,
}: {
  title: string;
  filterBy: string;
  sortItems: string[];
  loading: boolean;
  serFilterBy: (value: string) => void;
}) => {
  return (
    <header className="bg-background border-b border-border shadow-sm p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">{title}</h1>
      {loading ? (
        <Skeleton className="w-24 h-8 rounded-md" />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowUpDownIcon className="w-4 h-4" />
              Filter by: {filterBy}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]" align="end">
            <DropdownMenuRadioGroup value={filterBy} onValueChange={serFilterBy}>
              {sortItems.map((item: string) => (
                <DropdownMenuRadioItem
                  key={item.toLowerCase()}
                  value={item}
                >
                  {item}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
};

export default Header;
