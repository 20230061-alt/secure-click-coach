import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, AlertTriangle, Flag, CheckCircle, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock alert data - in a real app this would come from state/API
const mockAlert = {
  id: "1",
  app: "WhatsApp",
  message: "🎉 ¡FELICIDADES! Has ganado $1,000,000. Haz clic aquí: bit.ly/premio-falso para reclamar tu premio AHORA. Solo tienes 24 horas.",
  risk: 95,
  reasons: [
    "Enlace acortado sospechoso (bit.ly)",
    "Lenguaje de urgencia extrema",
    "Premio no solicitado",
    "Cantidad irreal de dinero",
    "Presión temporal artificial"
  ],
  timestamp: new Date(),
  analysis: {
    suspiciousLinks: ["bit.ly/premio-falso"],
    urgencyWords: ["AHORA", "24 horas", "FELICIDADES"],
    redFlags: ["Premio inesperado", "Cantidad excesiva", "Enlace no verificado"]
  }
};

const AlertDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const handleMarkSafe = () => {
    toast({
      title: "Mensaje marcado como seguro",
      description: "Gracias por tu feedback. Esto nos ayuda a mejorar.",
    });
    navigate("/dashboard");
  };

  const handleReport = () => {
    toast({
      title: "Mensaje reportado",
      description: "Hemos recibido tu reporte. Investigaremos este caso.",
    });
    navigate("/dashboard");
  };

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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Detalle de Alerta</h1>
            <p className="text-sm text-muted-foreground">Análisis completo</p>
          </div>
        </div>

        {/* Risk Level */}
        <Card className="border-l-4 border-l-destructive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                <span className="font-semibold">Nivel de Riesgo</span>
              </div>
              <Badge variant={getRiskColor(mockAlert.risk)} className="text-lg px-3 py-1">
                {mockAlert.risk}%
              </Badge>
            </div>
            <Badge variant={getRiskColor(mockAlert.risk)}>
              {getRiskLabel(mockAlert.risk)}
            </Badge>
          </CardContent>
        </Card>

        {/* Message Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Mensaje Detectado</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Origen:</p>
              <p className="font-semibold">{mockAlert.app}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Contenido:</p>
              <div className="bg-muted/50 p-3 rounded-lg text-sm">
                {mockAlert.message}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Fecha:</p>
              <p className="text-sm">{mockAlert.timestamp.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Reasons */}
        <Card>
          <CardHeader>
            <CardTitle>¿Por qué es sospechoso?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAlert.reasons.map((reason, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-destructive/10 rounded-full flex items-center justify-center mt-0.5">
                    <AlertTriangle className="w-3 h-3 text-destructive" />
                  </div>
                  <p className="text-sm">{reason}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Educational Tips */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">💡 Consejo de Seguridad</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              <strong>Nunca hagas clic en enlaces sospechosos.</strong> Los estafadores usan enlaces acortados para ocultar destinos maliciosos. Siempre verifica la fuente antes de proporcionar información personal.
            </p>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleMarkSafe}
            variant="outline"
            className="w-full"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Marcar como Seguro
          </Button>
          
          <Button
            onClick={handleReport}
            variant="destructive"
            className="w-full"
          >
            <Flag className="w-4 h-4 mr-2" />
            Reportar como Phishing
          </Button>

          <Button
            onClick={() => navigate("/learn")}
            variant="secondary"
            className="w-full"
          >
            Aprender más sobre phishing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertDetail;