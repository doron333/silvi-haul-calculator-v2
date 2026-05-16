export default function AIInsights({ insights }: any) {
  return (
    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
      <h3 className="text-xl font-semibold mb-4">🤖 AI Pricing Insights</h3>
      <p className="text-zinc-300 leading-relaxed">{insights || "AI analysis will appear here after calculation."}</p>
    </div>
  );
}