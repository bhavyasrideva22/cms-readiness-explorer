import { UserResponse, Question, SectionScore, WISCARScores, AssessmentRecommendation, AssessmentSection } from '@/types/assessment';
import { sampleLearningResources } from '@/data/assessmentData';

export const calculateSectionScore = (
  responses: UserResponse[],
  questions: Question[]
): number => {
  let totalScore = 0;
  let maxPossibleScore = 0;

  responses.forEach(response => {
    const question = questions.find(q => q.id === response.questionId);
    if (!question) return;

    maxPossibleScore += 5 * question.weight;

    if (question.type === 'likert-scale') {
      totalScore += (response.answer as number) * question.weight;
    } else if (question.type === 'multiple-choice' || question.type === 'scenario') {
      const selectedOption = question.options?.find(opt => opt.id === response.answer);
      if (selectedOption) {
        totalScore += (selectedOption.value as number) * question.weight;
      }
    }
  });

  return maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
};

export const calculateWISCARScores = (
  responses: UserResponse[],
  questions: Question[]
): WISCARScores => {
  const getCategoryScore = (category: string) => {
    const categoryQuestions = questions.filter(q => q.category === category);
    const categoryResponses = responses.filter(r => 
      categoryQuestions.some(q => q.id === r.questionId)
    );
    return calculateSectionScore(categoryResponses, categoryQuestions);
  };

  const will = (getCategoryScore('grit') + getCategoryScore('growth-mindset')) / 2;
  const interest = getCategoryScore('openness');
  const skill = (getCategoryScore('technical-knowledge') + getCategoryScore('domain-knowledge')) / 2;
  const cognitiveReadiness = (getCategoryScore('problem-solving') + getCategoryScore('analytical-thinking')) / 2;
  const abilityToLearn = getCategoryScore('growth-mindset');
  const realWorldAlignment = (getCategoryScore('case-management-expertise') + getCategoryScore('stakeholder-management')) / 2;

  const overall = (will + interest + skill + cognitiveReadiness + abilityToLearn + realWorldAlignment) / 6;

  return {
    will: Math.max(0, Math.min(100, will)),
    interest: Math.max(0, Math.min(100, interest)),
    skill: Math.max(0, Math.min(100, skill)),
    cognitiveReadiness: Math.max(0, Math.min(100, cognitiveReadiness)),
    abilityToLearn: Math.max(0, Math.min(100, abilityToLearn)),
    realWorldAlignment: Math.max(0, Math.min(100, realWorldAlignment)),
    overall: Math.max(0, Math.min(100, overall))
  };
};

export const generateRecommendation = (
  overallScore: number,
  wiscarScores: WISCARScores,
  sectionScores: SectionScore[]
): AssessmentRecommendation => {
  let decision: 'yes' | 'maybe' | 'no';
  let confidence: number;
  let reasoning: string;
  let nextSteps: string[];
  let alternativePaths: string[] = [];

  // Decision logic based on scores
  if (overallScore >= 75 && wiscarScores.overall >= 70) {
    decision = 'yes';
    confidence = Math.min(95, (overallScore + wiscarScores.overall) / 2);
    reasoning = 'Your assessment results indicate strong alignment with case management software expert roles. You demonstrate the right combination of technical aptitude, domain understanding, and personal traits needed for success in this field.';
    nextSteps = [
      'Begin with foundational case management training',
      'Pursue Salesforce Service Cloud or similar platform certification',
      'Start a hands-on project building a simple case tracking system',
      'Join case management professional communities and forums'
    ];
  } else if (overallScore >= 60 && wiscarScores.overall >= 55) {
    decision = 'maybe';
    confidence = (overallScore + wiscarScores.overall) / 2;
    reasoning = 'You show promising potential for case management software roles, but some areas need development. With focused learning and practice, you could become successful in this field.';
    
    nextSteps = [];
    if (wiscarScores.skill < 60) {
      nextSteps.push('Focus on building technical foundation - databases, workflows, and system integration');
    }
    if (wiscarScores.interest < 60) {
      nextSteps.push('Explore case management through introductory courses to build genuine interest');
    }
    if (wiscarScores.realWorldAlignment < 60) {
      nextSteps.push('Gain practical experience through internships or volunteer work with case management systems');
    }
    nextSteps.push('Reassess your fit after 3-6 months of focused development');
  } else {
    decision = 'no';
    confidence = 100 - ((overallScore + wiscarScores.overall) / 2);
    reasoning = 'Based on your current assessment, case management software expert roles may not be the best fit. However, there are related paths that might align better with your strengths and interests.';
    nextSteps = [
      'Explore the alternative career paths suggested below',
      'Consider foundational IT or business analysis courses',
      'Retake this assessment after gaining more experience'
    ];
    
    // Suggest alternatives based on strengths
    if (wiscarScores.skill > wiscarScores.interest) {
      alternativePaths.push('Technical Support Specialist', 'Database Administrator', 'Business Intelligence Analyst');
    } else if (wiscarScores.interest > wiscarScores.skill) {
      alternativePaths.push('Customer Success Manager', 'Business Analyst', 'Project Coordinator');
    } else {
      alternativePaths.push('General IT Support', 'Administrative Systems Coordinator', 'Data Entry Specialist');
    }
  }

  return {
    decision,
    confidence: Math.round(confidence),
    reasoning,
    nextSteps,
    alternativePaths: alternativePaths.length > 0 ? alternativePaths : undefined,
    learningResources: sampleLearningResources
  };
};

export const getSectionInsights = (score: number, sectionId: string): string[] => {
  const insights: string[] = [];
  
  if (sectionId === 'psychometric') {
    if (score >= 80) {
      insights.push('Excellent personality fit for case management roles');
      insights.push('Strong conscientiousness and organizational skills');
    } else if (score >= 60) {
      insights.push('Good personality alignment with some areas for development');
      insights.push('Consider building stronger systematic thinking habits');
    } else {
      insights.push('Personality traits may need development for optimal case management success');
      insights.push('Focus on building attention to detail and systematic approaches');
    }
  } else if (sectionId === 'technical-aptitude') {
    if (score >= 80) {
      insights.push('Strong technical foundation and problem-solving abilities');
      insights.push('Ready for advanced case management system training');
    } else if (score >= 60) {
      insights.push('Solid technical aptitude with room for growth');
      insights.push('Recommend additional technical training before specializing');
    } else {
      insights.push('Technical skills need significant development');
      insights.push('Start with fundamental IT and database concepts');
    }
  } else if (sectionId === 'domain-expertise') {
    if (score >= 80) {
      insights.push('Excellent understanding of case management principles');
      insights.push('Ready for advanced implementation and consulting roles');
    } else if (score >= 60) {
      insights.push('Good grasp of case management concepts');
      insights.push('Build experience with real-world case management scenarios');
    } else {
      insights.push('Domain knowledge needs development');
      insights.push('Start with case management fundamentals and best practices');
    }
  }
  
  return insights;
};