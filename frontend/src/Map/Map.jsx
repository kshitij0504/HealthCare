import React, { useState, useEffect } from "react";
import { Map, Marker, Popup, Source, Layer } from "react-map-gl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Navigation2, 
  MapPin, 
  Phone, 
  Building, 
  Loader2, 
  List, 
  Clock, 
  Route,
  Star,
  AlertCircle,
  Heart,
  X
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Alert, AlertDescription } from "@/components/ui/alert";

const HospitalLocator = () => {
  const mytoken = "pk.eyJ1Ijoia3NoaXRpai0tMTIzIiwiYSI6ImNtNTVjbmt4aDFlODUybnNlMXZiYXE5MnkifQ.oMukhMaIA2A129LS8QrmVg";
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 14,
    pitch: 50,
    bearing: 0,
  });

  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showList, setShowList] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState(null);
  const [routeDistance, setRouteDistance] = useState(null);
  const [routeDuration, setRouteDuration] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setViewport((prev) => ({
            ...prev,
            latitude,
            longitude,
          }));
          setUserLocation({ latitude, longitude });
          fetchNearbyHospitals(latitude, longitude);
        },
        (error) => {
          setError("Unable to access your location. Please enable location services.");
          setLoading(false);
        }
      );
    }
  }, []);

  const fetchNearbyHospitals = async (lat, lon) => {
    try {
      const radius = 5000;
      const query = `
        [out:json];
        (
          node["amenity"="hospital"](around:${radius},${lat},${lon});
          way["amenity"="hospital"](around:${radius},${lat},${lon});
          relation["amenity"="hospital"](around:${radius},${lat},${lon});
        );
        out body;
        >;
        out skel qt;
      `;
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!data.elements || data.elements.length === 0) {
        throw new Error("No hospitals found in your area");
      }

      const processedHospitals = data.elements
        .filter(element => element.lat && element.lon && element.tags && element.tags.name)
        .map((element) => ({
          id: element.id,
          name: element.tags.name,
          latitude: element.lat,
          longitude: element.lon,
          address: element.tags.address || "Address not available",
          phone: element.tags["phone"] || "Phone not available",
          emergency: element.tags["emergency"] === "yes" ? "24/7 Emergency" : "Regular Hours",
          distance: calculateDistance(lat, lon, element.lat, element.lon),
          rating: (Math.random() * 2 + 3).toFixed(1), // Simulated rating between 3-5
        }));

      setHospitals(processedHospitals.sort((a, b) => a.distance - b.distance));
      setLoading(false);
    } catch (error) {
      setError(error.message || "Error fetching nearby hospitals. Please try again later.");
      setLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  const getDirections = async (hospital) => {
    if (userLocation) {
      setShowDirections(true);
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.longitude},${userLocation.latitude};${hospital.longitude},${hospital.latitude}?geometries=geojson&overview=full&access_token=${mytoken}`
        );
        const data = await response.json();
        
        if (data.routes && data.routes[0]) {
          setRouteCoordinates(data.routes[0].geometry.coordinates);
          setRouteDistance((data.routes[0].distance / 1000).toFixed(1));
          setRouteDuration((data.routes[0].duration / 60).toFixed(0));
        }
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center">
          <div className="relative">
            <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
            <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-3">Finding Nearby Hospitals</h2>
          <p className="text-gray-600 text-center">Locating medical facilities in your vicinity...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex justify-center items-center h-screen bg-gray-50">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-5 w-5 mr-2" />
          <AlertDescription className="text-lg">{error}</AlertDescription>
          <Button 
            className="mt-4 w-full bg-red-600 hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="h-screen w-full relative">
      <Map
        {...viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={mytoken}
      >
        {/* User Location Marker */}
        {userLocation && (
          <Marker latitude={userLocation.latitude} longitude={userLocation.longitude}>
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-blue-500 rounded-full opacity-20 animate-ping" />
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-blue-500 rounded-full opacity-10 animate-pulse" />
              <div className="relative z-10 bg-blue-600 rounded-full p-2 shadow-xl">
                <Navigation2 className="h-5 w-5 text-white" />
              </div>
            </div>
          </Marker>
        )}

        {/* Hospital Markers - Only show if no route is displayed or if it's the selected hospital */}
        {hospitals.map((hospital) => (
          (!showDirections || (selectedHospital && hospital.id === selectedHospital.id)) && (
            <Marker
              key={hospital.id}
              latitude={hospital.latitude}
              longitude={hospital.longitude}
            >
              <button
                onClick={() => {
                  setSelectedHospital(hospital);
                  getDirections(hospital); // Automatically show route when hospital is selected
                }}
                className="transform transition-all duration-300 hover:scale-110"
              >
                <div className="relative">
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-red-500 rounded-full opacity-10 animate-pulse" />
                  <div className="relative z-10 bg-white rounded-full p-2 shadow-xl border-2 border-red-500">
                    <Heart className="h-5 w-5 text-red-500" />
                  </div>
                </div>
              </button>
            </Marker>
          )
        ))}

        {/* Enhanced Popup */}
        {selectedHospital && (
          <Popup
            latitude={selectedHospital.latitude}
            longitude={selectedHospital.longitude}
            closeButton={false}
            maxWidth="320px"
            className="hospital-popup"
          >
            <Card className="w-80 shadow-2xl border-0 overflow-hidden">
              <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative">
                <button
                  onClick={() => {
                    setSelectedHospital(null);
                    setShowDirections(false);
                    setRouteCoordinates(null);
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
                {/* ... (rest of the popup content remains the same) */}
              </CardHeader>
              {/* ... (rest of the card content remains the same) */}
            </Card>
          </Popup>
        )}

        {/* Route Display with solid line */}
        {showDirections && routeCoordinates && (
          <Source type="geojson" data={{
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: routeCoordinates
            }
          }}>
            <Layer
              id="route"
              type="line"
              paint={{
                'line-color': '#2563eb',
                'line-width': 5,
                'line-opacity': 0.8
              }}
            />
          </Source>
        )}
      </Map>

      {/* Enhanced List View Button */}
      <div className="absolute top-4 right-4 z-10">
        <Button 
          className="bg-white text-gray-800 shadow-xl hover:bg-gray-50 border border-gray-200 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
          onClick={() => setShowList(true)}
        >
          <List className="h-5 w-5 mr-2 text-blue-600" />
          View List
        </Button>
      </div>

      {/* Hospital List Sheet with enhanced styling */}
      <Sheet open={showList} onOpenChange={setShowList}>
        <SheetContent className="w-full sm:max-w-lg p-0">
          <SheetHeader className="p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <SheetTitle className="flex items-center gap-2 text-xl text-white">
              <Heart className="h-6 w-6" />
              Nearby Hospitals ({hospitals.length})
            </SheetTitle>
          </SheetHeader>
          <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
            {hospitals.map((hospital) => (
              <Card 
                key={hospital.id}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
                onClick={() => {
                  setSelectedHospital(hospital);
                  setViewport(prev => ({
                    ...prev,
                    latitude: hospital.latitude,
                    longitude: hospital.longitude,
                    zoom: 15
                  }));
                  setShowList(false);
                }}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold flex items-center gap-2 text-gray-800">
                        <Heart className="h-4 w-4 text-red-500" />
                        {hospital.name}
                      </h3>
                      <span className="text-sm bg-blue-50 text-blue-600 px-2 py-1 rounded-full flex items-center gap-1">
                        <Navigation2 className="h-4 w-4" />
                        {hospital.distance} km
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-500"
                          fill={i < Math.floor(hospital.rating) ? "currentColor" : "none"}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{hospital.rating}/5</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span className="text-green-600 font-medium">{hospital.emergency}</span>
                    </div>

                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <Building className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span className="leading-tight">{hospital.address}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{hospital.phone}</span>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-sm h-9"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedHospital(hospital);
                          getDirections(hospital);
                          setShowList(false);
                        }}
                      >
                        <Route className="h-4 w-4 mr-2" />
                        Directions
                      </Button>
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700 text-sm h-9"
                        onClick={(e) => {
                          e.stopPropagation();
                          const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${hospital.latitude},${hospital.longitude}&travelmode=driving`;
                          window.open(url, "_blank");
                        }}
                      >
                        <Navigation2 className="h-4 w-4 mr-2" />
                        Navigate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Bottom Info Bar */}
      {showDirections && routeCoordinates && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <Card className="bg-white/95 backdrop-blur-md border-0 shadow-xl rounded-2xl">
            <CardContent className="p-6 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <Route className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-600">Distance</span>
                  <span className="text-2xl font-bold text-blue-600">{routeDistance} km</span>
                </div>
              </div>
              <div className="w-px h-16 bg-gray-200" />
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-600">Duration</span>
                  <span className="text-2xl font-bold text-blue-600">{routeDuration} mins</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HospitalLocator;