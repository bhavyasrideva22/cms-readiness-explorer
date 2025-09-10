import { AssessmentProgress } from '@/types/assessment';

interface ProgressBarProps {
  progress: AssessmentProgress;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground">Assessment Progress</span>
        <span className="text-sm text-muted-foreground">
          {progress.completedQuestions} of {progress.totalQuestions} questions
        </span>
      </div>
      
      <div className="w-full bg-progress-bg rounded-full h-3 mb-3">
        <div 
          className="bg-gradient-primary h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Section {progress.currentSection}</span>
        <span>Time: {formatTime(progress.timeSpent)}</span>
      </div>
    </div>
  );
};