import { Loader2 } from "lucide-react";

type LoadingSpinnerProps = {
  size?: "sm" | "md";
  className?: string;
};

export function LoadingSpinner({
  size = "sm",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <Loader2
      aria-hidden="true"
      className={[
        "shrink-0 animate-spin text-current",
        size === "sm" ? "h-4 w-4" : "h-5 w-5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
