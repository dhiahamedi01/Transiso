'use client';
import { useParams } from 'next/navigation';
import ModifUser from '@/Components/Client/modifier_user/modif_user'; 

export default function Page() {
  const { id } = useParams<{ id: string }>();
  return <ModifUser employeeId={id} />;
}
