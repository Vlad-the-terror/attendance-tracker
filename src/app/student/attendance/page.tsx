"use client";

import Link from "next/link";
import { 
  Bell, 
  ChevronLeft,
  Download,
  Calendar as CalendarIcon,
  CheckCircle,
  XCircle,
  SlidersHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentSidebar from "@/components/layout/StudentSidebar";

export default function AttendanceRecords() {
  // Mock student data - would come from API/backend in production
  const studentData = {
    name: "John Doe",
    rollNumber: "S001",
    registrationNumber: "REG20230001",
    session: "2023-2024",
    branch: "Computer Science",
    semester: "2023-2024",
    attendance: {
      overall: 75,
      subjects: [
        { 
          name: "Introduction to Programming", 
          code: "CS101", 
          total: 20, 
          attended: 16, 
          percentage: 80 
        },
        { 
          name: "Data Structures", 
          code: "CS201", 
          total: 15, 
          attended: 14, 
          percentage: 93 
        },
        { 
          name: "Mathematics for Engineers", 
          code: "MA101", 
          total: 18, 
          attended: 10, 
          percentage: 56 
        }
      ],
      records: [
        {
          date: "2025-04-23",
          subject: "Introduction to Programming",
          code: "CS101",
          status: "present",
          time: "10:00 AM"
        },
        {
          date: "2025-04-23",
          subject: "Mathematics for Engineers",
          code: "MA101",
          status: "absent",
          time: "2:00 PM"
        },
        {
          date: "2025-04-22",
          subject: "Introduction to Programming",
          code: "CS101",
          status: "present",
          time: "10:00 AM"
        },
        {
          date: "2025-04-22",
          subject: "Data Structures",
          code: "CS201",
          status: "present",
          time: "3:00 PM"
        }
      ]
    }
  };

  // Calculate total classes and attendance
  const totalClasses = studentData.attendance.subjects.reduce((acc, subject) => acc + subject.total, 0);
  const totalAttended = studentData.attendance.subjects.reduce((acc, subject) => acc + subject.attended, 0);
  const overallPercentage = totalClasses > 0 ? Math.round((totalAttended / totalClasses) * 100) : 0;
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Side Navigation */}
      <StudentSidebar activePage="attendance" />

      {/* Main Content */}
      <div className="pl-20">
        {/* Top Bar */}
        <header className="h-20 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md flex items-center justify-between px-8">
          <h1 className="text-xl font-bold">Attendance Records</h1>
          
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
          {/* Back Link and Action Buttons */}
          <div className="flex justify-between mb-8">
            <Link 
              href="/student/dashboard" 
              className="flex items-center text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              <span>Back to Dashboard</span>
            </Link>
            
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" className="flex items-center bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="flex items-center bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
          
          {/* Attendance Summary Card */}
          <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">Attendance Summary</h2>
                <p className="text-zinc-400">Overall performance across all courses</p>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                overallPercentage >= 75 
                  ? 'bg-green-900/30 text-green-400 border border-green-700/30' 
                  : 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/30'
              }`}>
                {overallPercentage >= 75 ? 'Good Standing' : 'Needs Improvement'}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-3 md:col-span-1">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="relative w-36 h-36 mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl font-bold">{overallPercentage}%</div>
                    </div>
                    {/* Circle chart background */}
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path className="stroke-zinc-700" 
                        fill="none" 
                        strokeWidth="3.8" 
                        strokeLinecap="round" 
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path className={overallPercentage >= 75 ? "stroke-green-500" : "stroke-yellow-500"} 
                        fill="none" 
                        strokeWidth="3.8" 
                        strokeLinecap="round" 
                        strokeDasharray={`${overallPercentage}, 100`} 
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span className="text-zinc-300 text-sm">Overall Attendance</span>
                    </div>
                    <p className="text-zinc-400 text-sm">{totalAttended} out of {totalClasses} classes attended</p>
                  </div>
                </div>
              </div>
              
              <div className="col-span-3 md:col-span-2">
                <div className="h-full flex flex-col">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                    <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
                      <p className="text-zinc-400 text-sm mb-1">Total Classes</p>
                      <p className="text-2xl font-bold">{totalClasses}</p>
                    </div>
                    <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
                      <p className="text-zinc-400 text-sm mb-1">Classes Attended</p>
                      <p className="text-2xl font-bold">{totalAttended}</p>
                    </div>
                    <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
                      <p className="text-zinc-400 text-sm mb-1">Total Subjects</p>
                      <p className="text-2xl font-bold">{studentData.attendance.subjects.length}</p>
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
                    <p className="text-zinc-400 text-sm mb-3">Subject-wise Attendance</p>
                    <div className="space-y-4">
                      {studentData.attendance.subjects.map((subject, idx) => (
                        <div key={idx}>
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <p className="text-sm font-medium">{subject.name}</p>
                              <p className="text-xs text-zinc-400">{subject.code}</p>
                            </div>
                            <p className="text-sm font-medium">{subject.percentage}%</p>
                          </div>
                          <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                subject.percentage >= 75 ? 'bg-green-500' : 'bg-yellow-500'
                              }`}
                              style={{ width: `${subject.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Attendance Records */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold">Attendance Log</h3>
              <Tabs defaultValue="all" className="w-[300px]">
                <TabsList className="bg-zinc-800 p-1">
                  <TabsTrigger value="all" className="data-[state=active]:bg-zinc-700">All</TabsTrigger>
                  <TabsTrigger value="present" className="data-[state=active]:bg-zinc-700">Present</TabsTrigger>
                  <TabsTrigger value="absent" className="data-[state=active]:bg-zinc-700">Absent</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-zinc-800/50 border-b border-zinc-700">
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-zinc-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {studentData.attendance.records.map((record, idx) => (
                    <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {new Date(record.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-medium">{record.subject}</p>
                        <p className="text-xs text-zinc-400">{record.code}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{record.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex justify-center">
                          <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${
                            record.status === 'present' 
                              ? 'bg-green-900/30 text-green-400 border border-green-700/30' 
                              : 'bg-red-900/30 text-red-400 border border-red-700/30'
                          }`}>
                            {record.status === 'present' ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <XCircle className="h-3 w-3 mr-1" />
                            )}
                            {record.status === 'present' ? 'Present' : 'Absent'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-zinc-400">
                Showing <span className="text-white">{studentData.attendance.records.length}</span> records
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white" disabled>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 