import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, TrendingUp, DollarSign, Calendar, 
  AlertTriangle, Download, Target, BarChart3 
} from "lucide-react";

const Forecasting = () => {
  const quarterlyForecasts = [
    { quarter: "Q1 2024", devices: 124, cost: "$1.2M", confidence: "high" },
    { quarter: "Q2 2024", devices: 89, cost: "$890K", confidence: "high" },
    { quarter: "Q3 2024", devices: 156, cost: "$1.5M", confidence: "medium" },
    { quarter: "Q4 2024", devices: 203, cost: "$2.1M", confidence: "medium" }
  ];

  const yearlyProjections = [
    { year: "2024", devices: 572, cost: "$5.7M", budget: "$6.0M", variance: "-5%" },
    { year: "2025", devices: 634, cost: "$6.8M", budget: "$7.2M", variance: "-6%" },
    { year: "2026", devices: 789, cost: "$8.9M", budget: "$9.5M", variance: "-6%" },
    { year: "2027", devices: 892, cost: "$11.2M", budget: "$12.0M", variance: "-7%" }
  ];

  const recommendations = [
    {
      title: "Bulk Procurement Opportunity",
      description: "Consider bulk purchase of 200+ routers in Q3 2024 for 15% cost savings",
      impact: "$180K savings",
      priority: "high",
      deadline: "2024-06-30"
    },
    {
      title: "Extended Warranty Review",
      description: "Review extended warranty options for critical infrastructure",
      impact: "$95K potential savings",
      priority: "medium",
      deadline: "2024-05-15"
    },
    {
      title: "Lifecycle Policy Update",
      description: "Update replacement policy for access points from 5 to 6 years",
      impact: "$340K deferred",
      priority: "low",
      deadline: "2024-12-31"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "secondary";
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "high": return "text-success";
      case "medium": return "text-warning";
      case "low": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

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
              <h1 className="text-2xl font-bold">Forecasting & Planning</h1>
              <p className="text-sm text-muted-foreground">AI-powered predictions and budget planning</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <Card className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-2xl font-bold">24%</div>
              <div className="text-sm text-muted-foreground">Growth Rate</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-3 text-success" />
              <div className="text-2xl font-bold">$2.1M</div>
              <div className="text-sm text-muted-foreground">Forecasted Savings</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-3 text-warning" />
              <div className="text-2xl font-bold">18</div>
              <div className="text-sm text-muted-foreground">Months Ahead</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 mx-auto mb-3 text-critical" />
              <div className="text-2xl font-bold">94%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Forecasting Tabs */}
        <Card className="bg-gradient-card border-border/50 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-primary" />
              Replacement Forecasts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="quarterly" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-secondary/30">
                <TabsTrigger value="quarterly">Quarterly View</TabsTrigger>
                <TabsTrigger value="yearly">Yearly Projections</TabsTrigger>
              </TabsList>
              
              <TabsContent value="quarterly" className="mt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quarterlyForecasts.map((forecast) => (
                    <Card key={forecast.quarter} className="bg-secondary/20 border-border/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{forecast.quarter}</h3>
                          <div className={`text-sm font-medium ${getConfidenceColor(forecast.confidence)}`}>
                            {forecast.confidence} confidence
                          </div>
                        </div>
                        <div className="text-2xl font-bold mb-1">{forecast.devices}</div>
                        <div className="text-sm text-muted-foreground mb-2">devices</div>
                        <Badge variant="secondary">{forecast.cost}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6 h-64 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Quarterly forecast chart will be displayed here</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="yearly" className="mt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-3 px-4 font-semibold">Year</th>
                        <th className="text-left py-3 px-4 font-semibold">Devices</th>
                        <th className="text-left py-3 px-4 font-semibold">Forecasted Cost</th>
                        <th className="text-left py-3 px-4 font-semibold">Budget Allocated</th>
                        <th className="text-left py-3 px-4 font-semibold">Variance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yearlyProjections.map((projection) => (
                        <tr key={projection.year} className="border-b border-border/30 hover:bg-secondary/10">
                          <td className="py-3 px-4 font-medium">{projection.year}</td>
                          <td className="py-3 px-4">{projection.devices}</td>
                          <td className="py-3 px-4 font-semibold">{projection.cost}</td>
                          <td className="py-3 px-4">{projection.budget}</td>
                          <td className="py-3 px-4">
                            <Badge variant={projection.variance.startsWith('-') ? 'outline' : 'destructive'}>
                              {projection.variance}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-warning" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <Card key={index} className="bg-secondary/20 border-border/30">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{rec.title}</h3>
                      <Badge variant={getPriorityColor(rec.priority)}>
                        {rec.priority} priority
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline" className="text-success border-success">
                          {rec.impact}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Due: {rec.deadline}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </div>
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

export default Forecasting;