import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="relative">
            <Shield className="w-24 h-24 text-primary mx-auto animate-pulse" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-secondary-foreground">CS</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Click Seguro</h1>
          <p className="text-xl text-muted-foreground">Aprende a dar click sin caer en fraudes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="relative mx-auto w-20 h-20">
            <Shield className="w-20 h-20 text-primary" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-secondary-foreground">CS</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">¡Hola!</h1>
          <p className="text-lg text-muted-foreground">
            Soy <span className="text-primary font-semibold">Click Seguro</span>. Te ayudaré a detectar mensajes sospechosos para que no caigas en fraudes.
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={() => navigate("/onboarding")}
            className="w-full text-lg py-6"
            size="lg"
          >
            Comenzar
          </Button>
          
          <Button 
            onClick={() => navigate("/dashboard")}
            variant="outline"
            className="w-full"
          >
            Ya tengo experiencia
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Protege tu información personal de estafas y phishing
        </p>
      </div>
    </div>
  );
};

export default Index;