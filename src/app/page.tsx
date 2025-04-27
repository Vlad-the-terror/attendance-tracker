"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<string>("student");
  
  // Mock credentials
  const mockCredentials = {
    student: { email: "student@example.com", password: "password123" },
    teacher: { email: "teacher@example.com", password: "password123" },
    admin: { email: "admin@example.com", password: "password123" }
  };
  
  // Form states
  const [studentCredentials, setStudentCredentials] = useState({ email: "", password: "" });
  const [teacherCredentials, setTeacherCredentials] = useState({ email: "", password: "" });
  const [adminCredentials, setAdminCredentials] = useState({ email: "", password: "" });
  
  // Error states
  const [studentError, setStudentError] = useState("");
  const [teacherError, setTeacherError] = useState("");
  const [adminError, setAdminError] = useState("");

  // Handle login for different user types
  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentError("");
    
    if (studentCredentials.email === mockCredentials.student.email && 
        studentCredentials.password === mockCredentials.student.password) {
      router.push("/student/dashboard");
    } else {
      setStudentError("Invalid email or password");
    }
  };
  
  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setTeacherError("");
    
    if (teacherCredentials.email === mockCredentials.teacher.email && 
        teacherCredentials.password === mockCredentials.teacher.password) {
      router.push("/teacher/dashboard");
    } else {
      setTeacherError("Invalid email or password");
    }
  };
  
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError("");
    
    if (adminCredentials.email === mockCredentials.admin.email && 
        adminCredentials.password === mockCredentials.admin.password) {
      router.push("/admin/dashboard");
    } else {
      setAdminError("Invalid email or password");
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Side - Login Form */}
      <div className="flex-1 p-8 sm:p-10 md:p-20 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="flex items-center mb-8">
            <div className="h-8 w-8 bg-primary rounded-md mr-3 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-white"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h1 className="text-xl font-bold">PRΞSNCΞ</h1>
          </div>

          <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
          <p className="text-muted-foreground mb-8">Please enter your details</p>

          <Tabs defaultValue="student" className="mb-8" onValueChange={setUserType}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="teacher">Teacher</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            
            <TabsContent value="student" className="mt-6">
              <form className="space-y-6" onSubmit={handleStudentLogin}>
                <div className="space-y-2">
                  <Label htmlFor="student-email">Student Email</Label>
                  <Input 
                    id="student-email" 
                    type="email" 
                    placeholder="Enter your student email" 
                    value={studentCredentials.email}
                    onChange={(e) => setStudentCredentials({...studentCredentials, email: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <Input 
                    id="student-password" 
                    type="password" 
                    placeholder="Enter your password" 
                    value={studentCredentials.password}
                    onChange={(e) => setStudentCredentials({...studentCredentials, password: e.target.value})}
                    required
                  />
                </div>
                {studentError && (
                  <p className="text-sm text-destructive">{studentError}</p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="student-remember" />
                    <label
                      htmlFor="student-remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Button type="submit" className="w-full">Sign in</Button>
                
                <div className="text-sm text-center mt-4 text-muted-foreground">
                  <p className="mb-1">For demo, use:</p>
                  <p>Email: <span className="text-foreground">student@example.com</span></p>
                  <p>Password: <span className="text-foreground">password123</span></p>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="teacher" className="mt-6">
              <form className="space-y-6" onSubmit={handleTeacherLogin}>
                <div className="space-y-2">
                  <Label htmlFor="teacher-email">Email</Label>
                  <Input 
                    id="teacher-email" 
                    type="email" 
                    placeholder="Enter your email" 
                    value={teacherCredentials.email}
                    onChange={(e) => setTeacherCredentials({...teacherCredentials, email: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacher-password">Password</Label>
                  <Input 
                    id="teacher-password" 
                    type="password" 
                    placeholder="Enter your password" 
                    value={teacherCredentials.password}
                    onChange={(e) => setTeacherCredentials({...teacherCredentials, password: e.target.value})}
                    required
                  />
                </div>
                {teacherError && (
                  <p className="text-sm text-destructive">{teacherError}</p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="teacher-remember" />
                    <label
                      htmlFor="teacher-remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Button type="submit" className="w-full">Sign in</Button>
                
                <div className="text-sm text-center mt-4 text-muted-foreground">
                  <p className="mb-1">For demo, use:</p>
                  <p>Email: <span className="text-foreground">teacher@example.com</span></p>
                  <p>Password: <span className="text-foreground">password123</span></p>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="admin" className="mt-6">
              <form className="space-y-6" onSubmit={handleAdminLogin}>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input 
                    id="admin-email" 
                    type="email" 
                    placeholder="Enter your admin email" 
                    value={adminCredentials.email}
                    onChange={(e) => setAdminCredentials({...adminCredentials, email: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input 
                    id="admin-password" 
                    type="password" 
                    placeholder="Enter your password" 
                    value={adminCredentials.password}
                    onChange={(e) => setAdminCredentials({...adminCredentials, password: e.target.value})}
                    required
                  />
                </div>
                {adminError && (
                  <p className="text-sm text-destructive">{adminError}</p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="admin-remember" />
                    <label
                      htmlFor="admin-remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Button type="submit" className="w-full">Sign in</Button>
                
                <div className="text-sm text-center mt-4 text-muted-foreground">
                  <p className="mb-1">For demo, use:</p>
                  <p>Email: <span className="text-foreground">admin@example.com</span></p>
                  <p>Password: <span className="text-foreground">password123</span></p>
                </div>
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a href="#" className="text-primary font-medium hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden md:flex md:flex-1 bg-primary/20 items-center justify-center p-10">
        <div className="w-full max-w-2xl flex items-center justify-center">
          <Image
            src="/students-illustration.png"
            alt="Students and teacher working together"
            width={700}
            height={700}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
} 