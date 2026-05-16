export default async function handler(req: Request) {
  const body = await req.json();
  const payload = {
    locations: [body.origin, body.destination],
    costing: "truck",
    costing_options: { truck: body.truck || {} }
  };

  const res = await fetch('https://valhalla.openstreetmap.de/route', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error('Valhalla error');
  return res;
}