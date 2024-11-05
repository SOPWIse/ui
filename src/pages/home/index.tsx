import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {}, []);

  return (
    <section className="mt-24">
      <SidebarProvider className="relative z-20">
        <AppSidebar />
      </SidebarProvider>
    </section>
  );
};

export default Home;
