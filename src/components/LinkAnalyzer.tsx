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
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeUrl = () => {
    if (!url.trim()) return;

    setIsAnalyzing(true);
    
    // Simular análisis
    setTimeout(() => {
      const reasons: string[] = [];
      let risk = 0;

      // Detectar URL acortadas
      if (/(bit\.ly|tinyurl|short|t\.co|goo\.gl)/i.test(url)) {
        reasons.push("URL acortada detectada");
        risk += 25;
      }

      // Detectar dominios sospechosos
      if (/\.(tk|ml|ga|cf|gq)/.test(url)) {
        reasons.push("Dominio gratuito sospechoso");
        risk += 30;
      }

      // Detectar HTTPS faltante
      if (!/^https:/.test(url)) {
        reasons.push("Sin conexión segura (HTTPS)");
        risk += 15;
      }

      // Detectar direcciones IP
      if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url)) {
        reasons.push("Usa dirección IP en lugar de dominio");
        risk += 20;
      }

      // Detectar muchos subdominios
      const domainParts = url.split('/')[2]?.split('.');
      if (domainParts && domainParts.length > 3) {
        reasons.push("Múltiples subdominios sospechosos");
        risk += 15;
      }

      // Detectar caracteres extraños
      if (/[@%]/.test(url)) {
        reasons.push("Caracteres sospechosos en la URL");
        risk += 20;
      }

      if (reasons.length === 0) {
        reasons.push("La URL parece segura");
        reasons.push("Siempre verifica el contenido al abrir enlaces");
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
          <span>Analizar Enlace</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Ingresa un enlace para verificar si es seguro:
        </p>
        
        <div className="flex space-x-2">
          <Input
            type="url"
            placeholder="https://ejemplo.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && analyzeUrl()}
          />
          <Button
            onClick={analyzeUrl}
            disabled={!url.trim() || isAnalyzing}
            size="icon"
          >
            <Search className="w-4 h-4" />
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
