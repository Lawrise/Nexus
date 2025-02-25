import "@/style/globals.css";
import { AuthProvider } from "@/context/authContext";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen">
      <body className="h-screen w-screen dark:bg-zinc-900 dark:text-white">
        <AuthProvider>
          <main className="w-full h-full dark:bg-[#191919] dark:text-white relative">
            {children}
          </main>
          <div id="modal-root"></div>
        </AuthProvider>
        {/* {children} */}
      </body>
    </html>
  );
}
