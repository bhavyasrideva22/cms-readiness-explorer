import { AssessmentResult } from '@/types/assessment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { CheckCircle, AlertCircle, XCircle, Download, RotateCcw } from 'lucide-react';

interface ResultsPageProps {
  result: AssessmentResult;
  onRestart: () => void;
}

export const ResultsPage = ({ result, onRestart }: ResultsPageProps) => {
  const { recommendation, wiscarScores, sectionScores } = result;

  const getDecisionIcon = () => {
    switch (recommendation.decision) {
      case 'yes':
        return <CheckCircle className="w-8 h-8 text-success" />;
      case 'maybe':
        return <AlertCircle className="w-8 h-8 text-warning" />;
      case 'no':
        return <XCircle className="w-8 h-8 text-danger" />;
    }
  };

  const getDecisionColor = () => {
    switch (recommendation.decision) {
      case 'yes':
        return 'bg-success';
      case 'maybe':
        return 'bg-warning';
      case 'no':
        return 'bg-danger';
    }
  };

  const getDecisionText = () => {
    switch (recommendation.decision) {
      case 'yes':
        return 'Excellent Fit';
      case 'maybe':
        return 'Potential with Development';
      case 'no':
        return 'Consider Alternatives';
    }
  };

  const wiscarData = [
    { subject: 'Will', score: wiscarScores.will, fullMark: 100 },
    { subject: 'Interest', score: wiscarScores.interest, fullMark: 100 },
    { subject: 'Skill', score: wiscarScores.skill, fullMark: 100 },
    { subject: 'Cognitive', score: wiscarScores.cognitiveReadiness, fullMark: 100 },
    { subject: 'Learning', score: wiscarScores.abilityToLearn, fullMark: 100 },
    { subject: 'Alignment', score: wiscarScores.realWorldAlignment, fullMark: 100 },
  ];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Assessment Results</h1>
          <p className="text-muted-foreground">Case Management Software Expert Career Readiness</p>
        </div>

        {/* Main Result Card */}
        <Card className="mb-8 shadow-large">
          <CardHeader className={`${getDecisionColor()} text-white text-center`}>
            <div className="flex items-center justify-center space-x-3 mb-4">
              {getDecisionIcon()}
              <CardTitle className="text-2xl">{getDecisionText()}</CardTitle>
            </div>
            <div className="flex justify-center space-x-6 text-white/90">
              <div className="text-center">
                <div className="text-2xl font-bold">{Math.round(result.overallScore)}%</div>
                <div className="text-sm">Overall Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{recommendation.confidence}%</div>
                <div className="text-sm">Confidence</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{formatTime(result.timeSpent)}</div>
                <div className="text-sm">Completion Time</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-lg text-foreground leading-relaxed">{recommendation.reasoning}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* WISCAR Analysis */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>WISCAR Framework Analysis</span>
                <Badge variant="secondary">{Math.round(wiscarScores.overall)}% Overall</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={wiscarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {wiscarData.map((item) => (
                  <div key={item.subject} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.subject}</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={item.score} className="w-20 h-2" />
                      <span className="text-sm text-muted-foreground w-10">{Math.round(item.score)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section Scores */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Section Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sectionScores.map((section) => (
                <div key={section.sectionId} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{section.sectionTitle}</h4>
                    <Badge variant={section.percentage >= 75 ? "default" : section.percentage >= 60 ? "secondary" : "destructive"}>
                      {Math.round(section.percentage)}%
                    </Badge>
                  </div>
                  <Progress value={section.percentage} className="h-2" />
                  {section.insights.length > 0 && (
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {section.insights.map((insight, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="mb-8 shadow-medium">
          <CardHeader>
            <CardTitle>Recommended Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Action Items</h4>
                <ul className="space-y-2">
                  {recommendation.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {recommendation.alternativePaths && (
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Alternative Career Paths</h4>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.alternativePaths.map((path, index) => (
                      <Badge key={index} variant="outline">{path}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Learning Resources */}
        <Card className="mb-8 shadow-medium">
          <CardHeader>
            <CardTitle>Recommended Learning Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendation.learningResources.map((resource, index) => (
                <div key={index} className="border border-border rounded-lg p-4 hover:bg-card-hover transition-smooth">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-foreground">{resource.title}</h5>
                    <Badge variant="secondary" className="text-xs">
                      {resource.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant={resource.difficulty === 'beginner' ? 'default' : resource.difficulty === 'intermediate' ? 'secondary' : 'destructive'}>
                      {resource.difficulty}
                    </Badge>
                    {resource.url && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          Learn More
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-center space-x-4">
          <Button variant="outline" onClick={onRestart} className="flex items-center space-x-2">
            <RotateCcw className="w-4 h-4" />
            <span>Retake Assessment</span>
          </Button>
          <Button variant="default" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </Button>
        </div>
      </div>
    </div>
  );
};