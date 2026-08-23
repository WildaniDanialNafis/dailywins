import { Loader2 } from "lucide-react";

type ButtonContentProps = {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
};

export function ButtonContent({
  loading = false,
  loadingText = "Memproses...",
  children,
}: ButtonContentProps) {
  if (!loading) {
    return <>{children}</>;
  }

  return (
    <>
      <Loader2
        aria-hidden="true"
        className="h-4 w-4 shrink-0 animate-spin text-current"
      />

      <span>{loadingText}</span>
    </>
  );
}
