import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Alexander Nickita | Embedded Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "64px",
          background: "#09090b",
          fontFamily: "sans-serif",
        }}
      >
        {/* Subtle grid accent */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Top-right monogram */}
        <div
          style={{
            position: "absolute",
            top: "56px",
            right: "64px",
            fontSize: "20px",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.1em",
          }}
        >
          AN
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Alexander Nickita
          </div>

          <div
            style={{
              fontSize: "26px",
              color: "rgba(255,255,255,0.6)",
              fontWeight: 400,
              letterSpacing: "0.01em",
            }}
          >
            Embedded Software Engineer
          </div>

          {/* Tag row */}
          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            {["C / C++", "RTOS", "UART · CAN · I2C", "Python"].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "6px 16px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "999px",
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
