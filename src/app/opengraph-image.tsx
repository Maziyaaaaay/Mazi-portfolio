import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Muhammed Mazin KP — AI Content Architect, Educator & Founder";

export default async function OpengraphImage() {
  const bebas = await readFile(
    join(process.cwd(), "public", "Bebas_Neue", "BebasNeue-Regular.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#080808",
          fontFamily: "Bebas",
        }}
      >
        <div
          style={{
            color: "#C8F135",
            fontSize: 26,
            letterSpacing: "0.3em",
            marginBottom: 28,
          }}
        >
          KERALA, INDIA — AI CONTENT ARCHITECT
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#F2EDE8",
            fontSize: 150,
            lineHeight: 0.95,
            letterSpacing: "0.02em",
          }}
        >
          <div>MAKING BRANDS</div>
          <div style={{ display: "flex" }}>
            MOVE
            <span style={{ color: "#C8F135" }}>.</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginTop: 48,
            color: "#8A8580",
            fontSize: 28,
            letterSpacing: "0.12em",
          }}
        >
          <span>MUHAMMED MAZIN KP</span>
          <span style={{ color: "#C8F135" }}>·</span>
          <span>AI BRAND FILMS</span>
          <span style={{ color: "#C8F135" }}>·</span>
          <span>EDUCATOR</span>
          <span style={{ color: "#C8F135" }}>·</span>
          <span>FOUNDER</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Bebas", data: bebas, style: "normal" as const }],
    }
  );
}
