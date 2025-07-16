import { useEffect, useState } from 'react';
import { SocialLink } from '@/types/SocialLink';
import {
  fetchSocialLinks,
  addSocialLink as apiAdd,
  deleteSocialLink as apiDelete,
} from '@/services/socialLinksService';

export function useSocialLinks() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    fetchSocialLinks().then(setSocialLinks).catch(console.error);
  }, []);

  const addSocialLink = async (link: Omit<SocialLink, 'id'>) => {
    const newLink = await apiAdd(link);
    setSocialLinks((prev) => [...prev, newLink]);
  };

  const deleteSocialLink = async (id: number) => {
    await apiDelete(id);
    setSocialLinks((prev) => prev.filter((link) => link.id !== id));
  };

  return { socialLinks, setSocialLinks, addSocialLink, deleteSocialLink };
}
