import type { Metadata, Viewport } from "next";

import { AuthProvider } from "@/components/auth/auth-context";

import "./globals.css";

const APP_NAME = "DailyWins";
const APP_DESCRIPTION =
  "DailyWins workspace untuk mengelola evaluasi, polling, schedule, daily schedule, dan distribusi WhatsApp.";

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s · ${APP_NAME}`,
  },

  description: APP_DESCRIPTION,

  applicationName: APP_NAME,

  keywords: [
    "DailyWins",
    "operations",
    "evaluation",
    "schedule",
    "daily schedule",
    "polling",
    "WhatsApp",
    "workspace",
    "productivity",
  ],

  authors: [
    {
      name: APP_NAME,
    },
  ],

  creator: APP_NAME,

  publisher: APP_NAME,

  generator: "Next.js",

  metadataBase: new URL("http://localhost:3000"),

  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
    ],
  },

  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",

  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#f8fafc",
    },
  ],

  colorScheme: "light",

  // Prevent accidental zoom jumps while preserving the application's
  // controlled responsive layout across mobile and tablet devices.
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-svh bg-slate-50 text-slate-950 antialiased selection:bg-indigo-100 selection:text-indigo-950">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
