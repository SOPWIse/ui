import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SOPCreate from "./components/SOPCreate";
import { useEffect } from "react";


const Home = () => {
  useEffect(() => {}, []);

  return (
    <section className="mt-24">
      <SidebarProvider className="relative z-20">
        <AppSidebar />
        <SidebarInset>
        {<SOPCreate />}
        </SidebarInset>
        
      </SidebarProvider>
      
    </section>
  );
};

export default Home;
