import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, TrendingUp, CheckCircle, Clock, Users } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/intro');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-foreground">CareerScope Assessment</span>
            </div>
            <Button variant="outline" onClick={handleGetStarted}>
              Take Assessment
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              Professional Career Assessment Platform
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Discover Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-hero">
                Career Path
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              Take our comprehensive assessment to evaluate your fit for specialized roles in case management software and related technology careers.
            </p>
            
            <div className="flex justify-center items-center space-x-8 mb-10 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>25 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-secondary" />
                <span>45 questions</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>Instant results</span>
              </div>
            </div>

            <Button 
              onClick={handleGetStarted}
              variant="hero"
              size="lg"
              className="text-lg px-10 py-4 mb-16"
            >
              Start Your Assessment
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Comprehensive Career Evaluation</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our assessment uses scientifically-backed methods to evaluate your readiness and fit for technology careers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-medium transition-smooth border-border/50">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Psychometric Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Evaluate personality traits, cognitive style, and motivational factors that predict success in your target role.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-medium transition-smooth border-border/50">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Technical Aptitude</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Test your technical knowledge, problem-solving abilities, and readiness for specialized software roles.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-medium transition-smooth border-border/50">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <CardTitle>WISCAR Framework</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Comprehensive analysis using Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What You'll Get Section */}
        <Card className="shadow-large bg-gradient-to-r from-card to-muted/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">What You'll Receive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>Detailed Career Fit Analysis</span>
                </h4>
                <h4 className="font-semibold text-foreground flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>Personalized Recommendations</span>
                </h4>
                <h4 className="font-semibold text-foreground flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>WISCAR Dimensional Scoring</span>
                </h4>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>Learning Resources & Next Steps</span>
                </h4>
                <h4 className="font-semibold text-foreground flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>Alternative Career Paths</span>
                </h4>
                <h4 className="font-semibold text-foreground flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>Downloadable Assessment Report</span>
                </h4>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Discover Your Potential?</h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of professionals who have found their ideal career path through our assessment
          </p>
          <Button 
            onClick={handleGetStarted}
            variant="hero"
            size="lg"
            className="px-10 py-4"
          >
            Take Assessment Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
