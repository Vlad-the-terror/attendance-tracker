"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import TeacherSidebar from "@/components/layout/TeacherSidebar";
import { Bell, ArrowLeft, CheckCircle, XCircle, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function MarkAttendancePage() {
  // Mock data - would come from API in a real application
  const [subjects, setSubjects] = useState([
    { id: "CS101", name: "Introduction to Programming", department: "Computer Science" },
    { id: "CS201", name: "Data Structures", department: "Computer Science" }
  ]);
  
  const [classes, setClasses] = useState([
    { id: "C001", name: "Computer Science - Year 1", department: "DEP001", year: 1, semester: 1 },
    { id: "C002", name: "Computer Science - Year 2", department: "DEP001", year: 2, semester: 3 }
  ]);
  
  // All students assigned to this teacher's subjects
  const [allStudents, setAllStudents] = useState([
    { 
      id: "S001", 
      name: "John Doe", 
      rollNumber: "001", 
      present: true,
      departmentId: "DEP001",
      classId: "C001",
      subjectIds: ["CS101", "CS201"]
    },
    { 
      id: "S002", 
      name: "Jane Smith", 
      rollNumber: "002", 
      present: false,
      departmentId: "DEP001",
      classId: "C001",
      subjectIds: ["CS101"]
    },
    { 
      id: "S003", 
      name: "Alice Johnson", 
      rollNumber: "003", 
      present: true,
      departmentId: "DEP001",
      classId: "C002",
      subjectIds: ["CS201"]
    },
    { 
      id: "S004", 
      name: "Bob Brown", 
      rollNumber: "004", 
      present: true,
      departmentId: "DEP001",
      classId: "C001",
      subjectIds: ["CS101", "CS201"]
    },
    { 
      id: "S005", 
      name: "Charlie Davis", 
      rollNumber: "005", 
      present: false,
      departmentId: "DEP001",
      classId: "C002",
      subjectIds: ["CS201"]
    }
  ]);
  
  // Filter states
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([...allStudents]);
  
  // Apply filters when they change
  useEffect(() => {
    let filteredStudents = [...allStudents];
    
    if (selectedSubject) {
      filteredStudents = filteredStudents.filter(
        student => student.subjectIds.includes(selectedSubject)
      );
    }
    
    if (selectedClass) {
      filteredStudents = filteredStudents.filter(
        student => student.classId === selectedClass
      );
    }
    
    if (searchQuery) {
      filteredStudents = filteredStudents.filter(
        student => 
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setStudents(filteredStudents);
  }, [selectedSubject, selectedClass, searchQuery, allStudents]);
  
  // Toggle attendance status
  const toggleAttendance = (id: string) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, present: !student.present } : student
    ));
    
    // In a real app, this would also update the source data
    setAllStudents(allStudents.map(student => 
      student.id === id ? { ...student, present: !student.present } : student
    ));
  };
  
  // Calculate attendance percentage
  const presentCount = students.filter(student => student.present).length;
  const attendancePercentage = students.length > 0 
    ? (presentCount / students.length) * 100 
    : 0;

  // Save attendance
  const saveAttendance = () => {
    // In a real app, this would make an API call to save attendance data
    alert("Attendance saved successfully!");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <TeacherSidebar activePage="attendance" />

      <div className="pl-20">
        <header className="h-20 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md flex items-center justify-between px-8">
          <div className="flex items-center">
            <Link href="/teacher/attendance" className="mr-4">
              <ArrowLeft className="h-5 w-5 text-zinc-400 hover:text-white" />
            </Link>
            <h1 className="text-xl font-bold">Mark Attendance</h1>
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
                <p className="text-sm font-medium">Dr. Robert Anderson</p>
                <p className="text-xs text-zinc-400">T001</p>
              </div>
            </div>
          </div>
        </header>

        <main className="px-8 py-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-3xl font-bold">Attendance Management</h1>
                <p className="text-zinc-400">Select subject and class to mark attendance</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" className="text-zinc-400 border-zinc-700">
                  Cancel
                </Button>
                <Button 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={saveAttendance}
                  disabled={students.length === 0}
                >
                  Save Attendance
                </Button>
              </div>
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectItem value="">All Subjects</SelectItem>
                      {subjects.map(subject => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name} ({subject.id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Class/Batch</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectItem value="">All Classes</SelectItem>
                      {classes.map(cls => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name} (Sem {cls.semester})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Search</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-zinc-500" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search students..."
                      className="block w-full pl-10 pr-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              {students.length > 0 && (
                <div className="mt-6 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-zinc-400">
                      Showing {students.length} students
                      {selectedClass && classes.find(c => c.id === selectedClass) 
                        ? ` from ${classes.find(c => c.id === selectedClass)?.name}` 
                        : ''}
                      {selectedSubject && subjects.find(s => s.id === selectedSubject) 
                        ? ` for ${subjects.find(s => s.id === selectedSubject)?.name}` 
                        : ''}
                    </p>
                  </div>
                  <div className="bg-zinc-800 rounded-lg px-4 py-2">
                    <span className="font-medium">{presentCount}/{students.length} Present</span>
                    <span className="text-zinc-400 ml-2">({Math.round(attendancePercentage)}%)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {students.length > 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-800/50">
                    <th className="text-left py-4 px-6">Roll No</th>
                    <th className="text-left py-4 px-6">Student Name</th>
                    <th className="text-left py-4 px-6">Class</th>
                    <th className="text-center py-4 px-6">Status</th>
                    <th className="text-right py-4 px-6">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                      <td className="py-4 px-6">{student.rollNumber}</td>
                      <td className="py-4 px-6">{student.name}</td>
                      <td className="py-4 px-6">
                        {classes.find(c => c.id === student.classId)?.name || 'N/A'}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {student.present ? (
                          <span className="inline-flex items-center bg-green-900/20 text-green-400 text-sm px-3 py-1 rounded-full">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Present
                          </span>
                        ) : (
                          <span className="inline-flex items-center bg-red-900/20 text-red-400 text-sm px-3 py-1 rounded-full">
                            <XCircle className="h-4 w-4 mr-1" />
                            Absent
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={`${student.present 
                            ? 'border-red-500/30 text-red-400 hover:bg-red-950/20' 
                            : 'border-green-500/30 text-green-400 hover:bg-green-950/20'
                          }`}
                          onClick={() => toggleAttendance(student.id)}
                        >
                          {student.present ? 'Mark Absent' : 'Mark Present'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
              <p className="text-zinc-400 text-lg">
                No students found matching your criteria.
                <br />Please adjust your filters to see students.
              </p>
            </div>
          )}
          
          {students.length > 0 && (
            <div className="flex justify-end space-x-3">
              <Button variant="outline" className="text-zinc-400 border-zinc-700">
                Cancel
              </Button>
              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={saveAttendance}
              >
                Save Attendance
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 