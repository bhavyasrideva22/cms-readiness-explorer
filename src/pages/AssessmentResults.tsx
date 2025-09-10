import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResultsPage } from '@/components/assessment/ResultsPage';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AssessmentResult, UserResponse, SectionScore } from '@/types/assessment';
import { caseManagementAssessment } from '@/data/assessmentData';
import { 
  calculateSectionScore, 
  calculateWISCARScores, 
  generateRecommendation,
  getSectionInsights 
} from '@/utils/assessmentScoring';
import { AlertCircle } from 'lucide-react';

export const AssessmentResults = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const assessmentData = localStorage.getItem('assessmentResults');
    
    if (!assessmentData) {
      navigate('/');
      return;
    }

    try {
      const data = JSON.parse(assessmentData);
      const responses: UserResponse[] = data.responses;
      
      // Calculate section scores
      const sectionScores: SectionScore[] = caseManagementAssessment.sections.map(section => {
        const sectionResponses = responses.filter(r => 
          section.questions.some(q => q.id === r.questionId)
        );
        const score = calculateSectionScore(sectionResponses, section.questions);
        const insights = getSectionInsights(score, section.id);
        
        return {
          sectionId: section.id,
          sectionTitle: section.title,
          score: score,
          maxScore: 100,
          percentage: score,
          insights
        };
      });

      // Calculate overall score (weighted average)
      const overallScore = sectionScores.reduce((sum, section) => {
        const sectionWeight = caseManagementAssessment.sections.find(s => s.id === section.sectionId)?.weight || 1;
        return sum + (section.percentage * sectionWeight);
      }, 0);

      // Calculate WISCAR scores
      const allQuestions = caseManagementAssessment.sections.flatMap(s => s.questions);
      const wiscarScores = calculateWISCARScores(responses, allQuestions);

      // Generate recommendation
      const recommendation = generateRecommendation(overallScore, wiscarScores, sectionScores);

      const assessmentResult: AssessmentResult = {
        userId: 'anonymous',
        assessmentId: caseManagementAssessment.id,
        overallScore,
        sectionScores,
        wiscarScores,
        recommendation,
        completedAt: new Date(data.completedAt),
        timeSpent: data.totalTime
      };

      setResult(assessmentResult);
    } catch (error) {
      console.error('Error processing assessment results:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleRestart = () => {
    localStorage.removeItem('assessmentResults');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Analyzing Your Results</h3>
            <p className="text-muted-foreground">Please wait while we process your assessment...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <CardContent>
            <AlertCircle className="w-12 h-12 text-danger mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Assessment Data Found</h3>
            <p className="text-muted-foreground mb-4">
              It looks like you haven't completed an assessment yet, or your results have expired.
            </p>
            <Button onClick={() => navigate('/')} variant="default">
              Take Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <ResultsPage result={result} onRestart={handleRestart} />;
};