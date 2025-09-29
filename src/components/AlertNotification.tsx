import { AlertTriangle, X, Eye, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Alert {
  id: string;
  app: string;
  message: string;
  risk: number;
  reasons: string[];
  timestamp: Date;
}

interface AlertNotificationProps {
  alert: Alert;
  onDismiss: () => void;
  onViewDetail: () => void;
}

export const AlertNotification = ({ alert, onDismiss, onViewDetail }: AlertNotificationProps) => {
  const getRiskColor = (risk: number) => {
    if (risk >= 80) return "destructive";
    if (risk >= 60) return "secondary";
    return "outline";
  };

  const getRiskLabel = (risk: number) => {
    if (risk >= 80) return "Alto Riesgo";
    if (risk >= 60) return "Riesgo Medio";
    return "Riesgo Bajo";
  };

  return (
    <Card className="border-l-4 border-l-destructive bg-destructive/5 shadow-lg animate-in slide-in-from-top-2 duration-300">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-destructive mt-1" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-foreground">Posible phishing detectado</h3>
                <Badge variant={getRiskColor(alert.risk)}>
                  {getRiskLabel(alert.risk)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Mensaje sospechoso en <span className="font-medium">{alert.app}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Riesgo: {alert.risk}%
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex space-x-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            onClick={onDismiss}
            className="flex-1"
          >
            Marcar como seguro
          </Button>
          <Button
            size="sm"
            onClick={onViewDetail}
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-1" />
            Ver detalles
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={onDismiss}
          >
            <Flag className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};