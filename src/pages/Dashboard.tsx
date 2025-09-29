import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Shield, AlertTriangle, BookOpen, History, Settings, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AlertNotification } from "@/components/AlertNotification";
import { DemoControls } from "@/components/DemoControls";

interface Alert {
  id: string;
  app: string;
  message: string;
  risk: number;
  reasons: string[];
  timestamp: Date;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProtectionActive, setIsProtectionActive] = useState(true);
  const [todayAlerts, setTodayAlerts] = useState(0);
  const [totalAlerts, setTotalAlerts] = useState(5);
  const [currentAlert, setCurrentAlert] = useState<Alert | null>(null);
  const [recentAlerts, setRecentAlerts] = useState<Alert[]>([]);

  const handleNewAlert = (alert: Alert) => {
    setCurrentAlert(alert);
    setTodayAlerts(prev => prev + 1);
    setTotalAlerts(prev => prev + 1);
    setRecentAlerts(prev => [alert, ...prev.slice(0, 2)]);
    
    toast({
      title: "⚠️ Posible phishing detectado",
      description: `Mensaje sospechoso en ${alert.app}`,
      variant: "destructive"
    });
  };

  const dismissAlert = () => {
    setCurrentAlert(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="w-8 h-8 text-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Click Seguro</h1>
              <p className="text-sm text-muted-foreground">Dashboard</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/settings")}
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Active Alert */}
        {currentAlert && (
          <AlertNotification
            alert={currentAlert}
            onDismiss={dismissAlert}
            onViewDetail={() => navigate(`/alert/${currentAlert.id}`)}
          />
        )}

        {/* Protection Status */}
        <Card className="border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${isProtectionActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                <div>
                  <h3 className="font-semibold">Protección</h3>
                  <p className="text-sm text-muted-foreground">
                    {isProtectionActive ? 'Activa' : 'Desactivada'}
                  </p>
                </div>
              </div>
              <Switch
                checked={isProtectionActive}
                onCheckedChange={setIsProtectionActive}
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-none shadow-md">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{todayAlerts}</div>
              <p className="text-sm text-muted-foreground">Alertas hoy</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-secondary">{totalAlerts}</div>
              <p className="text-sm text-muted-foreground">Total alertas</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts */}
        {recentAlerts.length > 0 && (
          <Card className="border-none shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Alertas Recientes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{alert.app}</p>
                      <p className="text-xs text-muted-foreground">
                        Riesgo: {alert.risk}%
                      </p>
                    </div>
                  </div>
                  <Badge variant={alert.risk > 70 ? "destructive" : "secondary"}>
                    {alert.risk > 70 ? "Alto" : "Medio"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2"
            onClick={() => navigate("/history")}
          >
            <History className="w-6 h-6" />
            <span>Historial</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2"
            onClick={() => navigate("/learn")}
          >
            <BookOpen className="w-6 h-6" />
            <span>Aprender</span>
          </Button>
        </div>

        {/* Demo Controls for Science Fair */}
        <DemoControls onTriggerAlert={handleNewAlert} />
      </div>
    </div>
  );
};

export default Dashboard;