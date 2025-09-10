import { Assessment, Question } from '@/types/assessment';

export const caseManagementAssessment: Assessment = {
  id: 'case-management-expert',
  title: 'Career & Skill Readiness Assessment for Case Management Software Experts',
  description: 'Evaluate your fit and readiness for a career as a Case Management Software Expert through comprehensive psychometric and technical evaluation.',
  estimatedTime: 25,
  totalQuestions: 45,
  sections: [
    {
      id: 'psychometric',
      title: 'Psychometric Assessment',
      description: 'Evaluate your personality traits, interests, and cognitive style for case management roles.',
      weight: 0.3,
      questions: [
        {
          id: 'psych-1',
          type: 'likert-scale',
          question: 'I enjoy organizing and systematizing complex information',
          scaleRange: { min: 1, max: 5, minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
          category: 'conscientiousness',
          weight: 1
        },
        {
          id: 'psych-2',
          type: 'likert-scale',
          question: 'I am curious about learning new software tools and technologies',
          scaleRange: { min: 1, max: 5, minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
          category: 'openness',
          weight: 1
        },
        {
          id: 'psych-3',
          type: 'likert-scale',
          question: 'I prefer working with detailed procedures and clear guidelines',
          scaleRange: { min: 1, max: 5, minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
          category: 'conscientiousness',
          weight: 1
        },
        {
          id: 'psych-4',
          type: 'multiple-choice',
          question: 'Which work environment appeals to you most?',
          options: [
            { id: 'a', text: 'Creative and flexible with minimal structure', value: 2 },
            { id: 'b', text: 'Structured with clear processes and procedures', value: 5 },
            { id: 'c', text: 'Mix of structure and creativity', value: 4 },
            { id: 'd', text: 'Completely independent with no guidelines', value: 1 }
          ],
          category: 'work-style',
          weight: 1.5
        },
        {
          id: 'psych-5',
          type: 'likert-scale',
          question: 'I enjoy helping others solve their problems',
          scaleRange: { min: 1, max: 5, minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
          category: 'agreeableness',
          weight: 1
        },
        {
          id: 'psych-6',
          type: 'likert-scale',
          question: 'I persist through challenges even when progress is slow',
          scaleRange: { min: 1, max: 5, minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
          category: 'grit',
          weight: 1
        },
        {
          id: 'psych-7',
          type: 'multiple-choice',
          question: 'When facing a complex problem, I typically:',
          options: [
            { id: 'a', text: 'Break it down into smaller, manageable parts', value: 5 },
            { id: 'b', text: 'Look for creative, out-of-the-box solutions', value: 3 },
            { id: 'c', text: 'Seek guidance from others immediately', value: 2 },
            { id: 'd', text: 'Try different approaches until something works', value: 3 }
          ],
          category: 'problem-solving',
          weight: 1.5
        },
        {
          id: 'psych-8',
          type: 'likert-scale',
          question: 'I am comfortable learning from my mistakes and adapting my approach',
          scaleRange: { min: 1, max: 5, minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
          category: 'growth-mindset',
          weight: 1
        }
      ]
    },
    {
      id: 'technical-aptitude',
      title: 'Technical & Aptitude Assessment',
      description: 'Test your logical reasoning, technical knowledge, and problem-solving abilities.',
      weight: 0.35,
      questions: [
        {
          id: 'tech-1',
          type: 'multiple-choice',
          question: 'What is the primary purpose of a database in case management software?',
          options: [
            { id: 'a', text: 'To create user interfaces', value: 0 },
            { id: 'b', text: 'To store and organize case information systematically', value: 5 },
            { id: 'c', text: 'To handle user authentication only', value: 1 },
            { id: 'd', text: 'To generate reports automatically', value: 2 }
          ],
          category: 'technical-knowledge',
          weight: 1,
          correctAnswer: 'b'
        },
        {
          id: 'tech-2',
          type: 'scenario',
          question: 'A client calls saying they cannot find their case file in the system. The case was created last week. What would be your first troubleshooting step?',
          options: [
            { id: 'a', text: 'Immediately escalate to senior technical support', value: 1 },
            { id: 'b', text: 'Check if the user has proper access permissions for that case', value: 5 },
            { id: 'c', text: 'Ask them to restart their computer', value: 0 },
            { id: 'd', text: 'Create a new case file to replace the missing one', value: 0 }
          ],
          category: 'problem-solving',
          weight: 1.5
        },
        {
          id: 'tech-3',
          type: 'multiple-choice',
          question: 'In a typical case management workflow, what happens after case creation?',
          options: [
            { id: 'a', text: 'Case closure', value: 0 },
            { id: 'b', text: 'Case assignment and initial assessment', value: 5 },
            { id: 'c', text: 'Final report generation', value: 0 },
            { id: 'd', text: 'Case archival', value: 0 }
          ],
          category: 'domain-knowledge',
          weight: 1,
          correctAnswer: 'b'
        },
        {
          id: 'tech-4',
          type: 'multiple-choice',
          question: 'Which of the following best describes data integration in case management systems?',
          options: [
            { id: 'a', text: 'Combining data from multiple sources into a unified view', value: 5 },
            { id: 'b', text: 'Deleting old case files to save space', value: 0 },
            { id: 'c', text: 'Creating backup copies of all data', value: 1 },
            { id: 'd', text: 'Converting all data to PDF format', value: 0 }
          ],
          category: 'technical-knowledge',
          weight: 1
        },
        {
          id: 'tech-5',
          type: 'scenario',
          question: 'Your organization wants to track case resolution times to improve efficiency. What key metrics would you recommend monitoring?',
          options: [
            { id: 'a', text: 'Only the total time from case creation to closure', value: 2 },
            { id: 'b', text: 'Average response time, case complexity, and resolution time by case type', value: 5 },
            { id: 'c', text: 'Number of cases created per day', value: 1 },
            { id: 'd', text: 'Staff working hours only', value: 0 }
          ],
          category: 'analytical-thinking',
          weight: 1.5
        },
        {
          id: 'tech-6',
          type: 'multiple-choice',
          question: 'What is the most important consideration when migrating case data between systems?',
          options: [
            { id: 'a', text: 'Speed of migration', value: 1 },
            { id: 'b', text: 'Data integrity and security', value: 5 },
            { id: 'c', text: 'Cost reduction', value: 1 },
            { id: 'd', text: 'User interface design', value: 0 }
          ],
          category: 'technical-knowledge',
          weight: 1
        },
        {
          id: 'tech-7',
          type: 'scenario',
          question: 'A case manager reports that the system is running slowly when loading case histories. How would you approach this performance issue?',
          options: [
            { id: 'a', text: 'Tell them to be patient and wait longer', value: 0 },
            { id: 'b', text: 'Investigate database query performance and system resources', value: 5 },
            { id: 'c', text: 'Suggest they use a different computer', value: 1 },
            { id: 'd', text: 'Recommend reducing the amount of case data stored', value: 2 }
          ],
          category: 'technical-troubleshooting',
          weight: 1.5
        },
        {
          id: 'tech-8',
          type: 'multiple-choice',
          question: 'Which principle is most important for case management system security?',
          options: [
            { id: 'a', text: 'All users should have access to all cases', value: 0 },
            { id: 'b', text: 'Role-based access control and data encryption', value: 5 },
            { id: 'c', text: 'Password complexity only', value: 1 },
            { id: 'd', text: 'Regular system backups only', value: 2 }
          ],
          category: 'security-knowledge',
          weight: 1
        }
      ]
    },
    {
      id: 'domain-expertise',
      title: 'Case Management Domain Knowledge',
      description: 'Assess your understanding of case management principles and best practices.',
      weight: 0.35,
      questions: [
        {
          id: 'domain-1',
          type: 'scenario',
          question: 'A high-priority case has been inactive for several days. As a case management expert, what would be your recommended approach?',
          options: [
            { id: 'a', text: 'Wait for the case manager to provide updates', value: 1 },
            { id: 'b', text: 'Set up automated alerts and escalation procedures for inactive high-priority cases', value: 5 },
            { id: 'c', text: 'Close the case to clear the backlog', value: 0 },
            { id: 'd', text: 'Transfer the case to another department', value: 1 }
          ],
          category: 'case-management-expertise',
          weight: 2
        },
        {
          id: 'domain-2',
          type: 'multiple-choice',
          question: 'What is the primary benefit of implementing standardized case management workflows?',
          options: [
            { id: 'a', text: 'Reduced software costs', value: 1 },
            { id: 'b', text: 'Consistent service delivery and improved outcomes tracking', value: 5 },
            { id: 'c', text: 'Fewer staff members needed', value: 0 },
            { id: 'd', text: 'Simplified reporting only', value: 2 }
          ],
          category: 'process-improvement',
          weight: 1.5
        },
        {
          id: 'domain-3',
          type: 'scenario',
          question: 'Stakeholders want to customize the case management system to match their unique processes. How would you balance customization with best practices?',
          options: [
            { id: 'a', text: 'Implement all requested customizations immediately', value: 1 },
            { id: 'b', text: 'Analyze current processes, identify improvements, and customize strategically while maintaining core best practices', value: 5 },
            { id: 'c', text: 'Refuse all customizations to keep the system standard', value: 2 },
            { id: 'd', text: 'Let each department customize independently', value: 0 }
          ],
          category: 'stakeholder-management',
          weight: 2
        },
        {
          id: 'domain-4',
          type: 'multiple-choice',
          question: 'Which factor is most critical for successful case management system adoption?',
          options: [
            { id: 'a', text: 'Advanced technical features', value: 2 },
            { id: 'b', text: 'User training and change management', value: 5 },
            { id: 'c', text: 'Low implementation cost', value: 1 },
            { id: 'd', text: 'Attractive user interface design', value: 2 }
          ],
          category: 'implementation-success',
          weight: 1.5
        },
        {
          id: 'domain-5',
          type: 'scenario',
          question: 'Different departments are using the case management system differently, creating inconsistent data. What would you recommend?',
          options: [
            { id: 'a', text: 'Allow each department to continue their own approach', value: 0 },
            { id: 'b', text: 'Force all departments to use identical processes', value: 2 },
            { id: 'c', text: 'Develop department-specific workflows within a standardized framework', value: 5 },
            { id: 'd', text: 'Implement separate systems for each department', value: 1 }
          ],
          category: 'process-standardization',
          weight: 1.5
        },
        {
          id: 'domain-6',
          type: 'multiple-choice',
          question: 'What is the most important outcome to measure in case management effectiveness?',
          options: [
            { id: 'a', text: 'Number of cases processed', value: 2 },
            { id: 'b', text: 'Case resolution quality and client satisfaction', value: 5 },
            { id: 'c', text: 'System uptime percentage', value: 1 },
            { id: 'd', text: 'Cost per case', value: 2 }
          ],
          category: 'outcome-measurement',
          weight: 1.5
        }
      ]
    }
  ]
};

export const sampleLearningResources = [
  {
    title: 'Salesforce Service Cloud Administration',
    type: 'certification' as const,
    url: 'https://trailhead.salesforce.com',
    description: 'Learn to configure and manage Salesforce Service Cloud for case management',
    difficulty: 'intermediate' as const
  },
  {
    title: 'Case Management Fundamentals',
    type: 'course' as const,
    description: 'Understanding the principles and best practices of effective case management',
    difficulty: 'beginner' as const
  },
  {
    title: 'Database Design for Case Management',
    type: 'course' as const,
    description: 'Learn how to design efficient databases for case management systems',
    difficulty: 'intermediate' as const
  },
  {
    title: 'Build a Case Tracking System',
    type: 'project' as const,
    description: 'Hands-on project to create a simple case management application',
    difficulty: 'intermediate' as const
  }
];