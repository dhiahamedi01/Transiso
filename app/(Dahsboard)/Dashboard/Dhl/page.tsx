'use client';

import { useState } from 'react';
import { trackShipment } from '@/hooks/useDhlTracking';

export default function TrackPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    setError('');
    try {
      const data = await trackShipment(trackingNumber);
      setResult(data);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">Suivi DHL</h1>
      <input
        type="text"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        placeholder="Numéro de suivi"
        className="border p-2 w-full"
      />
      <button onClick={handleTrack} className="bg-blue-500 text-white px-4 py-2 mt-2">
        Suivre
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {result && (
        <pre className="bg-gray-100 p-4 mt-4 overflow-auto max-h-[300px]">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
