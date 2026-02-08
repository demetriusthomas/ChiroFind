"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Clock, DollarSign } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
}

// Mock data - will be replaced with database
const initialServices: Service[] = [
  {
    id: "1",
    name: "Initial Consultation",
    description: "Comprehensive evaluation including health history, examination, and treatment plan.",
    duration: 60,
    price: 150,
  },
  {
    id: "2",
    name: "Chiropractic Adjustment",
    description: "Standard spinal adjustment and manipulation therapy.",
    duration: 30,
    price: 75,
  },
  {
    id: "3",
    name: "Follow-up Visit",
    description: "Progress evaluation and continued treatment.",
    duration: 30,
    price: 65,
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "30",
    price: "",
  });

  const openAddDialog = () => {
    setEditingService(null);
    setFormData({ name: "", description: "", duration: "30", price: "" });
    setDialogOpen(true);
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      duration: service.duration.toString(),
      price: service.price.toString(),
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    const newService: Service = {
      id: editingService?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      duration: parseInt(formData.duration),
      price: parseFloat(formData.price),
    };

    if (editingService) {
      setServices(services.map((s) => (s.id === editingService.id ? newService : s)));
    } else {
      setServices([...services, newService]);
    }

    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter((s) => s.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-secondary">
            Services
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage the services you offer to patients.
          </p>
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {services.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">
              You haven&apos;t added any services yet.
            </p>
            <Button onClick={openAddDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Service
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <Card key={service.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-secondary">
                      {service.name}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {service.duration} min
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-secondary">
                        <DollarSign className="w-4 h-4" />
                        {service.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(service)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Edit Service" : "Add Service"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Service Name
              </label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Chiropractic Adjustment"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Brief description of the service..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Duration (minutes)
                </label>
                <Input
                  type="number"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  placeholder="30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Price ($)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="75.00"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingService ? "Save Changes" : "Add Service"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
