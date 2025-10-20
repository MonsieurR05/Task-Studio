export async function GET() {
  return Response.json({
    CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_EMAIL: process.env.CLOUDFLARE_EMAIL,
    CLOUDFLARE_API_KEY: process.env.CLOUDFLARE_API_KEY?.slice(0, 5) + "******", // show only start
  });
}
