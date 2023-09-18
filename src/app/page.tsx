import "./globals.css";
import MainLayout from "@/layouts/MainLayout";

export default function Home() {
  return (
    <MainLayout title={"home"} description={"home description"} pageRoute="/">
      <div className="h-screen w-full bg-center bg-cover bg-no-repeat bg-bondscape-home-bg" />
    </MainLayout>
  );
}
