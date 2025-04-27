"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Book, 
  Calendar, 
  ChevronLeft,
  Home, 
  User, 
  Bell, 
  Clock,
  BarChart,
  GraduationCap,
  ChevronDown,
  Filter,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  MapPin,
  Users,
  ChevronRight,
  Info,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentSidebar from "@/components/layout/StudentSidebar";

// Define interfaces for type safety
interface ClassItem {
  id: string;
  subject: string;
  code: string;
  time: string;
  room: string;
  faculty: string;
  type: string;
  notes: string | null;
}

interface StudentData {
  name: string;
  rollNumber: string;
  registrationNumber: string;
  session: string;
  branch: string;
  class: string;
  weekDays: string[];
  currentDate: string;
  timetable: {
    [key: string]: ClassItem[];
  };
}

// Custom Select component implementation
const Select = ({ 
  defaultValue, 
  onValueChange, 
  children 
}: { 
  defaultValue: string; 
  onValueChange: (value: string) => void;
  children: React.ReactNode 
}) => (
  <div className="relative inline-block text-left">
    {children}
  </div>
);

const SelectTrigger = ({ 
  className, 
  children 
}: { 
  className: string; 
  children: React.ReactNode 
}) => (
  <button className={`flex items-center justify-between ${className}`}>
    {children}
  </button>
);

const SelectValue = ({ 
  placeholder 
}: { 
  placeholder: string 
}) => (
  <span>{placeholder}</span>
);

const SelectContent = ({ 
  className, 
  children 
}: { 
  className: string; 
  children: React.ReactNode 
}) => (
  <div className={`absolute mt-2 w-full ${className}`}>
    {children}
  </div>
);

const SelectItem = ({ 
  value, 
  children 
}: { 
  value: string; 
  children: React.ReactNode 
}) => (
  <div className="px-4 py-2 cursor-pointer hover:bg-zinc-700">
    {children}
  </div>
);

// Custom Badge component
const Badge = ({ 
  className, 
  children 
}: { 
  className?: string; 
  children: React.ReactNode 
}) => (
  <span className={`inline-flex items-center rounded-full text-xs font-medium ${className || ""}`}>
    {children}
  </span>
);

