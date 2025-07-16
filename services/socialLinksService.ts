import { SocialLink } from '@/types/SocialLink';

export async function fetchSocialLinks(): Promise<SocialLink[]> {
  const res = await fetch('/api/social-links');
  if (!res.ok) throw new Error('Failed to fetch social links');
  return res.json();
}

export async function addSocialLink(link: Omit<SocialLink, 'id'>): Promise<SocialLink> {
  const res = await fetch('/api/social-links', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(link),
  });
  if (!res.ok) throw new Error('Failed to add social link');
  return res.json();
}

export async function deleteSocialLink(id: number): Promise<void> {
  const res = await fetch(`/api/social-links/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete social link');
}
