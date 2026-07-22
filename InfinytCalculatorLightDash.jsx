import { useState } from "react";

const T = {
  bg: "#F5F4FC",
  card: "#FFFFFF",
  cardBorder: "#E4E1F5",
  ink: "#171233",
  inkSoft: "#6E699A",
  brand: "#4B3FD6",
  brandBright: "#4B3FD6",
  brandDeep: "#2B2280",
  mint: "#0EA37F",
  orchid: "#8E6FE0",
  line: "#E4E1F5",
};

// Traced from the official Infinyt.IA logomark (full, untruncated bounds).
const INFINYT_MARK_VIEWBOX = "0 0 1860.77 1267.47";
const INFINYT_MARK_TRANSFORM = "translate(-57.29,1329.89) scale(0.1,-0.1)";
const INFINYT_MARK_PATHS = [
  "M5764 13281 c-71 -10 -135 -20 -140 -24 -6 -3 -53 -17 -106 -31 -52 -14 -112 -33 -134 -43 -21 -9 -41 -17 -44 -18 -3 -1 -23 -9 -45 -19 -69 -30 -298 -103 -345 -110 -72 -11 -125 -32 -197 -80 -46 -29 -114 -60 -208 -91 -77 -26 -144 -51 -150 -56 -5 -5 -18 -9 -30 -9 -12 0 -26 -5 -33 -12 -7 -7 -12 -8 -12 -2 0 5 -3 5 -8 -1 -4 -6 -50 -30 -102 -55 -52 -24 -120 -59 -150 -77 -30 -18 -80 -41 -110 -51 -60 -21 -74 -28 -250 -119 -140 -72 -164 -87 -216 -133 -27 -25 -63 -44 -112 -59 -39 -12 -74 -26 -77 -31 -3 -5 -45 -30 -93 -56 -48 -26 -96 -55 -107 -64 -32 -27 -88 -57 -295 -163 -217 -110 -304 -160 -520 -299 -47 -30 -96 -61 -110 -68 -14 -7 -48 -28 -77 -47 -28 -19 -78 -44 -112 -57 -33 -13 -86 -40 -118 -59 -32 -20 -78 -41 -102 -47 -43 -11 -52 -19 -236 -195 -23 -22 -46 -47 -51 -56 -5 -8 -31 -31 -59 -49 -27 -19 -52 -36 -55 -40 -3 -3 -34 -28 -70 -55 -85 -65 -225 -199 -260 -250 -15 -22 -59 -77 -98 -123 -38 -45 -83 -111 -100 -145 -28 -56 -93 -237 -112 -312 -58 -220 -80 -313 -90 -380 -6 -44 -18 -123 -26 -175 -18 -126 -37 -660 -29 -830 4 -74 8 -1021 10 -2105 2 -1188 8 -2014 14 -2080 24 -267 72 -521 112 -597 7 -13 25 -39 40 -58 15 -19 37 -60 49 -90 12 -30 32 -66 45 -80 12 -14 44 -57 69 -97 26 -40 54 -78 64 -85 9 -7 40 -42 67 -77 28 -35 69 -83 91 -107 23 -23 50 -55 59 -71 9 -15 37 -43 63 -61 97 -68 228 -175 244 -200 10 -15 41 -45 70 -67 28 -22 77 -69 107 -105 50 -60 68 -72 220 -151 91 -47 204 -112 249 -143 46 -31 86 -56 89 -56 3 0 30 -17 61 -38 32 -21 66 -45 78 -53 12 -8 52 -35 90 -61 38 -26 82 -50 98 -54 16 -4 58 -35 94 -70 36 -35 73 -64 81 -64 23 0 168 -101 232 -161 30 -28 68 -58 84 -67 33 -17 119 -79 150 -109 33 -31 108 -72 164 -88 56 -17 183 -89 276 -158 33 -24 101 -66 150 -92 50 -27 106 -60 125 -75 19 -14 60 -37 90 -50 30 -13 75 -38 100 -56 25 -17 61 -36 80 -43 20 -6 58 -30 85 -54 31 -26 133 -83 270 -150 338 -167 416 -204 470 -223 28 -10 86 -37 130 -59 145 -76 305 -100 561 -86 l161 8 94 46 c74 36 112 63 178 126 47 45 91 81 98 81 7 0 13 4 13 9 0 5 9 13 20 16 11 3 20 11 20 16 0 5 26 49 58 97 31 48 71 114 87 146 29 57 58 93 120 147 17 15 45 52 64 83 18 30 39 60 47 67 20 16 84 145 84 169 0 21 82 183 106 211 8 8 17 38 20 65 9 75 33 149 65 207 43 79 48 93 60 170 6 40 22 92 34 117 38 72 55 120 65 184 6 34 15 86 22 116 7 30 11 113 10 185 -3 220 -41 350 -148 510 -69 103 -94 130 -200 217 -143 118 -177 144 -218 168 -23 14 -62 42 -87 62 -54 47 -247 190 -303 226 -22 15 -58 41 -78 58 -21 17 -57 36 -80 43 -25 8 -64 34 -97 65 -31 29 -85 67 -121 85 -36 19 -85 50 -110 71 -25 21 -69 49 -98 64 -29 15 -79 50 -110 79 -32 29 -77 68 -101 87 -24 19 -57 50 -74 68 -19 20 -48 37 -75 44 -41 10 -68 31 -130 102 -12 14 -30 26 -40 26 -9 1 -35 14 -57 30 -22 15 -78 54 -125 86 -47 31 -119 92 -160 134 -41 42 -104 101 -138 131 -35 29 -70 65 -77 79 -16 30 -57 73 -114 119 -49 40 -76 87 -95 168 -7 32 -25 87 -38 123 -42 108 -51 152 -44 231 5 52 3 85 -8 118 -8 25 -19 78 -25 116 -6 39 -15 88 -20 110 -32 129 -36 255 -36 1205 0 525 3 996 6 1045 4 50 10 149 13 220 13 277 30 400 66 480 10 22 31 72 46 110 15 39 37 84 50 100 12 17 32 51 43 78 11 26 25 47 31 47 5 0 10 4 10 9 0 19 147 159 182 174 20 9 85 23 144 32 92 15 126 16 247 6 166 -14 195 -20 352 -71 66 -21 131 -41 145 -44 14 -2 66 -19 115 -36 50 -17 126 -42 170 -55 44 -13 121 -43 170 -65 50 -23 110 -51 135 -62 60 -27 274 -148 281 -159 6 -11 188 -89 205 -89 36 0 125 -45 165 -83 65 -62 95 -81 198 -126 51 -23 118 -58 149 -78 31 -20 78 -47 104 -59 56 -27 134 -102 153 -148 11 -25 27 -39 67 -58 29 -13 72 -30 95 -38 27 -8 65 -34 101 -69 43 -42 79 -65 140 -91 45 -19 92 -42 102 -53 22 -19 117 -67 136 -67 6 0 55 -29 109 -65 53 -36 102 -65 109 -65 22 0 91 -42 131 -80 35 -33 146 -100 167 -100 20 0 189 -89 216 -113 10 -9 51 -32 92 -52 41 -21 82 -43 90 -50 8 -8 49 -30 90 -51 41 -20 88 -47 105 -59 16 -13 50 -30 75 -38 100 -34 223 -92 325 -153 65 -39 133 -67 187 -78 13 -3 55 -15 93 -27 39 -12 93 -26 120 -31 28 -5 113 -30 190 -55 249 -80 432 -98 618 -60 78 16 204 76 297 140 25 18 63 41 84 52 21 11 56 44 78 73 22 29 63 76 91 105 29 29 63 70 76 92 14 22 41 59 62 81 20 23 45 57 54 75 10 19 32 50 50 69 36 38 55 76 110 220 20 52 54 122 75 155 44 67 90 167 90 193 0 9 15 38 33 64 18 25 40 63 49 84 16 39 42 171 54 274 3 30 14 87 24 125 27 102 30 128 37 250 5 104 4 116 -27 213 -17 56 -37 108 -44 115 -6 6 -50 71 -97 143 -72 109 -94 134 -130 153 -47 24 -101 79 -202 201 -34 41 -68 79 -77 84 -8 5 -52 46 -96 91 -45 45 -110 99 -145 120 -91 55 -172 119 -207 163 -22 28 -45 42 -85 55 -36 11 -80 38 -129 78 -88 72 -86 70 -122 89 -51 26 -228 158 -289 216 -32 30 -84 66 -115 80 -31 13 -71 36 -88 49 -18 14 -37 25 -43 25 -5 0 -16 6 -23 14 -8 7 -33 23 -56 35 -23 12 -57 35 -76 51 -19 17 -63 42 -98 56 -105 42 -180 81 -238 123 -30 22 -75 50 -100 63 -25 12 -72 43 -105 67 -33 25 -118 75 -190 111 -71 36 -159 85 -195 110 -36 24 -119 72 -185 105 -66 34 -158 83 -205 110 -47 26 -111 62 -143 78 -32 17 -84 53 -116 81 -72 63 -126 105 -166 130 -28 18 -149 70 -274 119 -30 12 -111 52 -180 90 -161 89 -217 117 -235 117 -8 0 -54 20 -103 44 -48 24 -117 56 -153 70 -36 14 -92 39 -125 57 -89 46 -151 69 -233 85 -40 8 -99 25 -130 40 -31 14 -82 37 -112 51 -30 14 -64 29 -75 34 -11 5 -60 20 -110 33 -49 13 -110 31 -135 41 -65 25 -202 45 -295 44 -44 -1 -139 -9 -211 -18z",
  "M13800 13113 c-51 -10 -108 -32 -180 -69 -86 -45 -124 -73 -202 -147 -52 -51 -110 -112 -128 -137 -19 -25 -39 -49 -45 -55 -6 -5 -24 -30 -40 -55 -15 -25 -42 -59 -59 -77 -62 -63 -77 -92 -96 -181 -36 -177 -66 -249 -142 -349 -38 -49 -53 -83 -93 -213 -26 -85 -60 -182 -76 -215 -44 -96 -98 -256 -103 -305 -2 -25 -11 -83 -19 -130 -29 -164 -40 -288 -34 -387 12 -207 89 -392 192 -459 13 -9 37 -39 54 -68 43 -77 105 -141 149 -154 20 -6 50 -23 66 -37 16 -13 50 -39 77 -56 27 -17 65 -47 87 -67 85 -82 113 -103 188 -142 43 -22 90 -51 104 -64 14 -13 61 -45 105 -71 44 -27 93 -59 108 -72 16 -12 38 -23 50 -23 36 0 99 -42 132 -87 16 -23 38 -45 47 -48 10 -3 57 -35 105 -71 48 -35 92 -64 98 -64 18 0 142 -83 187 -125 24 -23 64 -55 89 -73 26 -17 57 -44 70 -59 13 -16 44 -42 69 -58 31 -21 54 -48 76 -90 36 -68 55 -90 101 -113 27 -15 106 -82 276 -238 26 -24 51 -44 56 -44 12 0 107 -94 153 -150 20 -25 48 -58 62 -74 14 -16 26 -33 26 -37 0 -4 12 -20 28 -36 95 -98 139 -182 208 -398 34 -103 39 -135 42 -230 2 -60 6 -549 9 -1085 5 -951 -2 -1386 -28 -1745 -8 -110 -17 -160 -40 -230 -17 -49 -38 -103 -49 -120 -10 -16 -30 -61 -45 -100 -15 -40 -40 -85 -60 -105 -18 -19 -40 -51 -48 -70 -29 -71 -59 -89 -222 -135 -33 -10 -82 -25 -110 -34 -60 -19 -280 -22 -335 -4 -40 14 -263 72 -300 79 -51 10 -157 47 -205 74 -27 14 -59 32 -70 38 -11 5 -49 20 -85 33 -36 12 -81 30 -100 39 -19 10 -73 30 -120 45 -47 16 -132 53 -190 83 -58 30 -152 79 -209 109 -57 30 -124 57 -148 60 -31 4 -59 18 -91 44 -26 22 -65 48 -87 58 -34 16 -121 76 -162 111 -6 5 -29 19 -50 30 -21 12 -45 25 -53 29 -8 5 -58 29 -110 54 -52 25 -104 54 -115 64 -43 40 -84 63 -151 85 -64 22 -97 39 -202 107 -20 13 -81 46 -134 73 -54 27 -124 68 -155 91 -117 85 -266 167 -304 167 -9 0 -45 19 -80 43 -35 23 -102 62 -149 87 -48 25 -104 59 -126 76 -58 47 -158 108 -257 159 -49 24 -101 53 -116 64 -15 11 -40 23 -57 27 -38 9 -104 42 -129 64 -11 10 -45 28 -75 40 -54 21 -105 45 -145 68 -11 6 -51 25 -90 43 -38 17 -81 39 -95 49 -26 18 -173 81 -245 105 -22 8 -95 30 -161 50 -67 19 -141 46 -165 59 -24 12 -73 30 -109 40 -75 19 -270 42 -381 45 -102 3 -252 -37 -334 -88 -33 -21 -78 -47 -100 -59 -69 -35 -367 -345 -401 -419 -10 -21 -38 -56 -61 -79 -32 -30 -49 -58 -67 -110 -21 -63 -59 -134 -108 -207 -24 -35 -68 -128 -68 -144 0 -7 -17 -50 -39 -95 -21 -46 -50 -110 -65 -143 -15 -32 -38 -74 -51 -91 -37 -48 -94 -215 -116 -334 -30 -169 -21 -384 22 -510 23 -68 66 -155 92 -186 14 -17 42 -62 62 -102 19 -39 40 -74 45 -77 6 -4 26 -30 44 -58 42 -64 78 -103 135 -147 24 -19 83 -73 130 -119 82 -83 107 -104 181 -154 19 -13 51 -41 71 -62 39 -39 45 -43 130 -89 56 -30 133 -87 159 -117 8 -10 48 -32 89 -49 40 -16 88 -43 107 -60 19 -16 39 -30 45 -30 5 0 42 -22 82 -48 40 -27 95 -60 123 -75 49 -25 84 -48 218 -147 77 -57 145 -97 196 -115 22 -8 66 -31 97 -53 32 -21 72 -46 88 -54 62 -32 231 -138 255 -160 26 -24 105 -74 150 -94 21 -10 71 -57 151 -144 10 -10 41 -25 71 -34 30 -8 70 -26 90 -40 19 -13 57 -36 84 -51 27 -16 60 -39 74 -51 14 -13 57 -37 95 -55 39 -17 111 -62 160 -99 90 -68 238 -150 272 -150 33 -1 105 -40 137 -74 20 -22 87 -62 194 -115 90 -44 187 -95 215 -114 77 -49 280 -142 377 -172 115 -36 336 -136 440 -200 59 -36 178 -80 245 -89 74 -11 96 -18 149 -45 31 -17 91 -35 151 -45 55 -10 127 -26 160 -36 37 -11 128 -22 235 -29 156 -10 191 -10 325 7 113 15 176 28 255 56 105 37 140 48 214 67 55 14 175 63 279 115 49 24 95 44 103 44 9 0 47 14 87 31 40 17 106 42 147 56 41 13 106 38 145 54 38 17 108 46 155 66 47 19 120 53 163 74 43 21 87 39 97 39 11 0 41 13 67 28 88 52 252 132 269 132 20 0 96 41 107 58 20 31 59 57 155 103 57 27 108 49 114 49 16 0 132 56 181 87 23 15 99 55 168 90 70 35 129 70 132 77 5 12 109 86 121 86 5 0 123 53 163 72 12 6 28 23 35 39 15 30 83 89 103 89 29 0 108 56 151 106 47 54 61 64 214 149 47 26 98 61 114 76 17 16 35 29 42 29 6 0 18 7 25 17 8 9 37 27 64 40 47 22 177 100 221 133 11 8 30 32 42 52 13 20 44 50 71 66 26 17 74 60 106 96 32 36 82 79 111 96 29 16 65 46 81 67 45 60 46 62 88 106 50 52 125 143 125 151 0 20 117 189 159 230 28 26 56 65 62 85 7 20 31 74 54 121 24 47 50 117 58 155 52 233 57 272 67 455 13 228 26 407 39 540 11 105 25 473 41 1025 14 463 14 1537 1 1955 -6 179 -13 467 -16 640 -3 173 -10 369 -14 435 -5 66 -9 173 -10 238 0 86 -6 149 -25 235 -13 64 -27 140 -31 167 -6 48 -23 106 -50 170 -7 17 -23 59 -35 95 -38 109 -112 253 -155 300 -23 25 -62 80 -86 124 -59 104 -166 230 -248 289 -36 27 -95 79 -131 117 -36 37 -100 91 -142 119 -42 28 -100 71 -128 96 -28 25 -57 45 -66 45 -24 0 -85 35 -150 87 -34 26 -108 77 -165 113 -56 36 -112 74 -125 85 -12 11 -39 34 -60 50 -21 17 -43 36 -50 43 -7 6 -15 12 -19 12 -15 0 -147 84 -159 101 -11 16 -68 46 -93 50 -5 1 -31 17 -60 35 -28 18 -71 43 -95 55 -24 12 -77 47 -118 78 -41 32 -109 79 -150 105 -41 27 -84 57 -95 67 -11 9 -51 33 -88 53 -37 19 -82 46 -98 61 -17 14 -43 28 -57 31 -60 13 -99 28 -142 52 -25 14 -70 38 -100 54 -30 15 -71 41 -90 58 -19 17 -48 38 -65 47 -16 8 -41 26 -55 39 -14 12 -41 30 -61 38 -36 15 -117 87 -155 137 -31 41 -94 77 -157 88 -59 11 -90 23 -118 48 -9 7 -53 27 -98 43 -44 15 -98 39 -118 52 -21 12 -58 33 -83 46 -62 31 -87 46 -107 64 -10 9 -52 30 -93 47 -41 18 -90 41 -107 51 -18 11 -51 24 -73 30 -23 6 -63 24 -89 40 -31 18 -126 49 -262 85 -414 110 -531 127 -679 98z",
];

