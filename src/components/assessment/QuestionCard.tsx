import { useState } from 'react';
import { Question, UserResponse } from '@/types/assessment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (response: UserResponse) => void;
  existingAnswer?: string | number;
}

export const QuestionCard = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswer,
  existingAnswer 
}: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | number>(existingAnswer || '');
  const [startTime] = useState(Date.now());

  const handleSubmit = () => {
    if (selectedAnswer !== '') {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      onAnswer({
        questionId: question.id,
        answer: selectedAnswer,
        timeSpent
      });
    }
  };

  const renderLikertScale = () => (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>{question.scaleRange?.minLabel}</span>
        <span>{question.scaleRange?.maxLabel}</span>
      </div>
      <RadioGroup 
        value={selectedAnswer.toString()} 
        onValueChange={(value) => setSelectedAnswer(parseInt(value))}
        className="flex justify-between"
      >
        {Array.from({ length: question.scaleRange?.max || 5 }, (_, i) => i + 1).map((value) => (
          <div key={value} className="flex flex-col items-center space-y-2">
            <RadioGroupItem value={value.toString()} id={`option-${value}`} />
            <Label htmlFor={`option-${value}`} className="text-sm">{value}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );

  const renderMultipleChoice = () => (
    <RadioGroup 
      value={selectedAnswer.toString()} 
      onValueChange={setSelectedAnswer}
      className="space-y-3"
    >
      {question.options?.map((option) => (
        <div key={option.id} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-card-hover transition-smooth">
          <RadioGroupItem value={option.id} id={option.id} />
          <Label htmlFor={option.id} className="flex-1 cursor-pointer">{option.text}</Label>
        </div>
      ))}
    </RadioGroup>
  );

  const renderScenario = () => (
    <div className="space-y-4">
      <div className="bg-muted p-4 rounded-lg border-l-4 border-primary">
        <p className="text-sm font-medium text-foreground">Scenario-Based Question</p>
      </div>
      <RadioGroup 
        value={selectedAnswer.toString()} 
        onValueChange={setSelectedAnswer}
        className="space-y-3"
      >
        {question.options?.map((option) => (
          <div key={option.id} className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-card-hover transition-smooth">
            <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
            <Label htmlFor={option.id} className="flex-1 cursor-pointer text-sm leading-relaxed">
              {option.text}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-medium">
      <CardHeader className="bg-gradient-primary text-white">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Question {questionNumber} of {totalQuestions}</h3>
          <span className="text-sm opacity-90 capitalize">{question.type.replace('-', ' ')}</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          <h4 className="text-xl font-medium text-foreground leading-relaxed">
            {question.question}
          </h4>
          
          <div className="space-y-4">
            {question.type === 'likert-scale' && renderLikertScale()}
            {question.type === 'multiple-choice' && renderMultipleChoice()}
            {question.type === 'scenario' && renderScenario()}
          </div>
          
          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleSubmit} 
              disabled={selectedAnswer === ''}
              variant="assessment"
              size="lg"
            >
              Next Question
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};