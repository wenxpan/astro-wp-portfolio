import { useState } from "preact/hooks"
import colors from "tailwindcss/colors"
import { score, hex } from "wcag-contrast"
import clsx from "clsx"

type ColorKey = keyof typeof colors
type ColorShades = Record<string, string>
type twColorClass = { color: ColorKey; shade: string }

interface ColorSelectorProps {
  isBackground: boolean
  twClass: twColorClass
  setTwClass: (twClass: twColorClass) => void
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

const getColorHex = (twClass: twColorClass) => {
  const { color, shade } = twClass
  if (color === "white") return "#FFFFFF"
  if (color === "black") return "#000000"

  return (colors[color] as ColorShades)[shade]
}

const ColorSelector = ({
  isBackground = true,
  twClass,
  setTwClass
}: ColorSelectorProps) => {
  const { color: selectedColor, shade: selectedShade } = twClass

  const colorList = generateColorList()
  const shadeList = generateShadeList(colorList[0])

  const handleColorChange = (newColor: ColorKey) => {
    if (newColor === "black" || newColor === "white") {
      setTwClass({ color: newColor, shade: "" })
      return
    }
    if (!selectedShade) {
      setTwClass({ color: newColor, shade: "500" })
    } else {
      setTwClass({ ...twClass, color: newColor })
    }
  }

  const handleShadeChange = (shade: string) => {
    setTwClass({ ...twClass, shade })
  }

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
                className={clsx(
                  "p-1 m-1",
                  !selectedShade && "text-transparent",
                  selectedShade === shade &&
                    "ring-2 ring-offset-2 ring-blue-500"
                )}
                onClick={() => handleShadeChange(shade)}
                disabled={!selectedShade}
              >
                <span
                  class={clsx("p-1")}
                  style={
                    isBackground
                      ? {
                          backgroundColor: (
                            colors[selectedColor] as ColorShades
                          )[shade],
                          color: "transparent"
                        }
                      : {
                          color: (colors[selectedColor] as ColorShades)[shade]
                        }
                  }
                >
                  CSS
                </span>
                <p>{shade}</p>
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        className={clsx(
          "p-2 m-1 font-semibold",
          selectedColor === "black" && "ring-2 ring-offset-2 ring-blue-500"
        )}
        style={
          isBackground
            ? { backgroundColor: "black", color: "white" }
            : {
                color: "black",
                border: "2px solid black"
              }
        }
        onClick={() => handleColorChange("black")}
      >
        Black {isBackground ? "Fill" : "Text"}
      </button>
      <button
        className={clsx(
          "p-2 m-1 font-semibold",
          selectedColor === "white" && "ring-2 ring-offset-2 ring-blue-500"
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
        onClick={() => handleColorChange("white")}
      >
        White {isBackground ? "Fill" : "Text"}
      </button>
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
      <section
        style={{ ...bgStyle, ...fgStyle }}
        className="border-2 p-3 rounded-md"
      >
        <h1 role="presentation" className="text-[24px] font-bold">
          Preview
        </h1>
        <p className="uppercase">{`${fgColorHex} ${bgColorHex}`}</p>
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
  const [bgTwClass, setBgTwClass] = useState<twColorClass>({
    color: "white",
    shade: ""
  })
  const [fgTwClass, setFgTwClass] = useState<twColorClass>({
    color: "black",
    shade: ""
  })

  const bgColorHex = getColorHex(bgTwClass)
  const fgColorHex = getColorHex(fgTwClass)

  const contrastRatio =
    bgColorHex && fgColorHex
      ? Math.round(hex(bgColorHex, fgColorHex) * 100) / 100
      : ""

  const contrastScore = contrastRatio ? score(contrastRatio) : null

  const twClassString = `text-${fgTwClass.color}${fgTwClass.shade && "-"}${
    fgTwClass.shade
  } bg-${bgTwClass.color}${bgTwClass.shade && "-"}${bgTwClass.shade}`

  const checkPassFail = (score: number | string, standard: number) => {
    const passMarker = (
      <span className="bg-green-700 px-3 rounded-2xl text-white">Pass</span>
    )

    const failMarker = (
      <span className="bg-red-700 px-3 rounded-2xl text-white">Fail</span>
    )
    if (typeof score === "number") {
      return score > standard ? passMarker : failMarker
    }
    return null
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-2 bg-white rounded-md p-4 md:flex-nowrap">
        <div>
          <h2 className="font-semibold">Foreground Text Color</h2>
          <ColorSelector
            isBackground={false}
            twClass={fgTwClass}
            setTwClass={setFgTwClass}
          />
        </div>
        <div>
          <h2 className="font-semibold">Background Color</h2>
          <ColorSelector
            isBackground={true}
            twClass={bgTwClass}
            setTwClass={setBgTwClass}
          />
        </div>
        <ContrastPreview bgColorHex={bgColorHex} fgColorHex={fgColorHex} />
        <section
          class={clsx(
            "border-2 p-3 rounded-md place-self-start",
            contrastScore && contrastScore === "Fail"
              ? "border-red-500"
              : "border-green-500"
          )}
        >
          <p>{twClassString}</p>
          <p className="text-2xl my-2">
            Contrast: {contrastRatio}:1 {contrastScore && `(${contrastScore})`}
          </p>
          <p className="font-semibold">WCAG Level AA</p>
          <p>Large text - 3:1 {checkPassFail(contrastRatio, 3)}</p>
          <p>Normal text - 4.5:1 {checkPassFail(contrastRatio, 4.5)}</p>
          <p className="font-semibold">WCAG Level AAA</p>
          <p>Large text - 4.5:1 {checkPassFail(contrastRatio, 4.5)}</p>
          <p>Normal text - 7:1 {checkPassFail(contrastRatio, 7)}</p>
        </section>
      </div>
    </>
  )
}

export default ColorInput
