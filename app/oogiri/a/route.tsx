import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET(request: Request) {
  console.log(request.url, "request.url");
  const { searchParams } = new URL(request.url);
  console.log(searchParams, "searchParams");
  const hasText = searchParams.has("text");
  const text = hasText ? searchParams.get("text")?.slice(0, 100) : "";
  console.log(text, "text");

  const imageData = await fetch(new URL("./panel.png", import.meta.url)).then(
    (res) => res.arrayBuffer()
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          background: "#f6f6f6",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* @ts-ignore */}
        <img width="630" height="630" alt="meme" src={imageData} />
        <p
          style={{
            position: "absolute",
            margin: 0,
            paddingBottom: 20,
            color: "#000000",
            lineHeight: 1,
            fontSize: 100,
            fontFamily: '"Oswald Bold"',
            textAlign: "center",
            textTransform: "uppercase",
            textShadow:
              "5px 5px 3px #000, -5px 5px 3px #000, -5px -5px 0 #000, 5px -5px 0 #000",
          }}
        >
          {text}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
