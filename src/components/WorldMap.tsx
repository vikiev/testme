import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Router, Shield, Wifi, Network } from "lucide-react";

const geoUrl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

interface WorldMapProps {
  onRegionSelect: (region: string | null) => void;
  selectedRegion: string | null;
}

const WorldMap = ({ onRegionSelect, selectedRegion }: WorldMapProps) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const opcoLocations = [
    { 
      name: "NA Operations", 
      coordinates: [-95, 40], 
      devices: 3247, 
      upcoming: 124,
      deviceBreakdown: { routers: 892, switches: 1456, accessPoints: 634, firewalls: 265 },
      opcos: 6
    },
    { 
      name: "EU Operations", 
      coordinates: [10, 51], 
      devices: 2891, 
      upcoming: 89,
      deviceBreakdown: { routers: 723, switches: 1145, accessPoints: 756, firewalls: 267 },
      opcos: 4
    },
    { 
      name: "APAC Operations", 
      coordinates: [105, 30], 
      devices: 4562, 
      upcoming: 203,
      deviceBreakdown: { routers: 1234, switches: 1987, accessPoints: 892, firewalls: 449 },
      opcos: 8
    },
    { 
      name: "LATAM Operations", 
      coordinates: [-60, -15], 
      devices: 1247, 
      upcoming: 67,
      deviceBreakdown: { routers: 345, switches: 523, accessPoints: 267, firewalls: 112 },
      opcos: 3
    },
    { 
      name: "MEA Operations", 
      coordinates: [25, 25], 
      devices: 900, 
      upcoming: 45,
      deviceBreakdown: { routers: 234, switches: 378, accessPoints: 189, firewalls: 99 },
      opcos: 2
    }
  ];

  const handleMarkerClick = (opco: any) => {
    onRegionSelect(opco.name === selectedRegion ? null : opco.name);
  };

  return (
    <div className="w-full h-96 bg-secondary/10 rounded-lg overflow-hidden">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
          center: [0, 20]
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={hoveredCountry === geo.properties.NAME ? "hsl(var(--primary) / 0.3)" : "hsl(var(--muted))"}
                stroke="hsl(var(--border))"
                strokeWidth={0.5}
                onMouseEnter={() => setHoveredCountry(geo.properties.NAME)}
                onMouseLeave={() => setHoveredCountry(null)}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: "hsl(var(--primary) / 0.3)" },
                  pressed: { outline: "none" }
                }}
              />
            ))
          }
        </Geographies>
        
        <TooltipProvider>
          {opcoLocations.map((opco) => (
            <Tooltip key={opco.name}>
              <TooltipTrigger asChild>
                <Marker coordinates={opco.coordinates as [number, number]}>
                  <circle
                    r={8}
                    fill={selectedRegion === opco.name ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.8)"}
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                    className="cursor-pointer hover:scale-125 transition-all duration-200 animate-pulse"
                    onClick={() => handleMarkerClick(opco)}
                    style={{
                      filter: selectedRegion === opco.name ? "drop-shadow(0 0 10px hsl(var(--primary)))" : "none"
                    }}
                  />
                  <text
                    textAnchor="middle"
                    y={-12}
                    className="text-xs font-medium fill-current"
                    style={{ fontSize: "10px", pointerEvents: "none" }}
                  >
                    {opco.devices}
                  </text>
                </Marker>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                className="bg-card border-border p-4 rounded-lg shadow-lg animate-scale-in max-w-xs"
              >
                <div className="space-y-3">
                  <h3 className="font-semibold text-primary">{opco.name}</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Router className="h-4 w-4 text-blue-400" />
                      <span>Routers: {opco.deviceBreakdown.routers}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Network className="h-4 w-4 text-green-400" />
                      <span>Switches: {opco.deviceBreakdown.switches}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Wifi className="h-4 w-4 text-purple-400" />
                      <span>APs: {opco.deviceBreakdown.accessPoints}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-red-400" />
                      <span>Firewalls: {opco.deviceBreakdown.firewalls}</span>
                    </div>
                  </div>
                  <div className="border-t border-border pt-2 text-xs text-muted-foreground">
                    <p>OpCos: {opco.opcos} • Due: {opco.upcoming} devices</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </ComposableMap>
      
      {/* Legend */}
      <div className="p-4 bg-card/50 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span>OpCo Locations</span>
            </div>
            <div className="text-muted-foreground">
              Click markers to view details
            </div>
          </div>
          <div className="text-muted-foreground">
            Total: {opcoLocations.reduce((sum, opco) => sum + opco.devices, 0)} devices
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;