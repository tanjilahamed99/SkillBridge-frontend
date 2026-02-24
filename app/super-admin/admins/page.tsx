"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Edit,
  Trash2,
  Shield,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  UserPlus,
  RefreshCw,
  Lock,
  Unlock,
} from "lucide-react";
import { toast } from "sonner";
import {
  createAdmin,
  deleteAdmin,
  getAllAdmins,
  updateAdmin,
} from "@/actions/superAdmin";

// Define Admin interface
interface Admin {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "superAdmin";
  status: "active" | "inactive" | "suspended";
  createdAt: string;
}

export default function AdminsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "superAdmin">(
    "all",
  );
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive" | "suspended"
  >("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<Admin | null>(null);
  // Mock data - replace with API call
  const [admins, setAdmins] = useState<Admin[]>([]);

  const stats = {
    total: admins.length,
    active: admins.filter((a) => a.status === "active").length,
    inactive: admins.filter((a) => a.status === "inactive").length,
    suspended: admins.filter((a) => a.status === "suspended").length,
    superAdmins: admins.filter((a) => a.role === "superAdmin").length,
    admins: admins.filter((a) => a.role === "admin").length,
  };

  const filteredAdmins = admins.filter((admin) => {
    const matchesSearch =
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || admin.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || admin.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "superAdmin":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
            <Shield className="w-3 h-3" /> Super Admin
          </span>
        );
      case "admin":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
            <Shield className="w-3 h-3" /> Admin
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
          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium">
            <CheckCircle className="w-3 h-3" /> Active
          </span>
        );
      case "inactive":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
            <AlertCircle className="w-3 h-3" /> Inactive
          </span>
        );
      case "suspended":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium">
            <XCircle className="w-3 h-3" /> Suspended
          </span>
        );
      default:
        return null;
    }
  };

  const handleDeleteAdmin = (admin: Admin) => {
    setAdminToDelete(admin);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (adminToDelete) {
      const { data } = await deleteAdmin(adminToDelete._id);
      if (data.success) {
        setAdmins(admins.filter((a) => a._id !== adminToDelete._id));
        toast.success(`Admin ${adminToDelete.name} has been deleted`);
        setIsDeleteModalOpen(false);
        setAdminToDelete(null);
      }
    }
  };

  const handleStatusChange = async (
    admin: Admin,
    newStatus: "active" | "suspended",
  ) => {
    const { data } = await updateAdmin({
      id: admin._id,
      status: newStatus,
      email: admin.email,
    });

    if (data.success) {
      setAdmins(
        admins.map((a) =>
          a._id === admin._id ? { ...a, status: newStatus } : a,
        ),
      );
      toast.success(`Admin ${admin.name} status updated to ${newStatus}`);
    }
  };

  const handleEditAdmin = (admin: Admin) => {
    setEditingAdmin(admin);
    setIsModalOpen(true);
  };

  const handleCreateAdmin = () => {
    setEditingAdmin(null);
    setIsModalOpen(true);
  };

  const handleSaveAdmin = async (adminData: Partial<Admin>) => {
    try {
      if (editingAdmin) {
        // Update existing admin
        const upData = {
          name: adminData.name || "",
          email: adminData.email || "",
          password: adminData.password || "",
          role: adminData.role || "admin",
          status: "active",
          id: adminData._id || "",
        };
        const { data } = await updateAdmin(upData);
        if (data.success) {
          setAdmins(
            admins.map((a) =>
              a._id === editingAdmin._id ? { ...a, ...adminData } : a,
            ),
          );
          toast.success("Admin updated successfully");
        }
      } else {
        // Create new admin
        const newAdmin = {
          name: adminData.name || "",
          email: adminData.email || "",
          password: adminData.password || "",
          role: adminData.role || "admin",
          status: "active",
        };
        const { data } = await createAdmin(newAdmin);
        if (data.success) {
          setAdmins([...admins, data.admin]);
          toast.success("Admin created successfully");
        }
      }
      setIsModalOpen(false);
      setEditingAdmin(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getAllAdmins();
      if (data.success) {
        setAdmins(data.admins);
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
            Admin Management
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Manage administrators and their permissions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCreateAdmin}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition flex items-center gap-2 text-sm">
            <UserPlus className="w-4 h-4" />
            Create New Admin
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-purple-100">
          <p className="text-xs text-gray-500">Total Admins</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">
            {stats.total}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-red-100">
          <p className="text-xs text-gray-500">Suspended</p>
          <p className="text-xl sm:text-2xl font-bold text-red-600">
            {stats.suspended}
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

          {/* Status Filters */}
          <div className="flex gap-2">
            {["all", "suspended"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as typeof statusFilter)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium capitalize whitespace-nowrap transition ${
                  statusFilter === status
                    ? status === "all"
                      ? "bg-purple-600 text-white"
                      : status === "active"
                        ? "bg-green-600 text-white"
                        : status === "inactive"
                          ? "bg-gray-600 text-white"
                          : "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}>
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Admins Table */}
      <div className="bg-white rounded-xl border border-purple-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-250">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Admin
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Joined
                </th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAdmins.map((admin, idx) => (
                <tr key={idx} className="hover:bg-purple-50 transition">
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                        {admin.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">
                          {admin.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <p className="text-xs text-gray-500">{admin.email}</p>
                        </div>
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
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {new Date(admin.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditAdmin(admin)}
                        className="p-1.5 hover:bg-blue-100 rounded-lg transition group"
                        title="Edit Admin">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>

                      {admin.status === "active" ? (
                        <button
                          onClick={() => handleStatusChange(admin, "suspended")}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition group"
                          title="Deactivate">
                          <Unlock className="w-4 h-4 text-gray-600" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(admin, "active")}
                          className="p-1.5 hover:bg-green-100 rounded-lg transition group"
                          title="Activate">
                          <Lock className="w-4 h-4 text-green-600" />
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteAdmin(admin)}
                        className="p-1.5 hover:bg-red-100 rounded-lg transition group"
                        title="Delete Admin">
                        <Trash2 className="w-4 h-4 text-red-600" />
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
            Showing{" "}
            <span className="font-medium">1-{filteredAdmins.length}</span> of{" "}
            <span className="font-medium">{admins.length}</span> admins
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

function AdminModal({
  admin,
  onClose,
  onSave,
}: {
  admin: Admin | null;
  onClose: () => void;
  onSave: (data: Partial<Admin>) => void;
}) {
  const [formData, setFormData] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
    role: admin?.role || "admin",
    password: "",
    confirmPassword: "",
    status: admin?.status || "active",
    _id: admin?._id || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-purple-100">
          <h2 className="text-xl font-bold text-gray-900">
            {admin ? "Edit Admin" : "Create New Admin"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Basic Information</h3>

            <div className=" flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none"
                  placeholder="admin@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none"
                  placeholder="••••••••"
                  required={!admin}
                />
              </div>
            </div>
          </div>
          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-purple-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-purple-200 text-gray-600 rounded-lg hover:bg-purple-50 transition">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              {admin ? "Update Admin" : "Create Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Delete Confirmation Modal
function DeleteModal({
  admin,
  onClose,
  onConfirm,
}: {
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
            Are you sure you want to delete{" "}
            <span className="font-semibold">{admin.name}</span>? This action
            cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-purple-200 text-gray-600 rounded-lg hover:bg-purple-50 transition">
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
