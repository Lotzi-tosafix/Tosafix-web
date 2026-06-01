export default async function handler(req: any, res: any) {
  // Empty for now since cache is not persisted globally across Vercel functions, but valid response.
  return res.status(200).send("Synced extensions successfully (No-op on Vercel Edge)");
}
