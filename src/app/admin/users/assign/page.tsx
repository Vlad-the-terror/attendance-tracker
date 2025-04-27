"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { Bell, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function BulkAssignStudents() {
  // Mock data
  const [departments, setDepartments] = useState([
    { id: "DEP001", name: "Computer Science" },
    { id: "DEP002", name: "Electrical Engineering" },
    { id: "DEP003", name: "Mathematics" },
    { id: "DEP004", name: "Physics" }
  ]);
  
  const [classes, setClasses] = useState([
    { id: "C001", name: "Computer Science - Year 1", department: "DEP001", year: 1, semester: 1 },
    { id: "C002", name: "Computer Science - Year 2", department: "DEP001", year: 2, semester: 3 },
    { id: "C003", name: "Electrical Engineering - Year 1", department: "DEP002", year: 1, semester: 1 },
    { id: "C004", name: "Mathematics - Year 1", department: "DEP003", year: 1, semester: 1 }
  ]);
  
  const [students, setStudents] = useState([
    { id: "S001", name: "John Doe", email: "john.doe@example.com", department: "", classId: "" },
    { id: "S002", name: "Jane Smith", email: "jane.smith@example.com", department: "", classId: "" },
    { id: "S003", name: "Alice Johnson", email: "alice.j@example.com", department: "", classId: "" },
    { id: "S004", name: "Bob Brown", email: "bob.b@example.com", department: "", classId: "" },
    { id: "S005", name: "Charlie Davis", email: "charlie.d@example.com", department: "", classId: "" }
  ]);
  
  // Filter states
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  
  // Selection states
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  
  // Filter unassigned students only
  const unassignedStudents = students.filter(s => !s.department && !s.classId);
  
  // Filter classes by department
  const filteredClasses = selectedDepartment 
    ? classes.filter(c => c.department === selectedDepartment)
    : classes;
  
  const handleAssign = () => {
    // Would make API call in real application
    setStudents(prevStudents => 
      prevStudents.map(student => 
        selectedStudents.includes(student.id)
          ? { ...student, department: selectedDepartment, classId: selectedClass }
          : student
      )
    );
    
    // Reset selections
    setSelectedStudents([]);
    
    // Show success message
    alert(`Successfully assigned ${selectedStudents.length} students to the selected department and class!`);
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <AdminSidebar activePage="users" />
      
      <div className="pl-20">
        <header className="h-20 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md flex items-center justify-between px-8">
          <div className="flex items-center">
            <Link href="/admin/users" className="mr-4">
              <ArrowLeft className="h-5 w-5 text-zinc-400 hover:text-white" />
            </Link>
            <h1 className="text-xl font-bold">Bulk Assign Students</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-zinc-800 text-zinc-300 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-white">
                AU
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-zinc-400">A001</p>
              </div>
            </div>
          </div>
        </header>
        
        <main className="px-8 py-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Assignment Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Department</Label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                    {departments.map(dept => (
                      <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Class</Label>
                <Select 
                  value={selectedClass} 
                  onValueChange={setSelectedClass}
                  disabled={!selectedDepartment}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                    {filteredClasses.map(cls => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name} (Year {cls.year}, Semester {cls.semester})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden mb-8">
            <div className="p-6 border-b border-zinc-800">
              <h2 className="text-xl font-bold">Unassigned Students</h2>
              <p className="text-zinc-400">Select students to assign to the selected department and class</p>
            </div>
            
            <div className="p-6">
              {unassignedStudents.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-zinc-800/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        <input 
                          type="checkbox" 
                          className="rounded bg-zinc-800 border-zinc-700 text-purple-600"
                          onChange={e => {
                            if (e.target.checked) {
                              setSelectedStudents(unassignedStudents.map(s => s.id));
                            } else {
                              setSelectedStudents([]);
                            }
                          }}
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {unassignedStudents.map(student => (
                      <tr key={student.id} className="hover:bg-zinc-800/30">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input 
                            type="checkbox" 
                            className="rounded bg-zinc-800 border-zinc-700 text-purple-600"
                            checked={selectedStudents.includes(student.id)}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectedStudents(prev => [...prev, student.id]);
                              } else {
                                setSelectedStudents(prev => prev.filter(id => id !== student.id));
                              }
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-zinc-400">No unassigned students found.</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              disabled={!selectedDepartment || !selectedClass || selectedStudents.length === 0}
              onClick={handleAssign}
            >
              Assign Selected Students
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
} 