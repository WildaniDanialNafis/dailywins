type WhatsAppStatusPillProps = {
  connected: boolean;
  label?: string;
};

export function WhatsAppStatusPill({
  connected,
  label,
}: WhatsAppStatusPillProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-semibold",
        connected
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-500",
      ].join(" ")}
    >
      <span
        className={[
          "h-1.5 w-1.5 rounded-full",
          connected ? "bg-emerald-500" : "bg-slate-400",
        ].join(" ")}
      />

      {label ?? (connected ? "Connected" : "Not connected")}
    </span>
  );
}
