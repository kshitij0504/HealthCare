import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { 
  Loader2, Navigation, Phone, AlertCircle, 
  Accessibility, Search, MapPin, Clock,
  Map, List, Route, ChevronRight, Info
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1Ijoia3NoaXRpai0tMTIzIiwiYSI6ImNtNTVjbmt4aDFlODUybnNlMXZiYXE5MnkifQ.oMukhMaIA2A129LS8QrmVg"

const HospitalLocator = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState("map");
  const [showDirections, setShowDirections] = useState(false);
  const [route, setRoute] = useState(null);
  const [travelTime, setTravelTime] = useState(null);
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);

  const fetchHospitalsFromOverpass = async (lat, lon, radius = 6000) => {
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

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      return data.elements
        .filter((element) => element.tags && element.tags.name)
        .map((element) => ({
          name: element.tags.name,
          lat: element.lat,
          lon: element.lon,
          address: element.tags["addr:full"] || "No address available",
          phone: element.tags.phone || "No phone available",
          emergency: element.tags.emergency === "yes",
          wheelchair: element.tags.wheelchair === "yes",
        }));
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      setError("Failed to fetch nearby hospitals");
      return [];
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

  const getDirections = async (startLat, startLon, endLat, endLon) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${startLon},${startLat};${endLon},${endLat}?geometries=geojson&access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      
      if (data.routes && data.routes[0]) {
        setRoute(data.routes[0].geometry);
        setTravelTime(Math.round(data.routes[0].duration / 60));
        
        if (map.getSource('route')) {
          map.getSource('route').setData(data.routes[0].geometry);
        } else {
          map.addLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: data.routes[0].geometry
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#3b82f6',
              'line-width': 4,
              'line-opacity': 0.75
            }
          });
        }
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  const displayMap = (lat, lon, hospitals) => {
    if (!mapContainerRef.current) return;

    if (!map) {
      const initializedMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [lon, lat],
        zoom: 13,
      });

      initializedMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
      initializedMap.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }), 'top-right');

      if (accuracy) {
        initializedMap.on('load', () => {
          initializedMap.addSource("accuracy-radius", {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [lon, lat],
              },
              properties: {
                radius: accuracy,
              },
            },
          });

          initializedMap.addLayer({
            id: "accuracy-radius",
            type: "circle",
            source: "accuracy-radius",
            paint: {
              "circle-radius": {
                stops: [[0, 0], [20, accuracy * initializedMap.getZoom()]],
              },
              "circle-color": "#4264fb",
              "circle-opacity": 0.2,
            },
          });
        });
      }

      new mapboxgl.Marker({ color: "#4264fb" })
        .setLngLat([lon, lat])
        .setPopup(
          new mapboxgl.Popup().setHTML(`
            <div class="font-poppins">
              <h4 class="font-bold">Your Location</h4>
              <p>Accuracy: ${accuracy ? `±${Math.round(accuracy)}m` : "Unknown"}</p>
            </div>
          `)
        )
        .addTo(initializedMap);

      hospitals.forEach((hospital) => {
        const marker = new mapboxgl.Marker({
          color: hospital.emergency ? "#dc2626" : "#ef4444",
        })
          .setLngLat([hospital.lon, hospital.lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(`
              <div class="font-poppins">
                <h4 class="font-bold">${hospital.name}</h4>
                <p>${hospital.address}</p>
                ${hospital.phone !== "No phone available" ? `<p>📞 ${hospital.phone}</p>` : ""}
                ${hospital.emergency ? "<p>🚨 Emergency Services Available</p>" : ""}
                ${hospital.wheelchair ? "<p>♿ Wheelchair Accessible</p>" : ""}
              </div>
            `)
          )
          .addTo(initializedMap);

        marker.getElement().addEventListener('click', () => {
          setSelectedHospital(hospital);
        });
      });
      
      setMap(initializedMap);
    } else {
      map.setCenter([lon, lat]);
    }
  };

  const fetchLocationAndHospitals = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const accuracy = position.coords.accuracy;

      setLatitude(lat);
      setLongitude(lon);
      setAccuracy(accuracy);

      const hospitalData = await fetchHospitalsFromOverpass(lat, lon);
      setHospitals(hospitalData);
      setFilteredHospitals(hospitalData);
      displayMap(lat, lon, hospitalData);
    } catch (error) {
      console.error("Location error:", error);
      setError(
        error.code === 1
          ? "Please enable location services to find nearby hospitals"
          : "Could not determine your location accurately"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = hospitals.filter(hospital =>
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredHospitals(filtered);
  }, [searchQuery, hospitals]);

  useEffect(() => {
    fetchLocationAndHospitals();
    return () => {
      if (map) map.remove();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">Finding Nearby Hospitals</h2>
          <p className="text-gray-600 mt-2">Please wait while we locate medical facilities in your area...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="w-5 h-5 mr-2" />
          <AlertDescription className="text-sm">{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">
              Nearby Hospitals
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search hospitals..."
                className="pl-9 w-64 bg-gray-50 border-gray-200 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs value={viewType} onValueChange={setViewType} className="bg-gray-100 p-1 rounded-lg">
              <TabsList className="grid w-full grid-cols-2 bg-transparent">
                <TabsTrigger value="map" className="data-[state=active]:bg-white">
                  <Map className="w-4 h-4 mr-2" />
                  Map
                </TabsTrigger>
                <TabsTrigger value="list" className="data-[state=active]:bg-white">
                  <List className="w-4 h-4 mr-2" />
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {viewType === "map" ? (
          <div className="flex-1 flex">
            <div className="flex-1 relative">
              <div ref={mapContainerRef} className="w-full h-full" />
              
              {accuracy && (
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Info className="w-4 h-4 text-blue-600" />
                    <span>Location accuracy: ±{Math.round(accuracy)}m</span>
                  </div>
                </div>
              )}
            </div>

            <Sheet open={selectedHospital !== null} onOpenChange={() => setSelectedHospital(null)}>
              <SheetContent position="right" size="lg" className="w-[400px] p-0">
                {selectedHospital && (
                  <>
                    <SheetHeader className="p-6 border-b">
                      <SheetTitle>{selectedHospital.name}</SheetTitle>
                      <div className="flex gap-2 mt-2">
                        {selectedHospital.emergency && (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Emergency
                          </Badge>
                        )}
                        {selectedHospital.wheelchair && (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Accessibility className="w-3 h-3" />
                            Accessible
                          </Badge>
                        )}
                      </div>
                    </SheetHeader>
                    
                    <div className="p-6 space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-600">
                          <Navigation className="w-5 h-5 mr-2" />
                            <span>{calculateDistance(latitude, longitude, selectedHospital.lat, selectedHospital.lon)} km away</span>
                          </div>
                          {travelTime && (
                            <Badge variant="outline" className="ml-2">
                              ~{travelTime} min drive
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-start text-gray-600">
                          <MapPin className="w-5 h-5 mr-2 mt-1" />
                          <span>{selectedHospital.address}</span>
                        </div>
                        
                        {selectedHospital.phone !== "No phone available" && (
                          <div className="flex items-center text-gray-600">
                            <Phone className="w-5 h-5 mr-2" />
                            <span>{selectedHospital.phone}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          onClick={() => {
                            getDirections(
                              latitude,
                              longitude,
                              selectedHospital.lat,
                              selectedHospital.lon
                            );
                            setShowDirections(true);
                          }}
                        >
                          <Route className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => {
                            const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedHospital.lat},${selectedHospital.lon}`;
                            window.open(url, '_blank');
                          }}
                        >
                          Open in Google Maps
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredHospitals.map((hospital) => (
                <Card
                  key={`${hospital.lat}-${hospital.lon}`}
                  className="hover:shadow-lg transition-all hover:border-blue-200 cursor-pointer"
                  onClick={() => {
                    setSelectedHospital(hospital);
                    setViewType("map");
                    map.flyTo({
                      center: [hospital.lon, hospital.lat],
                      zoom: 15,
                      duration: 1500
                    });
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg">{hospital.name}</h3>
                      <div className="flex gap-1">
                        {hospital.emergency && (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Emergency
                          </Badge>
                        )}
                        {hospital.wheelchair && (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Accessibility className="w-3 h-3" />
                            Accessible
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Navigation className="w-4 h-4 mr-2" />
                        {calculateDistance(latitude, longitude, hospital.lat, hospital.lon)} km away
                      </div>
                      
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 mr-2 mt-1" />
                        {hospital.address}
                      </div>
                      
                      {hospital.phone !== "No phone available" && (
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          {hospital.phone}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalLocator;