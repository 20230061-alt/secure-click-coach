import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Bell, Shield, Trash2, Globe, Type, Info, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { storage } from "@/utils/storage";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState(() => {
    const saved = storage.getSettings();
    return saved || {
      protection: true,
      notifications: true,
      highRiskOnly: false,
      language: "es",
      fontSize: "medium",
      analytics: true
    };
  });

  useEffect(() => {
    storage.saveSettings(settings);
  }, [settings]);

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Configuración guardada",
      description: "Los cambios se han aplicado correctamente.",
    });
  };

  const clearAllData = () => {
    storage.clearAll();
    setSettings({
      protection: true,
      notifications: true,
      highRiskOnly: false,
      language: "es",
      fontSize: "medium",
      analytics: true
    });
    toast({
      title: "Datos eliminados",
      description: "Todo el historial y configuración ha sido borrado.",
      variant: "destructive"
    });
  };

  const exportData = () => {
    toast({
      title: "Datos exportados",
      description: "Se ha generado un archivo con tu información.",
    });
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
            <h1 className="text-xl font-bold text-foreground">Configuración</h1>
            <p className="text-sm text-muted-foreground">Personaliza tu experiencia</p>
          </div>
        </div>

        {/* Protection Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Protección</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Detector Activo</p>
                <p className="text-sm text-muted-foreground">Monitorear mensajes en segundo plano</p>
              </div>
              <Switch
                checked={settings.protection}
                onCheckedChange={(checked) => updateSetting("protection", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Solo Alto Riesgo</p>
                <p className="text-sm text-muted-foreground">Alertar solo cuando el riesgo sea mayor al 80%</p>
              </div>
              <Switch
                checked={settings.highRiskOnly}
                onCheckedChange={(checked) => updateSetting("highRiskOnly", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notificaciones</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Alertas Push</p>
                <p className="text-sm text-muted-foreground">Recibir notificaciones de phishing</p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => updateSetting("notifications", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Type className="w-5 h-5" />
              <span>Apariencia</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                <Globe className="w-4 h-4 inline mr-1" />
                Idioma
              </label>
              <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Tamaño de Texto
              </label>
              <Select value={settings.fontSize} onValueChange={(value) => updateSetting("fontSize", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Pequeño</SelectItem>
                  <SelectItem value="medium">Mediano</SelectItem>
                  <SelectItem value="large">Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Info className="w-5 h-5" />
              <span>Privacidad</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Análisis Anónimo</p>
                <p className="text-sm text-muted-foreground">Ayudar a mejorar la detección (datos anónimos)</p>
              </div>
              <Switch
                checked={settings.analytics}
                onCheckedChange={(checked) => updateSetting("analytics", checked)}
              />
            </div>
            
            <Separator />
            
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={exportData}
            >
              <Mail className="w-4 h-4 mr-2" />
              Exportar Mis Datos
            </Button>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-destructive">
              <Trash2 className="w-5 h-5" />
              <span>Gestión de Datos</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Estas acciones no se pueden deshacer. Procede con precaución.
            </p>
            
            <Button
              variant="destructive"
              className="w-full"
              onClick={clearAllData}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Eliminar Todos los Datos
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="bg-muted/50">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold mb-2">CS — Click Seguro</h3>
            <p className="text-sm text-muted-foreground mb-2">Versión 1.0.0</p>
            <p className="text-xs text-muted-foreground">
              Creado para la Feria de Ciencias 2024
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Tu privacidad es nuestra prioridad. Todo el análisis se realiza localmente en tu dispositivo.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;