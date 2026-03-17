import { cn } from "@/lib/utils";

interface SkeletonShimmerProps {
  className?: string;
  variant?: "card" | "text" | "circle" | "rect";
  width?: string | number;
  height?: string | number;
}

export function SkeletonShimmer({
  className,
  variant = "rect",
  width,
  height,
}: SkeletonShimmerProps) {
  const variants = {
    card: "rounded-2xl w-full h-64",
    text: "rounded-md h-4 w-3/4",
    circle: "rounded-full w-12 h-12",
    rect: "rounded-xl",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]",
        variants[variant],
        className
      )}
      style={{
        width,
        height,
        animation: "shimmer 1.5s ease-in-out infinite",
      }}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100">
      <SkeletonShimmer variant="rect" className="w-full h-48" />
      <div className="p-4 space-y-3">
        <SkeletonShimmer variant="text" className="w-1/3 h-3" />
        <SkeletonShimmer variant="text" className="w-full h-4" />
        <SkeletonShimmer variant="text" className="w-1/2 h-3" />
        <SkeletonShimmer variant="text" className="w-2/5 h-6 mt-2" />
        <SkeletonShimmer variant="rect" className="w-full h-10 mt-3 rounded-xl" />
      </div>
    </div>
  );
}
