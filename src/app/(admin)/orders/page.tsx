'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Eye, Package } from 'lucide-react';

/* ------------------ Types ------------------ */

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  shipping_address: string;
  total_amount: number;
  status: string;
  payment_status: string;
  notes?: string;
  created_at: string;
}

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

/* ------------------ Mock Data ------------------ */

const orderStatuses = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
];

const paymentStatuses = [
  'pending',
  'paid',
  'failed',
  'refunded',
];

const mockOrders: Order[] = [
  {
    id: '1',
    customer_name: 'Rahul Sharma',
    customer_email: 'rahul@gmail.com',
    customer_phone: '9876543210',
    shipping_address: 'Hyderabad, Telangana',
    total_amount: 560,
    status: 'pending',
    payment_status: 'paid',
    created_at: new Date().toISOString(),
    notes: 'Deliver before 6 PM',
  },
];

const mockOrderItems: OrderItem[] = [
  {
    id: 'i1',
    product_name: 'Fresh Milk',
    quantity: 2,
    unit_price: 50,
    total_price: 100,
  },
  {
    id: 'i2',
    product_name: 'Ghee',
    quantity: 1,
    unit_price: 460,
    total_price: 460,
  },
];

/* ------------------ Component ------------------ */

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems] = useState<OrderItem[]>(mockOrderItems);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const updateOrderStatus = (id: string, status: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status } : o
      )
    );
    toast({ title: 'Order status updated' });
  };

  const updatePaymentStatus = (id: string, payment_status: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, payment_status } : o
      )
    );
    toast({ title: 'Payment status updated' });
  };

  const getStatusColor = (status: string) => {
    const map: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800',
    };
    return map[status] ?? 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">
          Manage customer orders
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Order List ({orders.length})
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <p className="font-medium">
                      {order.customer_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer_email}
                    </p>
                  </TableCell>

                  <TableCell>
                    {new Date(
                      order.created_at
                    ).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="font-medium">
                    ₹{order.total_amount}
                  </TableCell>

                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(v) =>
                        updateOrderStatus(order.id, v)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {orderStatuses.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell>
                    <Select
                      value={order.payment_status}
                      onValueChange={(v) =>
                        updatePaymentStatus(order.id, v)
                      }
                    >
                      <SelectTrigger className="w-28">
                        <Badge
                          className={getStatusColor(
                            order.payment_status
                          )}
                        >
                          {order.payment_status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {paymentStatuses.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              <p>
                <strong>Customer:</strong>{' '}
                {selectedOrder.customer_name}
              </p>
              <p>
                <strong>Address:</strong>{' '}
                {selectedOrder.shipping_address}
              </p>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">
                      Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="flex gap-2">
                        <Package className="h-4 w-4" />
                        {item.product_name}
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        ₹{item.unit_price}
                      </TableCell>
                      <TableCell className="text-right">
                        ₹{item.total_price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
