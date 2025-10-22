export const dynamic = "force-dynamic";

export async function GET() {
  const config = {
    miniapp: {
      name: "Davao Discovery Quiz",
      iconUrl: "/icon.png",
      homeUrl: process.env.NEXT_PUBLIC_URL,
      imageUrl: "/icon.png",
      buttonTitle: "Launch Mini App",
      splashImageUrl: "/icon.png",
      splashBackgroundColor: "#000000",
      webhookUrl: `${process.env.NEXT_PUBLIC_URL}/api/webhook`,
    },
  };

  return new Response(JSON.stringify(config), {
    headers: { "Content-Type": "application/json" },
  });
}
