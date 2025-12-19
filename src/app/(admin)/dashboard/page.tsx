'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
} from 'lucide-react';

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  pendingOrders: number;
  activeProducts: number;
}

const stats: Stats = {
  totalProducts: 120,
  activeProducts: 96,
  totalOrders: 342,
  pendingOrders: 18,
  totalUsers: 215,
  totalRevenue: 125430,
};

const recentOrders = [
  {
    id: 1,
    customer_name: 'Ravi Kumar',
    created_at: new Date(),
    total_amount: 1499,
    status: 'pending',
  },
  {
    id: 2,
    customer_name: 'Anjali Sharma',
    created_at: new Date(),
    total_amount: 2999,
    status: 'delivered',
  },
  {
    id: 3,
    customer_name: 'Suresh Reddy',
    created_at: new Date(),
    total_amount: 799,
    status: 'processing',
  },
];

export default function Dashboard() {
  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      subtitle: `${stats.activeProducts} active`,
      icon: Package,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      subtitle: `${stats.pendingOrders} pending`,
      icon: ShoppingCart,
      color: 'text-secondary',
      bg: 'bg-secondary/10',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      subtitle: 'Registered users',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      subtitle: 'All time',
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-8xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome to your admin dashboard
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.subtitle}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No orders yet
              </p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div>
                      <p className="font-medium">{order.customer_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.created_at.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ₹{order.total_amount.toLocaleString()}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="/products"
                className="p-4 rounded-lg bg-[#c0cbc0] hover:bg-[#b7d1b7]  text-center"
              >
                <Package className="h-6 w-6 mx-auto mb-2 text-[#324232]" />
                <p className="text-sm font-medium">Add Product</p>
              </a>

              <a
                href="/orders"
                className="p-4 rounded-lg bg-[#e0d9d1] hover:bg-[#d8cbbc]  text-center "
              >
                <ShoppingCart className="h-6 w-6 mx-auto mb-2 text-secondary" />
                <p className="text-sm font-medium">View Orders</p>
              </a>

              <a
                href="/users"
                className="p-4 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors text-center"
              >
                <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-medium">Manage Users</p>
              </a>

              <a
                href="/"
                className="p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-center"
              >
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">View Site</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
