import React from "react";
import CloseIcon from "@mui/icons-material/Close";
export default function DashboardModal(props) {
  return (
    <>
      {props.show ? (
        <div className="overlayModal">
          <div className={"modal " + props.className}>
            <div
              className="closeIcon"
              onClick={() => {
                props.onClose();
              }}
            >
              <CloseIcon></CloseIcon>
            </div>
            <div className="modalContent">{props.children}</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
