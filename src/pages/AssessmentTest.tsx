import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { ProgressBar } from '@/components/assessment/ProgressBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { caseManagementAssessment } from '@/data/assessmentData';
import { UserResponse, AssessmentProgress, Question } from '@/types/assessment';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const AssessmentTest = () => {
  const navigate = useNavigate();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [startTime] = useState(Date.now());
  const [sectionStartTime, setSectionStartTime] = useState(Date.now());

  const allQuestions: Question[] = caseManagementAssessment.sections.flatMap(section => section.questions);
  const currentSection = caseManagementAssessment.sections[currentSectionIndex];
  const currentQuestion = currentSection.questions[currentQuestionIndex];
  const globalQuestionIndex = allQuestions.findIndex(q => q.id === currentQuestion.id);

  const progress: AssessmentProgress = {
    currentSection: currentSectionIndex + 1,
    currentQuestion: globalQuestionIndex + 1,
    totalQuestions: caseManagementAssessment.totalQuestions,
    completedQuestions: responses.length,
    percentage: (responses.length / caseManagementAssessment.totalQuestions) * 100,
    timeSpent: Math.floor((Date.now() - startTime) / 1000)
  };

  useEffect(() => {
    setSectionStartTime(Date.now());
  }, [currentSectionIndex]);

  const handleAnswer = (response: UserResponse) => {
    setResponses(prev => [...prev, response]);
    
    // Move to next question
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (currentSectionIndex < caseManagementAssessment.sections.length - 1) {
      // Move to next section
      setCurrentSectionIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Assessment complete
      completeAssessment();
    }
  };

  const completeAssessment = () => {
    const assessmentData = {
      responses,
      totalTime: Math.floor((Date.now() - startTime) / 1000),
      completedAt: new Date().toISOString()
    };
    
    // Store in localStorage for now (in a real app, this would be sent to a backend)
    localStorage.setItem('assessmentResults', JSON.stringify(assessmentData));
    navigate('/results');
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      // Remove the last response for this question
      setResponses(prev => prev.slice(0, -1));
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
      const prevSection = caseManagementAssessment.sections[currentSectionIndex - 1];
      setCurrentQuestionIndex(prevSection.questions.length - 1);
      setResponses(prev => prev.slice(0, -1));
    }
  };

  const existingAnswer = responses.find(r => r.questionId === currentQuestion.id)?.answer as string | number | undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Progress Section */}
        <div className="mb-8">
          <ProgressBar progress={progress} />
        </div>

        {/* Section Header */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">{currentSection.title}</h2>
            <p className="text-muted-foreground">{currentSection.description}</p>
          </CardContent>
        </Card>

        {/* Question */}
        <div className="mb-8">
          <QuestionCard
            question={currentQuestion}
            questionNumber={globalQuestionIndex + 1}
            totalQuestions={caseManagementAssessment.totalQuestions}
            onAnswer={handleAnswer}
            existingAnswer={existingAnswer}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={goToPreviousQuestion}
            disabled={currentSectionIndex === 0 && currentQuestionIndex === 0}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Section {currentSectionIndex + 1} of {caseManagementAssessment.sections.length}
            </p>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {currentSection.questions.length} in this section
            </p>
          </div>

          <div className="w-24" /> {/* Spacer for center alignment */}
        </div>

        {/* Section Progress */}
        <div className="mt-8">
          <div className="flex justify-center space-x-2">
            {caseManagementAssessment.sections.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-2 rounded-full transition-smooth ${
                  index < currentSectionIndex
                    ? 'bg-success'
                    : index === currentSectionIndex
                    ? 'bg-primary'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <div className="text-center mt-2">
            <p className="text-xs text-muted-foreground">
              {caseManagementAssessment.sections.map((section, index) => (
                <span key={index} className={index === currentSectionIndex ? 'font-medium' : ''}>
                  {section.title}
                  {index < caseManagementAssessment.sections.length - 1 && ' • '}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};