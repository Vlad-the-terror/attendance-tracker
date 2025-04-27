"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { Bell, ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AddUser() {
  const router = useRouter();
  
  // Mock departments and classes data
  const [departments, setDepartments] = useState([
    { id: "DEP001", name: "Computer Science" },
    { id: "DEP002", name: "Electrical Engineering" },
    { id: "DEP003", name: "Mathematics" },
    { id: "DEP004", name: "Physics" }
  ]);
  
  const [allClasses, setAllClasses] = useState([
    { id: "C001", name: "Computer Science - Year 1", departmentId: "DEP001", year: 1, semester: 1 },
    { id: "C002", name: "Computer Science - Year 2", departmentId: "DEP001", year: 2, semester: 3 },
    { id: "C003", name: "Electrical Engineering - Year 1", departmentId: "DEP002", year: 1, semester: 1 },
    { id: "C004", name: "Mathematics - Year 1", departmentId: "DEP003", year: 1, semester: 1 }
  ]);
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    role: "Student",
    departmentId: "",
    department: "",
    classId: "",
    semester: "",
    enrollmentYear: "",
    status: "Active",
    password: "",
    confirmPassword: ""
  });
  
  const [errors, setErrors] = useState({
    id: "",
    name: "",
    email: "",
    departmentId: "",
    classId: "",
    password: "",
    confirmPassword: ""
  });
  
  // Filter classes by selected department
  const [filteredClasses, setFilteredClasses] = useState(allClasses);
  
  useEffect(() => {
    if (formData.departmentId) {
      setFilteredClasses(allClasses.filter(c => c.departmentId === formData.departmentId));
    } else {
      setFilteredClasses(allClasses);
    }
  }, [formData.departmentId, allClasses]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear the error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
    
    // When department is selected (from select fields), update departmentId
    if (name === "department") {
      const dept = departments.find(d => d.name === value);
      if (dept) {
        setFormData(prev => ({
          ...prev,
          departmentId: dept.id
        }));
      }
    }
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear any errors
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
    
    // Special handling for department
    if (name === "departmentId") {
      const dept = departments.find(d => d.id === value);
      if (dept) {
        setFormData(prev => ({
          ...prev,
          department: dept.name,
          // Reset class when department changes
          classId: ""
        }));
      }
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      id: "",
      name: "",
      email: "",
      departmentId: "",
      classId: "",
      password: "",
      confirmPassword: ""
    };
    
    // Validate required fields
    if (!formData.id.trim()) {
      newErrors.id = "ID is required";
      isValid = false;
    }
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }
    
    if (formData.role === "Student" && !formData.departmentId) {
      newErrors.departmentId = "Department is required for students";
      isValid = false;
    }
    
    if (formData.role === "Student" && !formData.classId) {
      newErrors.classId = "Class/Batch is required for students";
      isValid = false;
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, this would send the data to an API
      console.log("Form submitted:", formData);
      
      // Redirect back to users list
      router.push("/admin/users");
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Side Navigation */}
      <AdminSidebar activePage="users" />

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
          <div className="flex items-center mb-8">
            <Link href="/admin/users" className="mr-4">
              <Button variant="outline" size="icon" className="border-zinc-700 h-10 w-10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Add New User</h1>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 max-w-3xl">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User ID */}
                <div className="space-y-2">
                  <Label htmlFor="id">User ID</Label>
                  <Input
                    id="id"
                    name="id"
                    placeholder="Enter user ID"
                    value={formData.id}
                    onChange={handleChange}
                    className={`bg-zinc-800 border ${errors.id ? 'border-red-500' : 'border-zinc-700'}`}
                  />
                  {errors.id && <p className="text-xs text-red-500">{errors.id}</p>}
                </div>
                
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name" 
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`bg-zinc-800 border ${errors.name ? 'border-red-500' : 'border-zinc-700'}`}
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>
                
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    className={`bg-zinc-800 border ${errors.email ? 'border-red-500' : 'border-zinc-700'}`}
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>
                
                {/* Role */}
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select 
                    value={formData.role} 
                    onValueChange={(value: string) => handleSelectChange("role", value)}
                  >
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Teacher">Teacher</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Department */}
                <div className="space-y-2">
                  <Label htmlFor="departmentId">Department</Label>
                  <Select 
                    value={formData.departmentId} 
                    onValueChange={(value: string) => handleSelectChange("departmentId", value)}
                  >
                    <SelectTrigger className={`bg-zinc-800 border-zinc-700 text-white ${errors.departmentId ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                      {departments.map(dept => (
                        <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.departmentId && <p className="text-xs text-red-500">{errors.departmentId}</p>}
                </div>
                
                {/* Status */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value: string) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Additional fields for Students */}
                {formData.role === "Student" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="classId">Class/Batch</Label>
                      <Select 
                        value={formData.classId} 
                        onValueChange={(value: string) => handleSelectChange("classId", value)}
                        disabled={!formData.departmentId}
                      >
                        <SelectTrigger className={`bg-zinc-800 border-zinc-700 text-white ${errors.classId ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                          {filteredClasses.map(cls => (
                            <SelectItem key={cls.id} value={cls.id}>
                              {cls.name} (Year {cls.year}, Sem {cls.semester})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.classId && <p className="text-xs text-red-500">{errors.classId}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="enrollmentYear">Enrollment Year</Label>
                      <Input
                        id="enrollmentYear"
                        name="enrollmentYear"
                        placeholder="e.g., 2023"
                        value={formData.enrollmentYear}
                        onChange={handleChange}
                        className="bg-zinc-800 border border-zinc-700"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="semester">Current Semester</Label>
                      <Select 
                        value={formData.semester} 
                        onValueChange={(value: string) => handleSelectChange("semester", value)}
                      >
                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                            <SelectItem key={sem} value={sem.toString()}>Semester {sem}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                
                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`bg-zinc-800 border ${errors.password ? 'border-red-500' : 'border-zinc-700'}`}
                  />
                  {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                </div>
                
                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`bg-zinc-800 border ${errors.confirmPassword ? 'border-red-500' : 'border-zinc-700'}`}
                  />
                  {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-4">
                <Link href="/admin/users">
                  <Button variant="outline" className="border-zinc-700">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  <Save className="h-4 w-4 mr-2" />
                  Create User
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
} 