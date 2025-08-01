import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Router, AlertTriangle, DollarSign, TrendingUp } from "lucide-react";

const SummaryTiles = () => {
  const summaryData = [
    {
      title: "Total Devices",
      value: "12,847",
      subtitle: "Across all regions",
      icon: Router,
      trend: "+5.2%",
      trendPositive: true,
      color: "text-primary"
    },
    {
      title: "Due for Replacement",
      value: "483",
      subtitle: "Next 3 months",
      icon: AlertTriangle,
      trend: "+12.4%",
      trendPositive: false,
      color: "text-warning"
    },
    {
      title: "Forecasted Cost",
      value: "$5.7M",
      subtitle: "Next 12 months",
      icon: DollarSign,
      trend: "-8.1%",
      trendPositive: true,
      color: "text-success"
    },
    {
      title: "Cost Savings",
      value: "$2.4M",
      subtitle: "YTD optimization",
      icon: TrendingUp,
      trend: "+18.7%",
      trendPositive: true,
      color: "text-primary-glow"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {summaryData.map((item, index) => (
        <Card 
          key={index} 
          className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <item.icon className={`h-8 w-8 ${item.color}`} />
              <Badge 
                variant={item.trendPositive ? "outline" : "secondary"}
                className={item.trendPositive ? "text-success border-success" : "text-destructive border-destructive"}
              >
                {item.trend}
              </Badge>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-2xl font-bold tracking-tight">{item.value}</h3>
              <p className="text-sm text-muted-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.subtitle}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryTiles;