import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, AlertTriangle, CheckCircle2, Link2 } from "lucide-react";

interface AnalysisResult {
  risk: number;
  reasons: string[];
  isPhishing: boolean;
}

export const LinkAnalyzer = () => {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeMessage = () => {
    if (!message.trim()) return;

    setIsAnalyzing(true);
    
    // Simular análisis
    setTimeout(() => {
      const reasons: string[] = [];
      let risk = 0;

      const text = message.toLowerCase();

      // Detectar lenguaje de urgencia
      if (/(urgente|ahora|inmediato|último día|última oportunidad|caduca|expira hoy|actúa ya)/i.test(message)) {
        reasons.push("Lenguaje de urgencia detectado");
        risk += 20;
      }

      // Detectar solicitud de datos personales
      if (/(contraseña|password|tarjeta|cuenta bancaria|número de cuenta|pin|cvv|datos personales|verificar identidad)/i.test(message)) {
        reasons.push("Solicita información personal o bancaria");
        risk += 30;
      }

      // Detectar ofertas demasiado buenas
      if (/(ganaste|premio|lotería|heredaste|millones|gratis|sin costo|100% gratis|oferta exclusiva)/i.test(message)) {
        reasons.push("Oferta sospechosa o premio no solicitado");
        risk += 25;
      }

      // Detectar amenazas
      if (/(bloquear|suspender|cuenta bloqueada|suspendida|eliminar cuenta|cerrar cuenta|consecuencias)/i.test(message)) {
        reasons.push("Contiene amenazas o intimidación");
        risk += 25;
      }

      // Detectar URL acortadas en el mensaje
      if (/(bit\.ly|tinyurl|short|t\.co|goo\.gl)/i.test(message)) {
        reasons.push("URL acortada detectada en el mensaje");
        risk += 25;
      }

      // Detectar dominios sospechosos
      if (/\.(tk|ml|ga|cf|gq)/.test(message)) {
        reasons.push("Dominio gratuito sospechoso");
        risk += 30;
      }

      // Detectar URLs sin HTTPS
      const httpUrls = message.match(/http:\/\/[^\s]+/g);
      if (httpUrls && httpUrls.length > 0) {
        reasons.push("Enlace sin conexión segura (HTTP)");
        risk += 15;
      }

      // Detectar direcciones IP en URLs
      if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(message)) {
        reasons.push("Usa dirección IP en lugar de dominio");
        risk += 20;
      }

      // Detectar errores ortográficos comunes en nombres de empresas
      if (/(paypa1|arnazon|netfIix|micros0ft|g00gle|facebok|whatsap)/i.test(message)) {
        reasons.push("Posible suplantación de marca conocida");
        risk += 35;
      }

      // Detectar muchos subdominios en URLs
      const urlMatches = message.match(/https?:\/\/([^\/\s]+)/g);
      if (urlMatches) {
        urlMatches.forEach(url => {
          const domainParts = url.split('/')[2]?.split('.');
          if (domainParts && domainParts.length > 3) {
            reasons.push("Múltiples subdominios sospechosos");
            risk += 15;
          }
        });
      }

      // Detectar caracteres extraños en URLs
      if (/[@%]/.test(message) && /https?:/.test(message)) {
        reasons.push("Caracteres sospechosos en URLs");
        risk += 20;
      }

      if (reasons.length === 0) {
        reasons.push("El mensaje parece seguro");
        reasons.push("Siempre verifica el remitente antes de responder");
      }

      setResult({
        risk: Math.min(risk, 100),
        reasons,
        isPhishing: risk > 50
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  const getRiskColor = (risk: number) => {
    if (risk < 30) return "text-green-600";
    if (risk < 70) return "text-orange-500";
    return "text-destructive";
  };

  const getRiskLabel = (risk: number) => {
    if (risk < 30) return "Bajo";
    if (risk < 70) return "Medio";
    return "Alto";
  };

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center space-x-2">
          <Link2 className="w-5 h-5" />
          <span>Analizar Mensaje</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Pega un mensaje o enlace completo para verificar si es seguro:
        </p>
        
        <div className="space-y-2">
          <textarea
            className="w-full min-h-[100px] px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Ejemplo: ¡URGENTE! Tu cuenta será suspendida. Haz click aquí: https://ejemplo-sospechoso.com"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            onClick={analyzeMessage}
            disabled={!message.trim() || isAnalyzing}
            className="w-full"
          >
            <Search className="w-4 h-4 mr-2" />
            Analizar Mensaje
          </Button>
        </div>

        {isAnalyzing && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground mt-2">Analizando...</p>
          </div>
        )}

        {result && !isAnalyzing && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                {result.isPhishing ? (
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                )}
                <div>
                  <p className="font-semibold">
                    {result.isPhishing ? "¡Cuidado!" : "Parece seguro"}
                  </p>
                  <p className={`text-2xl font-bold ${getRiskColor(result.risk)}`}>
                    {result.risk}% riesgo
                  </p>
                </div>
              </div>
              <Badge variant={result.isPhishing ? "destructive" : "secondary"}>
                {getRiskLabel(result.risk)}
              </Badge>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Análisis:</p>
              <ul className="space-y-2">
                {result.reasons.map((reason, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground flex items-start space-x-2"
                  >
                    <span className="text-primary mt-0.5">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {result.isPhishing && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive font-medium">
                  ⚠️ No abras este enlace. Podría ser un intento de phishing.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
