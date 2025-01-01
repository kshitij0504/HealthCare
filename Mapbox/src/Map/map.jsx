// import React, { useEffect, useState } from "react";
// import mapboxgl from "mapbox-gl";

// mapboxgl.accessToken = "pk.eyJ1Ijoia3NoaXRpai0tMTIzIiwiYSI6ImNtMG95ZXQ0NTBja2cycXNibmIwNHZ3eHoifQ.8rtnZShe9kR3NjOHxKx7Jw"; // Replace with your Mapbox token

// const HospitalLocator = () => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [hospitals, setHospitals] = useState([]);
//   const [map, setMap] = useState(null);

//   const fetchHospitalsFromOverpass = async (lat, lon, radius = 1000) => {
//     const query = `
//       [out:json];
//       (
//         node["amenity"="hospital"](around:${radius},${lat},${lon});
//       );
//       out body;
//     `;
//     const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();

//       // Map results to a simplified format
//       return data.elements.map((element) => ({
//         name: element.tags.name || "Unnamed Hospital",
//         lat: element.lat,
//         lon: element.lon,
//         address: element.tags["addr:street"] || "No address available",
//       }));
//     } catch (error) {
//       console.error("Error fetching hospitals from Overpass:", error);
//       return [];
//     }
//   };

//   const displayMap = (lat, lon, hospitals) => {
//     const initializedMap =
//       map ||
//       new mapboxgl.Map({
//         container: "map",
//         style: "mapbox://styles/mapbox/streets-v11",
//         center: [lon, lat],
//         zoom: 12,
//       });

//     // Add user location marker
//     new mapboxgl.Marker({ color: "blue" })
//       .setLngLat([lon, lat])
//       .setPopup(new mapboxgl.Popup().setHTML("<h4>You are here</h4>"))
//       .addTo(initializedMap);

//     // Add hospital markers
//     hospitals.forEach((hospital) => {
//       new mapboxgl.Marker({ color: "red" })
//         .setLngLat([hospital.lon, hospital.lat])
//         .setPopup(
//           new mapboxgl.Popup().setHTML(
//             `<h4>${hospital.name}</h4><p>${hospital.address}</p>`
//           )
//         )
//         .addTo(initializedMap);
//     });

//     setMap(initializedMap);
//   };

//   const fetchLocationAndHospitals = async () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by your browser");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;

//         setLatitude(lat);
//         setLongitude(lon);

//         // Fetch hospitals from Overpass API
//         const hospitalData = await fetchHospitalsFromOverpass(lat, lon);
//         setHospitals(hospitalData);

//         // Display map and hospitals
//         displayMap(lat, lon, hospitalData);
//       },
//       (error) => {
//         console.error("Error fetching location:", error);
//         alert("Could not fetch your location. Please enable location services.");
//       }
//     );
//   };

//   useEffect(() => {
//     fetchLocationAndHospitals();
//   }, []);

//   return (
//     <div style={{ width: "100%", height: "100vh" }}>
//       <div id="map" style={{ width: "100%", height: "100%" }}></div>
//     </div>
//   );
// };

// export default HospitalLocator;
import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { 
  Loader2, Navigation, Phone, AlertCircle, 
  Accessibility, Search, MapPin, Clock
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import "mapbox-gl/dist/mapbox-gl.css";


mapboxgl.accessToken = "pk.eyJ1Ijoia3NoaXRpai0tMTIzIiwiYSI6ImNtMG95ZXQ0NTBja2cycXNibmIwNHZ3eHoifQ.8rtnZShe9kR3NjOHxKx7Jw"; // Replace with your actual Mapbox token

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
  const [viewType, setViewType] = useState("map"); // "map" or "list"
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);

  const fetchHospitalsFromOverpass = async (lat, lon, radius = 1000) => {
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
      console.log(response)
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

  const displayMap = (lat, lon, hospitals) => {
    if (!mapContainerRef.current) return;

    if (!map) {
      const initializedMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lon, lat],
        zoom: 13,
      });

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
    <div className="flex flex-col h-screen bg-gray-50 font-poppins">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            Nearby Hospitals
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search hospitals..."
                className="pl-9 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewType === "map" ? "bg-white shadow-sm text-gray-800" : "text-gray-600"
                }`}
                onClick={() => setViewType("map")}
              >
                Map View
              </button>
              <button
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewType === "list" ? "bg-white shadow-sm text-gray-800" : "text-gray-600"
                }`}
                onClick={() => setViewType("list")}
              >
                List View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {viewType === "map" ? (
          <div className="flex-1 flex">
            {/* Map */}
            <div className="flex-1 relative">
              <div ref={mapContainerRef} className="w-full h-full" />
              {accuracy && (
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-2 rounded-lg shadow-sm">
                  <span className="text-sm text-gray-600 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Location accuracy: ±{Math.round(accuracy)}m
                  </span>
                </div>
              )}
            </div>

            {/* Side Panel */}
            <div className="w-96 bg-white shadow-lg overflow-y-auto p-4">
              <h2 className="text-lg font-semibold mb-4">
                {filteredHospitals.length} Hospitals Found
              </h2>
              <div className="space-y-3">
                {filteredHospitals.map((hospital) => (
                  <Card
                    key={`${hospital.lat}-${hospital.lon}`}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedHospital === hospital
                        ? "ring-2 ring-blue-500 shadow-md"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedHospital(hospital);
                      map.flyTo({
                        center: [hospital.lon, hospital.lat],
                        zoom: 15,
                        duration: 1500
                      });
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{hospital.name}</h3>
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
                          <Navigation className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{calculateDistance(latitude, longitude, hospital.lat, hospital.lon)} km away</span>
                        </div>
                        
                        <div className="flex items-start">
                          <MapPin className="w-4 h-4 mr-2 flex-shrink-0 mt-1" />
                          <span>{hospital.address}</span>
                        </div>
                        
                        {hospital.phone !== "No phone available" && (
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span>{hospital.phone}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // List View
          <div className="flex-1 overflow-auto p-4">
            <div className="max-w-7xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredHospitals.map((hospital) => (
                <Card
                  key={`${hospital.lat}-${hospital.lon}`}
                  className="hover:shadow-lg transition-shadow"
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