export default function StudentTimetable() {
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [selectedWeek, setSelectedWeek] = useState<string>("This Week");
  
  // Mock student data
  const studentData: StudentData = {
    name: "John Doe",
    rollNumber: "S001",
    registrationNumber: "REG20230001",
    session: "2023-2024",
    branch: "Computer Science",
    class: "CS-A",
    weekDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    currentDate: "May 2, 2025",
    timetable: {
      Monday: [
        {
          id: "cs101-mon",
          subject: "Introduction to Programming",
          code: "CS101",
          time: "09:00 AM - 10:30 AM",
          room: "Lab 101",
          faculty: "Dr. Sarah Johnson",
          type: "Lecture",
          notes: "Bring your laptops for a coding session",
        },
        {
          id: "ma101-mon",
          subject: "Mathematics for Engineers",
          code: "MA101",
          time: "11:00 AM - 12:30 PM",
          room: "Room 203",
          faculty: "Dr. Emily Rodriguez",
          type: "Lecture",
          notes: null,
        },
        {
          id: "cs201-mon",
          subject: "Data Structures",
          code: "CS201",
          time: "02:00 PM - 03:30 PM",
          room: "Room 105",
          faculty: "Prof. Michael Chen",
          type: "Tutorial",
          notes: "Quiz scheduled for next week",
        }
      ],
      Tuesday: [
        {
          id: "cs101-tue",
          subject: "Introduction to Programming",
          code: "CS101",
          time: "10:00 AM - 11:30 AM",
          room: "Lab 102",
          faculty: "Dr. Sarah Johnson",
          type: "Lab",
          notes: "Practical assignment due by end of session",
        },
        {
          id: "ph101-tue",
          subject: "Physics",
          code: "PH101",
          time: "01:00 PM - 02:30 PM",
          room: "Room 301",
          faculty: "Dr. Robert Williams",
          type: "Lecture",
          notes: null,
        }
      ],
      Wednesday: [
        {
          id: "ma101-wed",
          subject: "Mathematics for Engineers",
          code: "MA101",
          time: "09:00 AM - 10:30 AM",
          room: "Room 203",
          faculty: "Dr. Emily Rodriguez",
          type: "Tutorial",
          notes: "Homework review session",
        },
        {
          id: "cs201-wed",
          subject: "Data Structures",
          code: "CS201",
          time: "11:00 AM - 12:30 PM",
          room: "Room 105",
          faculty: "Prof. Michael Chen",
          type: "Lecture",
          notes: null,
        },
        {
          id: "eng101-wed",
          subject: "Technical Communication",
          code: "ENG101",
          time: "02:00 PM - 03:30 PM",
          room: "Room 204",
          faculty: "Prof. Linda Brown",
          type: "Practical",
          notes: "Presentation preparation",
        }
      ],
      Thursday: [
        {
          id: "ph101-thu",
          subject: "Physics",
          code: "PH101",
          time: "09:00 AM - 10:30 AM",
          room: "Lab 201",
          faculty: "Dr. Robert Williams",
          type: "Lab",
          notes: "Lab report submission",
        },
        {
          id: "cs101-thu",
          subject: "Introduction to Programming",
          code: "CS101",
          time: "11:00 AM - 12:30 PM",
          room: "Room 102",
          faculty: "Dr. Sarah Johnson",
          type: "Lecture",
          notes: null,
        }
      ],
      Friday: [
        {
          id: "cs201-fri",
          subject: "Data Structures",
          code: "CS201",
          time: "10:00 AM - 11:30 AM",
          room: "Lab 103",
          faculty: "Prof. Michael Chen",
          type: "Lab",
          notes: null,
        },
        {
          id: "eng101-fri",
          subject: "Technical Communication",
          code: "ENG101",
          time: "01:00 PM - 02:30 PM",
          room: "Room 204",
          faculty: "Prof. Linda Brown",
          type: "Lecture",
          notes: "Guest speaker session",
        }
      ],
      Saturday: [
        {
          id: "ma101-sat",
          subject: "Mathematics for Engineers",
          code: "MA101",
          time: "09:00 AM - 10:30 AM",
          room: "Room 203",
          faculty: "Dr. Emily Rodriguez",
          type: "Lecture",
          notes: "Quiz at the beginning of the class",
        }
      ]
    }
  };

  // Get time table for the selected day
  const daySchedule: ClassItem[] = studentData.timetable[selectedDay] || [];
  
  // Helper to determine class color based on subject
  const getSubjectColor = (code: string): string => {
    const colors: Record<string, string> = {
      "CS101": "bg-blue-600/20 text-blue-500 border-blue-800/30",
      "CS201": "bg-purple-600/20 text-purple-500 border-purple-800/30",
      "MA101": "bg-green-600/20 text-green-500 border-green-800/30",
      "PH101": "bg-yellow-600/20 text-yellow-500 border-yellow-800/30",
      "ENG101": "bg-pink-600/20 text-pink-500 border-pink-800/30"
    };
    return colors[code] || "bg-zinc-700/20 text-zinc-400 border-zinc-600/30";
  };
  
  // Helper to determine badge color based on class type
  const getClassTypeColor = (type: string): string => {
    const colors: Record<string, string> = {
      "Lecture": "bg-blue-900/30 text-blue-400 border-blue-700/30",
      "Lab": "bg-purple-900/30 text-purple-400 border-purple-700/30",
      "Tutorial": "bg-green-900/30 text-green-400 border-green-700/30",
      "Practical": "bg-yellow-900/30 text-yellow-400 border-yellow-700/30"
    };
    return colors[type] || "bg-zinc-900/30 text-zinc-400 border-zinc-700/30";
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Side Navigation */}
      <StudentSidebar activePage="timetable" />

      {/* Main Content */}
      <div className="pl-20">
        {/* Top Bar */}
        <header className="h-20 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md flex items-center justify-between px-8">
          <h1 className="text-xl font-bold">Timetable</h1>
          
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
          {/* Back Link and Actions */}
          <div className="flex justify-between mb-8">
            <Link 
              href="/student/dashboard" 
              className="flex items-center text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              <span>Back to Dashboard</span>
            </Link>
            
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-[160px] bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-md">
                  {selectedWeek}
                </div>
                
                <Button variant="outline" size="icon" className="h-10 w-10 bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10 bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              <Button variant="outline" className="flex items-center bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
          
          {/* Current Date and Info */}
          <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-zinc-800 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">Weekly Schedule</h2>
                <p className="text-zinc-400">Current date: {studentData.currentDate}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-blue-900/30 text-blue-400 border border-blue-700/30 px-3 py-1 text-xs">
                  {studentData.class}
                </Badge>
                <Badge className="bg-purple-900/30 text-purple-400 border border-purple-700/30 px-3 py-1 text-xs">
                  {studentData.branch}
                </Badge>
              </div>
            </div>
            
            {/* Weekday Pills */}
            <div className="flex overflow-x-auto pb-2 space-x-2 mb-4">
              {studentData.weekDays.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-lg flex items-center flex-shrink-0 ${
                    selectedDay === day 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  <span>{day}</span>
                  {day === "Monday" && (
                    <Badge className="ml-2 bg-green-900/30 text-green-400 border border-green-700/30">Today</Badge>
                  )}
                </button>
              ))}
            </div>
            
            {/* Daily Schedule Mini Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-zinc-800/50 border-zinc-700/50">
                <CardContent className="p-4 flex items-center">
                  <div className="p-2 rounded-lg bg-blue-900/30 text-blue-400 mr-4">
                    <ClockIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">Classes Today</p>
                    <p className="text-lg font-bold">{daySchedule.length}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-zinc-800/50 border-zinc-700/50">
                <CardContent className="p-4 flex items-center">
                  <div className="p-2 rounded-lg bg-purple-900/30 text-purple-400 mr-4">
                    <Book className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">Subjects</p>
                    <p className="text-lg font-bold">
                      {new Set(daySchedule.map(item => item.code)).size}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-zinc-800/50 border-zinc-700/50">
                <CardContent className="p-4 flex items-center">
                  <div className="p-2 rounded-lg bg-green-900/30 text-green-400 mr-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">Rooms</p>
                    <p className="text-lg font-bold">
                      {new Set(daySchedule.map(item => item.room)).size}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-zinc-800/50 border-zinc-700/50">
                <CardContent className="p-4 flex items-center">
                  <div className="p-2 rounded-lg bg-yellow-900/30 text-yellow-400 mr-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">Faculty</p>
                    <p className="text-lg font-bold">
                      {new Set(daySchedule.map(item => item.faculty)).size}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Timetable Display */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{selectedDay}'s Schedule</h2>
              <Button variant="outline" className="flex items-center bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                <CalendarIcon className="h-4 w-4 mr-2" />
                View Full Calendar
              </Button>
            </div>
            
            {daySchedule.length > 0 ? (
              <div className="space-y-4 relative">
                {/* Time ruler */}
                <div className="absolute left-0 top-0 h-full w-0.5 bg-zinc-800 ml-[72px]"></div>
                
                {daySchedule.map((classItem, index) => (
                  <div key={classItem.id} className="flex">
                    {/* Time column */}
                    <div className="w-[72px] flex flex-col items-center justify-center pr-4">
                      <p className="text-sm font-medium whitespace-nowrap">{classItem.time.split(' - ')[0]}</p>
                      <p className="text-xs text-zinc-500">{classItem.time.split(' - ')[1]}</p>
                    </div>
                    
                    {/* Circle connector */}
                    <div className="relative -ml-1.5 mr-4">
                      <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-purple-600 z-10"></div>
                    </div>
                    
                    {/* Class card */}
                    <div className={`flex-1 rounded-xl p-4 border ${getSubjectColor(classItem.code)}`}>
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">{classItem.subject}</h3>
                        <Badge className={getClassTypeColor(classItem.type)}>
                          {classItem.type}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 md:gap-y-0 md:gap-x-4 text-sm text-zinc-300 mb-3">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-zinc-500" />
                          <span>{classItem.room}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-zinc-500" />
                          <span>{classItem.faculty}</span>
                        </div>
                        <div className="flex items-center">
                          <Book className="h-4 w-4 mr-2 text-zinc-500" />
                          <span>{classItem.code}</span>
                        </div>
                      </div>
                      
                      {classItem.notes && (
                        <div className="mt-2 bg-zinc-800/50 p-2 rounded text-sm flex items-start">
                          <Info className="h-4 w-4 mr-2 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <p>{classItem.notes}</p>
                        </div>
                      )}
                      
                      <div className="flex justify-end mt-3">
                        <Button variant="outline" size="sm" className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-zinc-800/30 rounded-lg border border-dashed border-zinc-700">
                <Clock className="h-12 w-12 mx-auto text-zinc-600 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Classes Scheduled</h3>
                <p className="text-zinc-400 max-w-md mx-auto">
                  There are no classes scheduled for {selectedDay}. Enjoy your free time!
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 