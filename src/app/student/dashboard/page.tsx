"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  BarChart3, 
  Book, 
  Calendar, 
  FileText, 
  Home, 
  User, 
  Bell, 
  AlarmClock,
  Bookmark,
  ClipboardCheck,
  ChevronRight,
  Gauge,
  GraduationCap,
  Clock,
  Calendar as CalendarIcon,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import StudentSidebar from "@/components/layout/StudentSidebar";

export default function StudentDashboard() {
  const [darkMode, setDarkMode] = useState(true);
  
  // Mock student data - would come from API/backend in production
  const studentData = {
    name: "John Doe",
    rollNumber: "S001",
    registrationNumber: "REG20230001",
    session: "2023-2024",
    branch: "Computer Science",
    class: "CS01",
    attendance: {
      overall: 75,
      subjects: [
        { 
          name: "Introduction to Programming", 
          code: "CS101", 
          total: 2, 
          attended: 2, 
          percentage: 100,
          upcoming: { date: "Today, 10:00 AM", topic: "Arrays & Pointers" }
        },
        { 
          name: "Data Structures", 
          code: "CS201", 
          total: 1, 
          attended: 1, 
          percentage: 100,
          upcoming: { date: "Tomorrow, 2:00 PM", topic: "Linked Lists" } 
        },
        { 
          name: "Mathematics for Engineers", 
          code: "MA101", 
          total: 1, 
          attended: 0, 
          percentage: 0,
          upcoming: { date: "May 5, 9:00 AM", topic: "Differential Equations" }
        }
      ],
      recentActivity: [
        { date: "April 23, 2025", action: "Attended", subject: "CS101", time: "10:00 AM" },
        { date: "April 23, 2025", action: "Missed", subject: "MA101", time: "2:00 PM" },
        { date: "April 22, 2025", action: "Attended", subject: "CS101", time: "10:00 AM" },
        { date: "April 22, 2025", action: "Attended", subject: "CS201", time: "3:00 PM" }
      ]
    }
  };

  // Calculate total classes and attendance
  const totalClasses = studentData.attendance.subjects.reduce((acc, subject) => acc + subject.total, 0);
  const totalAttended = studentData.attendance.subjects.reduce((acc, subject) => acc + subject.attended, 0);
  
  // Next upcoming class
  const upcomingClasses = [...studentData.attendance.subjects].sort((a, b) => {
    if (a.upcoming.date.includes("Today")) return -1;
    if (b.upcoming.date.includes("Today")) return 1;
    if (a.upcoming.date.includes("Tomorrow")) return -1;
    if (b.upcoming.date.includes("Tomorrow")) return 1;
    return 0;
  });
  
  const nextClass = upcomingClasses[0];
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Side Navigation */}
      <StudentSidebar activePage="dashboard" />

      {/* Main Content */}
      <div className="pl-20">
        {/* Top Bar */}
        <header className="h-20 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md flex items-center justify-between px-8">
          <h1 className="text-xl font-bold">Student Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-zinc-800 text-zinc-300 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-white">
                {studentData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{studentData.name}</p>
                <p className="text-xs text-zinc-400">{studentData.rollNumber}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="px-8 py-8">
          {/* Welcome Section with Next Class */}
          <div className="mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-1">Welcome back, {studentData.name.split(' ')[0]}</h2>
                  <p className="text-zinc-400 mb-6">Here's an overview of your attendance and upcoming classes</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-zinc-800/50 rounded-xl p-5 border border-zinc-700/50">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-zinc-400 text-sm mb-1">Attendance Rate</p>
                          <p className="text-3xl font-bold">
                            {studentData.attendance.overall}%
                          </p>
                        </div>
                        <div className={`p-2.5 rounded-lg ${studentData.attendance.overall >= 75 ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                          <Gauge className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="mt-4 h-2 bg-zinc-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${studentData.attendance.overall >= 75 ? 'bg-green-500' : 'bg-yellow-500'}`}
                          style={{ width: `${studentData.attendance.overall}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="bg-zinc-800/50 rounded-xl p-5 border border-zinc-700/50">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-zinc-400 text-sm mb-1">Total Classes</p>
                          <p className="text-3xl font-bold">{totalClasses}</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                          <CalendarIcon className="h-6 w-6" />
                        </div>
                      </div>
                      <p className="mt-4 text-zinc-400 text-sm">
                        <span className="text-white">{totalAttended}</span> classes attended
                      </p>
                    </div>
                    
                    <div className="bg-zinc-800/50 rounded-xl p-5 border border-zinc-700/50">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-zinc-400 text-sm mb-1">Subjects</p>
                          <p className="text-3xl font-bold">{studentData.attendance.subjects.length}</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400">
                          <Bookmark className="h-6 w-6" />
                        </div>
                      </div>
                      <p className="mt-4 text-zinc-400 text-sm">
                        <span className="text-white">{studentData.attendance.subjects.filter(s => s.percentage >= 75).length}</span> with good attendance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-sm border border-indigo-800/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-purple-200 flex items-center">
                    <AlarmClock className="h-4 w-4 mr-2" />
                    Next Class
                  </h3>
                  <span className="text-xs bg-purple-500/20 text-purple-300 py-1 px-3 rounded-full">
                    {nextClass.upcoming.date}
                  </span>
                </div>
                
                <h4 className="text-xl font-bold mb-1">{nextClass.name}</h4>
                <p className="text-purple-300/70 text-sm mb-4">{nextClass.code} • {nextClass.upcoming.topic}</p>
                
                <div className="mt-auto">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-purple-300/70">Your attendance</span>
                    <span className="font-medium text-purple-200">{nextClass.percentage}%</span>
                  </div>
                  <div className="h-1.5 bg-purple-800/50 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full" 
                      style={{ width: `${nextClass.percentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white border-none"
                >
                  View Course Details
                </Button>
              </div>
            </div>
          </div>
          
          {/* Subjects & Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold">Your Subjects</h3>
                <Link 
                  href="/student/subjects"
                  className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
                >
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {studentData.attendance.subjects.map((subject, idx) => (
                  <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:bg-zinc-800/80 transition-colors">
                    <div className="flex items-start">
                      <div className={`p-3 rounded-lg ${
                        subject.percentage >= 75 
                          ? 'bg-green-900/20 text-green-400' 
                          : 'bg-red-900/20 text-red-400'
                      } mr-4`}>
                        {subject.percentage >= 75 ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <XCircle className="h-6 w-6" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-lg">{subject.name}</h4>
                            <p className="text-zinc-400 text-sm">{subject.code}</p>
                          </div>
                          <span className={`text-sm py-1 px-3 rounded-full ${
                            subject.percentage >= 75 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {subject.percentage}%
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-zinc-400 text-xs mb-1">Classes Attended</p>
                            <p className="font-medium">{subject.attended} of {subject.total}</p>
                          </div>
                          <div>
                            <p className="text-zinc-400 text-xs mb-1">Next Class</p>
                            <p className="font-medium">{subject.upcoming.date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold">Student Profile</h3>
                <Button variant="outline" size="sm" className="text-sm">
                  Edit
                </Button>
              </div>
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white mb-3">
                    {studentData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h4 className="text-lg font-bold">{studentData.name}</h4>
                  <p className="text-zinc-400 text-sm">{studentData.class}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-zinc-400">Roll Number</span>
                    <span className="font-medium">{studentData.rollNumber}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-zinc-400">Registration</span>
                    <span className="font-medium">{studentData.registrationNumber}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-zinc-400">Session</span>
                    <span className="font-medium">{studentData.session}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-zinc-400">Branch</span>
                    <span className="font-medium">{studentData.branch}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/student/attendance/report"
                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-zinc-800 transition-colors"
                  >
                    <ClipboardCheck className="h-6 w-6 text-purple-400 mb-2" />
                    <span className="text-sm font-medium">Report</span>
                  </Link>
                  <Link
                    href="/student/notifications"
                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-zinc-800 transition-colors"
                  >
                    <Bell className="h-6 w-6 text-purple-400 mb-2" />
                    <span className="text-sm font-medium">Notifications</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div>
            <h3 className="text-xl font-bold mb-5">Recent Activity</h3>
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="space-y-6">
                {studentData.attendance.recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className={`p-2 rounded-lg ${
                      activity.action === "Attended" 
                        ? 'bg-green-900/20 text-green-400' 
                        : 'bg-red-900/20 text-red-400'
                    } mr-4`}>
                      {activity.action === "Attended" ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <XCircle className="h-5 w-5" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {activity.action} {activity.subject} class
                          </p>
                          <p className="text-zinc-400 text-sm">{activity.date} at {activity.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 