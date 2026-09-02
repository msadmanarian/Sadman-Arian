import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CursorProvider } from "@/components/Cursor/CustomCursor";

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "M. Sakib Sadman Arian — Creative Developer & Software Engineer",
  description:
    "Personal portfolio of M. Sakib Sadman Arian. Specializing in interactive WebGL graphics, machine learning systems, and high-performance digital products.",
  keywords: [
    "M. Sakib Sadman Arian",
    "Creative Developer",
    "Software Engineer",
    "WebGL",
    "GLSL Shaders",
    "Machine Learning",
    "React",
    "Next.js",
    "Three.js",
  ],
  authors: [{ name: "M. Sakib Sadman Arian" }],
  openGraph: {
    title: "M. Sakib Sadman Arian — Creative Developer",
    description:
      "Interactive personal portfolio featuring WebGL liquid reveal shaders, ML architectures, and high-performance web systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "M. Sakib Sadman Arian — Creative Developer",
    description:
      "Interactive personal portfolio featuring WebGL liquid reveal shaders and ML architectures.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased selection:bg-white selection:text-black">
        <CursorProvider>
          <div className="noise-overlay" aria-hidden="true" />
          {children}
        </CursorProvider>
      </body>
    </html>
  );
}
