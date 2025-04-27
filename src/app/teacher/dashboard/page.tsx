"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Bell,
  Book,
  BookOpen,
  Calendar,
  CheckCircle,
  Clipboard,
  ClipboardCheck,
  Clock,
  LogOut,
  User,
  Users
} from "lucide-react";
import TeacherSidebar from "@/components/layout/TeacherSidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function TeacherDashboard() {
  const router = useRouter();
  
  // Mock teacher data
  const teacherData = {
    name: "Dr. Robert Anderson",
    id: "T001",
    department: "Computer Science",
    assignedSubjects: [
      {
        id: "CS101",
        name: "Introduction to Programming",
        class: "C001 (2023-2024)",
      },
      {
        id: "CS201",
        name: "Data Structures",
        class: "C001 (2023-2024)",
      }
    ],
    unreadMessages: 0,
    attendanceProgress: {
      marked: 3,
      total: 60,
      percentage: 5,
      studentCoverage: 60
    },
    recentSessions: [
      {
        subjectName: "Introduction to Programming",
        date: "2025-04-24",
        present: 3,
        total: 5,
        percentage: 60
      },
      {
        subjectName: "Introduction to Programming",
        date: "2025-04-23",
        present: 4,
        total: 5,
        percentage: 80
      },
      {
        subjectName: "Data Structures",
        date: "2025-04-23",
        present: 4,
        total: 5,
        percentage: 80
      }
    ]
  };

  // Logout function
  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Side Navigation */}
      <TeacherSidebar activePage="dashboard" />

      {/* Main Content */}
      <div className="pl-20">
        {/* Top Bar */}
        <header className="h-20 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md flex items-center justify-between px-8">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">PRΞSNCΞ</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-zinc-800 text-zinc-300 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-white">
                RA
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{teacherData.name}</p>
                <p className="text-xs text-zinc-400">{teacherData.id}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Teacher Dashboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Teacher Profile */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6">Teacher Profile</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Name:</span>
                  <span className="font-medium">{teacherData.name}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Teacher ID:</span>
                  <span className="font-medium">{teacherData.id}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Department:</span>
                  <span className="font-medium">{teacherData.department}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Assigned Subjects:</span>
                  <span className="font-medium">{teacherData.assignedSubjects.length}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Unread Messages:</span>
                  <span className="font-medium">{teacherData.unreadMessages}</span>
                </div>
              </div>
            </div>
            
            {/* Attendance Overview */}
            <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center mb-6">
                <Calendar className="h-5 w-5 mr-2 text-purple-500" />
                <h2 className="text-xl font-bold">Attendance Overview</h2>
              </div>
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-zinc-400">Attendance Marking Progress</span>
                  <span className="font-medium">{teacherData.attendanceProgress.percentage}%</span>
                </div>
                
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-600" 
                    style={{ width: `${teacherData.attendanceProgress.percentage}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-zinc-500">0%</span>
                  <span className="text-xs text-zinc-500">25%</span>
                  <span className="text-xs text-zinc-500">50%</span>
                  <span className="text-xs text-zinc-500">75%</span>
                  <span className="text-xs text-zinc-500">100%</span>
                </div>
                
                <p className="text-zinc-400 text-sm mt-2">
                  {teacherData.attendanceProgress.marked} of {teacherData.attendanceProgress.total} sessions marked
                </p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-zinc-400">Student Coverage:</span>
                  <span className="font-medium">{teacherData.attendanceProgress.studentCoverage} students</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                href="/teacher/attendance/mark"
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col items-center hover:bg-zinc-800 transition-colors"
              >
                <ClipboardCheck className="h-8 w-8 mb-4 text-purple-500" />
                <h3 className="font-bold">Mark Attendance</h3>
              </Link>
              
              <Link 
                href="/teacher/subjects"
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col items-center hover:bg-zinc-800 transition-colors"
              >
                <Book className="h-8 w-8 mb-4 text-purple-500" />
                <h3 className="font-bold">My Subjects</h3>
              </Link>
              
              <Link 
                href="/teacher/timetable"
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col items-center hover:bg-zinc-800 transition-colors"
              >
                <Calendar className="h-8 w-8 mb-4 text-purple-500" />
                <h3 className="font-bold">View Timetable</h3>
              </Link>
            </div>
          </div>
          
          {/* Assigned Subjects */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Book className="h-5 w-5 mr-2 text-purple-500" />
              <h2 className="text-xl font-bold">Assigned Subjects</h2>
            </div>
            <p className="text-zinc-400 text-sm mb-6">Click on a subject to mark attendance</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teacherData.assignedSubjects.map((subject, index) => (
                <Link 
                  key={index}
                  href={`/teacher/attendance/mark/${subject.id}`}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex justify-between mb-2">
                    <h3 className="font-bold text-lg">{subject.name}</h3>
                    <span className="bg-purple-900/30 text-purple-400 px-2 py-1 rounded text-xs">
                      {subject.id}
                    </span>
                  </div>
                  <div className="text-zinc-400">
                    Class: {subject.class}
                  </div>
                  <div className="mt-4 flex items-center text-sm text-purple-400">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Click to mark attendance</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Recent Attendance Sessions */}
          <div>
            <div className="flex items-center mb-6">
              <Clock className="h-5 w-5 mr-2 text-purple-500" />
              <h2 className="text-xl font-bold">Recent Attendance Sessions</h2>
            </div>
            
            <div className="space-y-4">
              {teacherData.recentSessions.map((session, index) => (
                <div 
                  key={index}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:bg-zinc-800/70 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="font-bold">{session.subjectName}</h3>
                      <p className="text-zinc-400 text-sm">{session.date}</p>
                    </div>
                    
                    <div className="flex items-center mt-2 md:mt-0">
                      <div className="flex items-center mr-4">
                        <span className="text-sm font-medium mr-2">
                          {session.present}/{session.total} present
                        </span>
                        <span className="text-xs bg-green-900/20 text-green-400 py-1 px-2 rounded">
                          {session.percentage}% attendance
                        </span>
                      </div>
                      
                      <Button variant="outline" size="sm" className="text-xs">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 