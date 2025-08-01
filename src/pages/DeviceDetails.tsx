import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, Search, Filter, Download, Eye, Edit, 
  Router, Wifi, Shield, Server, AlertCircle 
} from "lucide-react";

const DeviceDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const mockDevices = [
    {
      id: "RTR-001-NYC",
      type: "Router",
      model: "Cisco ISR4451",
      installDate: "2019-03-15",
      age: "4.8 years",
      location: "New York - HQ",
      opco: "NA Operations",
      healthStatus: "critical",
      replacementDue: "2024-03-15",
      estimatedCost: "$12,500",
      icon: Router
    },
    {
      id: "SWT-045-LON",
      type: "Switch",
      model: "Juniper EX4600",
      installDate: "2020-07-22",
      age: "3.5 years",
      location: "London - Office",
      opco: "EU Operations",
      healthStatus: "warning",
      replacementDue: "2025-07-22",
      estimatedCost: "$8,900",
      icon: Server
    },
    {
      id: "AP-189-SIN",
      type: "Access Point",
      model: "Aruba AP-515",
      installDate: "2021-11-10",
      age: "2.2 years",
      location: "Singapore - Branch",
      opco: "APAC Operations",
      healthStatus: "healthy",
      replacementDue: "2026-11-10",
      estimatedCost: "$450",
      icon: Wifi
    },
    {
      id: "FW-012-TOK",
      type: "Firewall",
      model: "Palo Alto PA-3220",
      installDate: "2018-09-05",
      age: "5.3 years",
      location: "Tokyo - DC",
      opco: "APAC Operations",
      healthStatus: "critical",
      replacementDue: "2023-09-05",
      estimatedCost: "$15,700",
      icon: Shield
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "destructive";
      case "warning": return "secondary";
      case "healthy": return "outline";
      default: return "secondary";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "critical": return "Critical";
      case "warning": return "Due Soon";
      case "healthy": return "Healthy";
      default: return "Unknown";
    }
  };

  const filteredDevices = mockDevices.filter(device => {
    const matchesSearch = device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || device.healthStatus === statusFilter;
    const matchesType = typeFilter === "all" || device.type.toLowerCase() === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Device Management</h1>
              <p className="text-sm text-muted-foreground">Detailed device inventory and lifecycle tracking</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Filters and Search */}
        <Card className="bg-gradient-card border-border/50 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2 text-primary" />
              Filter & Search Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search devices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Health Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="healthy">Healthy</SelectItem>
                  <SelectItem value="warning">Due Soon</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Device Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="router">Routers</SelectItem>
                  <SelectItem value="switch">Switches</SelectItem>
                  <SelectItem value="access point">Access Points</SelectItem>
                  <SelectItem value="firewall">Firewalls</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-primary hover:bg-primary/90">
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Device Table */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Device Inventory ({filteredDevices.length} devices)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead>Device</TableHead>
                    <TableHead>Type & Model</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Replacement Due</TableHead>
                    <TableHead>Est. Cost</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDevices.map((device) => (
                    <TableRow key={device.id} className="border-border/30 hover:bg-secondary/20">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <device.icon className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-semibold">{device.id}</div>
                            <div className="text-sm text-muted-foreground">{device.opco}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{device.type}</div>
                          <div className="text-sm text-muted-foreground">{device.model}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{device.location}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{device.age}</div>
                        <div className="text-xs text-muted-foreground">Since {device.installDate}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(device.healthStatus)}>
                          {device.healthStatus === "critical" && <AlertCircle className="w-3 h-3 mr-1" />}
                          {getStatusText(device.healthStatus)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{device.replacementDue}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold">{device.estimatedCost}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeviceDetails;