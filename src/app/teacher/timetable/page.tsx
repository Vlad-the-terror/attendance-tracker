"use client";

import React, { useState } from "react";
import TeacherSidebar from "@/components/layout/TeacherSidebar";
import { Bell, Calendar, Clock, MapPin, User, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TeacherTimetablePage() {
  // Mock timetable data
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  const [selectedDay, setSelectedDay] = useState("Monday");
  
  const timetableData = {
    "Monday": [
      {
        subject: "Introduction to Programming",
        code: "CS101",
        time: "10:00 AM - 11:30 AM",
        room: "Room 101",
        class: "C001 (2023-2024)"
      },
      {
        subject: "Data Structures",
        code: "CS201",
        time: "2:00 PM - 3:30 PM",
        room: "Lab 3",
        class: "C001 (2023-2024)"
      }
    ],
    "Tuesday": [
      {
        subject: "Introduction to Programming",
        code: "CS101",
        time: "11:00 AM - 12:30 PM",
        room: "Room 102",
        class: "C001 (2023-2024)"
      }
    ],
    "Wednesday": [
      {
        subject: "Data Structures",
        code: "CS201",
        time: "9:00 AM - 10:30 AM",
        room: "Lab 2",
        class: "C001 (2023-2024)"
      }
    ],
    "Thursday": [
      {
        subject: "Introduction to Programming",
        code: "CS101",
        time: "1:00 PM - 2:30 PM",
        room: "Lab 1",
        class: "C001 (2023-2024)"
      }
    ],
    "Friday": [
      {
        subject: "Data Structures",
        code: "CS201",
        time: "10:00 AM - 11:30 AM",
        room: "Room 103",
        class: "C001 (2023-2024)"
      }
    ]
  };

  const classesForDay = timetableData[selectedDay as keyof typeof timetableData] || [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Side Navigation */}
      <TeacherSidebar activePage="timetable" />

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
          <h1 className="text-3xl font-bold mb-8">My Timetable</h1>
          
          {/* Day Selector */}
          <div className="mb-8">
            <div className="grid grid-cols-5 gap-2">
              {weekdays.map((day) => (
                <Button 
                  key={day}
                  variant={selectedDay === day ? "default" : "outline"}
                  className={`${
                    selectedDay === day 
                      ? 'bg-purple-600 hover:bg-purple-700 border-none' 
                      : 'border-zinc-700 text-zinc-400 hover:text-white'
                  }`}
                  onClick={() => setSelectedDay(day)}
                >
                  {day}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Timetable */}
          <div className="mb-8">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 mr-2 text-purple-500" />
                <h2 className="text-xl font-bold">{selectedDay}'s Schedule</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <div className="flex items-center text-purple-400 mb-2">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Classes</span>
                  </div>
                  <p className="text-xl font-bold">{classesForDay.length}</p>
                </div>
                
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <div className="flex items-center text-purple-400 mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Rooms</span>
                  </div>
                  <p className="text-xl font-bold">
                    {new Set(classesForDay.map(c => c.room)).size}
                  </p>
                </div>
                
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <div className="flex items-center text-purple-400 mb-2">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Classes</span>
                  </div>
                  <p className="text-xl font-bold">
                    {new Set(classesForDay.map(c => c.class)).size}
                  </p>
                </div>
              </div>
            </div>
            
            {classesForDay.length > 0 ? (
              <div className="space-y-4">
                {classesForDay.map((classItem, index) => (
                  <div 
                    key={index}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:bg-zinc-800/50 transition-colors"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold">{classItem.subject}</h3>
                            <p className="text-zinc-400">{classItem.code} • {classItem.class}</p>
                          </div>
                          <span className="bg-purple-900/30 text-purple-400 px-2 py-1 rounded text-xs">
                            {classItem.code}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 md:justify-end">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-zinc-500 mr-2" />
                            <span className="text-zinc-300">{classItem.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-zinc-500 mr-2" />
                            <span className="text-zinc-300">{classItem.room}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Button 
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                        size="sm"
                      >
                        Take Attendance
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
                <p className="text-zinc-400 text-lg">No classes scheduled for {selectedDay}</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 