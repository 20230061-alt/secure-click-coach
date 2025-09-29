import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Lightbulb, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Quiz {
  id: number;
  question: string;
  message: string;
  options: string[];
  correct: number;
  explanation: string;
}

const phishingQuiz: Quiz[] = [
  {
    id: 1,
    question: "¿Es este mensaje legítimo?",
    message: "Banco Nacional: Tu cuenta será suspendida en 24 horas. Confirma tu identidad aquí: www.banco-nacional-seguro.com/confirmar",
    options: ["Sí, es legítimo", "No, es phishing", "No estoy seguro"],
    correct: 1,
    explanation: "Es phishing. Los bancos reales nunca piden confirmar datos por mensaje y usan sus dominios oficiales, no variaciones."
  },
  {
    id: 2,
    question: "¿Qué deberías hacer con este mensaje?",
    message: "¡Felicidades! Has ganado un iPhone 15. Haz clic aquí para reclamarlo: bit.ly/premio-iphone",
    options: ["Hacer clic inmediatamente", "Ignorar completamente", "Verificar con Apple primero"],
    correct: 1,
    explanation: "Ignóralo completamente. Los premios no solicitados y enlaces acortados son señales claras de estafa."
  },
  {
    id: 3,
    question: "¿Cuál es la principal señal de alerta?",
    message: "Hola, soy tu amigo Juan. Necesito que me transfieras $500 urgentemente. Mi número cambió, este es el nuevo.",
    options: ["La solicitud de dinero", "El cambio de número", "Ambas opciones"],
    correct: 2,
    explanation: "Ambas son señales de alerta. Los estafadores a menudo se hacen pasar por conocidos y crean urgencia falsa."
  }
];

const educationalTips = [
  {
    title: "Enlaces Sospechosos",
    icon: AlertTriangle,
    content: "Desconfía de enlaces acortados (bit.ly, tinyurl) o dominios que no coincidan con la empresa real. Siempre verifica la URL completa.",
    color: "destructive"
  },
  {
    title: "Urgencia Artificial",
    icon: AlertTriangle,
    content: "Frases como 'actúa ahora', '24 horas', 'última oportunidad' son tácticas para presionarte a actuar sin pensar.",
    color: "secondary"
  },
  {
    title: "Solicitudes de Datos",
    icon: AlertTriangle,
    content: "Nunca proporciones contraseñas, números de tarjeta o datos personales por mensaje, correo o llamada no solicitada.",
    color: "destructive"
  },
  {
    title: "Verifica la Fuente",
    icon: CheckCircle,
    content: "Contacta directamente a la empresa por sus canales oficiales para confirmar cualquier comunicación sospechosa.",
    color: "default"
  },
  {
    title: "Confía en tu Instinto",
    icon: Lightbulb,
    content: "Si algo parece demasiado bueno para ser verdad o te genera desconfianza, probablemente sea una estafa.",
    color: "secondary"
  }
];

const Learn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState<number[]>([]);

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === phishingQuiz[currentQuiz].correct && !completedQuizzes.includes(currentQuiz)) {
      setScore(prev => prev + 1);
      setCompletedQuizzes(prev => [...prev, currentQuiz]);
      toast({
        title: "¡Correcto! 🎉",
        description: "Estás aprendiendo a hacer click seguro.",
      });
    } else if (!completedQuizzes.includes(currentQuiz)) {
      toast({
        title: "Inténtalo de nuevo",
        description: "Lee la explicación y sigue practicando.",
        variant: "destructive"
      });
    }
  };

  const nextQuiz = () => {
    if (currentQuiz < phishingQuiz.length - 1) {
      setCurrentQuiz(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const prevQuiz = () => {
    if (currentQuiz > 0) {
      setCurrentQuiz(prev => prev - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setCompletedQuizzes([]);
  };

  const quiz = phishingQuiz[currentQuiz];

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
            <h1 className="text-xl font-bold text-foreground">Aprender</h1>
            <p className="text-sm text-muted-foreground">Centro educativo</p>
          </div>
        </div>

        <Tabs defaultValue="tips" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tips">Consejos</TabsTrigger>
            <TabsTrigger value="quiz">Quiz Interactivo</TabsTrigger>
          </TabsList>

          <TabsContent value="tips" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Aprende a Identificar Phishing</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Conoce las señales más comunes de mensajes fraudulentos y cómo protegerte.
                </p>
              </CardContent>
            </Card>

            {educationalTips.map((tip, index) => (
              <Card key={index} className="border-l-4 border-l-primary/50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      tip.color === 'destructive' ? 'bg-destructive/10' :
                      tip.color === 'secondary' ? 'bg-secondary/10' : 'bg-primary/10'
                    }`}>
                      <tip.icon className={`w-4 h-4 ${
                        tip.color === 'destructive' ? 'text-destructive' :
                        tip.color === 'secondary' ? 'text-secondary' : 'text-primary'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground">{tip.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="quiz" className="space-y-4">
            {/* Score */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Puntuación</span>
                  </div>
                  <Badge variant="secondary" className="text-lg">
                    {score}/{phishingQuiz.length}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quiz Question */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Pregunta {currentQuiz + 1} de {phishingQuiz.length}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{quiz.question}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Message Example */}
                <div className="bg-muted/50 p-3 rounded-lg border-l-4 border-l-warning">
                  <p className="text-sm font-mono">{quiz.message}</p>
                </div>

                {/* Answer Options */}
                <div className="space-y-2">
                  {quiz.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        selectedAnswer === index 
                          ? (index === quiz.correct ? "default" : "destructive")
                          : "outline"
                      }
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => handleQuizAnswer(index)}
                      disabled={showExplanation}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswer === index 
                            ? (index === quiz.correct ? 'border-green-500 bg-green-500' : 'border-red-500 bg-red-500')
                            : 'border-muted-foreground'
                        }`}>
                          {selectedAnswer === index && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
                    </Button>
                  ))}
                </div>

                {/* Explanation */}
                {showExplanation && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Explicación:</h4>
                      <p className="text-sm">{quiz.explanation}</p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevQuiz}
                disabled={currentQuiz === 0}
              >
                Anterior
              </Button>
              <div className="flex space-x-2">
                {currentQuiz === phishingQuiz.length - 1 ? (
                  <Button onClick={resetQuiz}>
                    Reiniciar Quiz
                  </Button>
                ) : (
                  <Button
                    onClick={nextQuiz}
                    disabled={!showExplanation}
                  >
                    Siguiente
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Learn;