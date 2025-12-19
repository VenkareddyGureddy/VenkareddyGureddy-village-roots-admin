'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import {
  Users as UsersIcon,
  Shield,
  UserCheck,
} from 'lucide-react';

interface UserProfile {
  id: string;
  user_id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  created_at: string;
  role: 'admin' | 'moderator' | 'user';
}

/* Mock users */
const initialUsers: UserProfile[] = [
  {
    id: '1',
    user_id: 'u1',
    email: 'admin@milkpoint.com',
    full_name: 'Admin User',
    avatar_url: null,
    phone: '9876543210',
    created_at: new Date().toISOString(),
    role: 'admin',
  },
  {
    id: '2',
    user_id: 'u2',
    email: 'john@example.com',
    full_name: 'John Doe',
    avatar_url: null,
    phone: null,
    created_at: new Date().toISOString(),
    role: 'user',
  },
  {
    id: '3',
    user_id: 'u3',
    email: 'moderator@example.com',
    full_name: 'Jane Smith',
    avatar_url: null,
    phone: '9123456789',
    created_at: new Date().toISOString(),
    role: 'moderator',
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<UserProfile[]>(initialUsers);
  const { toast } = useToast();

  const updateUserRole = (userId: string, newRole: UserProfile['role']) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.user_id === userId ? { ...u, role: newRole } : u
      )
    );

    toast({
      title: 'Success',
      description: 'User role updated successfully',
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'moderator':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name: string | null, email: string | null) => {
    if (name) {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    }
    if (email) return email.slice(0, 2).toUpperCase();
    return 'U';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold">Users</h1>
        <p className="text-muted-foreground">
          Manage user accounts and permissions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <UsersIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{users.length}</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-red-100">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {users.filter((u) => u.role === 'admin').length}
              </p>
              <p className="text-sm text-muted-foreground">Admins</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-100">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {users.filter((u) => u.role === 'user').length}
              </p>
              <p className="text-sm text-muted-foreground">
                Regular Users
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5" />
            User List
          </CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              No users found.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={user.avatar_url || undefined}
                          />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getInitials(
                              user.full_name,
                              user.email
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {user.full_name || 'No name'}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {user.email || '-'}
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {user.phone || '-'}
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {new Date(
                        user.created_at
                      ).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <Select
                        value={user.role}
                        onValueChange={(v) =>
                          updateUserRole(
                            user.user_id,
                            v as UserProfile['role']
                          )
                        }
                      >
                        <SelectTrigger className="w-32">
                          <Badge
                            className={getRoleBadgeColor(
                              user.role
                            )}
                          >
                            {user.role}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">
                            User
                          </SelectItem>
                          <SelectItem value="moderator">
                            Moderator
                          </SelectItem>
                          <SelectItem value="admin">
                            Admin
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
