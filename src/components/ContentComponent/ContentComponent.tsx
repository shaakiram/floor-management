import React from "react";
import LeftComponent from "../LeftComponent/LeftComponent";
import FloatingComponent from "../FloatingComponent/FloatingComponent";
import EmptyRoomsComponent from "../RoomsComponent/EmptyRoomsComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import RoomsComponent from "../RoomsComponent/RoomsComponent";
interface ContentComponentProps {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const ContentComponent: React.FC<ContentComponentProps> = ({
  setIsModalVisible,
}) => {
  const selectedRoom = useSelector(
    (state: RootState) => state.floor.selectedRoom
  );
  const roomsData = localStorage.getItem("rooms");
  const rooms = roomsData ? JSON.parse(roomsData) : [];
  return (
    <React.Fragment>
      {rooms.length > 0 ? (
        selectedRoom === null ? (
          <RoomsComponent setIsModalVisible={setIsModalVisible}/>
        ) : (
          <React.Fragment>
            <LeftComponent setIsModalVisible={setIsModalVisible} />
            <FloatingComponent />
          </React.Fragment>
        )
      ) : (
        <EmptyRoomsComponent setIsModalVisible={setIsModalVisible} />
      )}
    </React.Fragment>
  );
};
export default ContentComponent;
