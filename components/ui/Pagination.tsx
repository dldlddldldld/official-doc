import { Button } from "@/components/ui/button";

interface Props {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onChange }: Props) {
  return (
    <div className="flex gap-2 justify-center py-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          onClick={() => onChange(page)}
        >
          {page}
        </Button>
      ))}
    </div>
  );
}