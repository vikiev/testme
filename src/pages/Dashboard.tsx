import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Router, Wifi, Shield, Server, AlertTriangle, 
  TrendingUp, Calendar, DollarSign, Filter,
  ArrowLeft, Download, Settings
} from "lucide-react";
import DashboardCharts from "@/components/DashboardCharts";
import FilterPanel from "@/components/FilterPanel";
import SummaryTiles from "@/components/SummaryTiles";

const Dashboard = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    opco: "all",
    region: "all",
    deviceType: "all",
    ageRange: [0, 10],
    replacementYear: "2024"
  });

  const deviceCategories = [
    { type: "Routers", count: 3247, due: 124, icon: Router, color: "text-primary" },
    { type: "Switches", count: 2891, due: 89, icon: Server, color: "text-success" },
    { type: "Access Points", count: 4562, due: 203, icon: Wifi, color: "text-warning" },
    { type: "Firewalls", count: 1247, due: 67, icon: Shield, color: "text-critical" }
  ];

  const upcomingReplacements = [
    { month: "Jan 2024", count: 45, cost: "$234K", urgency: "medium" },
    { month: "Feb 2024", count: 67, cost: "$345K", urgency: "high" },
    { month: "Mar 2024", count: 123, cost: "$567K", urgency: "critical" },
    { month: "Apr 2024", count: 89, cost: "$412K", urgency: "medium" }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical": return "text-critical";
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      default: return "text-success";
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
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Hardware Lifecycle Dashboard</h1>
              <p className="text-sm text-muted-foreground">Real-time infrastructure monitoring</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Link to="/settings">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Filter Panel */}
        <FilterPanel 
          isOpen={showFilters} 
          filters={filters} 
          onFiltersChange={setFilters}
          onClose={() => setShowFilters(false)}
        />

        {/* Summary Tiles */}
        <SummaryTiles />

        {/* Device Categories Tabs */}
        <Card className="bg-gradient-card border-border/50 mb-6">
          <CardHeader>
            <CardTitle>Device Categories Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-secondary/30">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="routers">Routers</TabsTrigger>
                <TabsTrigger value="switches">Switches</TabsTrigger>
                <TabsTrigger value="access-points">Access Points</TabsTrigger>
                <TabsTrigger value="firewalls">Firewalls</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {deviceCategories.map((category) => (
                    <Card key={category.type} className="bg-secondary/20 border-border/30 hover:shadow-glow transition-all duration-300">
                      <CardContent className="p-4 text-center">
                        <category.icon className={`h-8 w-8 mx-auto mb-3 ${category.color}`} />
                        <h3 className="font-semibold mb-1">{category.type}</h3>
                        <div className="text-2xl font-bold mb-1">{category.count.toLocaleString()}</div>
                        <Badge variant={category.due > 100 ? "destructive" : "secondary"}>
                          {category.due} due soon
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {["routers", "switches", "access-points", "firewalls"].map((category) => (
                <TabsContent key={category} value={category} className="mt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-secondary/20">
                      <CardHeader>
                        <CardTitle className="text-lg">Age Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-40 flex items-center justify-center text-muted-foreground">
                          Age distribution chart for {category}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-secondary/20">
                      <CardHeader>
                        <CardTitle className="text-lg">Replacement Timeline</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-40 flex items-center justify-center text-muted-foreground">
                          Replacement timeline for {category}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Charts and Timeline */}
        <DashboardCharts />

        {/* Upcoming Replacements */}
        <Card className="bg-gradient-card border-border/50 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              Upcoming Replacements Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {upcomingReplacements.map((month) => (
                <Card key={month.month} className="bg-secondary/20 border-border/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{month.month}</h3>
                      <AlertTriangle className={`h-4 w-4 ${getUrgencyColor(month.urgency)}`} />
                    </div>
                    <div className="text-2xl font-bold mb-1">{month.count}</div>
                    <div className="text-sm text-muted-foreground mb-2">devices</div>
                    <Badge variant={month.urgency === "critical" ? "destructive" : "secondary"}>
                      {month.cost}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;