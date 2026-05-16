import { useState } from 'react';
import RouteForm from './components/RouteForm';
import HaulMap from './components/HaulMap';
import ResultsPanel from './components/ResultsPanel';
import AIInsights from './components/AIInsights';

export default function App() {
  const [routeData, setRouteData] = useState<any>(null);
  const [aiInsights, setAiInsights] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (formData: any) => {
    setLoading(true);
    try {
      const routeRes = await fetch('/api/valhalla-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const route = await routeRes.json();

      const fuelRes = await fetch('/api/fuel-prices');
      const fuel = await fuelRes.json();

      const totalCost = calculateTotalCost(route, fuel.price, formData.volume || 20);

      const fullData = { ...route, fuelPrice: fuel.price, totalCost, formData };
      setRouteData(fullData);

      const aiRes = await fetch('/api/ai-rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullData),
      });
      setAiInsights(await aiRes.text());
    } catch (err) {
      alert("Error calculating route. Check console.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-5xl font-bold text-amber-500 mb-2">Silvi Haul Calculator Pro</h1>
        <p className="text-zinc-400 mb-8">NJ/PA/DE Aggregate Hauling • Truck Routing • AI Pricing</p>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <RouteForm onCalculate={handleCalculate} loading={loading} />
          </div>

          <div className="lg:col-span-7 space-y-6">
            {routeData && (
              <>
                <HaulMap route={routeData} />
                <ResultsPanel data={routeData} />
                <AIInsights insights={aiInsights} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateTotalCost(route: any, fuelPrice: number, volume: number) {
  const distanceMiles = (route.trip?.summary?.length || 0) / 1609.34;
  const fuelGallons = (distanceMiles * 0.25) * (volume / 20);
  const fuelCost = fuelGallons * fuelPrice;
  const baseRate = distanceMiles * 4.5 + fuelCost + 150;
  return Math.round(baseRate * 1.15);
}