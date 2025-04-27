"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  BarChart3, 
  Book, 
  Calendar, 
  ClipboardCheck, 
  Home, 
  User, 
  Users,
  LogOut
} from "lucide-react";

interface TeacherSidebarProps {
  activePage: string;
}

export default function TeacherSidebar({ activePage }: TeacherSidebarProps) {
  const router = useRouter();
  
  const navItems = [
    { name: "dashboard", icon: Home, href: "/teacher/dashboard", label: "Dashboard" },
    { name: "attendance", icon: ClipboardCheck, href: "/teacher/attendance", label: "Attendance" },
    { name: "subjects", icon: Book, href: "/teacher/subjects", label: "Subjects" },
    { name: "timetable", icon: Calendar, href: "/teacher/timetable", label: "Timetable" },
    { name: "students", icon: Users, href: "/teacher/students", label: "Students" },
    { name: "profile", icon: User, href: "/teacher/profile", label: "Profile" },
  ];
  
  const handleLogout = () => {
    router.push("/");
  };
  
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-20 flex flex-col items-center border-r border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
      <div className="p-4 mt-2">
        <Link href="/teacher/dashboard">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xl">
            P
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 flex flex-col items-center gap-2 px-3 py-8">
        {navItems.map((item) => (
          <Link 
            key={item.name}
            href={item.href}
            className={`w-12 h-12 flex items-center justify-center rounded-xl transition-colors ${
              activePage === item.name 
                ? 'bg-purple-600 text-white' 
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
            aria-label={item.label}
            title={item.label}
          >
            <item.icon className="h-6 w-6" />
          </Link>
        ))}
      </nav>
      
      <div className="mb-8">
        <button
          className="w-12 h-12 flex items-center justify-center rounded-xl transition-colors text-red-400 hover:bg-red-950/30 hover:text-red-300"
          onClick={handleLogout}
          aria-label="Logout"
          title="Logout"
        >
          <LogOut className="h-6 w-6" />
        </button>
      </div>
    </aside>
  );
} 