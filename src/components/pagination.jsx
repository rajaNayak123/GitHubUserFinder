"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export function Pagination({ currentPage, totalPages, onPageChange }) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis if needed before range
    if (rangeStart > 2) {
      pages.push(-1); // -1 represents ellipsis
    }

    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    // Add ellipsis if needed after range
    if (rangeEnd < totalPages - 1) {
      pages.push(-2); // -2 represents ellipsis
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-1">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="hover:bg-muted/80 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pageNumbers.map((page, index) => {
        if (page < 0) {
          // Render ellipsis
          return (
            <Button
              key={`ellipsis-${index}`}
              variant="ghost"
              size="icon"
              disabled
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          );
        }

        return (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(page)}
            className={`transition-all duration-200 ${
              currentPage === page ? "scale-110" : "hover:bg-muted/80"
            }`}
          >
            {page}
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="hover:bg-muted/80 transition-colors"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
