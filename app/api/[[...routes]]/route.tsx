/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from "frog";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/next";
import { text } from "stream/consumers";

const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame("/", (c) => {
  return c.res({
    action: "/odai",
    image: (
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
        <img width="1000" height="630" alt="meme" src={`/oogiri.png`} />
        <p
          style={{
            position: "absolute",
            margin: 0,
            paddingBottom: 20,
            color: "#ffffff",
            lineHeight: 1,
            fontSize: 100,
            textAlign: "center",
            textTransform: "uppercase",
            textShadow:
              "5px 5px 3px #000, -5px 5px 3px #000, -5px -5px 0 #000, 5px -5px 0 #000",
          }}
        >
          大喜利Frame
        </p>
      </div>
    ),
    intents: [
      <Button value="a">お題1</Button>,
      <Button value="b">お題2</Button>,
    ],
  });
});

app.frame("/odai", (c) => {
  const { buttonValue, verified } = c;

  return c.res({
    action: buttonValue == "a" ? "/oogiri/a" : "/oogiri/b",
    image: (
      <div
        style={{
          display: "flex",
          background: "#F5F027",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* @ts-ignore */}
        <img
          width="1000"
          height="630"
          alt="meme"
          src={`/oogiri.png`}
          style={{ opacity: 0.2 }}
        />
        <p
          style={{
            position: "absolute",
            margin: 0,
            paddingBottom: 500,
            color: "#000000",
            lineHeight: 1,
            fontSize: 80,
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          お題
        </p>
        <p
          style={{
            position: "absolute",
            margin: 0,
            width: "85%",
            paddingBottom: 120,
            color: "#000000",
            lineHeight: 1,
            fontSize: 80,
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {buttonValue == "a"
            ? "こんなミームコインは嫌だ。どんなの？"
            : "こんなFrameは嫌だ。どんなの？"}
        </p>
      </div>
    ),
    intents: [
      <TextInput placeholder="こたえ" />,
      <Button value="a">回答する</Button>,
    ],
  });
});

app.frame("/oogiri/:id", (c) => {
  const id = c.req.param("id");

  const { frameData, verified } = c;
  const { inputText = "" } = frameData || {};
  console.log(inputText, "inputText");

  return c.res({
    action: "/",
    image: (
      <div
        style={{
          display: "flex",
          background: "#F5F027",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* @ts-ignore */}
        <img
          width="1000"
          height="950"
          alt="meme"
          src={`/panel.png`}
          style={{
            position: "relative",
            top: "-110px", // これを調整して画像を上にずらす
          }}
        />
        <p
          style={{
            position: "absolute",
            marginTop: 20,
            padding: 10,
            color: "#000000",
            lineHeight: 1,
            fontSize: 30,
            textAlign: "left",
            textTransform: "uppercase",
            fontWeight: "bold",
            background: "#999999",
          }}
        >
          {id == "a"
            ? "こんなミームコインは嫌だ。どんなの？"
            : "こんなFrameは嫌だ。どんなの？"}
        </p>

        <p
          style={{
            position: "absolute",
            margin: 0,
            paddingTop: 300,
            color: "#000000",
            lineHeight: 1,
            fontSize: 60,
            textAlign: "center",
            maxWidth: "65%",
            textTransform: "uppercase",
          }}
        >
          {inputText}
        </p>
      </div>
    ),
    intents: [<Button>Start Over 🔄</Button>],
  });
});

export const GET = handle(app);
export const POST = handle(app);
