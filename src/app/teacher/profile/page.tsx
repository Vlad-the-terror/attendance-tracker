"use client";

import { useRouter } from "next/navigation";
import React from "react";
import TeacherSidebar from "@/components/layout/TeacherSidebar";
import { Bell, Mail, Phone, MapPin, Calendar, Building, BookOpen, GraduationCap, Award, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TeacherProfilePage() {
  const router = useRouter();
  
  // Mock teacher data
  const teacherData = {
    name: "Dr. Robert Anderson",
    id: "T001",
    department: "Computer Science",
    email: "r.anderson@university.edu",
    phone: "+1 (555) 123-4567",
    address: "123 Faculty Avenue, University Campus",
    dateOfBirth: "10-05-1975",
    joinDate: "15-08-2010",
    designation: "Associate Professor",
    qualification: "Ph.D. in Computer Science",
    specialization: "Machine Learning and Algorithms",
    teachingExperience: "15 years",
    awards: [
      "Best Faculty Award 2022",
      "Research Excellence Award 2018"
    ],
    publications: [
      "Advanced Algorithms for Data Analysis (2020)",
      "Machine Learning: Theory and Practice (2017)"
    ]
  };
  
  // Logout function
  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Side Navigation */}
      <TeacherSidebar activePage="profile" />

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
                <p className="text-sm font-medium">{teacherData.name}</p>
                <p className="text-xs text-zinc-400">{teacherData.id}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="px-8 py-8">
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-3 md:col-span-1">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="flex flex-col items-center">
                  <div className="h-32 w-32 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-4xl font-bold text-white mb-4">
                    RA
                  </div>
                  
                  <h2 className="text-2xl font-bold">{teacherData.name}</h2>
                  <p className="text-zinc-400 mb-2">{teacherData.designation}</p>
                  <p className="bg-purple-900/30 text-purple-400 px-3 py-1 rounded-full text-sm mb-6">
                    {teacherData.id}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-zinc-700 mb-2"
                  >
                    Edit Profile
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-red-800/50 text-red-500 hover:bg-red-950/20"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mt-6">
                <h3 className="text-lg font-bold mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-zinc-500 mr-3 mt-0.5" />
                    <div>
                      <p className="text-zinc-400 text-sm">Email</p>
                      <p>{teacherData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-zinc-500 mr-3 mt-0.5" />
                    <div>
                      <p className="text-zinc-400 text-sm">Phone</p>
                      <p>{teacherData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-zinc-500 mr-3 mt-0.5" />
                    <div>
                      <p className="text-zinc-400 text-sm">Address</p>
                      <p>{teacherData.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-span-3 md:col-span-2">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold mb-4">Professional Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Building className="h-5 w-5 text-zinc-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-zinc-400 text-sm">Department</p>
                        <p>{teacherData.department}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-zinc-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-zinc-400 text-sm">Joined On</p>
                        <p>{teacherData.joinDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <BookOpen className="h-5 w-5 text-zinc-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-zinc-400 text-sm">Teaching Experience</p>
                        <p>{teacherData.teachingExperience}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <GraduationCap className="h-5 w-5 text-zinc-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-zinc-400 text-sm">Qualification</p>
                        <p>{teacherData.qualification}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <BookOpen className="h-5 w-5 text-zinc-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-zinc-400 text-sm">Specialization</p>
                        <p>{teacherData.specialization}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <Award className="h-5 w-5 text-purple-500 mr-2" />
                    <h3 className="text-lg font-bold">Awards & Recognition</h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {teacherData.awards.map((award, index) => (
                      <li key={index} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-purple-500 mr-3"></div>
                        <span>{award}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <BookOpen className="h-5 w-5 text-purple-500 mr-2" />
                    <h3 className="text-lg font-bold">Publications</h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {teacherData.publications.map((publication, index) => (
                      <li key={index} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-purple-500 mr-3"></div>
                        <span>{publication}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 