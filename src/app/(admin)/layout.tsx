import  Sidebar  from "../../components/sidebar"
import Navbar from "@/components/navbar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col ">
        <Navbar />
        <main className="p-6 flex-1 bg-[#f8f6f2] " >{children}</main>
      </div>
    </div>
  )
}
