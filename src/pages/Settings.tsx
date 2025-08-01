import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, Settings as SettingsIcon, Users, DollarSign, 
  Clock, Upload, Database, Shield, Save
} from "lucide-react";

const Settings = () => {
  const [policies, setPolicies] = useState({
    routerLifecycle: 5,
    switchLifecycle: 7,
    accessPointLifecycle: 5,
    firewallLifecycle: 6,
    earlyWarning: 3,
    criticalWarning: 1
  });

  const [budgetLimits, setBudgetLimits] = useState({
    global: 10000000,
    naOps: 4000000,
    euOps: 3500000,
    apacOps: 2500000
  });

  const users = [
    { name: "John Smith", email: "john.smith@company.com", role: "Admin", opco: "Global", status: "active" },
    { name: "Maria Garcia", email: "maria.garcia@company.com", role: "Analyst", opco: "EU Operations", status: "active" },
    { name: "David Chen", email: "david.chen@company.com", role: "Viewer", opco: "APAC Operations", status: "active" },
    { name: "Sarah Johnson", email: "sarah.johnson@company.com", role: "Analyst", opco: "NA Operations", status: "inactive" }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin": return "destructive";
      case "Analyst": return "secondary";
      case "Viewer": return "outline";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "active" ? "outline" : "secondary";
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
              <h1 className="text-2xl font-bold">Settings & Administration</h1>
              <p className="text-sm text-muted-foreground">Configure policies, budgets, and user management</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button className="bg-primary hover:bg-primary/90">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="policies" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-secondary/30 mb-6">
            <TabsTrigger value="policies" className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Policies
            </TabsTrigger>
            <TabsTrigger value="budgets" className="flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Budgets
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="integration" className="flex items-center">
              <Database className="w-4 h-4 mr-2" />
              Integration
            </TabsTrigger>
          </TabsList>

          {/* Lifecycle Policies */}
          <TabsContent value="policies">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    Device Lifecycle Policies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="router-lifecycle">Router Replacement Cycle (years)</Label>
                    <Input
                      id="router-lifecycle"
                      type="number"
                      value={policies.routerLifecycle}
                      onChange={(e) => setPolicies({...policies, routerLifecycle: parseInt(e.target.value)})}
                      min="3"
                      max="10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="switch-lifecycle">Switch Replacement Cycle (years)</Label>
                    <Input
                      id="switch-lifecycle"
                      type="number"
                      value={policies.switchLifecycle}
                      onChange={(e) => setPolicies({...policies, switchLifecycle: parseInt(e.target.value)})}
                      min="3"
                      max="10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ap-lifecycle">Access Point Replacement Cycle (years)</Label>
                    <Input
                      id="ap-lifecycle"
                      type="number"
                      value={policies.accessPointLifecycle}
                      onChange={(e) => setPolicies({...policies, accessPointLifecycle: parseInt(e.target.value)})}
                      min="3"
                      max="10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="firewall-lifecycle">Firewall Replacement Cycle (years)</Label>
                    <Input
                      id="firewall-lifecycle"
                      type="number"
                      value={policies.firewallLifecycle}
                      onChange={(e) => setPolicies({...policies, firewallLifecycle: parseInt(e.target.value)})}
                      min="3"
                      max="10"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-warning" />
                    Alert Thresholds
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="early-warning">Early Warning (months before due)</Label>
                    <Input
                      id="early-warning"
                      type="number"
                      value={policies.earlyWarning}
                      onChange={(e) => setPolicies({...policies, earlyWarning: parseInt(e.target.value)})}
                      min="1"
                      max="12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="critical-warning">Critical Warning (months before due)</Label>
                    <Input
                      id="critical-warning"
                      type="number"
                      value={policies.criticalWarning}
                      onChange={(e) => setPolicies({...policies, criticalWarning: parseInt(e.target.value)})}
                      min="1"
                      max="6"
                    />
                  </div>

                  <div className="pt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-email">Automatic Email Alerts</Label>
                      <Switch id="auto-email" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="budget-alerts">Budget Threshold Alerts</Label>
                      <Switch id="budget-alerts" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="monthly-reports">Monthly Summary Reports</Label>
                      <Switch id="monthly-reports" defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Budget Management */}
          <TabsContent value="budgets">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-success" />
                  Budget Limits by OpCo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="global-budget">Global Annual Budget ($)</Label>
                      <Input
                        id="global-budget"
                        type="number"
                        value={budgetLimits.global}
                        onChange={(e) => setBudgetLimits({...budgetLimits, global: parseInt(e.target.value)})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="na-budget">NA Operations Budget ($)</Label>
                      <Input
                        id="na-budget"
                        type="number"
                        value={budgetLimits.naOps}
                        onChange={(e) => setBudgetLimits({...budgetLimits, naOps: parseInt(e.target.value)})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="eu-budget">EU Operations Budget ($)</Label>
                      <Input
                        id="eu-budget"
                        type="number"
                        value={budgetLimits.euOps}
                        onChange={(e) => setBudgetLimits({...budgetLimits, euOps: parseInt(e.target.value)})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="apac-budget">APAC Operations Budget ($)</Label>
                      <Input
                        id="apac-budget"
                        type="number"
                        value={budgetLimits.apacOps}
                        onChange={(e) => setBudgetLimits({...budgetLimits, apacOps: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold mb-4">Budget Utilization</h3>
                    
                    {[
                      { name: "Global", budget: budgetLimits.global, used: 8500000, percentage: 85 },
                      { name: "NA Operations", budget: budgetLimits.naOps, used: 3200000, percentage: 80 },
                      { name: "EU Operations", budget: budgetLimits.euOps, used: 2800000, percentage: 80 },
                      { name: "APAC Operations", budget: budgetLimits.apacOps, used: 2100000, percentage: 84 }
                    ].map((item) => (
                      <div key={item.name} className="p-4 bg-secondary/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{item.name}</span>
                          <Badge variant={item.percentage > 90 ? "destructive" : item.percentage > 80 ? "secondary" : "outline"}>
                            {item.percentage}%
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ${item.used.toLocaleString()} / ${item.budget.toLocaleString()}
                        </div>
                        <div className="w-full bg-secondary/30 rounded-full h-2 mt-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    User Management
                  </div>
                  <Button>Add User</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-3 px-4 font-semibold">Name</th>
                        <th className="text-left py-3 px-4 font-semibold">Email</th>
                        <th className="text-left py-3 px-4 font-semibold">Role</th>
                        <th className="text-left py-3 px-4 font-semibold">OpCo</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={index} className="border-b border-border/30 hover:bg-secondary/10">
                          <td className="py-3 px-4 font-medium">{user.name}</td>
                          <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                          <td className="py-3 px-4">
                            <Badge variant={getRoleColor(user.role)}>
                              {user.role}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">{user.opco}</td>
                          <td className="py-3 px-4">
                            <Badge variant={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm">Delete</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integration Settings */}
          <TabsContent value="integration">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="h-5 w-5 mr-2 text-primary" />
                    Excel Upload Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="auto-parse">Automatic Parsing</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Parse uploaded files automatically</span>
                      <Switch id="auto-parse" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="validation">Data Validation</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Validate data formats and ranges</span>
                      <Switch id="validation" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backup">Backup Original Files</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Keep backup of uploaded files</span>
                      <Switch id="backup" defaultChecked />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button variant="outline" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Download Sample Template
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="h-5 w-5 mr-2 text-success" />
                    Supabase Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-secondary/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="font-medium">Connected</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Supabase integration is active and working properly
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database Sync</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Edge Functions</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email Service</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button variant="outline" className="w-full">
                      View Integration Docs
                    </Button>
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

export default Settings;