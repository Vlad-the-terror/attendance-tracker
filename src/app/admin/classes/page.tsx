"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { Bell, Users, Pencil, Trash2, Plus, Search, Layers, BookOpen, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

// Form schema for validation
const classFormSchema = z.object({
  name: z.string().min(3, { message: "Class name must be at least 3 characters." }),
  code: z.string().min(2, { message: "Class code is required." }),
  department: z.string().min(1, { message: "Department is required." }),
  subjects: z.string().optional(),
  totalStudents: z.coerce.number().min(0),
  totalTeachers: z.coerce.number().min(0),
});

type ClassFormValues = z.infer<typeof classFormSchema>;

// Class type definition
interface Class {
  id: string;
  name: string;
  code: string;
  department: string;
  subjects: string[];
  totalStudents: number;
  totalTeachers: number;
}

export default function AdminClasses() {
  // Mock classes data
  const initialClasses = [
    { 
      id: "C001", 
      name: "Computer Science - Year 1", 
      code: "CS-Y1",
      department: "Computer Science",
      subjects: ["Introduction to Programming", "Data Structures", "Mathematics for Engineers"],
      totalStudents: 60,
      totalTeachers: 4
    },
    { 
      id: "C002", 
      name: "Computer Science - Year 2", 
      code: "CS-Y2",
      department: "Computer Science",
      subjects: ["Algorithms", "Database Systems", "Computer Architecture"],
      totalStudents: 45,
      totalTeachers: 3
    },
    { 
      id: "C003", 
      name: "Electrical Engineering - Year 1", 
      code: "EE-Y1",
      department: "Electrical Engineering",
      subjects: ["Circuit Theory", "Digital Electronics", "Engineering Mathematics"],
      totalStudents: 50,
      totalTeachers: 3
    },
    { 
      id: "C004", 
      name: "Mathematics - Year 1", 
      code: "MATH-Y1",
      department: "Mathematics",
      subjects: ["Calculus I", "Linear Algebra", "Discrete Mathematics"],
      totalStudents: 40,
      totalTeachers: 2
    }
  ];

  const [classes, setClasses] = useState<Class[]>(initialClasses);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  
  // Dialog control states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState<Class | null>(null);
  
  // Toast notifications
  const { toast } = useToast();
  
  // Extract unique departments
  const uniqueDepartments = Array.from(new Set(classes.map(c => c.department)));
  const departments = ["All", ...uniqueDepartments];
  
  // Filter classes based on search query and department filter
  const filteredClasses = classes.filter(cls => {
    const matchesSearch = 
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.code.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = departmentFilter === "All" || cls.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  // Form setup for adding/editing classes
  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classFormSchema),
    defaultValues: {
      name: "",
      code: "",
      department: "",
      subjects: "",
      totalStudents: 0,
      totalTeachers: 0
    }
  });

  // Open Add Class dialog
  const handleAddClass = () => {
    form.reset({
      name: "",
      code: "",
      department: "",
      subjects: "",
      totalStudents: 0,
      totalTeachers: 0
    });
    setIsAddDialogOpen(true);
  };

  // Open Edit Class dialog
  const handleEditClass = (id: string) => {
    const classToEdit = classes.find(cls => cls.id === id);
    if (classToEdit) {
      form.reset({
        name: classToEdit.name,
        code: classToEdit.code,
        department: classToEdit.department,
        subjects: classToEdit.subjects.join(", "),
        totalStudents: classToEdit.totalStudents,
        totalTeachers: classToEdit.totalTeachers
      });
      setCurrentClass(classToEdit);
      setIsEditDialogOpen(true);
    }
  };

  // Open View Class details dialog
  const handleViewClass = (id: string) => {
    const classToView = classes.find(cls => cls.id === id);
    if (classToView) {
      setCurrentClass(classToView);
      setIsViewDialogOpen(true);
    }
  };

  // Handle deleting a class
  const handleDeleteClass = (id: string) => {
    if (confirm("Are you sure you want to delete this class?")) {
      setClasses(classes.filter(cls => cls.id !== id));
      toast({
        variant: "success",
        title: "Class Deleted",
        description: "The class has been deleted successfully."
      });
    }
  };

  // Submit handler for adding a class
  const onSubmitAdd = (data: ClassFormValues) => {
    const newClass: Class = {
      id: `C${(classes.length + 1).toString().padStart(3, '0')}`,
      name: data.name,
      code: data.code,
      department: data.department,
      subjects: data.subjects ? data.subjects.split(',').map(s => s.trim()) : [],
      totalStudents: data.totalStudents,
      totalTeachers: data.totalTeachers
    };
    
    setClasses([...classes, newClass]);
    setIsAddDialogOpen(false);
    toast({
      variant: "success",
      title: "Class Added",
      description: "The class has been added successfully."
    });
  };

  // Submit handler for editing a class
  const onSubmitEdit = (data: ClassFormValues) => {
    if (!currentClass) return;
    
    const updatedClasses = classes.map(cls => 
      cls.id === currentClass.id ? {
        ...cls,
        name: data.name,
        code: data.code,
        department: data.department,
        subjects: data.subjects ? data.subjects.split(',').map(s => s.trim()) : [],
        totalStudents: data.totalStudents,
        totalTeachers: data.totalTeachers
      } : cls
    );
    
    setClasses(updatedClasses);
    setIsEditDialogOpen(false);
    toast({
      variant: "success",
      title: "Class Updated",
      description: "The class has been updated successfully."
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar */}
      <AdminSidebar activePage="classes" />
      
      {/* Main Content */}
      <div className="pl-20">
        {/* Header */}
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
        
        {/* Page Content */}
        <main className="px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Classes Management</h1>
            
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleAddClass}>
              <Plus className="h-4 w-4 mr-2" />
              Add Class
            </Button>
          </div>
          
          {/* Search and Filter */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search classes by name or code..."
                  className="block w-full pl-10 pr-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <select 
                className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-purple-500 focus:border-purple-500"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map(cls => (
              <div 
                key={cls.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors"
              >
                <div className="p-6 border-b border-zinc-800 cursor-pointer" onClick={() => handleViewClass(cls.id)}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold">{cls.name}</h2>
                      <p className="text-zinc-400 text-sm">{cls.code}</p>
                    </div>
                    <span className="bg-purple-900/30 text-purple-400 px-2 py-1 rounded text-xs">
                      {cls.id}
                    </span>
                  </div>
                  
                  <p className="text-zinc-300 mb-2">
                    <span className="text-zinc-500">Department:</span> {cls.department}
                  </p>
                </div>
                
                <div className="p-5 border-b border-zinc-800">
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen size={16} className="text-purple-400" />
                      <span className="font-medium text-sm">Subjects: {cls.subjects.length}</span>
                    </div>
                    <div className="text-zinc-400 text-xs">
                      {cls.subjects.slice(0, 2).join(", ")}
                      {cls.subjects.length > 2 && "..."}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 divide-x divide-zinc-800 border-b border-zinc-800">
                  <div className="p-4 text-center">
                    <p className="text-zinc-400 text-xs">Students</p>
                    <p className="font-bold text-lg">{cls.totalStudents}</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-zinc-400 text-xs">Teachers</p>
                    <p className="font-bold text-lg">{cls.totalTeachers}</p>
                  </div>
                </div>
                
                <div className="p-4 flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-zinc-700"
                    onClick={() => handleViewClass(cls.id)}
                  >
                    <Info className="h-4 w-4 mr-2 text-blue-400" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-zinc-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClass(cls.id);
                    }}
                  >
                    <Pencil className="h-4 w-4 mr-2 text-blue-400" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-zinc-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClass(cls.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2 text-red-400" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredClasses.length === 0 && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
              <Layers className="h-12 w-12 mx-auto text-zinc-700 mb-4" />
              <h3 className="text-xl font-bold mb-2">No Classes Found</h3>
              <p className="text-zinc-400 max-w-md mx-auto mb-6">
                No classes match your search criteria. Try adjusting your search or filter, or add a new class.
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleAddClass}>
                <Plus className="h-4 w-4 mr-2" />
                Add Class
              </Button>
            </div>
          )}
        </main>
      </div>
      
      {/* Add Class Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Add New Class</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Enter the details of the new class below.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitAdd)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. Computer Science - Year 1" 
                        className="bg-zinc-800 border-zinc-700 text-white" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Code</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. CS-Y1" 
                        className="bg-zinc-800 border-zinc-700 text-white" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                        {uniqueDepartments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subjects"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subjects (comma separated)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. Math, Physics, Chemistry" 
                        className="bg-zinc-800 border-zinc-700 text-white" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="totalStudents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Students</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          className="bg-zinc-800 border-zinc-700 text-white" 
                          {...field} 
                          onChange={(e) => field.onChange(e.target.value === "" ? "" : parseInt(e.target.value, 10))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="totalTeachers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Teachers</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          className="bg-zinc-800 border-zinc-700 text-white" 
                          {...field} 
                          onChange={(e) => field.onChange(e.target.value === "" ? "" : parseInt(e.target.value, 10))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-zinc-700">
                  Cancel
                </Button>
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  Add Class
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Class Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Update the details of the class below.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitEdit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. Computer Science - Year 1" 
                        className="bg-zinc-800 border-zinc-700 text-white" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Code</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. CS-Y1" 
                        className="bg-zinc-800 border-zinc-700 text-white" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                        {uniqueDepartments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subjects"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subjects (comma separated)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. Math, Physics, Chemistry" 
                        className="bg-zinc-800 border-zinc-700 text-white" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="totalStudents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Students</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          className="bg-zinc-800 border-zinc-700 text-white" 
                          {...field} 
                          onChange={(e) => field.onChange(e.target.value === "" ? "" : parseInt(e.target.value, 10))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="totalTeachers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Teachers</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          className="bg-zinc-800 border-zinc-700 text-white" 
                          {...field} 
                          onChange={(e) => field.onChange(e.target.value === "" ? "" : parseInt(e.target.value, 10))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-zinc-700">
                  Cancel
                </Button>
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* View Class Details Dialog */}
      {currentClass && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
            <DialogHeader>
              <div className="flex justify-between">
                <DialogTitle>{currentClass.name}</DialogTitle>
                <div className="bg-purple-900/30 text-purple-400 px-2 py-1 rounded text-xs">
                  {currentClass.id}
                </div>
              </div>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div>
                <h3 className="text-sm font-medium text-zinc-400">Class Code</h3>
                <p className="mt-1">{currentClass.code}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-zinc-400">Department</h3>
                <p className="mt-1">{currentClass.department}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-zinc-400">Subjects</h3>
                <div className="mt-1 space-y-1">
                  {currentClass.subjects.map((subject, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-purple-400"></div>
                      <p>{subject}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-zinc-400">Total Students</h3>
                  <p className="mt-1">{currentClass.totalStudents}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-zinc-400">Total Teachers</h3>
                  <p className="mt-1">{currentClass.totalTeachers}</p>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                className="border-zinc-700 mr-2"
                onClick={() => {
                  setIsViewDialogOpen(false);
                  handleEditClass(currentClass.id);
                }}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  setIsViewDialogOpen(false);
                  handleDeleteClass(currentClass.id);
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Toast notifications */}
      <Toaster />
    </div>
  );
} 