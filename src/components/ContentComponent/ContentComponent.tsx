import React from "react";
//components
import LeftComponent from "../LeftComponent/LeftComponent";
import FloatingComponent from "../FloatingComponent/FloatingComponent";
import EmptyRoomsComponent from "../RoomsComponent/EmptyRoomsComponent";
import RoomsComponent from "../RoomsComponent/RoomsComponent";
//libraries
import { useSelector } from "react-redux";
//store
import { RootState } from "../../store";
interface ContentComponentProps {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setNavigateFrom: React.Dispatch<React.SetStateAction<string>>;
}
const ContentComponent: React.FC<ContentComponentProps> = ({
  setIsModalVisible,
  setNavigateFrom,
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
          <RoomsComponent
            setIsModalVisible={setIsModalVisible}
            setNavigateFrom={setNavigateFrom}
          />
        ) : (
          <React.Fragment>
            <LeftComponent
              setIsModalVisible={setIsModalVisible}
              setNavigateFrom={setNavigateFrom}
            />
            <FloatingComponent />
          </React.Fragment>
        )
      ) : (
        <EmptyRoomsComponent
          setIsModalVisible={setIsModalVisible}
          setNavigateFrom={setNavigateFrom}
        />
      )}
    </React.Fragment>
  );
};
export default ContentComponent;
