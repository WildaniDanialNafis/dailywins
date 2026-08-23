export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={["animate-pulse rounded-xl bg-slate-200/80", className].join(
        " ",
      )}
    />
  );
}

export function PageSkeleton() {
  return (
    <main aria-label="Memuat halaman" className="min-h-svh">
      <div className="mx-auto w-full max-w-[1480px] px-4 py-5 sm:px-6 sm:py-7 xl:px-8">
        <div aria-hidden="true" className="space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-6 w-28" />

            <Skeleton className="h-9 w-52" />

            <Skeleton className="h-4 w-full max-w-2xl" />
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Skeleton className="h-28 rounded-2xl" />
            <Skeleton className="h-28 rounded-2xl" />
            <Skeleton className="h-28 rounded-2xl" />
            <Skeleton className="h-28 rounded-2xl" />
          </div>

          <Skeleton className="h-24 rounded-2xl" />

          <div className="space-y-3">
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-24 rounded-2xl" />
          </div>
        </div>

        <p className="sr-only">Memuat halaman...</p>
      </div>
    </main>
  );
}
