"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { Bell, Save, Globe, Mail, Bell as BellIcon, Lock, Shield, Database, HardDrive, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";

type SettingsCategories = 'general' | 'notifications' | 'security' | 'backup';

interface SettingsState {
  general: {
    siteName: string;
    siteUrl: string;
    adminEmail: string;
    timezone: string;
    dateFormat: string;
    timeFormat: string;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    lowAttendanceAlert: number;
    absenteeNotification: boolean;
  };
  security: {
    requireStrongPasswords: boolean;
    sessionTimeout: number;
    maxLoginAttempts: number;
    twoFactorAuth: boolean;
  };
  backup: {
    autoBackup: boolean;
    backupFrequency: string;
    backupRetention: number;
    lastBackup: string;
  };
}

export default function AdminSettings() {
  // Mock settings data
  const [settings, setSettings] = useState<SettingsState>({
    general: {
      siteName: "PRΞSNCΞ",
      siteUrl: "https://presence.edu",
      adminEmail: "admin@presence.edu",
      timezone: "UTC",
      dateFormat: "MM/DD/YYYY",
      timeFormat: "12h"
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      lowAttendanceAlert: 75, // percentage
      absenteeNotification: true
    },
    security: {
      requireStrongPasswords: true,
      sessionTimeout: 30, // minutes
      maxLoginAttempts: 5,
      twoFactorAuth: false
    },
    backup: {
      autoBackup: true,
      backupFrequency: "daily",
      backupRetention: 30, // days
      lastBackup: "Today, 03:00 AM"
    }
  });

  const [activeTab, setActiveTab] = useState<string>("general");

  const handleSettingChange = (category: SettingsCategories, key: string, value: string | boolean | number) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [category]: {
        ...prevSettings[category],
        [key]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Side Navigation */}
      <AdminSidebar activePage="settings" />

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
            <h1 className="text-3xl font-bold">System Settings</h1>
            
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
          
          {/* Settings Tabs */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3 space-y-2">
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "general" 
                    ? "bg-purple-600 text-white" 
                    : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                }`}
                onClick={() => setActiveTab("general")}
              >
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-3" />
                  <span>General</span>
                </div>
              </button>
              
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "notifications" 
                    ? "bg-purple-600 text-white" 
                    : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                }`}
                onClick={() => setActiveTab("notifications")}
              >
                <div className="flex items-center">
                  <BellIcon className="h-5 w-5 mr-3" />
                  <span>Notifications</span>
                </div>
              </button>
              
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "security" 
                    ? "bg-purple-600 text-white" 
                    : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                }`}
                onClick={() => setActiveTab("security")}
              >
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-3" />
                  <span>Security</span>
                </div>
              </button>
              
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "backup" 
                    ? "bg-purple-600 text-white" 
                    : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                }`}
                onClick={() => setActiveTab("backup")}
              >
                <div className="flex items-center">
                  <Database className="h-5 w-5 mr-3" />
                  <span>Backup & Restore</span>
                </div>
              </button>
            </div>
            
            <div className="col-span-12 md:col-span-9 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              {/* General Settings */}
              {activeTab === "general" && (
                <div>
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-purple-500" />
                    General Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Site Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white"
                        value={settings.general.siteName}
                        onChange={(e) => handleSettingChange("general", "siteName", e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Site URL
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white"
                        value={settings.general.siteUrl}
                        onChange={(e) => handleSettingChange("general", "siteUrl", e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Admin Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white"
                        value={settings.general.adminEmail}
                        onChange={(e) => handleSettingChange("general", "adminEmail", e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                          Timezone
                        </label>
                        <select
                          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white"
                          value={settings.general.timezone}
                          onChange={(e) => handleSettingChange("general", "timezone", e.target.value)}
                        >
                          <option value="UTC">UTC</option>
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="America/Chicago">Central Time (CT)</option>
                          <option value="America/Denver">Mountain Time (MT)</option>
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                          Date Format
                        </label>
                        <select
                          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white"
                          value={settings.general.dateFormat}
                          onChange={(e) => handleSettingChange("general", "dateFormat", e.target.value)}
                        >
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Notifications Settings */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <BellIcon className="h-5 w-5 mr-2 text-purple-500" />
                    Notification Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-zinc-400">Enable email notifications for system events</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={settings.notifications.emailNotifications}
                          onChange={(e) => handleSettingChange("notifications", "emailNotifications", e.target.checked.toString())}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">SMS Notifications</h3>
                        <p className="text-sm text-zinc-400">Enable SMS notifications for important alerts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={settings.notifications.smsNotifications}
                          onChange={(e) => handleSettingChange("notifications", "smsNotifications", e.target.checked.toString())}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Low Attendance Alert Threshold (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white"
                        value={settings.notifications.lowAttendanceAlert}
                        onChange={(e) => handleSettingChange("notifications", "lowAttendanceAlert", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Security Settings */}
              {activeTab === "security" && (
                <div>
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-purple-500" />
                    Security Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Require Strong Passwords</h3>
                        <p className="text-sm text-zinc-400">Enforce complex password requirements</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={settings.security.requireStrongPasswords}
                          onChange={(e) => handleSettingChange("security", "requireStrongPasswords", e.target.checked.toString())}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Session Timeout (minutes)
                      </label>
                      <input
                        type="number"
                        min="5"
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => handleSettingChange("security", "sessionTimeout", e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Maximum Login Attempts
                      </label>
                      <input
                        type="number"
                        min="1"
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white"
                        value={settings.security.maxLoginAttempts}
                        onChange={(e) => handleSettingChange("security", "maxLoginAttempts", e.target.value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-zinc-400">Enable two-factor authentication for all users</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={settings.security.twoFactorAuth}
                          onChange={(e) => handleSettingChange("security", "twoFactorAuth", e.target.checked.toString())}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Backup Settings */}
              {activeTab === "backup" && (
                <div>
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <Database className="h-5 w-5 mr-2 text-purple-500" />
                    Backup & Restore
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Automatic Backups</h3>
                        <p className="text-sm text-zinc-400">Schedule automatic system backups</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={settings.backup.autoBackup}
                          onChange={(e) => handleSettingChange("backup", "autoBackup", e.target.checked.toString())}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Backup Frequency
                      </label>
                      <select
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white"
                        value={settings.backup.backupFrequency}
                        onChange={(e) => handleSettingChange("backup", "backupFrequency", e.target.value)}
                        disabled={!settings.backup.autoBackup}
                      >
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Backup Retention (days)
                      </label>
                      <input
                        type="number"
                        min="1"
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white"
                        value={settings.backup.backupRetention}
                        onChange={(e) => handleSettingChange("backup", "backupRetention", e.target.value)}
                        disabled={!settings.backup.autoBackup}
                      />
                    </div>
                    
                    <div className="bg-zinc-800/50 rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Last Backup</h3>
                          <p className="text-sm text-zinc-400">{settings.backup.lastBackup}</p>
                        </div>
                        <Button variant="outline" className="border-zinc-700 text-sm">
                          <HardDrive className="h-4 w-4 mr-2" />
                          Backup Now
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-zinc-800/50 rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Restore from Backup</h3>
                          <p className="text-sm text-zinc-400">Restore system from a previous backup</p>
                        </div>
                        <Button variant="outline" className="border-zinc-700 text-sm">
                          <Workflow className="h-4 w-4 mr-2" />
                          Restore
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 