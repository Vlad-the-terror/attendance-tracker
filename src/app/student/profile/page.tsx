"use client";

import Link from "next/link";
import { 
  Bell, 
  ChevronLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Book,
  GraduationCap,
  Edit,
  User as UserIcon,
  ShieldCheck,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentSidebar from "@/components/layout/StudentSidebar";
import { useRouter } from "next/navigation";

export default function StudentProfile() {
  const router = useRouter();

  // Mock student data - would come from API/backend in production
  const studentData = {
    name: "John Doe",
    rollNumber: "S001",
    registrationNumber: "REG20230001",
    session: "2023-2024",
    branch: "Computer Science",
    class: "CS01",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Campus Street, University Town, ST 12345",
    dateOfBirth: "May 15, 2000",
    joinDate: "September 1, 2022",
    profileImage: null, // Would be a URL in real data
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Parent",
      phone: "+1 (555) 987-6543"
    },
    education: [
      {
        degree: "High School Diploma",
        institution: "Lincoln High School",
        year: "2018-2022",
        percentage: "92%"
      }
    ]
  };
  
  const handleLogout = () => {
    // In a real application, this would handle session cleanup
    router.push("/");
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Side Navigation */}
      <StudentSidebar activePage="profile" />

      {/* Main Content */}
      <div className="pl-20">
        {/* Top Bar */}
        <header className="h-20 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md flex items-center justify-between px-8">
          <h1 className="text-xl font-bold">My Profile</h1>
          
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
          {/* Back Link */}
          <div className="mb-8">
            <Link 
              href="/student/dashboard" 
              className="flex items-center text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          
          {/* Profile Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Profile Card */}
            <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6">
              <div className="flex flex-col items-center mb-6 pb-6 border-b border-zinc-800">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-3xl font-bold text-white mb-4">
                  {studentData.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h2 className="text-xl font-bold">{studentData.name}</h2>
                <p className="text-zinc-400 text-sm mb-2">{studentData.branch}</p>
                <div className="flex space-x-2 mt-2">
                  <Button variant="outline" size="sm" className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <UserIcon className="h-5 w-5 text-purple-500 mr-3" />
                  <div>
                    <p className="text-sm text-zinc-400">Student ID</p>
                    <p className="font-medium">{studentData.rollNumber}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-purple-500 mr-3" />
                  <div>
                    <p className="text-sm text-zinc-400">Email</p>
                    <p className="font-medium">{studentData.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-purple-500 mr-3" />
                  <div>
                    <p className="text-sm text-zinc-400">Phone</p>
                    <p className="font-medium">{studentData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-purple-500 mr-3" />
                  <div>
                    <p className="text-sm text-zinc-400">Address</p>
                    <p className="font-medium">{studentData.address}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-purple-500 mr-3" />
                  <div>
                    <p className="text-sm text-zinc-400">Date of Birth</p>
                    <p className="font-medium">{studentData.dateOfBirth}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <Button 
                  onClick={handleLogout}
                  className="w-full bg-red-600/20 text-red-400 hover:bg-red-600/30 hover:text-red-300"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
            
            {/* Main Profile Details */}
            <div className="md:col-span-2">
              <Tabs defaultValue="academic" className="w-full">
                <TabsList className="bg-zinc-800 p-1 mb-6">
                  <TabsTrigger 
                    value="academic"
                    className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
                  >
                    Academic Information
                  </TabsTrigger>
                  <TabsTrigger 
                    value="personal"
                    className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
                  >
                    Personal Information
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security"
                    className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
                  >
                    Security
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="academic" className="space-y-6">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2 text-purple-500" />
                      Academic Details
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-zinc-400 mb-1">Registration Number</p>
                          <p className="font-medium">{studentData.registrationNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-400 mb-1">Branch</p>
                          <p className="font-medium">{studentData.branch}</p>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-400 mb-1">Class</p>
                          <p className="font-medium">{studentData.class}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-zinc-400 mb-1">Session</p>
                          <p className="font-medium">{studentData.session}</p>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-400 mb-1">Joined Date</p>
                          <p className="font-medium">{studentData.joinDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Book className="h-5 w-5 mr-2 text-purple-500" />
                      Education Background
                    </h3>
                    
                    <div className="space-y-4">
                      {studentData.education.map((edu, index) => (
                        <div key={index} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium">{edu.degree}</h4>
                              <p className="text-sm text-zinc-400">{edu.institution}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">{edu.year}</p>
                              <p className="text-sm text-green-400">{edu.percentage}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="personal" className="space-y-6">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
                    <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-zinc-400 mb-1">Name</p>
                          <p className="font-medium">{studentData.emergencyContact.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-400 mb-1">Relationship</p>
                          <p className="font-medium">{studentData.emergencyContact.relationship}</p>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-400 mb-1">Phone</p>
                          <p className="font-medium">{studentData.emergencyContact.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="security" className="space-y-6">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <ShieldCheck className="h-5 w-5 mr-2 text-purple-500" />
                      Account Security
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Change Password</h4>
                            <p className="text-sm text-zinc-400">Update your password regularly</p>
                          </div>
                          <Button variant="outline" className="bg-zinc-700 hover:bg-zinc-600 border-zinc-600">
                            Change
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Two-Factor Authentication</h4>
                            <p className="text-sm text-zinc-400">Add an extra layer of security</p>
                          </div>
                          <Button variant="outline" className="bg-zinc-700 hover:bg-zinc-600 border-zinc-600">
                            Setup
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 