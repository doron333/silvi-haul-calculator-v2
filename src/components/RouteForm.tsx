import { useState } from 'react';
import { Truck } from 'lucide-react';

export default function RouteForm({ onCalculate, loading }: any) {
  const [form, setForm] = useState({
    origin: { lat: 40.0, lon: -75.0 },
    destination: { lat: 39.7, lon: -74.8 },
    truck: { height: 4.1, weight: 36000, axleLoad: 9000 },
    volume: 20,
    material: "Stone"
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onCalculate(form);
  };

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <Truck className="w-6 h-6 text-amber-500" /> New Haul
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm text-zinc-400 block mb-1">Origin (lat, lon)</label>
          <input type="text" className="w-full bg-zinc-800 rounded px-4 py-3" 
            defaultValue="40.0, -75.0" onChange={(e) => {
              const [lat, lon] = e.target.value.split(',').map(Number);
              setForm(f => ({...f, origin: {lat, lon}}));
            }} />
        </div>

        <div>
          <label className="text-sm text-zinc-400 block mb-1">Destination (lat, lon)</label>
          <input type="text" className="w-full bg-zinc-800 rounded px-4 py-3" 
            defaultValue="39.7, -74.8" onChange={(e) => {
              const [lat, lon] = e.target.value.split(',').map(Number);
              setForm(f => ({...f, destination: {lat, lon}}));
            }} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-zinc-400 block mb-1">Volume (tons)</label>
            <input type="number" value={form.volume} onChange={e => setForm(f => ({...f, volume: +e.target.value}))}
              className="w-full bg-zinc-800 rounded px-4 py-3" />
          </div>
          <div>
            <label className="text-sm text-zinc-400 block mb-1">Material</label>
            <select value={form.material} onChange={e => setForm(f => ({...f, material: e.target.value}))}
              className="w-full bg-zinc-800 rounded px-4 py-3">
              <option>Stone</option>
              <option>Sand</option>
              <option>Gravel</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 rounded-xl disabled:opacity-50 transition-colors"
        >
          {loading ? "Calculating Route..." : "Calculate Haul Rate"}
        </button>
      </form>
    </div>
  );
}