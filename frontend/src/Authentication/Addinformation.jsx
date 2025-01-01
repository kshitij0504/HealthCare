import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const WelcomeHealthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {};
  console.log(userId);
  const [formData, setFormData] = useState({
    healthDetails: {
      healthStatus: "",
      bloodType: "",
      allergies: "",
      chronicConditions: "",
      emergencyContactName: "",
      emergencyContactNumber: "",
    },
    insuranceDetails: {
      insuranceProvider: "",
      policyNumber: "",
      policyStartDate: "",
      policyEndDate: "",
    },
  });

  const [consents, setConsents] = useState({
    dataProcessing: false,
    medicalInfo: false,
    termsAndConditions: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!Object.values(consents).every((consent) => consent)) {
      setError("Please accept all consents to proceed");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        userId,
        healthDetails: formData.healthDetails,
        insuranceDetails: formData.insuranceDetails,
      };

      const response = await axios.post(
        "http://localhost:5000/details",
        payload
      );
      if (response.status === 201) {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message || "Failed to save details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 p-4 font-inter">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-bold">
            Welcome to CureNest
          </CardTitle>
          <p className="text-center text-gray-600 mt-2">
            Please provide your health information to get started
          </p>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Health Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Health Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Health Status</Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("healthDetails", "healthStatus", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your health status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Blood Type</Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("healthDetails", "bloodType", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Allergies (if any)</Label>
                  <Input
                    type="text"
                    className="mt-1"
                    placeholder="Enter your allergies"
                    onChange={(e) =>
                      handleInputChange(
                        "healthDetails",
                        "allergies",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <Label>Chronic Conditions (if any)</Label>
                  <Input
                    type="text"
                    className="mt-1"
                    placeholder="Enter chronic conditions"
                    onChange={(e) =>
                      handleInputChange(
                        "healthDetails",
                        "chronicConditions",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <Label>Emergency Contact Name</Label>
                  <Input
                    type="text"
                    className="mt-1"
                    placeholder="Enter contact name"
                    onChange={(e) =>
                      handleInputChange(
                        "healthDetails",
                        "emergencyContactName",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <Label>Emergency Contact Number</Label>
                  <Input
                    type="tel"
                    className="mt-1"
                    placeholder="Enter contact number"
                    onChange={(e) =>
                      handleInputChange(
                        "healthDetails",
                        "emergencyContactNumber",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>

            {/* Insurance Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Insurance Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Insurance Provider</Label>
                  <Input
                    type="text"
                    className="mt-1"
                    placeholder="Enter provider name"
                    onChange={(e) =>
                      handleInputChange(
                        "insuranceDetails",
                        "insuranceProvider",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <Label>Policy Number</Label>
                  <Input
                    type="text"
                    className="mt-1"
                    placeholder="Enter policy number"
                    onChange={(e) =>
                      handleInputChange(
                        "insuranceDetails",
                        "policyNumber",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <Label>Policy Start Date</Label>
                  <Input
                    type="date"
                    className="mt-1"
                    onChange={(e) =>
                      handleInputChange(
                        "insuranceDetails",
                        "policyStartDate",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <Label>Policy End Date</Label>
                  <Input
                    type="date"
                    className="mt-1"
                    onChange={(e) =>
                      handleInputChange(
                        "insuranceDetails",
                        "policyEndDate",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>

            {/* Consent Checkboxes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Required Consents</h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dataProcessing"
                    checked={consents.dataProcessing}
                    onCheckedChange={(checked) =>
                      setConsents((prev) => ({
                        ...prev,
                        dataProcessing: checked,
                      }))
                    }
                  />
                  <Label
                    htmlFor="dataProcessing"
                    className="text-sm text-gray-600"
                  >
                    I consent to the processing of my personal data in
                    accordance with the Privacy Policy
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="medicalInfo"
                    checked={consents.medicalInfo}
                    onCheckedChange={(checked) =>
                      setConsents((prev) => ({ ...prev, medicalInfo: checked }))
                    }
                  />
                  <Label
                    htmlFor="medicalInfo"
                    className="text-sm text-gray-600"
                  >
                    I authorize CureNest to store and process my medical
                    information
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="termsAndConditions"
                    checked={consents.termsAndConditions}
                    onCheckedChange={(checked) =>
                      setConsents((prev) => ({
                        ...prev,
                        termsAndConditions: checked,
                      }))
                    }
                  />
                  <Label
                    htmlFor="termsAndConditions"
                    className="text-sm text-gray-600"
                  >
                    I agree to CureNest's Terms and Conditions
                  </Label>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700"
              disabled={
                loading || !Object.values(consents).every((consent) => consent)
              }
            >
              {loading ? "Saving Details..." : "Submit Details"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeHealthForm;
