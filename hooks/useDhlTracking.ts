// hooks/useDhlTracking.ts
export async function trackShipment(trackingNumber: string) {
    const res = await fetch('/api/track', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trackingNumber }),
    });
  
    if (!res.ok) {
      const errorText = await res.text(); 
      throw new Error(`Erreur DHL: ${errorText}`);
    }
  
    return await res.json();
  }
  