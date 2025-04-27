"use client";

import React from "react";
import TeacherSidebar from "@/components/layout/TeacherSidebar";
import { Bell, Book, Users, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TeacherSubjectsPage() {
  // Mock subjects data
  const subjects = [
    {
      id: "CS101",
      name: "Introduction to Programming",
      code: "CS101",
      class: "C001 (2023-2024)",
      students: 60,
      nextClass: "Today, 10:00 AM",
      description: "This course provides an introduction to programming concepts and techniques using a high-level language.",
      attendance: 75
    },
    {
      id: "CS201",
      name: "Data Structures",
      code: "CS201",
      class: "C001 (2023-2024)",
      students: 55,
      nextClass: "Tomorrow, 2:00 PM",
      description: "Study of data structures including arrays, linked lists, stacks, queues, trees, and graphs.",
      attendance: 80
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Side Navigation */}
      <TeacherSidebar activePage="subjects" />

      {/* Main Content */}
      <div className="pl-20">
        {/* Top Bar */}
        <header className="h-20 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md flex items-center justify-between px-8">
          <h1 className="text-xl font-bold">PRΞSNCΞ</h1>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-zinc-800 text-zinc-300 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-white">
                RA
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Dr. Robert Anderson</p>
                <p className="text-xs text-zinc-400">T001</p>
              </div>
            </div>
          </div>
        </header>

        <main className="px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">My Subjects</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {subjects.map((subject) => (
              <div 
                key={subject.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
              >
                <div className="border-b border-zinc-800 bg-zinc-800/30 p-6">
                  <div className="flex justify-between mb-2">
                    <h2 className="text-xl font-bold">{subject.name}</h2>
                    <span className="bg-purple-900/30 text-purple-400 px-2 py-1 rounded text-xs">
                      {subject.code}
                    </span>
                  </div>
                  <p className="text-zinc-400">{subject.class}</p>
                </div>
                
                <div className="p-6">
                  <p className="text-zinc-300 mb-6">{subject.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <div className="flex items-center text-purple-400 mb-2">
                        <Users className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Students</span>
                      </div>
                      <p className="text-xl font-bold">{subject.students}</p>
                    </div>
                    
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <div className="flex items-center text-purple-400 mb-2">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Next Class</span>
                      </div>
                      <p className="text-lg font-medium">{subject.nextClass}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-2">Average Attendance:</span>
                      <span className="text-sm bg-green-900/20 text-green-400 py-1 px-2 rounded">
                        {subject.attendance}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Link href={`/teacher/attendance/mark/${subject.id}`} className="flex-1">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        Mark Attendance
                      </Button>
                    </Link>
                    
                    <Link href={`/teacher/subjects/${subject.id}`} className="flex-1">
                      <Button variant="outline" className="w-full border-zinc-700">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
} 