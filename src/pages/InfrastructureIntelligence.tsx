import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Eye, 
  Activity, 
  Shield, 
  TrendingUp, 
  Router, 
  Server, 
  Wifi, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Filter
} from "lucide-react";

const InfrastructureIntelligence = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Mock data for demonstration
  const assetHealthData = [
    {
      deviceType: "Router",
      model: "Cisco ASR 9000",
      location: "New York DC",
      role: "Core Router",
      vendor: "Cisco",
      eolDate: "2025-12-31",
      eosDate: "2024-06-30",
      purchaseDate: "2019-03-15",
      warrantyDate: "2024-03-15",
      lifecyclePhase: "Operation",
      status: "warning"
    },
    {
      deviceType: "Switch",
      model: "Juniper EX4300",
      location: "London DC",
      role: "Access Switch",
      vendor: "Juniper",
      eolDate: "2026-08-15",
      eosDate: "2025-02-28",
      purchaseDate: "2020-01-10",
      warrantyDate: "2025-01-10",
      lifecyclePhase: "Operation",
      status: "healthy"
    },
    {
      deviceType: "Firewall",
      model: "Palo Alto PA-850",
      location: "Singapore DC",
      role: "Edge Firewall",
      vendor: "Palo Alto",
      eolDate: "2024-03-31",
      eosDate: "2023-12-31",
      purchaseDate: "2018-06-20",
      warrantyDate: "2023-06-20",
      lifecyclePhase: "Retirement",
      status: "critical"
    }
  ];

  const healthMetrics = {
    overall: 85,
    cpu: 72,
    memory: 89,
    disk: 76,
    network: 94
  };

  const complianceData = {
    score: 78,
    totalDevices: 12847,
    compliant: 9978,
    nonCompliant: 2869,
    misconfigurations: [
      { device: "Router-NYC-01", issue: "SSH timeout not configured", severity: "medium" },
      { device: "Switch-LON-12", issue: "SNMP community string", severity: "high" },
      { device: "FW-SG-03", issue: "Outdated firmware version", severity: "critical" }
    ]
  };

  const capacityData = [
    { metric: "CPU Utilization", current: 68, max: 100, trend: "+5%" },
    { metric: "Memory Usage", current: 82, max: 100, trend: "+12%" },
    { metric: "Bandwidth", current: 45, max: 100, trend: "-2%" },
    { metric: "Storage", current: 74, max: 100, trend: "+8%" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "text-success";
      case "warning": return "text-warning";
      case "critical": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getLifecycleBadge = (phase: string) => {
    switch (phase) {
      case "Procurement": return <Badge variant="secondary">Procurement</Badge>;
      case "Deployment": return <Badge className="bg-blue-500/20 text-blue-400">Deployment</Badge>;
      case "Operation": return <Badge className="bg-success/20 text-success">Operation</Badge>;
      case "Retirement": return <Badge variant="destructive">Retirement</Badge>;
      default: return <Badge variant="outline">{phase}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Infrastructure Intelligence</h1>
              <p className="text-sm text-muted-foreground">Asset health, compliance, and capacity insights</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="visibility" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="visibility" className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Visibility & Asset Health</span>
              <span className="sm:hidden">Assets</span>
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Health Monitoring</span>
              <span className="sm:hidden">Health</span>
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Device Compliance</span>
              <span className="sm:hidden">Compliance</span>
            </TabsTrigger>
            <TabsTrigger value="capacity" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Capacity Planning</span>
              <span className="sm:hidden">Capacity</span>
            </TabsTrigger>
          </TabsList>

          {/* Visibility & Asset Health */}
          <TabsContent value="visibility" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Assets</p>
                      <p className="text-2xl font-bold">12,847</p>
                    </div>
                    <Server className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">End of Life</p>
                      <p className="text-2xl font-bold text-destructive">483</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Devices</p>
                      <p className="text-2xl font-bold text-success">12,364</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-success" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Maintenance Due</p>
                      <p className="text-2xl font-bold text-warning">25</p>
                    </div>
                    <Clock className="h-8 w-8 text-warning" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle>Asset Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>EOL Date</TableHead>
                      <TableHead>Lifecycle Phase</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assetHealthData.map((asset, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Router className="h-4 w-4" />
                            <div>
                              <p className="font-medium">{asset.model}</p>
                              <p className="text-sm text-muted-foreground">{asset.deviceType}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{asset.location}</TableCell>
                        <TableCell>{asset.vendor}</TableCell>
                        <TableCell className={new Date(asset.eolDate) < new Date(Date.now() + 365*24*60*60*1000) ? "text-warning" : ""}>
                          {asset.eolDate}
                        </TableCell>
                        <TableCell>{getLifecycleBadge(asset.lifecyclePhase)}</TableCell>
                        <TableCell>
                          <div className={`flex items-center space-x-1 ${getStatusColor(asset.status)}`}>
                            {asset.status === "healthy" && <CheckCircle className="h-4 w-4" />}
                            {asset.status === "warning" && <AlertTriangle className="h-4 w-4" />}
                            {asset.status === "critical" && <XCircle className="h-4 w-4" />}
                            <span className="capitalize">{asset.status}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Monitoring */}
          <TabsContent value="monitoring" className="space-y-6">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle>Overall Health Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-primary mb-2">{healthMetrics.overall}%</div>
                  <p className="text-muted-foreground">Infrastructure Health</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(healthMetrics).filter(([key]) => key !== "overall").map(([metric, value]) => (
                    <div key={metric} className="text-center">
                      <div className="mb-2">
                        <Progress value={value} className="h-2" />
                      </div>
                      <p className="text-sm font-medium capitalize">{metric}</p>
                      <p className="text-sm text-muted-foreground">{value}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>Real-time Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-destructive/10 rounded-lg">
                    <XCircle className="h-5 w-5 text-destructive" />
                    <div>
                      <p className="font-medium">Critical: Router-NYC-01</p>
                      <p className="text-sm text-muted-foreground">CPU utilization at 98%</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-warning/10 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    <div>
                      <p className="font-medium">Warning: Switch-LON-12</p>
                      <p className="text-sm text-muted-foreground">Memory usage above threshold</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
                    <Activity className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Info: FW-SG-03</p>
                      <p className="text-sm text-muted-foreground">Firmware update available</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <p className="font-medium mb-2">🚀 Performance Optimization</p>
                    <p className="text-sm text-muted-foreground">Upgrade firmware on 12 devices to reduce CPU spikes by 30%</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <p className="font-medium mb-2">💾 Storage Management</p>
                    <p className="text-sm text-muted-foreground">3 devices approaching disk capacity - schedule maintenance</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <p className="font-medium mb-2">🔧 Preventive Maintenance</p>
                    <p className="text-sm text-muted-foreground">Schedule proactive replacement for 5 devices nearing EOL</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Device Compliance */}
          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{complianceData.score}%</div>
                    <p className="text-sm text-muted-foreground">Compliance Score</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-success mb-2">{complianceData.compliant}</div>
                    <p className="text-sm text-muted-foreground">Compliant Devices</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-destructive mb-2">{complianceData.nonCompliant}</div>
                    <p className="text-sm text-muted-foreground">Non-Compliant</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle>Configuration Mismatches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceData.misconfigurations.map((issue, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-warning" />
                        <div>
                          <p className="font-medium">{issue.device}</p>
                          <p className="text-sm text-muted-foreground">{issue.issue}</p>
                        </div>
                      </div>
                      <Badge variant={issue.severity === "critical" ? "destructive" : issue.severity === "high" ? "secondary" : "outline"}>
                        {issue.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Capacity Planning */}
          <TabsContent value="capacity" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>Utilization Trends</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {capacityData.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{metric.metric}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{metric.current}%</span>
                          <Badge variant={metric.trend.startsWith("+") ? "destructive" : "secondary"}>
                            {metric.trend}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={metric.current} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>Growth Forecasts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <p className="font-medium mb-2">📈 6-Month Projection</p>
                    <p className="text-sm text-muted-foreground">Expected 15% increase in network traffic</p>
                    <p className="text-sm text-muted-foreground">Recommend upgrading 8 access switches</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <p className="font-medium mb-2">📊 12-Month Projection</p>
                    <p className="text-sm text-muted-foreground">Storage capacity will reach 85%</p>
                    <p className="text-sm text-muted-foreground">Plan for additional 200TB storage</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <p className="font-medium mb-2">🏢 Office Expansion</p>
                    <p className="text-sm text-muted-foreground">New Singapore office requires 45 devices</p>
                    <p className="text-sm text-muted-foreground">Budget estimate: $280K</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InfrastructureIntelligence;