import React from "react";
import { MapPin, Phone, Mail, Star, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const HospitalCard = ({ hospital, onClick }) => {
  return (
    <Card className="w-1/2 hover:shadow-lg transition-all duration-300 group bg-white border border-gray-200 rounded-lg">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">
              {hospital.name}
            </h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{hospital.address}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {hospital.rating && (
              <Badge className="bg-yellow-50 text-yellow-700 text-xs px-3 py-1 flex items-center gap-1 rounded-full">
                <Star className="w-3 h-3 fill-current" />
                {hospital.rating}
              </Badge>
            )}
            <Button
              onClick={onClick}
              size="sm"
              variant="ghost"
              className="h-9 px-4 hover:bg-teal-100 text-teal-600 rounded-md transition-colors"
            >
              <span className="sr-only">View Details</span>
              <ArrowRight className="w-4 h-4 text-teal-600" />
            </Button>
          </div>
        </div>

        <div className="flex gap-6 mb-5">
          {hospital.contact && (
            <div className="flex items-center text-gray-600 text-sm">
              <Phone className="w-4 h-4 mr-2" />
              <span>{hospital.contact}</span>
            </div>
          )}
          {hospital.email && (
            <div className="flex items-center text-gray-600 text-sm">
              <Mail className="w-4 h-4 mr-2" />
              <span>{hospital.email}</span>
            </div>
          )}
        </div>

        {hospital.services && hospital.services.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {hospital.services.map((service, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-teal-50 text-teal-700 text-xs px-3 py-1 rounded-full"
              >
                {service}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HospitalCard;
