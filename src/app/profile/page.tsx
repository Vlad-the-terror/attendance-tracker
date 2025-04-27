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
  Edit,
  Settings,
  Lock,
  Shield,
  LogOut,
  Mail,
  Phone,
  MapPin,
  Cake,
  FileText,
  Save,
  Check,
  Upload
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export default function ProfilePage() {
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Mock student data
  const studentData = {
    name: "John Doe",
    rollNumber: "S001",
    registrationNumber: "REG20230001",
    email: "john.doe@example.edu",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "Jan 15, 2004",
    branch: "Computer Science",
    semester: "2nd Semester",
    address: "123 College Street, University Town, CA 90210",
    enrollmentDate: "August 2023",
    guardianName: "Robert Doe",
    guardianContact: "+1 (555) 987-6543",
    profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop",
    bloodGroup: "O+",
    hosteler: true,
    hostelDetails: {
      hostelName: "Phoenix Block",
      roomNumber: "P-234",
      blockName: "B Block"
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Side Navigation */}
      <div className="fixed left-0 top-0 h-full w-20 bg-zinc-900 border-r border-zinc-800 flex flex-col items-center py-8 z-10">
        <div className="mb-10">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
        </div>
        
        <nav className="flex flex-col items-center space-y-8">
          <Link 
            href="/student/dashboard" 
            className="group relative p-3 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            aria-label="Dashboard"
          >
            <Home className="h-6 w-6" />
            <span className="absolute left-16 bg-zinc-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Dashboard
            </span>
          </Link>
          <Link 
            href="/student/attendance" 
            className="group relative p-3 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            aria-label="Attendance"
          >
            <Calendar className="h-6 w-6" />
            <span className="absolute left-16 bg-zinc-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Attendance
            </span>
          </Link>
          <Link 
            href="/student/subjects" 
            className="group relative p-3 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            aria-label="Subjects"
          >
            <Book className="h-6 w-6" />
            <span className="absolute left-16 bg-zinc-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Subjects
            </span>
          </Link>
          <Link 
            href="/student/timetable" 
            className="group relative p-3 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            aria-label="Timetable"
          >
            <Clock className="h-6 w-6" />
            <span className="absolute left-16 bg-zinc-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Timetable
            </span>
          </Link>
        </nav>
        
        <div className="mt-auto">
          <Link 
            href="/profile" 
            className="group relative p-3 rounded-xl bg-zinc-800 text-purple-500"
            aria-label="Profile"
          >
            <User className="h-6 w-6" />
            <span className="absolute left-16 bg-zinc-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Profile
            </span>
          </Link>
        </div>
      </div>

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
          {/* Back Link and Edit Button */}
          <div className="flex justify-between mb-8">
            <Link 
              href="/student/dashboard" 
              className="flex items-center text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              <span>Back to Dashboard</span>
            </Link>
            
            <Button 
              onClick={() => setIsEditMode(!isEditMode)} 
              className={isEditMode ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"}
            >
              {isEditMode ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Overview */}
            <div className="lg:col-span-1">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle>Profile Overview</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center pt-4">
                  <div className="relative mb-6 group">
                    <Avatar className="h-32 w-32 border-4 border-zinc-800">
                      <AvatarImage src={studentData.profileImage} alt={studentData.name} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-600 to-indigo-700 text-3xl">
                        {studentData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditMode && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="outline" className="bg-zinc-900 border-zinc-700">
                          <Upload className="h-4 w-4 mr-2" />
                          Change
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-bold mb-1">{studentData.name}</h2>
                  <p className="text-sm text-zinc-400 mb-4">{studentData.branch}</p>
                  
                  <div className="grid grid-cols-2 gap-4 w-full mt-2">
                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <p className="text-xs text-zinc-400 mb-1">Roll Number</p>
                      <p className="font-medium">{studentData.rollNumber}</p>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <p className="text-xs text-zinc-400 mb-1">Semester</p>
                      <p className="font-medium">{studentData.semester}</p>
                    </div>
                  </div>
                  
                  <div className="w-full mt-4 space-y-4">
                    <div className="flex items-center p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                      <Mail className="h-5 w-5 text-zinc-400 mr-3" />
                      <div>
                        <p className="text-xs text-zinc-400">Email</p>
                        <p className="text-sm truncate">{studentData.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                      <Phone className="h-5 w-5 text-zinc-400 mr-3" />
                      <div>
                        <p className="text-xs text-zinc-400">Phone</p>
                        <p className="text-sm">{studentData.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                      <Cake className="h-5 w-5 text-zinc-400 mr-3" />
                      <div>
                        <p className="text-xs text-zinc-400">Date of Birth</p>
                        <p className="text-sm">{studentData.dateOfBirth}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                      <MapPin className="h-5 w-5 text-zinc-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-xs text-zinc-400">Address</p>
                        <p className="text-sm">{studentData.address}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-center border-t border-zinc-800 pt-6">
                  <Button variant="outline" className="flex items-center bg-zinc-800 border-zinc-700 hover:bg-zinc-700">
                    <FileText className="h-4 w-4 mr-2" />
                    Download ID Card
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Details Tabs */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="bg-zinc-800 p-1 mb-6">
                  <TabsTrigger 
                    value="personal"
                    className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
                  >
                    Personal Information
                  </TabsTrigger>
                  <TabsTrigger 
                    value="academic"
                    className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
                  >
                    Academic Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security"
                    className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
                  >
                    Security
                  </TabsTrigger>
                </TabsList>
                
                {/* Personal Information Tab */}
                <TabsContent value="personal">
                  <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Manage your personal details
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input 
                            id="fullName" 
                            defaultValue={studentData.name} 
                            className="bg-zinc-800 border-zinc-700 focus:border-purple-600"
                            disabled={!isEditMode}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            defaultValue={studentData.email} 
                            className="bg-zinc-800 border-zinc-700 focus:border-purple-600"
                            disabled={!isEditMode}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            defaultValue={studentData.phone} 
                            className="bg-zinc-800 border-zinc-700 focus:border-purple-600"
                            disabled={!isEditMode}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input 
                            id="dob" 
                            defaultValue={studentData.dateOfBirth} 
                            className="bg-zinc-800 border-zinc-700 focus:border-purple-600"
                            disabled={!isEditMode}
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input 
                            id="address" 
                            defaultValue={studentData.address} 
                            className="bg-zinc-800 border-zinc-700 focus:border-purple-600"
                            disabled={!isEditMode}
                          />
                        </div>
                      </div>
                      
                      <Separator className="bg-zinc-800" />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Guardian Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="guardianName">Guardian Name</Label>
                            <Input 
                              id="guardianName" 
                              defaultValue={studentData.guardianName} 
                              className="bg-zinc-800 border-zinc-700 focus:border-purple-600"
                              disabled={!isEditMode}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="guardianContact">Guardian Contact</Label>
                            <Input 
                              id="guardianContact" 
                              defaultValue={studentData.guardianContact} 
                              className="bg-zinc-800 border-zinc-700 focus:border-purple-600"
                              disabled={!isEditMode}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Separator className="bg-zinc-800" />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Medical Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="bloodGroup">Blood Group</Label>
                            <Input 
                              id="bloodGroup" 
                              defaultValue={studentData.bloodGroup} 
                              className="bg-zinc-800 border-zinc-700 focus:border-purple-600"
                              disabled={!isEditMode}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Academic Details Tab */}
                <TabsContent value="academic">
                  <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                      <CardTitle>Academic Details</CardTitle>
                      <CardDescription>
                        Your academic and enrollment information
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="rollNumber">Roll Number</Label>
                          <Input 
                            id="rollNumber" 
                            defaultValue={studentData.rollNumber} 
                            className="bg-zinc-800 border-zinc-700 focus:border-purple-600"
                            disabled={true}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="regNumber">Registration Number</Label>
                          <Input 
                            id="regNumber" 
                            defaultValue={studentData.registrationNumber} 
                            className="bg-zinc-800 border-zinc-700 focus:border-purple-600"
                            disabled={true}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="branch">Branch</Label>
                          <Input 
                            id="branch" 
                            defaultValue={studentData.branch} 
                            className="bg-zinc-800 border-zinc-700 focus:border-purple-600"
                            disabled={true}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="semester">Current Semester</Label>
                          <Input 
                            id="semester" 
                            defaultValue={studentData.semester} 
                            className="bg-zinc-800 border-zinc-700 focus:border-purple-600"
                            disabled={true}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="enrollmentDate">Enrollment Date</Label>
                          <Input 
                            id="enrollmentDate" 
                            defaultValue={studentData.enrollmentDate} 
                            className="bg-zinc-800 border-zinc-700 focus:border-purple-600"
                            disabled={true}
                          />
                        </div>
                      </div>
                      
                      {studentData.hosteler && (
                        <>
                          <Separator className="bg-zinc-800" />
                          
                          <div>
                            <h3 className="text-lg font-medium mb-4">Hostel Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="space-y-2">
                                <Label htmlFor="hostelName">Hostel Name</Label>
                                <Input 
                                  id="hostelName" 
                                  defaultValue={studentData.hostelDetails.hostelName} 
                                  className="bg-zinc-800 border-zinc-700 focus:border-purple-600"
                                  disabled={true}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="blockName">Block Name</Label>
                                <Input 
                                  id="blockName" 
                                  defaultValue={studentData.hostelDetails.blockName} 
                                  className="bg-zinc-800 border-zinc-700 focus:border-purple-600"
                                  disabled={true}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="roomNumber">Room Number</Label>
                                <Input 
                                  id="roomNumber" 
                                  defaultValue={studentData.hostelDetails.roomNumber} 
                                  className="bg-zinc-800 border-zinc-700 focus:border-purple-600"
                                  disabled={true}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Security Tab */}
                <TabsContent value="security">
                  <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>
                        Manage your account security settings
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Change Password</h3>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input 
                              id="currentPassword" 
                              type="password" 
                              placeholder="Enter your current password" 
                              className="bg-zinc-800 border-zinc-700 focus:border-purple-600"
                              disabled={!isEditMode}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input 
                              id="newPassword" 
                              type="password" 
                              placeholder="Enter new password" 
                              className="bg-zinc-800 border-zinc-700 focus:border-purple-600"
                              disabled={!isEditMode}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input 
                              id="confirmPassword" 
                              type="password" 
                              placeholder="Confirm new password" 
                              className="bg-zinc-800 border-zinc-700 focus:border-purple-600"
                              disabled={!isEditMode}
                            />
                          </div>
                          
                          <Button className="mt-2 w-full bg-purple-600 hover:bg-purple-700" disabled={!isEditMode}>
                            <Lock className="h-4 w-4 mr-2" />
                            Update Password
                          </Button>
                        </div>
                      </div>
                      
                      <Separator className="bg-zinc-800" />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Login Notifications</h3>
                        
                        <div className="flex items-center justify-between py-2">
                          <div className="space-y-0.5">
                            <Label>Email Notifications</Label>
                            <p className="text-sm text-zinc-400">
                              Receive email alerts when logging in from a new device
                            </p>
                          </div>
                          <Switch 
                            checked={true} 
                            disabled={!isEditMode}
                            className="data-[state=checked]:bg-purple-600"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between py-2">
                          <div className="space-y-0.5">
                            <Label>SMS Notifications</Label>
                            <p className="text-sm text-zinc-400">
                              Receive SMS alerts for important account activities
                            </p>
                          </div>
                          <Switch 
                            checked={false} 
                            disabled={!isEditMode}
                            className="data-[state=checked]:bg-purple-600"
                          />
                        </div>
                      </div>
                      
                      <Separator className="bg-zinc-800" />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-red-500">Danger Zone</h3>
                        
                        <Button 
                          variant="destructive" 
                          className="w-full" 
                          disabled={!isEditMode}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Log Out from All Devices
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 