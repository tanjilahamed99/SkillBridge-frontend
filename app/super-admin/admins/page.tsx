"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Shield,
  Mail,
  Phone,
  Calendar,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  UserPlus,
  RefreshCw,
  Lock,
  Unlock,
  Key,
  Copy
} from "lucide-react";
import { toast } from "sonner";

// Define Admin interface
interface Admin {
  id: string;
  name: string;
  email: string;
  role: "admin" | "superAdmin";
  status: "active" | "inactive" | "suspended";
  permissions: string[];
  lastActive: string;
  joinedDate: string;
  phone?: string;
  avatar?: string;
  createdBy?: string;
}

export default function AdminsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "superAdmin">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "suspended">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<Admin | null>(null);

  // Mock data - replace with API call
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@skillbridge.com",
      role: "admin",
      status: "active",
      permissions: ["manage_users", "view_analytics", "manage_courses"],
      lastActive: "5 minutes ago",
      joinedDate: "2024-01-15",
      phone: "+1 (555) 123-4567",
      createdBy: "Super Admin"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@skillbridge.com",
      role: "superAdmin",
      status: "active",
      permissions: ["all"],
      lastActive: "2 minutes ago",
      joinedDate: "2023-09-10",
      phone: "+1 (555) 234-5678",
      createdBy: "System"
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "michael.c@skillbridge.com",
      role: "admin",
      status: "active",
      permissions: ["manage_users", "manage_courses"],
      lastActive: "1 hour ago",
      joinedDate: "2024-02-01",
      phone: "+1 (555) 345-6789",
      createdBy: "Sarah Johnson"
    },
    {
      id: "4",
      name: "Emily Rodriguez",
      email: "emily.r@skillbridge.com",
      role: "admin",
      status: "inactive",
      permissions: ["view_analytics"],
      lastActive: "5 days ago",
      joinedDate: "2024-01-20",
      phone: "+1 (555) 456-7890",
      createdBy: "John Smith"
    },
    {
      id: "5",
      name: "David Kim",
      email: "david.k@skillbridge.com",
      role: "admin",
      status: "suspended",
      permissions: [],
      lastActive: "2 weeks ago",
      joinedDate: "2023-12-05",
      phone: "+1 (555) 567-8901",
      createdBy: "Sarah Johnson"
    },
    {
      id: "6",
      name: "Lisa Thompson",
      email: "lisa.t@skillbridge.com",
      role: "admin",
      status: "active",
      permissions: ["manage_users", "view_analytics", "manage_courses", "manage_settings"],
      lastActive: "30 minutes ago",
      joinedDate: "2024-02-15",
      phone: "+1 (555) 678-9012",
      createdBy: "Michael Chen"
    },
  ]);

  const stats = {
    total: admins.length,
    active: admins.filter(a => a.status === 'active').length,
    inactive: admins.filter(a => a.status === 'inactive').length,
    suspended: admins.filter(a => a.status === 'suspended').length,
    superAdmins: admins.filter(a => a.role === 'superAdmin').length,
    admins: admins.filter(a => a.role === 'admin').length,
  };

  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         admin.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || admin.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || admin.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'superAdmin':
        return <span className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium"><Shield className="w-3 h-3" /> Super Admin</span>;
      case 'admin':
        return <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium"><Shield className="w-3 h-3" /> Admin</span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium"><CheckCircle className="w-3 h-3" /> Active</span>;
      case 'inactive':
        return <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium"><AlertCircle className="w-3 h-3" /> Inactive</span>;
      case 'suspended':
        return <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium"><XCircle className="w-3 h-3" /> Suspended</span>;
      default:
        return null;
    }
  };

  const handleDeleteAdmin = (admin: Admin) => {
    setAdminToDelete(admin);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (adminToDelete) {
      // API call to delete admin
      setAdmins(admins.filter(a => a.id !== adminToDelete.id));
      toast.success(`Admin ${adminToDelete.name} has been deleted`);
      setIsDeleteModalOpen(false);
      setAdminToDelete(null);
    }
  };

  const handleStatusChange = (admin: Admin, newStatus: "active" | "inactive" | "suspended") => {
    // API call to update status
    setAdmins(admins.map(a => 
      a.id === admin.id ? { ...a, status: newStatus } : a
    ));
    toast.success(`Admin ${admin.name} status updated to ${newStatus}`);
  };

  const handleEditAdmin = (admin: Admin) => {
    setEditingAdmin(admin);
    setIsModalOpen(true);
  };

  const handleCreateAdmin = () => {
    setEditingAdmin(null);
    setIsModalOpen(true);
  };

  const handleSaveAdmin = (adminData: Partial<Admin>) => {
    if (editingAdmin) {
      // Update existing admin
      setAdmins(admins.map(a => 
        a.id === editingAdmin.id ? { ...a, ...adminData } : a
      ));
      toast.success("Admin updated successfully");
    } else {
      // Create new admin
      const newAdmin: Admin = {
        id: Date.now().toString(),
        name: adminData.name || "",
        email: adminData.email || "",
        role: adminData.role || "admin",
        status: "active",
        permissions: adminData.permissions || [],
        lastActive: "Just now",
        joinedDate: new Date().toISOString().split('T')[0],
        phone: adminData.phone,
        createdBy: "You"
      };
      setAdmins([...admins, newAdmin]);
      toast.success("Admin created successfully");
    }
    setIsModalOpen(false);
    setEditingAdmin(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Management</h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Manage administrators and their permissions
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleCreateAdmin}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition flex items-center gap-2 text-sm"
          >
            <UserPlus className="w-4 h-4" />
            Create New Admin
          </button>
          <button className="p-2 border border-purple-200 rounded-lg hover:bg-purple-50 transition">
            <Download className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 border border-purple-200 rounded-lg hover:bg-purple-50 transition">
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-purple-100">
          <p className="text-xs text-gray-500">Total Admins</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-green-100">
          <p className="text-xs text-gray-500">Active</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-500">Inactive</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-600">{stats.inactive}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-red-100">
          <p className="text-xs text-gray-500">Suspended</p>
          <p className="text-xl sm:text-2xl font-bold text-red-600">{stats.suspended}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-purple-100">
          <p className="text-xs text-gray-500">Super Admins</p>
          <p className="text-xl sm:text-2xl font-bold text-purple-600">{stats.superAdmins}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-blue-100">
          <p className="text-xs text-gray-500">Admins</p>
          <p className="text-xl sm:text-2xl font-bold text-blue-600">{stats.admins}</p>
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

          {/* Role Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {["all", "admin", "superAdmin"].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role as typeof roleFilter)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium capitalize whitespace-nowrap transition ${
                  roleFilter === role
                    ? role === 'all' ? 'bg-purple-600 text-white' :
                      role === 'superAdmin' ? 'bg-purple-600 text-white' :
                      'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {role === 'superAdmin' ? 'Super Admin' : role}
              </button>
            ))}
          </div>

          {/* Status Filters */}
          <div className="flex gap-2">
            {["all", "active", "inactive", "suspended"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as typeof statusFilter)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium capitalize whitespace-nowrap transition ${
                  statusFilter === status
                    ? status === 'all' ? 'bg-purple-600 text-white' :
                      status === 'active' ? 'bg-green-600 text-white' :
                      status === 'inactive' ? 'bg-gray-600 text-white' :
                      'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Admins Table */}
      <div className="bg-white rounded-xl border border-purple-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Admin</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Permissions</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Active</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created By</th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-purple-50 transition">
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                        {admin.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">{admin.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <p className="text-xs text-gray-500">{admin.email}</p>
                        </div>
                        {admin.phone && (
                          <div className="flex items-center gap-2 mt-1">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <p className="text-xs text-gray-500">{admin.phone}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    {getRoleBadge(admin.role)}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    {getStatusBadge(admin.status)}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {admin.permissions.length > 0 ? (
                        admin.permissions.map((perm, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                          >
                            {perm.replace(/_/g, ' ')}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400">No permissions</span>
                      )}
                      {admin.permissions.length > 3 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                          +{admin.permissions.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm text-gray-600">{admin.lastActive}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {new Date(admin.joinedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm text-gray-600">{admin.createdBy}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditAdmin(admin)}
                        className="p-1.5 hover:bg-blue-100 rounded-lg transition group"
                        title="Edit Admin"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      
                      {admin.status === 'active' ? (
                        <button
                          onClick={() => handleStatusChange(admin, 'inactive')}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition group"
                          title="Deactivate"
                        >
                          <Unlock className="w-4 h-4 text-gray-600" />
                        </button>
                      ) : admin.status === 'inactive' ? (
                        <button
                          onClick={() => handleStatusChange(admin, 'active')}
                          className="p-1.5 hover:bg-green-100 rounded-lg transition group"
                          title="Activate"
                        >
                          <Lock className="w-4 h-4 text-green-600" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(admin, 'active')}
                          className="p-1.5 hover:bg-green-100 rounded-lg transition group"
                          title="Reactivate"
                        >
                          <RefreshCw className="w-4 h-4 text-green-600" />
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteAdmin(admin)}
                        className="p-1.5 hover:bg-red-100 rounded-lg transition group"
                        title="Delete Admin"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>

                      <button
                        className="p-1.5 hover:bg-purple-100 rounded-lg transition"
                        title="More options"
                      >
                        <MoreHorizontal className="w-4 h-4 text-gray-600" />
                      </button>
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
            Showing <span className="font-medium">1-{filteredAdmins.length}</span> of <span className="font-medium">{admins.length}</span> admins
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-purple-200 rounded-lg text-sm text-gray-600 hover:bg-purple-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-1 border border-purple-200 rounded-lg text-sm text-gray-600 hover:bg-purple-50">2</button>
            <button className="px-3 py-1 border border-purple-200 rounded-lg text-sm text-gray-600 hover:bg-purple-50">3</button>
            <button className="px-3 py-1 border border-purple-200 rounded-lg text-sm text-gray-600 hover:bg-purple-50">Next</button>
          </div>
        </div>
      </div>

      {/* Create/Edit Admin Modal */}
      {isModalOpen && (
        <AdminModal
          admin={editingAdmin}
          onClose={() => {
            setIsModalOpen(false);
            setEditingAdmin(null);
          }}
          onSave={handleSaveAdmin}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && adminToDelete && (
        <DeleteModal
          admin={adminToDelete}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setAdminToDelete(null);
          }}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

// Admin Modal Component
function AdminModal({ admin, onClose, onSave }: {
  admin: Admin | null;
  onClose: () => void;
  onSave: (data: Partial<Admin>) => void;
}) {
  const [formData, setFormData] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
    phone: admin?.phone || "",
    role: admin?.role || "admin",
    permissions: admin?.permissions || ["view_analytics"],
    password: "",
    confirmPassword: "",
  });

  const availablePermissions = [
    { id: "view_analytics", label: "View Analytics" },
    { id: "manage_users", label: "Manage Users" },
    { id: "manage_courses", label: "Manage Courses" },
    { id: "manage_admins", label: "Manage Admins" },
    { id: "manage_settings", label: "Manage Settings" },
    { id: "manage_payments", label: "Manage Payments" },
  ];

  const handlePermissionChange = (permId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permId)
        ? prev.permissions.filter(p => p !== permId)
        : [...prev.permissions, permId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-purple-100">
          <h2 className="text-xl font-bold text-gray-900">
            {admin ? 'Edit Admin' : 'Create New Admin'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Basic Information</h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            {!admin && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-3 py-2 border border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none"
                    placeholder="••••••••"
                    required={!admin}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full px-3 py-2 border border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none"
                    placeholder="••••••••"
                    required={!admin}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Admin Role <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="admin"
                  checked={formData.role === 'admin'}
                  onChange={(e) => setFormData({...formData, role: e.target.value as 'admin'})}
                  className="mr-2"
                />
                Admin
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="superAdmin"
                  checked={formData.role === 'superAdmin'}
                  onChange={(e) => setFormData({...formData, role: e.target.value as 'superAdmin'})}
                  className="mr-2"
                />
                Super Admin
              </label>
            </div>
          </div>

          {/* Permissions */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Permissions
            </label>
            <div className="grid sm:grid-cols-2 gap-3">
              {availablePermissions.map((perm) => (
                <label key={perm.id} className="flex items-center gap-2 p-2 border border-purple-100 rounded-lg hover:bg-purple-50">
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(perm.id)}
                    onChange={() => handlePermissionChange(perm.id)}
                    className="rounded text-purple-600"
                  />
                  <span className="text-sm text-gray-700">{perm.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-purple-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-purple-200 text-gray-600 rounded-lg hover:bg-purple-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              {admin ? 'Update Admin' : 'Create Admin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Delete Confirmation Modal
function DeleteModal({ admin, onClose, onConfirm }: {
  admin: Admin;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Admin</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete <span className="font-semibold">{admin.name}</span>? 
            This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-purple-200 text-gray-600 rounded-lg hover:bg-purple-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}