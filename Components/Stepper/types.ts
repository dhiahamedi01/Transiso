import dayjs, { Dayjs } from "dayjs";

export interface FormData {
  name: string;
  email: string;
  phone: string;
  date: Dayjs | null;
  weight: string;
  volume: string;
  cargoDetails: string;
  notes: string;
  file: File | null;
}

export interface DemandeData extends FormData {
  service: string;
  shippingFrom: string;
  shippingTo: string;
}

export interface MailData {
  to: string;
  subject: string;
  text: string;
}

export type ServiceType = {
  id: number;
  name: string;
};
