export interface User {
  id: string;
  twitterId: string;
  twitterHandle: string;
  twitterAccessToken: string;
  twitterRefreshToken: string;
  createdAt: Date;
  streak: number;
  totalGoals: number;
  completedGoals: number;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  deadline: Date;
  verificationMethod: 'manual' | 'github' | 'strava' | 'webhook';
  verificationData: {
    githubRepo?: string;
    stravaActivityType?: string;
    webhookUrl?: string;
  };
  shameTweetText: string;
  status: 'active' | 'completed' | 'failed' | 'escaped';
  createdAt: Date;
  completedAt?: Date;
  tweetedAt?: Date;
}

export interface VerificationCheck {
  id: string;
  goalId: string;
  checkedAt: Date;
  isComplete: boolean;
  methodUsed: string;
  evidence?: any;
}
