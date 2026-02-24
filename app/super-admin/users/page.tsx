"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Calendar,
  Shield,
  Users as UsersIcon,
  GraduationCap,
} from "lucide-react";
import { getAllUsers } from "@/actions/superAdmin";

// Define User interface
interface User {
  id: string | number;
  name: string;
  email: string;
  role: "student" | "instructor" | "admin" | "superAdmin";
  status: "active" | "inactive" | "suspended" | "pending";
  createdAt: string | Date;
  phone?: string;
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [users, setUsers] = useState<User[]>([]);

  const stats = {
    total: users.length,
    students: users.filter((u) => u.role === "student").length,
    superAdmin: users.filter((u) => u.role === "superAdmin").length,
    instructors: users.filter((u) => u.role === "instructor").length,
    admins: users.filter((u) => u.role === "admin").length,
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "superAdmin":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
            <Shield className="w-3 h-3" /> Admin
          </span>
        );
      case "admin":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
            <Shield className="w-3 h-3" /> Admin
          </span>
        );
      case "instructor":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
            <GraduationCap className="w-3 h-3" /> Instructor
          </span>
        );
      case "student":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium">
            <UsersIcon className="w-3 h-3" /> Student
          </span>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getAllUsers();
        if (data.success) {
          setUsers(data.users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Users Management
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Manage all users across the platform
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-purple-100">
          <p className="text-xs text-gray-500">Total Users</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">
            {stats.total}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-green-100">
          <p className="text-xs text-gray-500">Student</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600">
            {stats.students}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-blue-100">
          <p className="text-xs text-gray-500">Instructors</p>
          <p className="text-xl sm:text-2xl font-bold text-blue-600">
            {stats.instructors}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-purple-100">
          <p className="text-xs text-gray-500">Admins</p>
          <p className="text-xl sm:text-2xl font-bold text-purple-600">
            {stats.admins}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-purple-100">
          <p className="text-xs text-gray-500">Super Admins</p>
          <p className="text-xl sm:text-2xl font-bold text-purple-600">
            {stats.superAdmin}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-purple-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm border border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none"
            />
          </div>

          {/* Role Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {["all", "student", "instructor", "admin"].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium capitalize whitespace-nowrap transition ${
                  roleFilter === role
                    ? role === "all"
                      ? "bg-purple-600 text-white"
                      : role === "student"
                        ? "bg-green-600 text-white"
                        : role === "instructor"
                          ? "bg-blue-600 text-white"
                          : "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}>
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-purple-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-250">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  User
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-purple-50 transition">
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 sm:px-6 py-4 border-t border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium">1-{filteredUsers.length}</span> of{" "}
            <span className="font-medium">{users.length}</span> users
          </p>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 border border-purple-200 rounded-lg text-sm text-gray-600 hover:bg-purple-50 disabled:opacity-50"
              disabled>
              Previous
            </button>
            <button className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-purple-200 rounded-lg text-sm text-gray-600 hover:bg-purple-50">
              2
            </button>
            <button className="px-3 py-1 border border-purple-200 rounded-lg text-sm text-gray-600 hover:bg-purple-50">
              3
            </button>
            <button className="px-3 py-1 border border-purple-200 rounded-lg text-sm text-gray-600 hover:bg-purple-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
