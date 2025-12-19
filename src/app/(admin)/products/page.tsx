"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock_quantity: number;
  unit: string;
  is_active: boolean;
}

/* ------------------------------------------------------------------ */
/* Static Data                                                        */
/* ------------------------------------------------------------------ */
const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Fresh Cow Milk",
    description: "Pure village cow milk delivered fresh every morning",
    price: 60,
    category: "Milk",
    image_url: "",
    stock_quantity: 120,
    unit: "litre",
    is_active: true,
  },
  {
    id: "2",
    name: "Buffalo Milk",
    description: "Rich and creamy buffalo milk",
    price: 75,
    category: "Milk",
    image_url: "",
    stock_quantity: 80,
    unit: "litre",
    is_active: true,
  },
  {
    id: "3",
    name: "A2 Desi Ghee",
    description: "Traditional A2 cow ghee made using bilona method",
    price: 950,
    category: "Ghee",
    image_url: "",
    stock_quantity: 25,
    unit: "kg",
    is_active: true,
  },
  {
    id: "4",
    name: "Homemade Curd",
    description: "Thick and natural curd",
    price: 55,
    category: "Curd",
    image_url: "",
    stock_quantity: 60,
    unit: "kg",
    is_active: false,
  },
];

/* ------------------------------------------------------------------ */
/* Categories                                                         */
/* ------------------------------------------------------------------ */
const categories = [
  "Milk",
  "Dairy",
  "Ghee",
  "Butter",
  "Curd",
  "Paneer",
  "Buttermilk",
  "Other",
];

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Milk",
    image_url: "",
    stock_quantity: "0",
    unit: "litre",
    is_active: true,
  });

  const { toast } = useToast();

  /* ---------------- Reset Form ---------------- */
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "Milk",
      image_url: "",
      stock_quantity: "0",
      unit: "litre",
      is_active: true,
    });
    setEditingProduct(null);
  };

  /* ---------------- Edit Product ---------------- */
  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: String(product.price),
      category: product.category,
      image_url: product.image_url,
      stock_quantity: String(product.stock_quantity),
      unit: product.unit,
      is_active: product.is_active,
    });
    setIsDialogOpen(true);
  };

  /* ---------------- Submit ---------------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const product: Product = {
      id: editingProduct?.id ?? crypto.randomUUID(),
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      image_url: formData.image_url,
      stock_quantity: Number(formData.stock_quantity),
      unit: formData.unit,
      is_active: formData.is_active,
    };

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? product : p))
      );
      toast({ title: "Updated", description: "Product updated successfully" });
    } else {
      setProducts((prev) => [product, ...prev]);
      toast({ title: "Created", description: "Product created successfully" });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  /* ---------------- Delete ---------------- */
  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Deleted", description: "Product deleted successfully" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog
          </p>
        </div>

        {/* Add Product */}
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Add Product"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Product Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Price (₹)</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    value={formData.stock_quantity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stock_quantity: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) =>
                    setFormData({ ...formData, category: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(v) =>
                    setFormData({ ...formData, is_active: v })
                  }
                />
                <Label>Active</Label>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProduct ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Product List ({products.length})
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>
                    ₹{p.price}/{p.unit}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "rounded-full px-2 py-1 text-xs font-medium",
                        p.is_active
                          ? "bg-green-500/10 text-green-600"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {p.is_active ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(p)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(p.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
