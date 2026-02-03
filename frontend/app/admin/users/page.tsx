"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Filter,
    MoreVertical,
    Mail,
    Shield,
    Ban,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    UserPlus,
} from "lucide-react";

// Mock users data
const usersData = [
    { id: 1, name: "John Doe", email: "john@example.com", tier: "pro", role: "user", status: "active", audits: 24, joined: "2026-01-15" },
    { id: 2, name: "Sarah Wilson", email: "sarah@startup.io", tier: "agency", role: "user", status: "active", audits: 156, joined: "2025-11-20" },
    { id: 3, name: "Mike Chen", email: "mike@techcorp.com", tier: "free", role: "user", status: "active", audits: 3, joined: "2026-02-01" },
    { id: 4, name: "Emily Brown", email: "emily@agency.co", tier: "agency", role: "user", status: "active", audits: 89, joined: "2025-12-10" },
    { id: 5, name: "Admin User", email: "admin@geosight.ai", tier: "agency", role: "admin", status: "active", audits: 45, joined: "2025-10-01" },
    { id: 6, name: "James Lee", email: "james@suspended.com", tier: "pro", role: "user", status: "suspended", audits: 12, joined: "2026-01-05" },
];

export default function AdminUsersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState<number | null>(null);
    const [showActions, setShowActions] = useState<number | null>(null);

    const filteredUsers = usersData.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getTierBadge = (tier: string) => {
        switch (tier) {
            case "agency":
                return <Badge className="bg-blue-500/20 text-blue-400">Agency</Badge>;
            case "pro":
                return <Badge className="bg-purple-500/20 text-purple-400">Pro</Badge>;
            default:
                return <Badge variant="outline">Free</Badge>;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-500/20 text-green-400">Active</Badge>;
            case "suspended":
                return <Badge className="bg-red-500/20 text-red-400">Suspended</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold gradient-text">User Management</h1>
                    <p className="text-muted-foreground">
                        Manage platform users, subscriptions, and permissions
                    </p>
                </div>
                <Button className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600">
                    <UserPlus className="w-4 h-4" />
                    Add User
                </Button>
            </div>

            {/* Search and Filters */}
            <Card className="glass-card border-0 mb-6">
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search users by name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-secondary/50"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="gap-2">
                                <Filter className="w-4 h-4" />
                                Tier
                            </Button>
                            <Button variant="outline" className="gap-2">
                                <Filter className="w-4 h-4" />
                                Status
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card className="glass-card border-0">
                <CardHeader>
                    <CardTitle>{filteredUsers.length} Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border/50">
                                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
                                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tier</th>
                                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
                                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Audits</th>
                                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Joined</th>
                                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="border-b border-border/50 hover:bg-secondary/20">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{user.name}</p>
                                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">{getTierBadge(user.tier)}</td>
                                        <td className="py-4 px-4">
                                            {user.role === "admin" ? (
                                                <Badge className="bg-red-500/20 text-red-400">Admin</Badge>
                                            ) : (
                                                <span className="text-muted-foreground">User</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-4">{getStatusBadge(user.status)}</td>
                                        <td className="py-4 px-4">{user.audits}</td>
                                        <td className="py-4 px-4 text-muted-foreground">{user.joined}</td>
                                        <td className="py-4 px-4 text-right">
                                            <div className="relative">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setShowActions(showActions === user.id ? null : user.id)}
                                                >
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                                {showActions === user.id && (
                                                    <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-lg border border-border/50 py-2 shadow-xl z-10">
                                                        <button className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary/50 w-full">
                                                            <Mail className="w-4 h-4" />
                                                            Send Email
                                                        </button>
                                                        <button className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary/50 w-full">
                                                            <Pencil className="w-4 h-4" />
                                                            Edit User
                                                        </button>
                                                        <button className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary/50 w-full">
                                                            <Shield className="w-4 h-4" />
                                                            Change Tier
                                                        </button>
                                                        <hr className="my-2 border-border/50" />
                                                        <button className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary/50 w-full text-yellow-400">
                                                            <Ban className="w-4 h-4" />
                                                            {user.status === "active" ? "Suspend" : "Activate"}
                                                        </button>
                                                        <button className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary/50 w-full text-destructive">
                                                            <Trash2 className="w-4 h-4" />
                                                            Delete User
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/50">
                        <p className="text-sm text-muted-foreground">
                            Showing 1-6 of 6 users
                        </p>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" disabled>
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" disabled>
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
