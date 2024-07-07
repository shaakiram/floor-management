import React, { useEffect, useState } from "react";
//components
import PrimaryButton from "../Button/PrimaryButton";
//libraries
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { useSelector, useDispatch } from "react-redux";
//types
import { Room } from "../../types/types";
//store
import { RootState } from "../../store";
//reducers
import { setSelectedRoom } from "../../features/floorSlice/floorSlice";
//scss
import "./RoomsComponentStyles.scss";
interface RoomsComponentProps {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setNavigateFrom: React.Dispatch<React.SetStateAction<string>>;
}
const RoomsComponent: React.FC<RoomsComponentProps> = ({
  setIsModalVisible,
  setNavigateFrom,
}) => {
  const dispatch = useDispatch();
  const roomList = useSelector((state: RootState) => state.floor.rooms);
  //state to initial rooms
  const [rooms, setRooms] = useState<Room[]>(roomList);

  useEffect(() => {
    //retrieving rooms from local storage and setting to state
    const roomsData = localStorage.getItem("rooms");
    const roomsTep = roomsData ? JSON.parse(roomsData) : [];
    setRooms(roomsTep);
  }, [roomList]);
  return (
    <div className="RoomsComponentStyles">
      <div className="header">Rooms Managment</div>
      <div className="button-cont">
        <PrimaryButton
          onClick={() => {
            setNavigateFrom("HOME");
            setIsModalVisible(true);
          }}
          icon
          buttonText="Add Room"
        />
      </div>
      <div className="rooms-container">
        {rooms.map((room: Room, index) => {
          return (
            <div
              className="single-room"
              key={index}
              onClick={() => {
                dispatch(setSelectedRoom(room));
              }}
            >
              <div className="room-cont">
                <div className="name">{room.roomName}</div>

                <div className="circle">
                  <MeetingRoomIcon color="error" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default RoomsComponent;
