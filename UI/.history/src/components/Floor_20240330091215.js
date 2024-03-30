// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "@fortawesome/fontawesome-free/css/all.css";

import "./FloorStyle.css";

export default function Floor({ floor, trashLevel, color, className }) {
  return (
    <div className={className} style={{ backgroundColor: color }}>
      <div className="text">Floor {floor}</div>
      <div>
        <img src={trashLevel} className="image" />
      </div>
    </div>
  );
}
