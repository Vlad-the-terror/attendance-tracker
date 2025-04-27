"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { Bell, Users, Plus, Search, Pencil, Trash2, UserCog, UserPlus, Filter, Upload, Key, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminUsers() {
  // Mock users data
  const initialUsers = [
    { 
      id: "S001", 
      name: "John Doe", 
      email: "john.doe@example.com", 
      role: "Student", 
      department: "Computer Science", 
      status: "Active"
    },
    { 
      id: "S002", 
      name: "Jane Smith", 
      email: "jane.smith@example.com", 
      role: "Student", 
      department: "Electrical Engineering", 
      status: "Active"
    },
    { 
      id: "T001", 
      name: "Dr. Robert Anderson", 
      email: "r.anderson@example.com", 
      role: "Teacher", 
      department: "Computer Science", 
      status: "Active"
    },
    { 
      id: "T002", 
      name: "Prof. Maria Garcia", 
      email: "m.garcia@example.com", 
      role: "Teacher", 
      department: "Mathematics", 
      status: "Inactive"
    },
    { 
      id: "A001", 
      name: "Admin User", 
      email: "admin@example.com", 
      role: "Admin", 
      department: "Administration", 
      status: "Active"
    }
  ];

  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [defaultPassword, setDefaultPassword] = useState("Password123");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [userToReset, setUserToReset] = useState<{id: string, name: string} | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Filter users based on search query and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const handleCsvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCsvFile(e.target.files[0]);
      setUploadStatus("");
    }
  };

  const processCSV = async () => {
    if (!csvFile) {
      setUploadStatus("No file selected");
      return;
    }

    try {
      const fileContent = await csvFile.text();
      const lines = fileContent.split("\n");
      
      // Skip header row and filter out empty lines
      const newUsers = lines
        .slice(1)
        .filter(line => line.trim() !== "")
        .map(line => {
          const columns = line.split(",");
          // Expected CSV format: id,name,email,role,department,status
          return {
            id: columns[0]?.trim() || "",
            name: columns[1]?.trim() || "",
            email: columns[2]?.trim() || "",
            role: columns[3]?.trim() || "Student",
            department: columns[4]?.trim() || "",
            status: columns[5]?.trim() || "Active"
          };
        })
        .filter(user => user.id && user.name && user.email); // Ensure required fields exist
      
      if (newUsers.length === 0) {
        setUploadStatus("No valid users found in CSV");
        return;
      }
      
      // In a real application, you would send this data to an API
      setUsers(prevUsers => {
        // Filter out duplicates by ID
        const existingIds = new Set(prevUsers.map(user => user.id));
        const uniqueNewUsers = newUsers.filter(user => !existingIds.has(user.id));
        return [...prevUsers, ...uniqueNewUsers];
      });
      
      setUploadStatus(`Successfully added ${newUsers.length} users with default password: ${defaultPassword}`);
      setCsvFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setUploadStatus("Error processing CSV file");
      console.error("Error processing CSV:", error);
    }
  };

  const handleEditClick = (user: {id: string, name: string}) => {
    // In a real application, this would open an edit form
    // For now, we'll just reset the password
    setUserToReset(user);
    setShowResetPassword(true);
  };
  
  const handleResetPassword = () => {
    if (!userToReset) return;
    
    // In a real application, this would call an API to reset the password
    console.log(`Password reset for user ${userToReset.id} to ${defaultPassword}`);
    setResetSuccess(true);
    
    // Auto close after 2 seconds
    setTimeout(() => {
      setShowResetPassword(false);
      setUserToReset(null);
      setResetSuccess(false);
    }, 2000);
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">User Management</h1>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="border-zinc-700 bg-zinc-800"
                onClick={() => setShowBulkUpload(!showBulkUpload)}
              >
                <Upload className="h-4 w-4 mr-2" />
                Bulk Upload
              </Button>
              
              <Link href="/admin/users/assign">
                <Button 
                  variant="outline" 
                  className="border-zinc-700 bg-zinc-800"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Assign Students
                </Button>
              </Link>
              
              <Link href="/admin/users/add">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New User
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Bulk Upload Section */}
          {showBulkUpload && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8 transition-all">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Bulk Upload Users</h2>
                <button 
                  onClick={() => setShowBulkUpload(false)} 
                  className="p-1 rounded-md hover:bg-zinc-700 transition-colors"
                >
                  <X className="h-5 w-5 text-zinc-400" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Default Password for All Users</label>
                  <input
                    type="text"
                    value={defaultPassword}
                    onChange={(e) => setDefaultPassword(e.target.value)}
                    className="w-full max-w-md bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500 text-white"
                    placeholder="Enter default password"
                  />
                  <p className="mt-1 text-xs text-zinc-400">All users created via bulk upload will be assigned this password</p>
                </div>
                
                <div className="flex flex-col space-y-4 md:flex-row md:items-end md:space-y-0 md:space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">CSV File Upload</label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv"
                      onChange={handleCsvFileChange}
                      className="block w-full text-sm text-zinc-300
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-medium
                        file:bg-purple-600 file:text-white
                        hover:file:bg-purple-700"
                    />
                    <p className="mt-1 text-xs text-zinc-400">CSV Format: id,name,email,role,department,status</p>
                  </div>
                  
                  <Button 
                    onClick={processCSV} 
                    className="bg-purple-600 hover:bg-purple-700 shrink-0"
                    disabled={!csvFile}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload and Process
                  </Button>
                </div>
                
                {uploadStatus && (
                  <div className={`p-3 rounded-md ${uploadStatus.includes("Error") || uploadStatus.includes("No ") ? "bg-red-900/20 text-red-300" : "bg-green-900/20 text-green-300"}`}>
                    {uploadStatus}
                  </div>
                )}
                
                <div className="border-t border-zinc-800 pt-4 mt-4">
                  <h3 className="text-sm font-medium mb-2">Sample CSV Format</h3>
                  <pre className="bg-zinc-800/50 p-3 rounded-md text-xs overflow-x-auto">
                    id,name,email,role,department,status<br/>
                    S123,John Smith,john@example.com,Student,Computer Science,Active<br/>
                    T456,Jane Doe,jane@example.com,Teacher,Mathematics,Active<br/>
                    A789,Admin User,admin@example.com,Admin,Administration,Active
                  </pre>
                </div>
              </div>
            </div>
          )}
          
          {/* Filters and Search */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search users by name, email, or ID..."
                  className="block w-full pl-10 pr-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-zinc-500" />
                  <select
                    className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500 text-white"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                  >
                    <option value="All">All Roles</option>
                    <option value="Student">Students</option>
                    <option value="Teacher">Teachers</option>
                    <option value="Admin">Admins</option>
                  </select>
                </div>
                
                <Button variant="outline" className="border-zinc-700">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Users Table */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-zinc-800/50">
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm">{user.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium">{user.name}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-zinc-300">{user.email}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === "Student" 
                            ? "bg-blue-100/10 text-blue-300" 
                            : user.role === "Teacher" 
                            ? "bg-purple-100/10 text-purple-300" 
                            : "bg-amber-100/10 text-amber-300"
                        }`}>
                          {user.role === "Student" && (
                            <Users className="h-3 w-3 mr-1" />
                          )}
                          {user.role === "Teacher" && (
                            <UserCog className="h-3 w-3 mr-1" />
                          )}
                          {user.role === "Admin" && (
                            <UserPlus className="h-3 w-3 mr-1" />
                          )}
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm">{user.department}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === "Active" 
                            ? "bg-green-100/10 text-green-300" 
                            : "bg-red-100/10 text-red-300"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button 
                            className="p-1 rounded-md hover:bg-zinc-700 transition-colors group relative"
                            onClick={() => handleEditClick({id: user.id, name: user.name})}
                          >
                            <Pencil className="h-4 w-4 text-blue-400" />
                            <div className="absolute hidden group-hover:block -top-10 right-0 w-32 bg-zinc-800 p-2 rounded-md text-xs text-white">
                              Edit / Reset Password
                            </div>
                          </button>
                          <button className="p-1 rounded-md hover:bg-zinc-700 transition-colors group relative">
                            <Trash2 className="h-4 w-4 text-red-400" />
                            <div className="absolute hidden group-hover:block -top-10 right-0 w-24 bg-zinc-800 p-2 rounded-md text-xs text-white">
                              Delete User
                            </div>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between">
              <div className="text-sm text-zinc-400">
                Showing <span className="font-medium text-white">{filteredUsers.length}</span> out of <span className="font-medium text-white">{users.length}</span> users
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-zinc-700">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="border-zinc-700">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Reset Password Modal */}
      {showResetPassword && userToReset && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Reset User Password</h2>
              <button 
                onClick={() => {
                  setShowResetPassword(false);
                  setUserToReset(null);
                  setResetSuccess(false);
                }} 
                className="p-1 rounded-md hover:bg-zinc-700 transition-colors"
              >
                <X className="h-5 w-5 text-zinc-400" />
              </button>
            </div>
            
            {resetSuccess ? (
              <div className="text-center py-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-green-900/20 flex items-center justify-center mb-3">
                  <Key className="h-6 w-6 text-green-400" />
                </div>
                <p className="text-green-400 mb-2">Password Reset Successfully</p>
                <p className="text-sm text-zinc-400">User can now log in with the default password</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="mb-2">Are you sure you want to reset the password for:</p>
                  <div className="bg-zinc-800 p-3 rounded-md">
                    <p className="font-medium">{userToReset.name}</p>
                    <p className="text-sm text-zinc-400">ID: {userToReset.id}</p>
                  </div>
                </div>
                
                <div className="bg-zinc-800/50 p-3 rounded-md mb-6">
                  <p className="text-sm">The user's password will be reset to:</p>
                  <p className="font-medium text-purple-400 mt-1">{defaultPassword}</p>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="outline" 
                    className="border-zinc-700"
                    onClick={() => {
                      setShowResetPassword(false);
                      setUserToReset(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={handleResetPassword}
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Reset Password
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 