"use client";

import React from "react";
import TeacherSidebar from "@/components/layout/TeacherSidebar";
import { Bell } from "lucide-react";

export default function TeacherStudentsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Side Navigation */}
      <TeacherSidebar activePage="students" />

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
          <h1 className="text-3xl font-bold mb-8">Student Management</h1>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
            <p className="text-xl text-center text-zinc-400">
              This is a placeholder for the student management page.
              <br />
              You will be able to view and manage student information here.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
} 