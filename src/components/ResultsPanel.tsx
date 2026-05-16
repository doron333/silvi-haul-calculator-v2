export default function ResultsPanel({ data }: any) {
  return (
    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
      <h3 className="text-xl font-semibold mb-4">Route Results</h3>
      <div className="space-y-3 text-sm">
        <div>Distance: ~{(data.trip?.summary?.length || 0) / 1609.34} miles</div>
        <div>Fuel Price: ${data.fuelPrice}/gal</div>
        <div className="text-2xl font-bold text-amber-500">Recommended Rate: ${data.totalCost}/load</div>
      </div>
    </div>
  );
}