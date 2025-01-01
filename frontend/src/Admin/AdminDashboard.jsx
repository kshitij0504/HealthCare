import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Building2, Users, Activity, Settings, LogOut, Plus,
  Search, Edit, Trash2, MapPin, Mail, Phone, UserRound
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const { currentUser } = useSelector((state) => state.user || {});
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingOrg, setAddingOrg] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [newOrg, setNewOrg] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    contact: "",
    services: "",
    email: "",
    location: "",
  });

  useEffect(() => {
    if (!currentUser?.data?.role || currentUser?.data?.role !== "ADMIN") {
      navigate("/");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/admin/org", {
        withCredentials: true
      });
      setOrganizations(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch organizations");
      console.error("Error fetching organizations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrganization = async (e) => {
    e.preventDefault();
    try {
      setAddingOrg(true);
      const response = await axios.post(
        "http://localhost:5000/admin/add",
        newOrg,
        {
          withCredentials: true
        }
      );
      setOrganizations([...organizations, response.data.organization]);
      setNewOrg({
        name: "",
        address: "",
        latitude: "",
        longitude: "",
        contact: "",
        services: "",
        email: "",
        location: "",
      });
      setDialogOpen(false); // Close the dialog
    } catch (error) {
      console.error("Error adding organization:", error);
      setError("Failed to add organization");
    } finally {
      setAddingOrg(false);
    }
  };

  const handleDeleteOrg = async (id) => {
    if (window.confirm("Are you sure you want to delete this organization?")) {
      try {
        await axios.delete(`http://localhost:5000/admin/organizations/${id}`);
        setOrganizations(organizations.filter(org => org.id !== id));
      } catch (error) {
        console.error("Error deleting organization:", error);
        setError("Failed to delete organization");
      }
    }
  };

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed w-64 h-full bg-teal-800 p-4 shadow-xl">
        <div className="text-white text-2xl font-bold mb-8 p-4 border-b border-teal-700">
          Curenest Admin
        </div>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-teal-700">
            <Building2 className="mr-2 h-5 w-5" />
            Organizations
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-teal-700">
            <Users className="mr-2 h-5 w-5" />
            Users
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-teal-700">
            <Activity className="mr-2 h-5 w-5" />
            Analytics
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-teal-700">
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-teal-700 mt-auto">
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Health Organizations</h1>
            <p className="text-gray-600 mt-1">Manage and monitor healthcare facilities</p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Organization
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Add New Health Organization</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddOrganization} className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Organization Name</Label>
                      <Input
                        id="name"
                        value={newOrg.name}
                        onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })}
                        placeholder="Enter organization name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newOrg.location}
                        onChange={(e) => setNewOrg({ ...newOrg, location: e.target.value })}
                        placeholder="Enter city/location"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={newOrg.address}
                        onChange={(e) => setNewOrg({ ...newOrg, address: e.target.value })}
                        placeholder="Enter full address"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="latitude">Latitude</Label>
                        <Input
                          id="latitude"
                          type="number"
                          step="any"
                          value={newOrg.latitude}
                          onChange={(e) => setNewOrg({ ...newOrg, latitude: e.target.value })}
                          placeholder="Latitude"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="longitude">Longitude</Label>
                        <Input
                          id="longitude"
                          type="number"
                          step="any"
                          value={newOrg.longitude}
                          onChange={(e) => setNewOrg({ ...newOrg, longitude: e.target.value })}
                          placeholder="Longitude"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="contact">Contact</Label>
                      <Input
                        id="contact"
                        value={newOrg.contact}
                        onChange={(e) => setNewOrg({ ...newOrg, contact: e.target.value })}
                        placeholder="Enter contact number"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newOrg.email}
                        onChange={(e) => setNewOrg({ ...newOrg, email: e.target.value })}
                        placeholder="Enter email address"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="services">Services</Label>
                      <Input
                        id="services"
                        value={newOrg.services}
                        onChange={(e) => setNewOrg({ ...newOrg, services: e.target.value })}
                        placeholder="Enter services (comma-separated)"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button 
                    type="submit" 
                    className="w-full bg-teal-600 hover:bg-teal-700"
                    disabled={addingOrg}
                  >
                    {addingOrg ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Adding Organization...
                      </div>
                    ) : (
                      "Add Organization"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Status */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search organizations..."
              className="pl-10 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md">
              {error}
            </div>
          )}
        </div>

        {/* Organizations Grid */}
        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading organizations...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrganizations.map((org) => (
              <Card key={org.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-bold">{org.name}</CardTitle>
                  <div className="space-x-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4 text-teal-600" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteOrg(org.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-teal-600" />
                      <span>{org.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-teal-600" />
                      <span>{org.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserRound className="h-4 w-4 text-teal-600" />
                      <span>{org.doctors} Doctors • {org.patients} Patients</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-teal-600" />
                      <span>{org.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-teal-600" />
                      <span>{org.contact}</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <p className="font-medium text-gray-700">Services:</p>
                      <p className="mt-1">{org.services}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;