import { ChevronLeft, ChevronRight } from "lucide-react";

export function DisplayDate() {
  return (
    <div className="text-primary-1 flex items-center justify-center gap-8 text-2xl font-semibold">
      <ChevronLeft size={32} />
      <div className="flex gap-5">
        <h3 className="">Today - 21/03/2025</h3>
      </div>
      <ChevronRight size={32} />
    </div>
  );
}
