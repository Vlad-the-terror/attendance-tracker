"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { Bell, Users, Pencil, Trash2, School, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDepartments() {
  // Mock departments data
  const initialDepartments = [
    { 
      id: "DEP001", 
      name: "Computer Science", 
      code: "CS",
      head: "Dr. Robert Anderson",
      totalTeachers: 6,
      totalStudents: 120,
      totalClasses: 4
    },
    { 
      id: "DEP002", 
      name: "Electrical Engineering", 
      code: "EE",
      head: "Dr. Jane Wilson",
      totalTeachers: 5,
      totalStudents: 85,
      totalClasses: 3
    },
    { 
      id: "DEP003", 
      name: "Mathematics", 
      code: "MATH",
      head: "Prof. Maria Garcia",
      totalTeachers: 4,
      totalStudents: 65,
      totalClasses: 2
    },
    { 
      id: "DEP004", 
      name: "Physics", 
      code: "PHY",
      head: "Dr. Michael Brown",
      totalTeachers: 3,
      totalStudents: 50,
      totalClasses: 2
    },
    { 
      id: "DEP005", 
      name: "Administration", 
      code: "ADMIN",
      head: "Admin User",
      totalTeachers: 6,
      totalStudents: 0,
      totalClasses: 0
    }
  ];

  const [departments, setDepartments] = useState(initialDepartments);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter departments based on search query
  const filteredDepartments = departments.filter(dept => 
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Side Navigation */}
      <AdminSidebar activePage="departments" />

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
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-zinc-400">A001</p>
              </div>
            </div>
          </div>
        </header>

        <main className="px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Department Management</h1>
            
            <Link href="/admin/departments/add">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Department
              </Button>
            </Link>
          </div>
          
          {/* Search */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                type="text"
                placeholder="Search departments by name, code, or head..."
                className="block w-full pl-10 pr-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Departments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepartments.map((department) => (
              <div 
                key={department.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors"
              >
                <div className="p-6 border-b border-zinc-800">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold">{department.name}</h2>
                      <p className="text-zinc-400 text-sm">{department.code}</p>
                    </div>
                    <span className="bg-purple-900/30 text-purple-400 px-2 py-1 rounded text-xs">
                      {department.id}
                    </span>
                  </div>
                  
                  <p className="text-zinc-300 mb-2">
                    <span className="text-zinc-500">Head:</span> {department.head}
                  </p>
                </div>
                
                <div className="grid grid-cols-3 divide-x divide-zinc-800 border-b border-zinc-800">
                  <div className="p-4 text-center">
                    <p className="text-zinc-400 text-xs">Teachers</p>
                    <p className="font-bold text-lg">{department.totalTeachers}</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-zinc-400 text-xs">Students</p>
                    <p className="font-bold text-lg">{department.totalStudents}</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-zinc-400 text-xs">Classes</p>
                    <p className="font-bold text-lg">{department.totalClasses}</p>
                  </div>
                </div>
                
                <div className="p-4 flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-zinc-700"
                    onClick={() => {}}
                  >
                    <Pencil className="h-4 w-4 mr-2 text-blue-400" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-zinc-700"
                    onClick={() => {}}
                  >
                    <Trash2 className="h-4 w-4 mr-2 text-red-400" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty State */}
          {filteredDepartments.length === 0 && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
              <School className="h-12 w-12 mx-auto text-zinc-700 mb-4" />
              <h3 className="text-xl font-bold mb-2">No departments found</h3>
              <p className="text-zinc-400 max-w-md mx-auto mb-6">
                No departments match your search criteria. Try a different search term or add a new department.
              </p>
              <Link href="/admin/departments/add">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Department
                </Button>
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 