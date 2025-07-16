export interface SocialLink {
    id: number;
    platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram';
    url: string;
    isNew?: boolean;
  }
  