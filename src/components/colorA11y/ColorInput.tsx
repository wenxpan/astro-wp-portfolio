import { useEffect, useState } from "preact/hooks"
import colors from "tailwindcss/colors"
import { score, hex } from "wcag-contrast"
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

  const twClassString =
    (isBackground ? "bg-" : "text-") +
    (selectedColor
      ? selectedColor + "-" + selectedShade
      : colorHex === "#000000"
      ? "black"
      : "white")

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
                disabled={!selectedColor}
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
        Black {isBackground ? "Fill" : "Text"}
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
        White {isBackground ? "Fill" : "Text"}
      </button>
      <p>{twClassString}</p>
    </>
  )
}

const ContrastPreview = ({
  bgColorHex,
  fgColorHex
}: {
  bgColorHex: string
  fgColorHex: string
}) => {
  const bgStyle = { backgroundColor: bgColorHex }
  const fgStyle = { color: fgColorHex }

  return (
    <>
      <section style={{ ...bgStyle, ...fgStyle }} className="border-2 p-3">
        <h1 role="presentation" className="text-[24px] font-bold">
          Preview
        </h1>
        <p>{`${fgColorHex} ${bgColorHex}`}</p>
        <p className="py-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
          harum labore neque error in tempore ex placeat autem, atque recusandae
          commodi consectetur doloremque dolorem ullam officiis quam at, sed ea.
        </p>
        <button
          className="border-2 p-4 mr-2"
          role="presentation"
          style={{ borderColor: fgColorHex }}
          disabled
        >
          Button
        </button>
        <button
          className="border-2 p-4"
          role="presentation"
          disabled
          style={{
            borderColor: fgColorHex,
            backgroundColor: fgColorHex,
            color: bgColorHex
          }}
        >
          Button
        </button>
      </section>
    </>
  )
}

export const ColorInput = () => {
  const [bgColorHex, setBgColorHex] = useState("#FFFFFF")
  const [fgColorHex, setFgColorHex] = useState("#000000")

  const contrastRatio =
    bgColorHex && fgColorHex
      ? Math.round(hex(bgColorHex, fgColorHex) * 100) / 100
      : ""

  const contrastScore = contrastRatio ? score(contrastRatio) : null

  return (
    <>
      <div className="grid grid-cols-2 gap-2 bg-white rounded-md p-4 md:flex-nowrap">
        <div>
          <h2>Foreground Text Color</h2>
          <ColorSelector
            isBackground={false}
            setColorHex={setFgColorHex}
            colorHex={fgColorHex}
          />
        </div>
        <div>
          <h2>Background Color</h2>
          <ColorSelector
            isBackground={true}
            setColorHex={setBgColorHex}
            colorHex={bgColorHex}
          />
        </div>
        <ContrastPreview bgColorHex={bgColorHex} fgColorHex={fgColorHex} />
        <div
          class={clsx(
            "border-2",
            contrastScore && contrastScore === "Fail"
              ? "border-red-500"
              : "border-green-500"
          )}
        >
          <p>
            Result: {contrastRatio} {contrastScore && `(${contrastScore})`}
          </p>
        </div>
      </div>
    </>
  )
}

export default ColorInput
