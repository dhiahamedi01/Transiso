type FormDataPayload = {
    service: string;
    from: string;
    to: string;
    name: string;
    email: string;
    phone: string;
    date: string; // Chaîne ISO
    weight: string;
    volume: string;
    cargoDetails: string;
    notes: string;
    file: File | null;
  };
  
  export const createDemandeApi = async (data: globalThis.FormData) => {
    const response = await fetch("/api/demandes", {
      method: "POST",
      body: data, 
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Échec de la création de la demande");
    }
  
    return response.json();
  };
  