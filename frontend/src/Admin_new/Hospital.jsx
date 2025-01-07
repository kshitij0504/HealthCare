import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Eye, Plus } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Hospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
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
    const fetchHospitals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/org", {
          withCredentials: true,
        });
        setHospitals(response.data.data);
      } catch (error) {
        setError("Failed to fetch hospital data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const handleAddOrganization = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/add",
        newOrg,
        {
          withCredentials: true,
        }
      );
      setHospitals([...hospitals, response.data.organization]);
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
      setDialogOpen(false);
    } catch (error) {
      setError("Failed to add organization");
      console.error(error);
    }
  };

  const handleViewDetails = (hospital) => {
    setSelectedHospital(hospital);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-teal-600">Hospitals</h1>
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
                        onChange={(e) =>
                          setNewOrg({ ...newOrg, name: e.target.value })
                        }
                        placeholder="Enter organization name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newOrg.location}
                        onChange={(e) =>
                          setNewOrg({ ...newOrg, location: e.target.value })
                        }
                        placeholder="Enter location"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={newOrg.address}
                        onChange={(e) =>
                          setNewOrg({ ...newOrg, address: e.target.value })
                        }
                        placeholder="Enter address"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="contact">Contact Number</Label>
                      <Input
                        id="contact"
                        value={newOrg.contact}
                        onChange={(e) =>
                          setNewOrg({ ...newOrg, contact: e.target.value })
                        }
                        placeholder="Enter contact number"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        id="latitude"
                        value={newOrg.latitude}
                        onChange={(e) =>
                          setNewOrg({ ...newOrg, latitude: e.target.value })
                        }
                        placeholder="Enter latitude"
                      />
                    </div>

                    <div>
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        id="longitude"
                        value={newOrg.longitude}
                        onChange={(e) =>
                          setNewOrg({ ...newOrg, longitude: e.target.value })
                        }
                        placeholder="Enter longitude"
                      />
                    </div>

                    <div>
                      <Label htmlFor="services">Services</Label>
                      <Input
                        id="services"
                        value={newOrg.services}
                        onChange={(e) =>
                          setNewOrg({ ...newOrg, services: e.target.value })
                        }
                        placeholder="Enter services"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={newOrg.email}
                        onChange={(e) =>
                          setNewOrg({ ...newOrg, email: e.target.value })
                        }
                        placeholder="Enter email"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Add Organization
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <p>Loading hospitals...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-teal-600 font-semibold">
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Location</th>
                  <th className="px-4 py-2 border">Doctors</th>
                  <th className="px-4 py-2 border">Patients</th>
                  <th className="px-4 py-2 border">View</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((hospital, index) => (
                  <tr
                    key={hospital.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } text-gray-700`}
                  >
                    <td className="px-4 py-2 border">{hospital.name}</td>
                    <td className="px-4 py-2 border">{hospital.address}</td>
                    <td className="px-4 py-2 border">
                      {hospital._count.doctors}
                    </td>
                    <td className="px-4 py-2 border">{hospital.numberOfPatients}</td>
                    <td className="px-4 py-2 border">
                      <button
                        className="text-teal-600 hover:underline"
                        onClick={() => handleViewDetails(hospital)}
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Dialog
          open={selectedHospital !== null}
          onOpenChange={() => setSelectedHospital(null)}
        >
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>{selectedHospital?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>
                <strong>Location:</strong> {selectedHospital?.address}
              </p>
              <p>
                <strong>Contact:</strong> {selectedHospital?.contact}
              </p>
              <p>
                <strong>Services:</strong> {selectedHospital?.services}
              </p>
              <p>
                <strong>Email:</strong> {selectedHospital?.email}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Hospital;
