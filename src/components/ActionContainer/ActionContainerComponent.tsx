import React from "react";
import "./ActionContainerComponentStyles.scss";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import RotateRightRoundedIcon from "@mui/icons-material/RotateRightRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  deleteSelectedTable,
  duplicateSelectedTable,
  rotateTable,
} from "../../features/floorSlice/floorSlice";

interface ActionContainerComponentProps {
  setExceedLimit: React.Dispatch<React.SetStateAction<boolean>>;
}
const ActionContainerComponent: React.FC<ActionContainerComponentProps> = ({
  setExceedLimit,
}) => {
  const dispatch = useDispatch();
  const selectedRoom = useSelector(
    (state: RootState) => state.floor.selectedRoom
  );

  return (
    <div className="ActionContainerComponent">
      <div
        className="div"
        onClick={() => {
          if (selectedRoom) {
            dispatch(rotateTable(selectedRoom.tables));
          }
        }}
      >
        <RotateRightRoundedIcon fontSize="small" />
      </div>
      <div
        className="div"
        onClick={() => {
          if (selectedRoom?.tables && selectedRoom?.tables?.length < 15) {
            dispatch(duplicateSelectedTable());
          } else {
            setExceedLimit(true);
          }
        }}
      >
        <ContentCopyRoundedIcon fontSize="small" />
      </div>
      <div
        className="div2"
        onClick={() => {
          dispatch(deleteSelectedTable());
        }}
      >
        <DeleteOutlineRoundedIcon fontSize="small" />
      </div>
    </div>
  );
};
export default ActionContainerComponent;
