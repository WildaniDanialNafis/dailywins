export const APP_NAME = "DailyWins";

export const initialReports = [
  {
    id: 1,
    title: "Evaluasi Harian",
    type: "Evaluasi",
    status: "Terkirim",
    target: "LittleWins Team",
    date: "22 Agu 2026",
    time: "08:00",
    count: "4 kegiatan",
  },
  {
    id: 2,
    title: "Ibadah Wajib Hari Ini",
    type: "Polling",
    status: "Terkirim",
    target: "LittleWins Team",
    date: "22 Agu 2026",
    time: "07:30",
    count: "3 opsi",
  },
  {
    id: 3,
    title: "Daily Progress",
    type: "Schedule",
    status: "Terjadwal",
    target: "Daily Progress",
    date: "22 Agu 2026",
    time: "13:00",
    count: "6 aktivitas",
  },
  {
    id: 4,
    title: "Weekly Reflection",
    type: "Polling",
    status: "Draft",
    target: "Belum dipilih",
    date: "21 Agu 2026",
    time: "16:00",
    count: "4 opsi",
  },
  {
    id: 5,
    title: "Weekly Review",
    type: "Schedule",
    status: "Terkirim",
    target: "Productivity Circle",
    date: "21 Agu 2026",
    time: "17:00",
    count: "5 aktivitas",
  },
] as const;

export const PAGE_SIZE = 5;
