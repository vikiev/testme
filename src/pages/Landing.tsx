import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Download, BarChart3, Shield, Router, Users, Globe, TrendingUp, Network, Wifi, Eye, Activity } from "lucide-react";
import WorldMap from "@/components/WorldMap";
import heroImage from "@/assets/hero-dashboard.jpg";
import spinnerLogo from "@/assets/spinner-logo.png";

const Landing = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regionData = {
    "NA Operations": { 
      opcos: 6, 
      devices: 3247, 
      upcoming: 124, 
      breakdown: { routers: 892, switches: 1456, accessPoints: 634, firewalls: 265 }
    },
    "EU Operations": { 
      opcos: 4, 
      devices: 2891, 
      upcoming: 89, 
      breakdown: { routers: 723, switches: 1145, accessPoints: 756, firewalls: 267 }
    },
    "APAC Operations": { 
      opcos: 8, 
      devices: 4562, 
      upcoming: 203, 
      breakdown: { routers: 1234, switches: 1987, accessPoints: 892, firewalls: 449 }
    },
    "LATAM Operations": { 
      opcos: 3, 
      devices: 1247, 
      upcoming: 67, 
      breakdown: { routers: 345, switches: 523, accessPoints: 267, firewalls: 112 }
    },
    "MEA Operations": { 
      opcos: 2, 
      devices: 900, 
      upcoming: 45, 
      breakdown: { routers: 234, switches: 378, accessPoints: 189, firewalls: 99 }
    }
  };

  const stats = [
    { label: "Total Devices", value: "12,847", icon: Router, color: "text-primary" },
    { label: "OpCos Tracked", value: "23", icon: Users, color: "text-success" },
    { label: "Global Regions", value: "5", icon: Globe, color: "text-warning" },
    { label: "Cost Savings", value: "$2.4M", icon: TrendingUp, color: "text-primary-glow" }
  ];

  const recentUploads = [
    { name: "APAC_Q4_Hardware_Audit.xlsx", date: "2024-01-15", devices: 1247 },
    { name: "EU_Network_Infrastructure.xlsx", date: "2024-01-14", devices: 892 },
    { name: "NA_Security_Devices.xlsx", date: "2024-01-13", devices: 654 }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <img src={spinnerLogo} alt="Hardware Lifecycle AI" className="h-6 w-6 filter invert" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Hardware Lifecycle AI</h1>
              <p className="text-sm text-muted-foreground">Smart IT Asset Management</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Sample Template
            </Button>
            <Link to="/dashboard">
              <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        {/* Hero Background */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={heroImage} 
            alt="AI-Driven Hardware Dashboard" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              AI-Driven Hardware Lifecycle Management
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Track, forecast, and optimize your global IT infrastructure with intelligent insights and automated lifecycle management.
            </p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-4 text-center">
                    <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Interactive World Map */}
          <Card className="bg-gradient-card border-border/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-primary" />
              Global OpCo Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WorldMap onRegionSelect={setSelectedRegion} selectedRegion={selectedRegion} />
            {selectedRegion && regionData[selectedRegion as keyof typeof regionData] && (
              <div className="mt-4 p-4 bg-secondary/50 rounded-lg animate-fade-in">
                <h3 className="font-semibold mb-3 text-primary">Region: {selectedRegion}</h3>
                
                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-lg">{regionData[selectedRegion as keyof typeof regionData].opcos}</div>
                    <div className="text-muted-foreground">OpCos</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-lg">{regionData[selectedRegion as keyof typeof regionData].devices.toLocaleString()}</div>
                    <div className="text-muted-foreground">Total Devices</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-lg text-warning">{regionData[selectedRegion as keyof typeof regionData].upcoming}</div>
                    <div className="text-muted-foreground">Due for Replacement</div>
                  </div>
                </div>

                {/* Device Breakdown */}
                <div className="border-t border-border pt-3">
                  <h4 className="font-medium mb-3 text-sm">Device Breakdown</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex items-center space-x-2 bg-background/50 p-2 rounded">
                      <Router className="h-4 w-4 text-blue-400" />
                      <div>
                        <div className="font-medium text-sm">{regionData[selectedRegion as keyof typeof regionData].breakdown.routers}</div>
                        <div className="text-xs text-muted-foreground">Routers</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-background/50 p-2 rounded">
                      <Network className="h-4 w-4 text-green-400" />
                      <div>
                        <div className="font-medium text-sm">{regionData[selectedRegion as keyof typeof regionData].breakdown.switches}</div>
                        <div className="text-xs text-muted-foreground">Switches</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-background/50 p-2 rounded">
                      <Wifi className="h-4 w-4 text-purple-400" />
                      <div>
                        <div className="font-medium text-sm">{regionData[selectedRegion as keyof typeof regionData].breakdown.accessPoints}</div>
                        <div className="text-xs text-muted-foreground">Access Points</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-background/50 p-2 rounded">
                      <Shield className="h-4 w-4 text-red-400" />
                      <div>
                        <div className="font-medium text-sm">{regionData[selectedRegion as keyof typeof regionData].breakdown.firewalls}</div>
                        <div className="text-xs text-muted-foreground">Firewalls</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Infrastructure Intelligence Preview */}
        <Card className="bg-gradient-card border-border/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="h-5 w-5 mr-2 text-primary" />
              Infrastructure Intelligence Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-secondary/30 rounded-lg">
                <Activity className="h-6 w-6 mx-auto mb-2 text-success" />
                <div className="text-lg font-bold text-success">89%</div>
                <div className="text-xs text-muted-foreground">Health Score</div>
              </div>
              <div className="text-center p-3 bg-secondary/30 rounded-lg">
                <Shield className="h-6 w-6 mx-auto mb-2 text-warning" />
                <div className="text-lg font-bold text-warning">78%</div>
                <div className="text-xs text-muted-foreground">Compliance</div>
              </div>
              <div className="text-center p-3 bg-secondary/30 rounded-lg">
                <Router className="h-6 w-6 mx-auto mb-2 text-destructive" />
                <div className="text-lg font-bold text-destructive">124</div>
                <div className="text-xs text-muted-foreground">EOL Devices</div>
              </div>
              <div className="text-center p-3 bg-secondary/30 rounded-lg">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-lg font-bold text-primary">68%</div>
                <div className="text-xs text-muted-foreground">Capacity Used</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Dive into asset health, performance monitoring, compliance tracking, and capacity planning across your entire infrastructure.
            </p>
            <Link to="/infrastructure-intelligence">
              <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <Eye className="w-4 h-4 mr-2" />
                View Infrastructure Intelligence
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Uploads */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle>Recent Dashboard Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUploads.map((upload, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div>
                      <p className="font-medium">{upload.name}</p>
                      <p className="text-sm text-muted-foreground">{upload.date}</p>
                    </div>
                    <Badge variant="secondary">{upload.devices} devices</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/dashboard">
                <Button className="w-full justify-start bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Main Dashboard
                </Button>
              </Link>
              <Link to="/infrastructure-intelligence">
                <Button className="w-full justify-start bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  <Eye className="w-4 h-4 mr-2" />
                  Infrastructure Intelligence
                </Button>
              </Link>
              <Link to="/forecasting">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Forecasting & Planning
                </Button>
              </Link>
              <Link to="/devices">
                <Button variant="outline" className="w-full justify-start">
                  <Router className="w-4 h-4 mr-2" />
                  Device Management
                </Button>
              </Link>
              <Link to="/notifications">
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  Alerts & Notifications
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;