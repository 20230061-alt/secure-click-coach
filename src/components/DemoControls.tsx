import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Beaker } from "lucide-react";

interface Alert {
  id: string;
  app: string;
  message: string;
  risk: number;
  reasons: string[];
  timestamp: Date;
}

interface DemoControlsProps {
  onTriggerAlert: (alert: Alert) => void;
}

const demoScenarios = [
  {
    app: "WhatsApp",
    message: "🎉 ¡FELICIDADES! Has ganado $1,000,000. Haz clic aquí: bit.ly/premio-falso para reclamar tu premio AHORA. Solo tienes 24 horas.",
    risk: 95,
    reasons: ["Enlace acortado sospechoso", "Lenguaje de urgencia", "Premio no solicitado", "Cantidad irreal de dinero"]
  },
  {
    app: "Gmail",
    message: "Tu cuenta será suspendida en 2 horas. Confirma tu identidad aquí: banco-seguro-falso.com/confirmar",
    risk: 88,
    reasons: ["Dominio sospechoso", "Amenaza de suspensión", "Solicitud de datos personales", "Urgencia artificial"]
  },
  {
    app: "SMS",
    message: "Banco Nacional: Tu tarjeta fue bloqueada. Ingresa tus datos en: http://bn-seguridad.tk/desbloquear",
    risk: 92,
    reasons: ["Dominio .tk sospechoso", "Solicitud de datos bancarios", "Suplantación de identidad", "URL no oficial"]
  },
  {
    app: "Instagram",
    message: "¡Tu foto fue seleccionada! Gana $500 compartiendo este link: tinyurl.com/insta-premio",
    risk: 75,
    reasons: ["Enlace acortado", "Premio no solicitado", "Solicitud de compartir"]
  },
  {
    app: "Facebook",
    message: "Hola amigo, necesito ayuda urgente. ¿Puedes prestarme dinero? Envía a este número: +1234567890",
    risk: 70,
    reasons: ["Solicitud de dinero", "Perfil posiblemente comprometido", "Número desconocido"]
  }
];

export const DemoControls = ({ onTriggerAlert }: DemoControlsProps) => {
  const [selectedScenario, setSelectedScenario] = useState<string>("");

  const triggerDemo = () => {
    const scenarioIndex = parseInt(selectedScenario);
    if (scenarioIndex >= 0 && scenarioIndex < demoScenarios.length) {
      const scenario = demoScenarios[scenarioIndex];
      const alert: Alert = {
        id: Date.now().toString(),
        app: scenario.app,
        message: scenario.message,
        risk: scenario.risk,
        reasons: scenario.reasons,
        timestamp: new Date()
      };
      onTriggerAlert(alert);
    }
  };

  return (
    <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center space-x-2">
          <Beaker className="w-5 h-5" />
          <span>Modo Demo - Feria de Ciencias</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Selecciona un escenario para simular la detección de phishing en tiempo real:
        </p>
        
        <Select value={selectedScenario} onValueChange={setSelectedScenario}>
          <SelectTrigger>
            <SelectValue placeholder="Elige un escenario de phishing..." />
          </SelectTrigger>
          <SelectContent>
            {demoScenarios.map((scenario, index) => (
              <SelectItem key={index} value={index.toString()}>
                {scenario.app} - Riesgo {scenario.risk}%
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button 
          onClick={triggerDemo}
          disabled={!selectedScenario}
          className="w-full"
          variant="outline"
        >
          <Play className="w-4 h-4 mr-2" />
          Simular Alerta de Phishing
        </Button>
        
        <p className="text-xs text-muted-foreground">
          * Esto es una simulación para demostrar cómo funciona la detección automática.
        </p>
      </CardContent>
    </Card>
  );
};