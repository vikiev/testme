import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  ArrowLeft, Bell, AlertTriangle, CheckCircle, Clock,
  Mail, Settings, Filter, MoreHorizontal
} from "lucide-react";

const Notifications = () => {
  const [alertSettings, setAlertSettings] = useState({
    email: true,
    critical: true,
    upcoming: true,
    budget: false,
    monthly: true
  });

  const criticalAlerts = [
    {
      id: 1,
      type: "critical",
      title: "Critical Device Replacement Overdue",
      message: "Router RTR-001-NYC is 6 months overdue for replacement",
      device: "RTR-001-NYC",
      location: "New York HQ",
      timestamp: "2024-01-20 09:30",
      read: false
    },
    {
      id: 2,
      type: "critical",
      title: "Firewall Security Risk",
      message: "Firewall FW-012-TOK reached end-of-support",
      device: "FW-012-TOK",
      location: "Tokyo DC",
      timestamp: "2024-01-19 14:15",
      read: false
    }
  ];

  const upcomingAlerts = [
    {
      id: 3,
      type: "warning",
      title: "Replacement Due in 30 Days",
      message: "Switch SWT-045-LON scheduled for replacement",
      device: "SWT-045-LON",
      location: "London Office",
      timestamp: "2024-01-18 11:00",
      read: true
    },
    {
      id: 4,
      type: "info",
      title: "Maintenance Window Scheduled",
      message: "Quarterly maintenance for APAC region devices",
      device: "Multiple",
      location: "APAC Region",
      timestamp: "2024-01-17 16:45",
      read: true
    }
  ];

  const budgetAlerts = [
    {
      id: 5,
      type: "warning",
      title: "Budget Threshold Reached",
      message: "Q1 2024 budget 85% utilized",
      device: "N/A",
      location: "Global",
      timestamp: "2024-01-16 08:30",
      read: false
    }
  ];

  const emailLogs = [
    {
      id: 1,
      recipient: "it-manager@company.com",
      subject: "Critical Device Replacement Alert - RTR-001-NYC",
      sentAt: "2024-01-20 09:35",
      status: "delivered",
      deviceId: "RTR-001-NYC"
    },
    {
      id: 2,
      recipient: "budget-team@company.com",
      subject: "Q1 Budget Alert - 85% Utilized",
      sentAt: "2024-01-16 08:35",
      status: "delivered",
      deviceId: "N/A"
    },
    {
      id: 3,
      recipient: "apac-ops@company.com",
      subject: "Maintenance Window Notification",
      sentAt: "2024-01-17 16:50",
      status: "delivered",
      deviceId: "Multiple"
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical": return <AlertTriangle className="h-5 w-5 text-critical" />;
      case "warning": return <Clock className="h-5 w-5 text-warning" />;
      case "info": return <Bell className="h-5 w-5 text-primary" />;
      default: return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getAlertVariant = (type: string) => {
    switch (type) {
      case "critical": return "destructive";
      case "warning": return "secondary";
      case "info": return "outline";
      default: return "secondary";
    }
  };

  const AlertCard = ({ alert }: { alert: any }) => (
    <Card className={`bg-secondary/20 border-border/30 ${!alert.read ? 'border-l-4 border-l-primary' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            {getAlertIcon(alert.type)}
            <h3 className="font-semibold">{alert.title}</h3>
          </div>
          <div className="flex items-center space-x-2">
            {!alert.read && <div className="w-2 h-2 bg-primary rounded-full" />}
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge variant={getAlertVariant(alert.type)}>
              {alert.device}
            </Badge>
            <span className="text-xs text-muted-foreground">{alert.location}</span>
          </div>
          <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
        </div>
      </CardContent>
    </Card>
  );

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
              <h1 className="text-2xl font-bold">Notifications & Alerts</h1>
              <p className="text-sm text-muted-foreground">Real-time alerts and notification management</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Alert Summary */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <Card className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 mx-auto mb-3 text-critical" />
              <div className="text-2xl font-bold">2</div>
              <div className="text-sm text-muted-foreground">Critical Alerts</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-3 text-warning" />
              <div className="text-2xl font-bold">5</div>
              <div className="text-sm text-muted-foreground">Due Soon</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Mail className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Emails Sent</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-3 text-success" />
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm text-muted-foreground">Delivery Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Tabs */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-primary" />
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="critical" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-secondary/30">
                    <TabsTrigger value="critical">Critical</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="budget">Budget</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="critical" className="mt-6">
                    <div className="space-y-4">
                      {criticalAlerts.map((alert) => (
                        <AlertCard key={alert.id} alert={alert} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="upcoming" className="mt-6">
                    <div className="space-y-4">
                      {upcomingAlerts.map((alert) => (
                        <AlertCard key={alert.id} alert={alert} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="budget" className="mt-6">
                    <div className="space-y-4">
                      {budgetAlerts.map((alert) => (
                        <AlertCard key={alert.id} alert={alert} />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Settings Panel */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle>Alert Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Email Notifications</label>
                  <Switch 
                    checked={alertSettings.email}
                    onCheckedChange={(checked) => setAlertSettings({...alertSettings, email: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Critical Alerts</label>
                  <Switch 
                    checked={alertSettings.critical}
                    onCheckedChange={(checked) => setAlertSettings({...alertSettings, critical: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Upcoming Replacements</label>
                  <Switch 
                    checked={alertSettings.upcoming}
                    onCheckedChange={(checked) => setAlertSettings({...alertSettings, upcoming: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Budget Alerts</label>
                  <Switch 
                    checked={alertSettings.budget}
                    onCheckedChange={(checked) => setAlertSettings({...alertSettings, budget: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Monthly Reports</label>
                  <Switch 
                    checked={alertSettings.monthly}
                    onCheckedChange={(checked) => setAlertSettings({...alertSettings, monthly: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle>Email Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {emailLogs.map((log) => (
                    <div key={log.id} className="p-3 bg-secondary/20 rounded-lg">
                      <div className="text-sm font-medium mb-1">{log.subject}</div>
                      <div className="text-xs text-muted-foreground mb-1">{log.recipient}</div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {log.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{log.sentAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;