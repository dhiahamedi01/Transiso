'use client';
import { useParams } from 'next/navigation';
import EditEmployeeForm from '@/Components/Dahsboard/Employe/Modifier_employe/EditEmployeeForm';

export default function Page() {
  const { id } = useParams<{ id: string }>();
  return <EditEmployeeForm employeeId={id} />;
}