function InfinytMark({ color = "#FFFFFF", size = 22 }) {
  const ratio = 1267.47 / 1860.77;
  return (
    <svg width={size} height={size * ratio} viewBox={INFINYT_MARK_VIEWBOX}>
      <g transform={INFINYT_MARK_TRANSFORM} fill={color}>
        {INFINYT_MARK_PATHS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}

function fmtBRL(v) {
  return v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}
function fmtBRLc(v) {
  return v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  });
}

function Slider({ label, hint, value, min, max, step, unit, color, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: 13.5,
            color: T.ink,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
            fontSize: 13,
            color,
          }}
        >
          {unit === "R$" ? fmtBRL(value) : `${value}${unit}`}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="ny-range"
        style={{
          background: `linear-gradient(90deg, ${color} ${pct}%, rgba(23,18,51,0.08) ${pct}%)`,
        }}
      />
      {hint && (
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 10.5,
            color: T.inkSoft,
            marginTop: 6,
          }}
        >
          {hint}
        </div>
      )}
    </div>
  );
}

function FunnelBarChart({ stages }) {
  const maxValue = stages[0].value || 1;
  const chartW = 300;
  const baseline = 148;
  const top = 22;
  const barW = 46;
  const n = stages.length;
  const gap = (chartW - barW * n) / (n + 1);

  return (
    <svg viewBox={`0 0 ${chartW} 176`} style={{ width: "100%", height: "auto", display: "block" }}>
      <line x1="4" y1={baseline} x2={chartW - 4} y2={baseline} stroke="rgba(23,18,51,0.14)" strokeWidth="1" />
      {stages.map((s, i) => {
        const x = gap + i * (barW + gap);
        const h = Math.max(4, (s.value / maxValue) * (baseline - top));
        const y = baseline - h;
        const isLast = i === n - 1;
        return (
          <g key={s.label}>
            {isLast && (
              <rect
                x={x - 6}
                y={top - 12}
                width={barW + 12}
                height={baseline - top + 12}
                rx={12}
                fill={`${T.mint}12`}
              />
            )}
            <text
              x={x + barW / 2}
              y={y - 8}
              textAnchor="middle"
              fill={isLast ? T.mint : T.ink}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: isLast ? 700 : 600,
                fontSize: isLast ? 13.5 : 11.5,
              }}
            >
              {Math.round(s.value)}
            </text>
            <rect x={x} y={y} width={barW} height={h} rx={9} fill={s.color} />
            <text
              x={x + barW / 2}
              y={baseline + 18}
              textAnchor="middle"
              fill={T.inkSoft}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 10.5, fontWeight: isLast ? 700 : 500 }}
            >
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function InfinytCalculatorLightDash() {
  const [leads, setLeads] = useState(400);
  const [agendamento, setAgendamento] = useState(20);
  const [comparecimento, setComparecimento] = useState(65);
  const [conversao, setConversao] = useState(40);
  const [ticket, setTicket] = useState(250);

  const agendados = leads * (agendamento / 100);
  const compareceram = agendados * (comparecimento / 100);
  const vendas = Math.round(
    leads * (agendamento / 100) * (comparecimento / 100) * (conversao / 100)
  );
  const faturamento = vendas * ticket;

  const custoOutros = 0.32;
  const custoInfinyt = 0.04;
  const economiaMensal = leads * (custoOutros - custoInfinyt);
  const economiaAnual = economiaMensal * 12;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        padding: "40px 20px 60px",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');

        .ny-bg-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(75,63,214,0.14) 1px, transparent 1px);
          background-size: 26px 26px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%);
          pointer-events: none;
        }
        .ny-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 5px;
          border-radius: 999px;
          outline: none;
          cursor: pointer;
        }
        .ny-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${T.brandDeep};
          border: 3px solid #fff;
          box-shadow: 0 1px 6px rgba(43,34,128,0.45);
          cursor: pointer;
        }
        .ny-range::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${T.brandDeep};
          border: 3px solid #fff;
          box-shadow: 0 1px 6px rgba(43,34,128,0.45);
          cursor: pointer;
        }
        .ny-card {
          background: ${T.card};
          border: 1px solid ${T.cardBorder};
          border-radius: 18px;
          box-shadow: 0 1px 3px rgba(23,18,51,0.04);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .ny-card:hover {
          border-color: #C9C2F2;
          box-shadow: 0 10px 30px rgba(75,63,214,0.12);
        }
        .ny-range:focus-visible {
          outline: 2px solid ${T.brandBright};
          outline-offset: 2px;
        }
        .ny-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 18px;
        }
        .ny-right-col {
          display: grid;
          grid-template-rows: auto auto;
          gap: 18px;
        }
        @media (max-width: 720px) {
          .ny-grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ny-card { transition: none; }
        }
      `}</style>

      <div className="ny-bg-grid" />

      <div style={{ width: "100%", maxWidth: 860, position: "relative" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 30,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 11,
                background: T.brand,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: `0 6px 14px ${T.brand}4D`,
              }}
            >
              <InfinytMark color="#FFFFFF" size={20} />
            </div>
            <span
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: 19,
                color: T.ink,
                letterSpacing: "-0.01em",
              }}
            >
              Infinyt<span style={{ color: T.brandBright }}>.IA</span>
            </span>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: T.card,
              border: `1px solid ${T.cardBorder}`,
              borderRadius: 999,
              padding: "8px 16px",
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.mint, flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 12.5,
                color: T.ink,
              }}
            >
              Disparo em Massa com API Oficial
            </span>
          </div>
        </div>

        {/* Hero */}
        <h1
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(22px, 3.6vw, 32px)",
            color: T.ink,
            lineHeight: 1.18,
            margin: "0 0 8px",
            letterSpacing: "-0.01em",
          }}
        >
          Simule quanto sua operação fatura{" "}
          <span style={{ color: T.mint }}>com disparo em massa via API oficial</span>
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14.5,
            color: T.inkSoft,
            margin: "0 0 26px",
            maxWidth: 460,
          }}
        >
          Ajuste os controles com a realidade do seu funil e acompanhe o
          resultado em tempo real.
        </p>

        {/* Featured Faturamento — destaque */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 22,
            background: `linear-gradient(135deg, ${T.brand} 0%, ${T.brandDeep} 100%)`,
            padding: "30px 32px",
            marginBottom: 18,
            boxShadow: `0 18px 40px ${T.brand}40`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -34,
              right: -14,
              opacity: 0.14,
              transform: "rotate(-10deg)",
              pointerEvents: "none",
            }}
          >
            <InfinytMark color="#FFFFFF" size={180} />
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.75)",
                marginBottom: 10,
              }}
            >
              Faturamento mensal projetado
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: "clamp(34px, 6vw, 52px)",
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                {fmtBRL(faturamento)}
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  background: "rgba(255,255,255,0.14)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  borderRadius: 999,
                  padding: "7px 14px",
                  marginBottom: 6,
                }}
              >
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11.5, color: "rgba(255,255,255,0.85)" }}>
                  Economia anual
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                    fontSize: 13.5,
                    color: "#fff",
                  }}
                >
                  {fmtBRL(economiaAnual)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bento grid */}
        <div className="ny-grid">
          {/* Sliders card */}
          <div className="ny-card" style={{ padding: "24px 24px 6px" }}>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: T.inkSoft,
                marginBottom: 18,
              }}
            >
              Parâmetros do funil
            </div>
            <Slider
              label="Base de leads / mês"
              value={leads}
              min={100}
              max={2000}
              step={50}
              unit=""
              color={T.brandBright}
              onChange={setLeads}
            />
            <Slider
              label="Taxa de agendamento"
              hint="5% ruim · 15% regular · 30% boa · 50% excelente"
              value={agendamento}
              min={1}
              max={100}
              step={1}
              unit="%"
              color={T.brand}
              onChange={setAgendamento}
            />
            <Slider
              label="Taxa de comparecimento"
              hint="40% ruim · 60% regular · 75% boa · 95% excelente"
              value={comparecimento}
              min={1}
              max={100}
              step={1}
              unit="%"
              color={T.orchid}
              onChange={setComparecimento}
            />
            <Slider
              label="Taxa de conversão"
              hint="5% ruim · 15% regular · 25% boa · 60% excelente"
              value={conversao}
              min={1}
              max={100}
              step={1}
              unit="%"
              color={T.mint}
              onChange={setConversao}
            />
            <Slider
              label="Ticket médio"
              value={ticket}
              min={50}
              max={2000}
              step={10}
              unit="R$"
              color={T.mint}
              onChange={setTicket}
            />
          </div>

          {/* Right column */}
          <div className="ny-right-col">
            {/* Vendas — agora em gráfico de barras */}
            <div className="ny-card" style={{ padding: "22px 24px" }}>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: T.inkSoft,
                  marginBottom: 16,
                }}
              >
                Métrica de vendas
              </div>

              <FunnelBarChart
                stages={[
                  { label: "Leads", value: leads, color: T.brandBright },
                  { label: "Agend.", value: agendados, color: T.brand },
                  { label: "Compar.", value: compareceram, color: T.orchid },
                  { label: "Vendas", value: vendas, color: T.mint },
                ]}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  borderTop: `1px solid ${T.cardBorder}`,
                  marginTop: 14,
                  paddingTop: 14,
                }}
              >
                <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 13.5, color: T.ink }}>
                  Vendas / mês
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    fontSize: 22,
                    color: T.mint,
                  }}
                >
                  {vendas}
                </span>
              </div>
            </div>

            {/* Custo por disparo — encaixado abaixo de Vendas/mês */}
            <div className="ny-card" style={{ padding: "20px 22px" }}>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: T.inkSoft,
                  marginBottom: 14,
                }}
              >
                Custo por disparo
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: T.inkSoft }}>
                    Outras ferramentas ({fmtBRLc(custoOutros)}/lead)
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 14.5,
                      color: T.ink,
                      textDecoration: "line-through",
                      textDecorationColor: T.inkSoft,
                    }}
                  >
                    {fmtBRL(leads * custoOutros)}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: T.inkSoft }}>
                    Com Infinyt ({fmtBRLc(custoInfinyt)}/lead)
                  </span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14.5, color: T.mint }}>
                    {fmtBRL(leads * custoInfinyt)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    borderTop: `1px dashed ${T.cardBorder}`,
                    paddingTop: 12,
                    marginTop: 2,
                  }}
                >
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, color: T.ink }}>
                    Economia mensal
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 700,
                      fontSize: 16,
                      color: T.brandBright,
                    }}
                  >
                    {fmtBRL(economiaMensal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 10.5,
            color: T.inkSoft,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Simulação com base nos parâmetros definidos. Resultados reais variam por operação.
        </p>
      </div>
    </div>
  );
}
