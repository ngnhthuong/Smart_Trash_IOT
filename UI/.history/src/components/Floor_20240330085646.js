// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "@fortawesome/fontawesome-free/css/all.css";

import "./FloorStyle.css";

export default function Floor({ floor, trashLevel, color }) {
  return (
    <div className="container box-animation" style={{ backgroundColor: color }}>
      <div className="text">Floor {floor}</div>
      <div>
        <img src={trashLevel} className="image" />
      </div>
    </div>
  );
}
