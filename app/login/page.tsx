import { Suspense } from "react";

import { PageSkeleton } from "@/components/ui/skeleton";
import { LoginPage } from "@/features/auth";

export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <LoginPage />
    </Suspense>
  );
}
