import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { X, Filter, RotateCcw } from "lucide-react";

interface FilterPanelProps {
  isOpen: boolean;
  filters: {
    opco: string;
    region: string;
    deviceType: string;
    ageRange: number[];
    replacementYear: string;
  };
  onFiltersChange: (filters: any) => void;
  onClose: () => void;
}

const FilterPanel = ({ isOpen, filters, onFiltersChange, onClose }: FilterPanelProps) => {
  if (!isOpen) return null;

  const resetFilters = () => {
    onFiltersChange({
      opco: "all",
      region: "all",
      deviceType: "all",
      ageRange: [0, 10],
      replacementYear: "2024"
    });
  };

  const applyFilters = () => {
    // Trigger any necessary updates
    onClose();
  };

  return (
    <Card className="bg-gradient-card border-border/50 mb-6 animate-slide-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2 text-primary" />
            Advanced Filters
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {/* Operating Company Filter */}
          <div className="space-y-2">
            <Label>Operating Company</Label>
            <Select 
              value={filters.opco} 
              onValueChange={(value) => onFiltersChange({...filters, opco: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select OpCo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All OpCos</SelectItem>
                <SelectItem value="na-ops">NA Operations</SelectItem>
                <SelectItem value="eu-ops">EU Operations</SelectItem>
                <SelectItem value="apac-ops">APAC Operations</SelectItem>
                <SelectItem value="latam-ops">LATAM Operations</SelectItem>
                <SelectItem value="mea-ops">MEA Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Region Filter */}
          <div className="space-y-2">
            <Label>Region</Label>
            <Select 
              value={filters.region} 
              onValueChange={(value) => onFiltersChange({...filters, region: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="north-america">North America</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                <SelectItem value="latin-america">Latin America</SelectItem>
                <SelectItem value="middle-east-africa">Middle East & Africa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Device Type Filter */}
          <div className="space-y-2">
            <Label>Device Type</Label>
            <Select 
              value={filters.deviceType} 
              onValueChange={(value) => onFiltersChange({...filters, deviceType: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="router">Routers</SelectItem>
                <SelectItem value="switch">Switches</SelectItem>
                <SelectItem value="access-point">Access Points</SelectItem>
                <SelectItem value="firewall">Firewalls</SelectItem>
                <SelectItem value="other">Other Devices</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Age Range Filter */}
          <div className="space-y-2">
            <Label>Device Age Range (years)</Label>
            <div className="px-2 py-4">
              <Slider
                value={filters.ageRange}
                onValueChange={(value) => onFiltersChange({...filters, ageRange: value})}
                max={10}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{filters.ageRange[0]} years</span>
                <span>{filters.ageRange[1]} years</span>
              </div>
            </div>
          </div>

          {/* Replacement Year Filter */}
          <div className="space-y-2">
            <Label>Replacement Year</Label>
            <Select 
              value={filters.replacementYear} 
              onValueChange={(value) => onFiltersChange({...filters, replacementYear: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2027">2027</SelectItem>
                <SelectItem value="all">All Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filter Actions */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
          <div className="text-sm text-muted-foreground">
            Showing filtered results based on your criteria
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={resetFilters}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button size="sm" onClick={applyFilters} className="bg-primary hover:bg-primary/90">
              Apply Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;