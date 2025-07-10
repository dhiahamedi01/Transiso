// hook/useDevisForm.ts
import { useState, ChangeEvent } from "react";
import dayjs, { Dayjs } from "dayjs";

export type FormData = {
  name: string;
  email: string;
  phone: string;
  date: Dayjs | null;
  weight: string;
  volume: string;
  cargoDetails: string;
  notes: string;
  file: File | null;
};

export const useDevisForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: dayjs(),
    weight: "",
    volume: "",
    cargoDetails: "",
    notes: "",
    file: null,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    setFormData((prev) => ({ ...prev, date: newDate }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files ? e.target.files[0] : null,
    }));
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    handleDateChange,
    handleFileChange,
  };
};
