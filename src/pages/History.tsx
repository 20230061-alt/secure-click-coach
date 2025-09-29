import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MessageCircle, Filter, Calendar, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  app: string;
  message: string;
  risk: number;
  timestamp: Date;
  status: "pending" | "safe" | "reported";
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    app: "WhatsApp",
    message: "🎉 ¡FELICIDADES! Has ganado $1,000,000. Haz clic aquí...",
    risk: 95,
    timestamp: new Date(Date.now() - 3600000),
    status: "pending"
  },
  {
    id: "2",
    app: "Gmail",
    message: "Tu cuenta será suspendida en 2 horas. Confirma tu identidad...",
    risk: 88,
    timestamp: new Date(Date.now() - 7200000),
    status: "reported"
  },
  {
    id: "3",
    app: "SMS",
    message: "Banco Nacional: Tu tarjeta fue bloqueada. Ingresa tus datos...",
    risk: 92,
    timestamp: new Date(Date.now() - 86400000),
    status: "reported"
  },
  {
    id: "4",
    app: "Instagram",
    message: "¡Tu foto fue seleccionada! Gana $500 compartiendo este link...",
    risk: 75,
    timestamp: new Date(Date.now() - 172800000),
    status: "safe"
  },
  {
    id: "5",
    app: "Facebook",
    message: "Hola amigo, necesito ayuda urgente. ¿Puedes prestarme dinero?...",
    risk: 70,
    timestamp: new Date(Date.now() - 259200000),
    status: "safe"
  }
];

const History = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filterApp, setFilterApp] = useState<string>("all");
  const [filterRisk, setFilterRisk] = useState<string>("all");

  const filteredAlerts = alerts.filter(alert => {
    const appMatch = filterApp === "all" || alert.app === filterApp;
    const riskMatch = filterRisk === "all" || 
      (filterRisk === "high" && alert.risk >= 80) ||
      (filterRisk === "medium" && alert.risk >= 60 && alert.risk < 80) ||
      (filterRisk === "low" && alert.risk < 60);
    return appMatch && riskMatch;
  });

  const getRiskColor = (risk: number) => {
    if (risk >= 80) return "destructive";
    if (risk >= 60) return "secondary";
    return "outline";
  };

  const getRiskLabel = (risk: number) => {
    if (risk >= 80) return "Alto";
    if (risk >= 60) return "Medio";
    return "Bajo";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "reported": return "destructive";
      case "safe": return "default";
      default: return "secondary";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "reported": return "Reportado";
      case "safe": return "Seguro";
      default: return "Pendiente";
    }
  };

  const clearHistory = () => {
    setAlerts([]);
    toast({
      title: "Historial eliminado",
      description: "Se ha borrado todo el historial de alertas.",
    });
  };

  const apps = [...new Set(mockAlerts.map(alert => alert.app))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Historial</h1>
              <p className="text-sm text-muted-foreground">{filteredAlerts.length} alertas</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={clearHistory}
            disabled={alerts.length === 0}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filtros</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Aplicación</label>
              <Select value={filterApp} onValueChange={setFilterApp}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las apps</SelectItem>
                  {apps.map(app => (
                    <SelectItem key={app} value={app}>{app}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Nivel de Riesgo</label>
              <Select value={filterRisk} onValueChange={setFilterRisk}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los niveles</SelectItem>
                  <SelectItem value="high">Alto riesgo (80%+)</SelectItem>
                  <SelectItem value="medium">Riesgo medio (60-79%)</SelectItem>
                  <SelectItem value="low">Riesgo bajo (&lt;60%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <div className="space-y-3">
          {filteredAlerts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No hay alertas</h3>
                <p className="text-sm text-muted-foreground">
                  {alerts.length === 0 
                    ? "Aún no se han detectado mensajes sospechosos."
                    : "No hay alertas que coincidan con los filtros seleccionados."
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredAlerts.map((alert) => (
              <Card 
                key={alert.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/alert/${alert.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold text-sm">{alert.app}</p>
                        <p className="text-xs text-muted-foreground">
                          {alert.timestamp.toLocaleDateString()} {alert.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant={getRiskColor(alert.risk)} className="text-xs">
                        {getRiskLabel(alert.risk)}
                      </Badge>
                      <Badge variant={getStatusColor(alert.status)} className="text-xs">
                        {getStatusLabel(alert.status)}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {alert.message}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Riesgo: {alert.risk}%
                    </span>
                    <span className="text-xs text-primary">Ver detalles →</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default History;