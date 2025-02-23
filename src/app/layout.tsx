import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen">
      <body className="h-screen w-screen dark:bg-dark_background_primary dark:text-white">
        <SidebarProvider className="h-full">
          <AppSidebar/>
          <main className="w-full h-full dark:bg-dark_background_primary dark:text-white">{children}</main>
          <div id="modal-root"></div>
        </SidebarProvider>
        {/* {children} */}
      </body>
    </html>
  );
}
