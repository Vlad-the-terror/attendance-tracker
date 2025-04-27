"use client";

import Link from "next/link";
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
  FileText,
  Download,
  BookOpen,
  Bookmark,
  CheckCircle,
  ExternalLink,
  Info,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StudentSidebar from "@/components/layout/StudentSidebar";

export default function StudentSubjects() {
  // Mock student data - would come from API/backend in production
  const studentData = {
    name: "John Doe",
    rollNumber: "S001",
    registrationNumber: "REG20230001",
    session: "2023-2024",
    branch: "Computer Science",
    semester: "2nd Semester",
    subjects: [
      {
        id: "cs101",
        name: "Introduction to Programming",
        code: "CS101",
        credits: 4,
        faculty: "Dr. Sarah Johnson",
        completed: 35,
        description: "Fundamentals of programming concepts, algorithms, and problem-solving using Python.",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
        upcoming: {
          topic: "Arrays & Pointers",
          date: "May 5, 2025",
          time: "10:00 AM"
        },
        materials: [
          { type: "Syllabus", name: "CS101 Course Syllabus", link: "#" },
          { type: "Book", name: "Learning Python, 5th Edition", link: "#" },
          { type: "Notes", name: "Module 3: Data Structures", link: "#" }
        ],
        assignments: [
          { name: "Assignment 1", due: "April 30, 2025", submitted: true },
          { name: "Assignment 2", due: "May 10, 2025", submitted: false }
        ]
      },
      {
        id: "cs201",
        name: "Data Structures",
        code: "CS201",
        credits: 4,
        faculty: "Prof. Michael Chen",
        completed: 28,
        description: "Implementation and analysis of various data structures including arrays, linked lists, stacks, and queues.",
        imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop",
        upcoming: {
          topic: "Linked Lists Implementation",
          date: "May 3, 2025",
          time: "2:00 PM"
        },
        materials: [
          { type: "Syllabus", name: "CS201 Course Outline", link: "#" },
          { type: "Book", name: "Data Structures & Algorithms in Java", link: "#" },
          { type: "Notes", name: "Module 2: Time Complexity", link: "#" }
        ],
        assignments: [
          { name: "Assignment 1", due: "April 28, 2025", submitted: true },
          { name: "Assignment 2", due: "May 8, 2025", submitted: false }
        ]
      },
      {
        id: "ma101",
        name: "Mathematics for Engineers",
        code: "MA101",
        credits: 3,
        faculty: "Dr. Emily Rodriguez",
        completed: 42,
        description: "Mathematical concepts including differential equations, linear algebra, and calculus for engineering applications.",
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
        upcoming: {
          topic: "Differential Equations",
          date: "May 4, 2025",
          time: "11:00 AM"
        },
        materials: [
          { type: "Syllabus", name: "MA101 Course Plan", link: "#" },
          { type: "Book", name: "Advanced Engineering Mathematics", link: "#" },
          { type: "Notes", name: "Module 4: Matrices", link: "#" }
        ],
        assignments: [
          { name: "Assignment 1", due: "April 25, 2025", submitted: true },
          { name: "Assignment 2", due: "May 5, 2025", submitted: true },
          { name: "Assignment 3", due: "May 15, 2025", submitted: false }
        ]
      }
    ]
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Side Navigation */}
      <StudentSidebar activePage="subjects" />

      {/* Main Content */}
      <div className="pl-20">
        {/* Top Bar */}
        <header className="h-20 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md flex items-center justify-between px-8">
          <h1 className="text-xl font-bold">My Subjects</h1>
          
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
          {/* Back Link and Info */}
          <div className="flex justify-between mb-8">
            <Link 
              href="/student/dashboard" 
              className="flex items-center text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              <span>Back to Dashboard</span>
            </Link>
            
            <div className="bg-zinc-800/50 rounded-lg px-4 py-2 flex items-center">
              <div className="mr-6">
                <span className="text-xs text-zinc-400">Semester</span>
                <p className="text-sm font-medium">{studentData.semester}</p>
              </div>
              <div>
                <span className="text-xs text-zinc-400">Total Subjects</span>
                <p className="text-sm font-medium">{studentData.subjects.length}</p>
              </div>
            </div>
          </div>
          
          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {studentData.subjects.map((subject) => (
              <Card key={subject.id} className="bg-zinc-900 border-zinc-800 overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <CardDescription className="text-zinc-400">{subject.code} • {subject.credits} Credits</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-zinc-800 border-zinc-700 text-white">
                        <DropdownMenuItem className="hover:bg-zinc-700 cursor-pointer">
                          <Info className="h-4 w-4 mr-2" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-zinc-700 cursor-pointer">
                          <BookOpen className="h-4 w-4 mr-2" />
                          <span>View Materials</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-zinc-700 cursor-pointer">
                          <FileText className="h-4 w-4 mr-2" />
                          <span>View Assignments</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3 mt-1">
                    <p className="text-sm text-zinc-400">Progress</p>
                    <p className="text-sm text-zinc-300 font-medium">{subject.completed}%</p>
                  </div>
                  <Progress value={subject.completed} className="h-2 bg-zinc-700" />
                  
                  <div className="mt-4">
                    <p className="text-sm text-zinc-400">Faculty</p>
                    <p className="text-sm font-medium">{subject.faculty}</p>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <div className="flex-1 bg-zinc-800 rounded-lg p-3">
                      <p className="text-xs text-zinc-400 mb-1">Next Class</p>
                      <p className="text-sm font-medium truncate">{subject.upcoming.topic}</p>
                      <p className="text-xs text-zinc-400 mt-1">{subject.upcoming.date} • {subject.upcoming.time}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Materials
                    </Button>
                    <Button variant="outline" size="sm" className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white">
                      <FileText className="h-4 w-4 mr-2" />
                      Assignments
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* Materials & Resources Tabs */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Materials & Resources</h2>
            
            <Tabs defaultValue="cs101" className="w-full">
              <TabsList className="bg-zinc-800 p-1 mb-6">
                {studentData.subjects.map((subject) => (
                  <TabsTrigger 
                    key={subject.id} 
                    value={subject.id}
                    className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
                  >
                    {subject.code}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {studentData.subjects.map((subject) => (
                <TabsContent key={subject.id} value={subject.id}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{subject.name}</h3>
                      <p className="text-zinc-400 mb-4">{subject.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4">
                          <h4 className="font-medium mb-3 flex items-center">
                            <BookOpen className="h-4 w-4 mr-2 text-purple-500" />
                            Course Materials
                          </h4>
                          <ul className="space-y-3">
                            {subject.materials.map((material, index) => (
                              <li key={index} className="flex items-center justify-between py-2 border-b border-zinc-700/50 last:border-0">
                                <div className="flex items-center">
                                  <span className="text-xs uppercase px-2 py-1 rounded bg-zinc-700 text-zinc-300 mr-3">{material.type}</span>
                                  <span className="text-sm">{material.name}</span>
                                </div>
                                <Link href={material.link} className="text-purple-500 hover:text-purple-400 p-1">
                                  <Download className="h-4 w-4" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4">
                          <h4 className="font-medium mb-3 flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-purple-500" />
                            Assignments
                          </h4>
                          <ul className="space-y-3">
                            {subject.assignments.map((assignment, index) => (
                              <li key={index} className="flex items-center justify-between py-2 border-b border-zinc-700/50 last:border-0">
                                <div>
                                  <p className="text-sm flex items-center">
                                    {assignment.name}
                                    {assignment.submitted && (
                                      <span className="ml-2 text-green-500">
                                        <CheckCircle className="h-4 w-4" />
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-xs text-zinc-400">Due: {assignment.due}</p>
                                </div>
                                <Button size="sm" variant="outline" className="h-8 bg-zinc-700 border-zinc-600 hover:bg-zinc-600">
                                  {assignment.submitted ? 'View' : 'Submit'}
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        View Full Details
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
} 