import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Brain, Target, Users, TrendingUp } from 'lucide-react';
import { caseManagementAssessment } from '@/data/assessmentData';

export const AssessmentIntro = () => {
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);

  const handleStartAssessment = () => {
    setIsStarting(true);
    // Clear any existing results
    localStorage.removeItem('assessmentResults');
    // Small delay for UX feedback
    setTimeout(() => {
      navigate('/assessment');
    }, 500);
  };

  const features = [
    {
      icon: <Brain className="w-6 h-6 text-primary" />,
      title: "Psychometric Evaluation",
      description: "Assess personality traits and cognitive style for case management roles"
    },
    {
      icon: <Target className="w-6 h-6 text-secondary" />,
      title: "Technical Aptitude",
      description: "Evaluate technical knowledge and problem-solving abilities"
    },
    {
      icon: <Users className="w-6 h-6 text-accent" />,
      title: "Domain Expertise",
      description: "Test understanding of case management principles and best practices"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-success" />,
      title: "WISCAR Framework",
      description: "Comprehensive analysis using Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment"
    }
  ];

  const benefits = [
    "Discover your fit for case management software expert roles",
    "Get personalized career recommendations based on your strengths",
    "Receive detailed feedback on areas for improvement",
    "Access curated learning resources and next steps",
    "Understand your readiness across multiple dimensions"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              Professional Career Assessment
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {caseManagementAssessment.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {caseManagementAssessment.description}
            </p>
            
            <div className="flex justify-center items-center space-x-6 mb-8 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{caseManagementAssessment.estimatedTime} minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>{caseManagementAssessment.totalQuestions} questions</span>
              </div>
            </div>

            <Button 
              onClick={handleStartAssessment}
              variant="hero"
              size="lg"
              disabled={isStarting}
              className="text-lg px-8 py-3"
            >
              {isStarting ? 'Starting Assessment...' : 'Start Assessment'}
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">What You'll Discover</h2>
          <p className="text-muted-foreground text-lg">Comprehensive evaluation across multiple dimensions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-medium transition-smooth border-border/50">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits and Assessment Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-success" />
                <span>What You'll Gain</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Assessment Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {caseManagementAssessment.sections.map((section, index) => (
                <div key={section.id} className="border-l-4 border-primary/30 pl-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-foreground">{section.title}</h4>
                    <Badge variant="outline">{section.questions.length} questions</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="inline-block shadow-large bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Discover Your Potential?</h3>
              <p className="text-muted-foreground mb-6">
                Take the first step towards a rewarding career in case management software
              </p>
              <Button 
                onClick={handleStartAssessment}
                variant="hero"
                size="lg"
                disabled={isStarting}
                className="px-8 py-3"
              >
                {isStarting ? 'Starting Assessment...' : 'Begin Your Assessment'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};