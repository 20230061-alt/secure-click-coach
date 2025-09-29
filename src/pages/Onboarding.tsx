import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Eye, Lock, ChevronLeft, ChevronRight } from "lucide-react";

const onboardingSteps = [
  {
    icon: Shield,
    title: "¿Qué es el phishing?",
    description: "Son mensajes falsos que intentan robar tu información personal como contraseñas, datos bancarios o números de tarjeta.",
    content: "Los estafadores se hacen pasar por empresas conocidas como bancos, tiendas o redes sociales para engañarte."
  },
  {
    icon: Eye,
    title: "¿Qué permisos necesito?",
    description: "Para protegerte, necesito leer las notificaciones de tus apps de mensajería y correo.",
    content: "No guardo ni comparto tu información. Todo el análisis se hace localmente en tu teléfono."
  },
  {
    icon: Lock,
    title: "Tu privacidad es sagrada",
    description: "Tus mensajes nunca salen de tu dispositivo. Solo analizo patrones sospechosos sin leer el contenido completo.",
    content: "Puedes desactivar la protección en cualquier momento desde la configuración."
  }
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = onboardingSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex space-x-2">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentStep ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
          >
            Saltar
          </Button>
        </div>

        <Card className="border-none shadow-lg">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <step.icon className="w-10 h-10 text-primary" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">{step.title}</h2>
              <p className="text-muted-foreground text-lg">{step.description}</p>
              <p className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                {step.content}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button onClick={nextStep} className="w-full text-lg py-6" size="lg">
            {currentStep === onboardingSteps.length - 1 ? "¡Empezar a protegerme!" : "Continuar"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;