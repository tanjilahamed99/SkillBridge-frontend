"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  UserCheck,
  UserX,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Download,
} from "lucide-react";
import { getUsers, updateUserStatus } from "@/actions/admin";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "student" | "instructor" | "admin";
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  lastActive?: string;
  picture?: string;
  phone?: string;
  qualification?: string;
  bio?: string;
  enrolledCourses?: number;
  createdCourses?: number;
  totalStudents?: number;
  totalRevenue?: number;
  averageRating?: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<
    "all" | "student" | "instructor"
  >("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive" | "suspended"
  >("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await getUsers();
      if (data.success) {
        setUsers([...data.users]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    userId: string,
    newStatus: "active" | "inactive" | "suspended",
  ) => {
    try {
      const newStats = { status: newStatus };

      const { data } = await updateUserStatus(userId, newStats);
      if (data.success) {
        setUsers(
          users.map((u) =>
            u._id === userId ? { ...u, status: newStatus } : u,
          ),
        );
        toast.success(`User status updated to ${newStatus}`);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "instructor":
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
            Instructor
          </span>
        );
      case "student":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium">
            Student
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Active
          </span>
        );
      case "inactive":
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" /> Inactive
          </span>
        );
      case "suspended":
        return (
          <span className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium flex items-center gap-1">
            <XCircle className="w-3 h-3" /> Suspended
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            User Management
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Manage all users on the platform
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-purple-100">
          <p className="text-xs text-gray-500">Total Users</p>
          <p className="text-xl font-bold text-gray-900">{users.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-green-100">
          <p className="text-xs text-gray-500">Active</p>
          <p className="text-xl font-bold text-green-600">
            {users.filter((u) => u.status === "active").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-blue-100">
          <p className="text-xs text-gray-500">Instructors</p>
          <p className="text-xl font-bold text-blue-600">
            {users.filter((u) => u.role === "instructor").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-purple-100">
          <p className="text-xs text-gray-500">Students</p>
          <p className="text-xl font-bold text-purple-600">
            {users.filter((u) => u.role === "student").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-purple-100">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center justify-between w-full">
          <span className="font-medium text-gray-700">Filters</span>
          <Filter className="w-5 h-5 text-purple-600" />
        </button>

        <div
          className={`${showFilters ? "block" : "hidden"} block space-y-4 lg:space-y-0 lg:flex lg:items-center lg:gap-4`}>
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none"
            />
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value as "all" | "student" | "instructor")
            }
            className="px-3 py-2 text-sm border border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none">
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="instructor">Instructors</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value as "all" | "active" | "inactive" | "suspended",
              )
            }
            className="px-3 py-2 text-sm border border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-purple-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-250">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Joined
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user, idx) => (
                <tr key={idx} className="hover:bg-purple-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-linear-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{getRoleBadge(user.role)}</td>
                  <td className="px-4 py-3">{getStatusBadge(user.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {user.status === "active" ? (
                        <button
                          onClick={() =>
                            handleStatusChange(user._id, "suspended")
                          }
                          className="p-1.5 hover:bg-red-100 rounded-lg transition"
                          title="Suspend User">
                          <UserX className="w-4 h-4 text-red-600" />
                        </button>
                      ) : user.status === "suspended" ? (
                        <button
                          onClick={() => handleStatusChange(user._id, "active")}
                          className="p-1.5 hover:bg-green-100 rounded-lg transition"
                          title="Activate User">
                          <UserCheck className="w-4 h-4 text-green-600" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(user._id, "active")}
                          className="p-1.5 hover:bg-green-100 rounded-lg transition"
                          title="Activate User">
                          <UserCheck className="w-4 h-4 text-green-600" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-purple-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing 1-{filteredUsers.length} of {users.length} users
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
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
