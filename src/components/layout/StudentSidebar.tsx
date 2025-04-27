"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Book, 
  Calendar, 
  Home, 
  User, 
  Clock,
  GraduationCap,
  LogOut
} from "lucide-react";

type SidebarProps = {
  activePage: "dashboard" | "attendance" | "subjects" | "timetable" | "profile";
};

export default function StudentSidebar({ activePage }: SidebarProps) {
  const router = useRouter();
  
  const handleLogout = () => {
    // In a real application, this would handle user session cleanup
    // For now, just redirect to login page
    router.push("/");
  };
  
  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-zinc-900 border-r border-zinc-800 flex flex-col items-center py-8 z-10">
      <div className="mb-10">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
          <GraduationCap className="h-6 w-6 text-white" />
        </div>
      </div>
      
      <nav className="flex flex-col items-center space-y-8">
        <Link 
          href="/student/dashboard" 
          className={`group relative p-3 rounded-xl ${
            activePage === "dashboard" 
              ? "bg-zinc-800 text-purple-500" 
              : "hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          }`}
          aria-label="Dashboard"
        >
          <Home className="h-6 w-6" />
          <span className="absolute left-16 bg-zinc-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Dashboard
          </span>
        </Link>
        <Link 
          href="/student/attendance" 
          className={`group relative p-3 rounded-xl ${
            activePage === "attendance" 
              ? "bg-zinc-800 text-purple-500" 
              : "hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          }`}
          aria-label="Attendance"
        >
          <Calendar className="h-6 w-6" />
          <span className="absolute left-16 bg-zinc-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Attendance
          </span>
        </Link>
        <Link 
          href="/student/subjects" 
          className={`group relative p-3 rounded-xl ${
            activePage === "subjects" 
              ? "bg-zinc-800 text-purple-500" 
              : "hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          }`}
          aria-label="Subjects"
        >
          <Book className="h-6 w-6" />
          <span className="absolute left-16 bg-zinc-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Subjects
          </span>
        </Link>
        <Link 
          href="/student/timetable" 
          className={`group relative p-3 rounded-xl ${
            activePage === "timetable" 
              ? "bg-zinc-800 text-purple-500" 
              : "hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          }`}
          aria-label="Timetable"
        >
          <Clock className="h-6 w-6" />
          <span className="absolute left-16 bg-zinc-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Timetable
          </span>
        </Link>
      </nav>
      
      <div className="mt-auto flex flex-col items-center space-y-4">
        <Link 
          href="/student/profile" 
          className={`group relative p-3 rounded-xl ${
            activePage === "profile" 
              ? "bg-zinc-800 text-purple-500" 
              : "hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          }`}
          aria-label="Profile"
        >
          <User className="h-6 w-6" />
          <span className="absolute left-16 bg-zinc-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Profile
          </span>
        </Link>
        
        <button 
          onClick={handleLogout}
          className="group relative p-3 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors"
          aria-label="Logout"
        >
          <LogOut className="h-6 w-6" />
          <span className="absolute left-16 bg-zinc-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
} 