import { useState } from "preact/hooks"
import colors from "tailwindcss/colors"
import { score, hex } from "wcag-contrast"
import hexRgb from "hex-rgb"
import clsx from "clsx"

const getHexValue = (colorClass) => {
  const cleanedColorClass = colorClass.replace(/^(text-|bg-)/, "")

  const [color, shade] = cleanedColorClass.split("-")
  return colors[color] ? colors[color][shade] : null
}

const ColorInput = () => {
  const [front, setFront] = useState("text-cyan-600")
  const [back, setBack] = useState("bg-gray-200")

  const frontHex = getHexValue(front)
  const backHex = getHexValue(back)

  const frontRGB = frontHex ? hexRgb(frontHex, { format: "css" }) : null
  const backRGB = backHex ? hexRgb(backHex, { format: "css" }) : null

  const contrastRatio =
    frontHex && backHex
      ? parseFloat(hex(frontHex, backHex)).toFixed(2)
      : "Invalid color"

  const contrastScore = contrastRatio ? score(contrastRatio) : null

  return (
    <>
      <div className="flex bg-white px-2">
        <table className="table-auto flex-grow text-left">
          <tr>
            <td></td>
            <th scope="col">foreground</th>
            <th scope="col">background</th>
          </tr>
          <tr>
            <th scope="row">class</th>
            <td>{front}</td>
            <td>{back}</td>
          </tr>
          <tr>
            <th scope="row">hex</th>
            <td>{frontHex}</td>
            <td>{backHex}</td>
          </tr>
          <tr>
            <th scope="row">rgb</th>
            <td>{frontRGB}</td>
            <td>{backRGB}</td>
          </tr>
          <tr>
            <th scope="row">visual</th>
            <td>
              <p className={clsx("font-bold", front)}>lorem</p>
            </td>
            <td>
              <div className={clsx("h-3 w-10", back)}></div>
            </td>
          </tr>
        </table>
        <table>
          <tr>
            <th className="text-left">Result</th>
          </tr>
          <tr>
            <td>color contrast: {contrastRatio} : 1</td>
          </tr>
          <tr>
            <td>
              score:{" "}
              <span
                className={clsx(
                  "font-semibold",
                  contrastScore === "Fail" ? "text-red-600" : "text-green-600"
                )}
              >
                {contrastScore}
              </span>
            </td>
          </tr>
          <tr>
            <td
              className={clsx(
                "w-20 h-10 font-bold flex items-center justify-center",
                front,
                back
              )}
            >
              lorem
            </td>
          </tr>
        </table>
      </div>
    </>
  )
}

export default ColorInput

const generateColorList = () => {
  return Object.keys(colors)
    .filter((color) => typeof colors[color] === "object")
    .map((color) => <p key={color}>{color}</p>)
}
