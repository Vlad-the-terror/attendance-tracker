"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { 
  Bell, 
  Users, 
  UserCog, 
  Layers, 
  BookOpen, 
  School, 
  BarChart3, 
  CheckCircle, 
  AlertCircle,
  ActivitySquare,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const router = useRouter();
  
  // Mock admin data
  const adminData = {
    name: "Admin User",
    id: "A001",
    systemMetrics: {
      totalStudents: 320,
      totalTeachers: 24,
      totalClasses: 12,
      totalSubjects: 36,
      totalDepartments: 5,
      attendanceRate: 84,
      activeUsers: 187
    },
    recentActivities: [
      { 
        id: 1, 
        user: "Dr. Robert Anderson", 
        action: "Marked attendance for CS101", 
        time: "10 minutes ago"
      },
      { 
        id: 2, 
        user: "Jane Smith (Admin)", 
        action: "Added new student", 
        time: "25 minutes ago"
      },
      { 
        id: 3, 
        user: "Prof. Williams", 
        action: "Modified class timetable for SE205", 
        time: "1 hour ago"
      },
      { 
        id: 4, 
        user: "System", 
        action: "Daily attendance report generated", 
        time: "2 hours ago"
      }
    ],
    systemStatus: {
      uptime: "12 days, 4 hours",
      status: "Operational",
      lastBackup: "Today, 03:00 AM",
      notifications: 2
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Side Navigation */}
      <AdminSidebar activePage="dashboard" />

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
                A
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{adminData.name}</p>
                <p className="text-xs text-zinc-400">{adminData.id}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          
          {/* System Overview */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6">System Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm mb-1">Total Students</p>
                    <p className="text-3xl font-bold">
                      {adminData.systemMetrics.totalStudents}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
              </div>
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm mb-1">Total Teachers</p>
                    <p className="text-3xl font-bold">
                      {adminData.systemMetrics.totalTeachers}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400">
                    <UserCog className="h-6 w-6" />
                  </div>
                </div>
              </div>
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm mb-1">Classes</p>
                    <p className="text-3xl font-bold">
                      {adminData.systemMetrics.totalClasses}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-green-500/10 text-green-400">
                    <Layers className="h-6 w-6" />
                  </div>
                </div>
              </div>
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm mb-1">Subjects</p>
                    <p className="text-3xl font-bold">
                      {adminData.systemMetrics.totalSubjects}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
                    <BookOpen className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Attendance Statistics & System Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center mb-6">
                <BarChart3 className="h-5 w-5 mr-2 text-purple-500" />
                <h2 className="text-xl font-bold">Attendance Statistics</h2>
              </div>
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-zinc-400">Overall Attendance Rate</span>
                  <span className="font-medium">{adminData.systemMetrics.attendanceRate}%</span>
                </div>
                
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-600" 
                    style={{ width: `${adminData.systemMetrics.attendanceRate}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-zinc-500">0%</span>
                  <span className="text-xs text-zinc-500">25%</span>
                  <span className="text-xs text-zinc-500">50%</span>
                  <span className="text-xs text-zinc-500">75%</span>
                  <span className="text-xs text-zinc-500">100%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
                  <p className="text-zinc-400 text-sm mb-1">Departments</p>
                  <p className="text-2xl font-bold">{adminData.systemMetrics.totalDepartments}</p>
                </div>
                
                <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
                  <p className="text-zinc-400 text-sm mb-1">Active Users</p>
                  <p className="text-2xl font-bold">{adminData.systemMetrics.activeUsers}</p>
                </div>
                
                <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
                  <p className="text-zinc-400 text-sm mb-1">Notifications</p>
                  <p className="text-2xl font-bold">{adminData.systemStatus.notifications}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center mb-6">
                <ActivitySquare className="h-5 w-5 mr-2 text-purple-500" />
                <h2 className="text-xl font-bold">System Status</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Status:</span>
                  <span className="bg-green-900/20 text-green-400 px-2 py-1 rounded-full text-sm flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    {adminData.systemStatus.status}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-zinc-400">Uptime:</span>
                  <span className="font-medium">{adminData.systemStatus.uptime}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-zinc-400">Last Backup:</span>
                  <span className="font-medium">{adminData.systemStatus.lastBackup}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link 
                href="/admin/users/add"
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col items-center hover:bg-zinc-800 transition-colors"
              >
                <Users className="h-6 w-6 mb-3 text-purple-500" />
                <h3 className="font-bold text-sm">Add User</h3>
              </Link>
              
              <Link 
                href="/admin/departments/add"
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col items-center hover:bg-zinc-800 transition-colors"
              >
                <School className="h-6 w-6 mb-3 text-purple-500" />
                <h3 className="font-bold text-sm">New Department</h3>
              </Link>
              
              <Link 
                href="/admin/classes/add"
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col items-center hover:bg-zinc-800 transition-colors"
              >
                <Layers className="h-6 w-6 mb-3 text-purple-500" />
                <h3 className="font-bold text-sm">Create Class</h3>
              </Link>
              
              <Link 
                href="/admin/reports/generate"
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col items-center hover:bg-zinc-800 transition-colors"
              >
                <BarChart3 className="h-6 w-6 mb-3 text-purple-500" />
                <h3 className="font-bold text-sm">Generate Report</h3>
              </Link>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div>
            <div className="flex items-center mb-6">
              <Clock className="h-5 w-5 mr-2 text-purple-500" />
              <h2 className="text-xl font-bold">Recent Activity</h2>
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <ul className="divide-y divide-zinc-800">
                {adminData.recentActivities.map((activity) => (
                  <li key={activity.id} className="p-5 hover:bg-zinc-800/50 transition-colors">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-zinc-400">by {activity.user}</p>
                      </div>
                      <span className="text-xs text-zinc-500">{activity.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="p-4 border-t border-zinc-800">
                <Button variant="outline" className="w-full text-sm border-zinc-700">
                  View All Activity
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 