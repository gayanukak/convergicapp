import "@/app/globals.css";
import Providers from "../components/Providers";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Convergic",
  description: "Collect. Share. Converge Ideas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>
          {/* You can add a persistent header/nav here if you want */}
          {children}
          {/* footer could go here, or inside Provider as a client component */}
        </Providers>
      </body>
    </html>
  );
}