import { useState } from "react";
import { createDemandeApi } from "@/services/devisService"; 

export const useCreateDemande = () => {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (data: globalThis.FormData) => {
    setIsPending(true);
    setIsSuccess(false);
    setIsError(false);
    setError(null);

    try {
      const response = await createDemandeApi(data);
      setIsSuccess(true);
      console.log("Demande créée avec succès :", response);
      return response;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      console.error("Erreur lors de la création de la demande :", err);
      throw err; 
    } finally {
      setIsPending(false);
    }
  };

  return {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
