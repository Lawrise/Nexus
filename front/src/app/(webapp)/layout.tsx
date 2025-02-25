import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import "@/style/globals.css";
import { AuthProvider } from "@/context/authContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen">
      <body className="h-screen w-screen dark:bg-zinc-900 dark:text-white">
        <SidebarProvider className="h-full">
          <AuthProvider>
            <AppSidebar />
            <main className="w-full h-full dark:bg-[#191919] dark:text-white relative">
              {children}
            </main>
            <div id="modal-root"></div>
          </AuthProvider>
        </SidebarProvider>
        {/* {children} */}
      </body>
    </html>
  );
}
