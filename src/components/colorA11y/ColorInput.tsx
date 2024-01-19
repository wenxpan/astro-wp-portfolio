import { useEffect, useState } from "preact/hooks"
import colors from "tailwindcss/colors"
import { score, hex } from "wcag-contrast"
import hexRgb from "hex-rgb"
import clsx from "clsx"

type ColorKey = keyof typeof colors
type ColorShades = Record<string, string>

interface ColorSelectorProps {
  isBackground: boolean
  colorHex: string
  setColorHex: (hex: string) => void
}

const generateColorList = () => {
  // https://stackoverflow.com/questions/58387089/how-to-easily-get-non-getter-properties-from-an-object
  return Object.entries(Object.getOwnPropertyDescriptors(colors))
    .filter(
      ([, desc]) =>
        desc.hasOwnProperty("value") && typeof desc.value === "object"
    )
    .map(([key]) => key as ColorKey)
}

const generateShadeList = (twColor: ColorKey) => {
  const colorShades = colors[twColor]
  return colorShades ? Object.keys(colorShades) : []
}

const ColorSelector = ({
  isBackground = true,
  setColorHex,
  colorHex
}: ColorSelectorProps) => {
  const [selectedColor, setSelectedColor] = useState<ColorKey | null>(null)
  const [selectedShade, setSelectedShade] = useState<string | null>(null)

  const colorList = generateColorList()
  const shadeList = generateShadeList(colorList[0])

  const handleColorChange = (color: ColorKey) => {
    setSelectedColor(color)
    if (!selectedShade) {
      setSelectedShade("500")
    }
  }

  const handleShadeChange = (shade: string) => {
    setSelectedShade(shade)
  }

  const handleBlackWhiteSelection = (hex: string) => {
    setColorHex(hex)
    setSelectedColor(null)
    setSelectedShade(null)
  }

  useEffect(() => {
    if (selectedColor && selectedShade) {
      setColorHex((colors[selectedColor] as ColorShades)[selectedShade])
    }
  }, [selectedColor, selectedShade])

  return (
    <>
      <div className={clsx("flex")}>
        <div className="flex flex-wrap">
          {colorList.map((color) => (
            <button
              key={color}
              className={`p-2 m-1 font-semibold ${
                selectedColor === color
                  ? "ring-2 ring-offset-2 ring-blue-500"
                  : ""
              }`}
              style={
                isBackground
                  ? {
                      backgroundColor: colors[color]?.["100"]
                    }
                  : {
                      color: colors[color]?.["600"],
                      borderColor: colors[color]?.["600"],
                      borderStyle: "solid",
                      borderWidth: "2px"
                    }
              }
              onClick={() => handleColorChange(color)}
            >
              {color}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap">
          {shadeList.map((shade) => (
            <div className={clsx("flex items-center")}>
              <button
                key={shade}
                className={`p-1 m-1 ${
                  selectedShade &&
                  selectedShade === shade &&
                  "ring-2 ring-offset-2 ring-blue-500"
                }`}
                onClick={() => setSelectedShade(shade)}
              >
                <span
                  class={clsx("p-1", !selectedColor && "disabled")}
                  style={
                    isBackground
                      ? {
                          backgroundColor: selectedColor
                            ? (colors[selectedColor] as ColorShades)[shade]
                            : "transparent",
                          color: "transparent"
                        }
                      : {
                          color: selectedColor
                            ? (colors[selectedColor] as ColorShades)[shade]
                            : "transparent"
                        }
                  }
                >
                  CSS
                </span>
                <p className={clsx(!selectedColor && "text-transparent")}>
                  {shade}
                </p>
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        className={clsx(
          "p-2 m-1 font-semibold",
          colorHex === "#000000" && "ring-2 ring-offset-2 ring-blue-500"
        )}
        style={
          isBackground
            ? { backgroundColor: "black", color: "white" }
            : {
                color: "black",
                border: "2px solid black"
              }
        }
        onClick={() => handleBlackWhiteSelection("#000000")}
      >
        Black
      </button>
      <button
        className={clsx(
          "p-2 m-1 font-semibold",
          colorHex === "#FFFFFF" && "ring-2 ring-offset-2 ring-blue-500"
        )}
        style={
          isBackground
            ? { backgroundColor: "white", border: "2px solid black" }
            : {
                color: "white",
                backgroundColor: "black",
                border: "2px solid black"
              }
        }
        onClick={() => handleBlackWhiteSelection("#FFFFFF")}
      >
        White
      </button>
    </>
  )
}

export const ColorInput = () => {
  const [bgColorHex, setBgColorHex] = useState("")
  const [fgColorHex, setFgColorHex] = useState("")

  return (
    <div className="flex bg-white rounded-md p-4 flex-wrap md:flex-nowrap">
      <div>
        <h2>Background Color</h2>
        <ColorSelector
          isBackground={true}
          setColorHex={setBgColorHex}
          colorHex={bgColorHex}
        />
      </div>
      <div>
        <h2>Foreground Text Color</h2>
        <ColorSelector
          isBackground={false}
          setColorHex={setFgColorHex}
          colorHex={fgColorHex}
        />
      </div>
    </div>
  )
}

// export const ColorInput = () => {
//   const [selectedColor, setSelectedColor] = useState("rose" as ColorKey)
//   const [selectedShade, setSelectedShade] = useState("200")

//   const colorList = generateColorList()
//   const shadeList = generateShadeList(selectedColor)

//   return (
//     <>
//       <div>
//         <div className={clsx("flex flex-wrap")}>
//           {colorList.map((color) => (
//             <button
//               key={color}
//               className={clsx(
//                 "p-2 m-1",
//                 selectedColor === color
//                   ? "ring-2 ring-offset-2 ring-blue-500"
//                   : ""
//               )}
//               style={{ backgroundColor: colors[color]?.["200"] }}
//               onClick={() => {
//                 console.log("Selected color:", color)
//                 setSelectedColor(color)
//               }}
//             >
//               {color}
//             </button>
//           ))}
//         </div>
//         <div className={clsx("flex flex-wrap")}>
//           {shadeList.map((shade) => (
//             <button
//               key={shade}
//               className={clsx(
//                 "p-2 m-1",
//                 selectedShade === shade
//                   ? "ring-2 ring-offset-2 ring-blue-500"
//                   : ""
//               )}
//               style={{
//                 backgroundColor: (colors[selectedColor] as ColorShades)[shade]
//               }}
//               onClick={() => {
//                 setSelectedShade(shade)
//               }}
//             >
//               {shade}
//             </button>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

// const Table = () => {
//   const [front, setFront] = useState("text-cyan-600")
//   const [back, setBack] = useState("bg-gray-200")

//   const shade = "#1da1f2"

//   const frontHex = getHexValue(front)
//   const backHex = getHexValue(back)

//   const frontRGB = frontHex ? hexRgb(frontHex, { format: "css" }) : null
//   const backRGB = backHex ? hexRgb(backHex, { format: "css" }) : null

//   const contrastRatio =
//     frontHex && backHex
//       ? parseFloat(hex(frontHex, backHex)).toFixed(2)
//       : "Invalid color"

//   const contrastScore = contrastRatio ? score(contrastRatio) : null

//   return (
//     <>
//       <p
//         className={clsx("h-5 w-full bg-[#1da1f2]")}
//         style={{ backgroundColor: `${colors["rose"]?.["100"]}` }}
//       >
//         hello
//       </p>
//       <table className="table-auto flex-grow text-left">
//         <tr>
//           <td></td>
//           <th scope="col">foreground</th>
//           <th scope="col">background</th>
//         </tr>
//         <tr>
//           <th scope="row">class</th>
//           <td>{front}</td>
//           <td>{back}</td>
//         </tr>
//         <tr>
//           <th scope="row">hex</th>
//           <td>{frontHex}</td>
//           <td>{backHex}</td>
//         </tr>
//         <tr>
//           <th scope="row">rgb</th>
//           <td>{frontRGB}</td>
//           <td>{backRGB}</td>
//         </tr>
//         <tr>
//           <th scope="row">visual</th>
//           <td>
//             <p className={clsx("font-bold", front)}>lorem</p>
//           </td>
//           <td>
//             <div className={clsx("h-3 w-10", back)}></div>
//           </td>
//         </tr>
//       </table>

//       <table>
//         <tr>
//           <th className="text-left">Result</th>
//         </tr>
//         <tr>
//           <td>color contrast: {contrastRatio} : 1</td>
//         </tr>
//         <tr>
//           <td>
//             score:{" "}
//             <span
//               className={clsx(
//                 "font-semibold",
//                 contrastScore === "Fail" ? "text-red-600" : "text-green-600"
//               )}
//             >
//               {contrastScore}
//             </span>
//           </td>
//         </tr>
//         <tr>
//           <td
//             className={clsx(
//               "w-20 h-10 font-bold flex items-center justify-center",
//               front,
//               back
//             )}
//           >
//             lorem
//           </td>
//         </tr>
//       </table>
//     </>
//   )
// }

export default ColorInput

// const tailwindColors = {
//   inherit: "inherit",
//   current: "currentColor",
//   transparent: "transparent",
//   black: "#000",
//   white: "#fff",
//   slate: {
//     50: "#f8fafc",
//     100: "#f1f5f9",
//     200: "#e2e8f0",
//     300: "#cbd5e1",
//     400: "#94a3b8",
//     500: "#64748b",
//     600: "#475569",
//     700: "#334155",
//     800: "#1e293b",
//     900: "#0f172a",
//     950: "#020617"
//   },
//   gray: {
//     50: "#f9fafb",
//     100: "#f3f4f6",
//     200: "#e5e7eb",
//     300: "#d1d5db",
//     400: "#9ca3af",
//     500: "#6b7280",
//     600: "#4b5563",
//     700: "#374151",
//     800: "#1f2937",
//     900: "#111827",
//     950: "#030712"
//   },
//   zinc: {
//     50: "#fafafa",
//     100: "#f4f4f5",
//     200: "#e4e4e7",
//     300: "#d4d4d8",
//     400: "#a1a1aa",
//     500: "#71717a",
//     600: "#52525b",
//     700: "#3f3f46",
//     800: "#27272a",
//     900: "#18181b",
//     950: "#09090b"
//   },
//   neutral: {
//     50: "#fafafa",
//     100: "#f5f5f5",
//     200: "#e5e5e5",
//     300: "#d4d4d4",
//     400: "#a3a3a3",
//     500: "#737373",
//     600: "#525252",
//     700: "#404040",
//     800: "#262626",
//     900: "#171717",
//     950: "#0a0a0a"
//   },
//   stone: {
//     50: "#fafaf9",
//     100: "#f5f5f4",
//     200: "#e7e5e4",
//     300: "#d6d3d1",
//     400: "#a8a29e",
//     500: "#78716c",
//     600: "#57534e",
//     700: "#44403c",
//     800: "#292524",
//     900: "#1c1917",
//     950: "#0c0a09"
//   },
//   red: {
//     50: "#fef2f2",
//     100: "#fee2e2",
//     200: "#fecaca",
//     300: "#fca5a5",
//     400: "#f87171",
//     500: "#ef4444",
//     600: "#dc2626",
//     700: "#b91c1c",
//     800: "#991b1b",
//     900: "#7f1d1d",
//     950: "#450a0a"
//   },
//   orange: {
//     50: "#fff7ed",
//     100: "#ffedd5",
//     200: "#fed7aa",
//     300: "#fdba74",
//     400: "#fb923c",
//     500: "#f97316",
//     600: "#ea580c",
//     700: "#c2410c",
//     800: "#9a3412",
//     900: "#7c2d12",
//     950: "#431407"
//   },
//   amber: {
//     50: "#fffbeb",
//     100: "#fef3c7",
//     200: "#fde68a",
//     300: "#fcd34d",
//     400: "#fbbf24",
//     500: "#f59e0b",
//     600: "#d97706",
//     700: "#b45309",
//     800: "#92400e",
//     900: "#78350f",
//     950: "#451a03"
//   },
//   yellow: {
//     50: "#fefce8",
//     100: "#fef9c3",
//     200: "#fef08a",
//     300: "#fde047",
//     400: "#facc15",
//     500: "#eab308",
//     600: "#ca8a04",
//     700: "#a16207",
//     800: "#854d0e",
//     900: "#713f12",
//     950: "#422006"
//   },
//   lime: {
//     50: "#f7fee7",
//     100: "#ecfccb",
//     200: "#d9f99d",
//     300: "#bef264",
//     400: "#a3e635",
//     500: "#84cc16",
//     600: "#65a30d",
//     700: "#4d7c0f",
//     800: "#3f6212",
//     900: "#365314",
//     950: "#1a2e05"
//   },
//   green: {
//     50: "#f0fdf4",
//     100: "#dcfce7",
//     200: "#bbf7d0",
//     300: "#86efac",
//     400: "#4ade80",
//     500: "#22c55e",
//     600: "#16a34a",
//     700: "#15803d",
//     800: "#166534",
//     900: "#14532d",
//     950: "#052e16"
//   },
//   emerald: {
//     50: "#ecfdf5",
//     100: "#d1fae5",
//     200: "#a7f3d0",
//     300: "#6ee7b7",
//     400: "#34d399",
//     500: "#10b981",
//     600: "#059669",
//     700: "#047857",
//     800: "#065f46",
//     900: "#064e3b",
//     950: "#022c22"
//   },
//   teal: {
//     50: "#f0fdfa",
//     100: "#ccfbf1",
//     200: "#99f6e4",
//     300: "#5eead4",
//     400: "#2dd4bf",
//     500: "#14b8a6",
//     600: "#0d9488",
//     700: "#0f766e",
//     800: "#115e59",
//     900: "#134e4a",
//     950: "#042f2e"
//   },
//   cyan: {
//     50: "#ecfeff",
//     100: "#cffafe",
//     200: "#a5f3fc",
//     300: "#67e8f9",
//     400: "#22d3ee",
//     500: "#06b6d4",
//     600: "#0891b2",
//     700: "#0e7490",
//     800: "#155e75",
//     900: "#164e63",
//     950: "#083344"
//   },
//   sky: {
//     50: "#f0f9ff",
//     100: "#e0f2fe",
//     200: "#bae6fd",
//     300: "#7dd3fc",
//     400: "#38bdf8",
//     500: "#0ea5e9",
//     600: "#0284c7",
//     700: "#0369a1",
//     800: "#075985",
//     900: "#0c4a6e",
//     950: "#082f49"
//   },
//   blue: {
//     50: "#eff6ff",
//     100: "#dbeafe",
//     200: "#bfdbfe",
//     300: "#93c5fd",
//     400: "#60a5fa",
//     500: "#3b82f6",
//     600: "#2563eb",
//     700: "#1d4ed8",
//     800: "#1e40af",
//     900: "#1e3a8a",
//     950: "#172554"
//   },
//   indigo: {
//     50: "#eef2ff",
//     100: "#e0e7ff",
//     200: "#c7d2fe",
//     300: "#a5b4fc",
//     400: "#818cf8",
//     500: "#6366f1",
//     600: "#4f46e5",
//     700: "#4338ca",
//     800: "#3730a3",
//     900: "#312e81",
//     950: "#1e1b4b"
//   },
//   violet: {
//     50: "#f5f3ff",
//     100: "#ede9fe",
//     200: "#ddd6fe",
//     300: "#c4b5fd",
//     400: "#a78bfa",
//     500: "#8b5cf6",
//     600: "#7c3aed",
//     700: "#6d28d9",
//     800: "#5b21b6",
//     900: "#4c1d95",
//     950: "#2e1065"
//   },
//   purple: {
//     50: "#faf5ff",
//     100: "#f3e8ff",
//     200: "#e9d5ff",
//     300: "#d8b4fe",
//     400: "#c084fc",
//     500: "#a855f7",
//     600: "#9333ea",
//     700: "#7e22ce",
//     800: "#6b21a8",
//     900: "#581c87",
//     950: "#3b0764"
//   },
//   fuchsia: {
//     50: "#fdf4ff",
//     100: "#fae8ff",
//     200: "#f5d0fe",
//     300: "#f0abfc",
//     400: "#e879f9",
//     500: "#d946ef",
//     600: "#c026d3",
//     700: "#a21caf",
//     800: "#86198f",
//     900: "#701a75",
//     950: "#4a044e"
//   },
//   pink: {
//     50: "#fdf2f8",
//     100: "#fce7f3",
//     200: "#fbcfe8",
//     300: "#f9a8d4",
//     400: "#f472b6",
//     500: "#ec4899",
//     600: "#db2777",
//     700: "#be185d",
//     800: "#9d174d",
//     900: "#831843",
//     950: "#500724"
//   },
//   rose: {
//     50: "#fff1f2",
//     100: "#ffe4e6",
//     200: "#fecdd3",
//     300: "#fda4af",
//     400: "#fb7185",
//     500: "#f43f5e",
//     600: "#e11d48",
//     700: "#be123c",
//     800: "#9f1239",
//     900: "#881337",
//     950: "#4c0519"
//   },
//   get lightBlue() {
//     warn({
//       version: "v2.2",
//       from: "lightBlue",
//       to: "sky"
//     })
//     return this.sky
//   },
//   get warmGray() {
//     warn({
//       version: "v3.0",
//       from: "warmGray",
//       to: "stone"
//     })
//     return this.stone
//   },
//   get trueGray() {
//     warn({
//       version: "v3.0",
//       from: "trueGray",
//       to: "neutral"
//     })
//     return this.neutral
//   },
//   get coolGray() {
//     warn({
//       version: "v3.0",
//       from: "coolGray",
//       to: "gray"
//     })
//     return this.gray
//   },
//   get blueGray() {
//     warn({
//       version: "v3.0",
//       from: "blueGray",
//       to: "slate"
//     })
//     return this.slate
//   }
// }
