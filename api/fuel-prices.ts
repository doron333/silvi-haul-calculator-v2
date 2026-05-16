export default async function handler(req: Request) {
  const key = process.env.EIA_API_KEY;
  if (!key) return Response.json({ price: 3.85, source: "demo" });

  try {
    const url = `https://api.eia.gov/v2/petroleum/pri/diesel/retail/data/?frequency=weekly&data[]=price&sort[0][column]=period&sort[0][direction]=desc&length=1&api_key=${key}`;
    const res = await fetch(url);
    const data = await res.json();
    return Response.json({ price: data.response?.data?.[0]?.price || 3.85 });
  } catch {
    return Response.json({ price: 3.85, source: "fallback" });
  }
}