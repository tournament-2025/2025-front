import { TournamentCellData } from "@/pages/tournament"
import InfoIcon from "@mui/icons-material/Info"
import PlaceIcon from "@mui/icons-material/Place"

const Tournament: React.FC<{ cells: Record<string, TournamentCellData>, openModal: Function, data: any }> = ({ cells, openModal, data }) => {
  const colors = ["#adb5bd", "#dc3545"]
  const width = 30
  const height = 50

  return (
    <>
      {Object.entries(cells).map(([cell, cellData]) => {
        const cellStyle: React.CSSProperties = {
          position: "absolute",
          top: `${(5 - parseFloat(cell.split("_")[1])) * height}px`,
          left: `${parseFloat(cell.split("_")[0]) * width}px`,
          height: `${height}px`,
          width: `${width}px`,
          paddingRight: cellData.align_left ? "10px" : "0",
          borderTop: cellData.border_top ? `3px solid ${colors[cellData.border_top - 1]}` : "none",
          borderLeft: cellData.border_left ? `3px solid ${colors[cellData.border_left - 1]}` : "none",
          verticalAlign: "bottom",
          display: "flex",
          alignItems: `${cell.split("_")[1] === "0" || cellData.edit !== undefined ? "" : "flex-end"}`,
        }

        return (
          <div key={cell} style={cellStyle}>
            <div className={cellData.class} style={{ fontSize: "0.8em", width: "100%", textAlign: cellData.align_left ? "left" : "center", color: cellData.color ? colors[cellData.color - 1] : "inherit", verticalAlign: "bottom" }}>
              {cellData.text}

              {/* @ts-ignore */}
              {["esport", "soccer"].includes(data.event) ? <span style={{ color: colors[1] }}>{cellData.point >= 0 ? cellData.point : ""}</span> : null}

              {/* 始まってて終わっててapply済でそのまま点書いてない種目 */}
              {cellData.edit !== undefined && (data[`p_${cellData.edit!}`].recordedAt) && !["esport", "soccer"].includes(data.event)
                ? (
                  <div
                    onClick={() => openModal(cellData.edit!)}
                    style={{
                      marginTop: 10,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <InfoIcon width={20} height={20} style={{ color: "#777" }} />
                    </div>
                  </div>
                ) : null}

              {/* 開催中の試合に赤びっくりアイコン出すやつ */}
              {cellData.edit !== undefined && (data[`p_${cellData.edit!}`].scheduledAt < Date.now() && !data[`p_${cellData.edit!}`].recordedAt)
                ? (
                  <div
                    onClick={() => openModal(cellData.edit!)}
                    style={{
                      marginTop: 10,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <InfoIcon width={20} height={20} style={{ color: "#e91e63" }} />
                    </div>
                  </div>
                ) : null}

              {/* 始まってないときに予定モーダルを開くやつ */}
              {cellData.edit !== undefined && data[`p_${cellData.edit!}`].scheduledAt > Date.now() && !(data[`p_${cellData.edit!}`].recordedAt)
                ? (
                  <div
                    onClick={() => openModal(cellData.edit!)}
                    style={{
                      marginTop: 10,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <InfoIcon width={20} height={20} style={{ color: "#777" }} />
                    </div>
                  </div>
                ) : null}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Tournament