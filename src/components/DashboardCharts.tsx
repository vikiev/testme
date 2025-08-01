import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, PieChart, TrendingUp, Calendar } from "lucide-react";

const DashboardCharts = () => {
  const deviceByCategory = [
    { category: "Access Points", count: 4562, percentage: 35.5, color: "hsl(var(--primary))" },
    { category: "Routers", count: 3247, percentage: 25.3, color: "hsl(var(--success))" },
    { category: "Switches", count: 2891, percentage: 22.5, color: "hsl(var(--warning))" },
    { category: "Firewalls", count: 1247, percentage: 9.7, color: "hsl(var(--critical))" },
    { category: "Other", count: 900, percentage: 7.0, color: "hsl(var(--muted-foreground))" }
  ];

  const monthlyReplacements = [
    { month: "Jan", count: 45, cost: 234000 },
    { month: "Feb", count: 67, cost: 345000 },
    { month: "Mar", count: 123, cost: 567000 },
    { month: "Apr", count: 89, cost: 412000 },
    { month: "May", count: 156, cost: 698000 },
    { month: "Jun", count: 234, cost: 891000 }
  ];

  const maxReplacements = Math.max(...monthlyReplacements.map(m => m.count));

  return (
    <div className="grid lg:grid-cols-2 gap-6 mb-6">
      {/* Device Category Pie Chart */}
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="h-5 w-5 mr-2 text-primary" />
            Devices by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center mb-6">
            {/* Simple Pie Chart Representation */}
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {deviceByCategory.map((item, index) => {
                  const startAngle = deviceByCategory.slice(0, index).reduce((sum, cat) => sum + (cat.percentage * 3.6), 0);
                  const endAngle = startAngle + (item.percentage * 3.6);
                  
                  const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                  const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                  const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                  const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                  
                  const largeArcFlag = item.percentage > 50 ? 1 : 0;
                  
                  return (
                    <path
                      key={item.category}
                      d={`M 50,50 L ${x1},${y1} A 40,40 0 ${largeArcFlag},1 ${x2},${y2} z`}
                      fill={item.color}
                      stroke="hsl(var(--background))"
                      strokeWidth="0.5"
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  );
                })}
              </svg>
              
              {/* Center Label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold">12,847</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="space-y-3">
            {deviceByCategory.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium">{item.category}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{item.count.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Replacement Timeline */}
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-primary" />
            Monthly Replacement Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyReplacements.map((month) => (
              <div key={month.month} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{month.month} 2024</span>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{month.count} devices</div>
                    <div className="text-xs text-muted-foreground">
                      ${(month.cost / 1000).toFixed(0)}K
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-secondary/30 rounded-full h-3">
                  <div 
                    className="bg-gradient-primary h-3 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(month.count / maxReplacements) * 100}%`,
                      background: month.count > 150 ? 
                        'linear-gradient(90deg, hsl(var(--warning)), hsl(var(--critical)))' : 
                        'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))'
                    }}
                  />
                </div>
                
                {/* Urgency Badge */}
                {month.count > 150 && (
                  <Badge variant="destructive" className="text-xs">
                    High Volume
                  </Badge>
                )}
              </div>
            ))}
          </div>
          
          {/* Summary */}
          <div className="mt-6 pt-4 border-t border-border/50">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {monthlyReplacements.reduce((sum, m) => sum + m.count, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Devices</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">
                  ${(monthlyReplacements.reduce((sum, m) => sum + m.cost, 0) / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-muted-foreground">Total Cost</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;