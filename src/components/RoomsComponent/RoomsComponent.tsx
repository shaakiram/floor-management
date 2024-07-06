import React, { useEffect, useState } from "react";
import { Room } from "../../types/types";
import "./RoomsComponentStyles.scss";
import PrimaryButton from "../Button/PrimaryButton";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setSelectedRoom } from "../../features/roomSlice/roomSlice";
interface RoomsComponentProps {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const RoomsComponent: React.FC<RoomsComponentProps> = ({
  setIsModalVisible,
}) => {
  const dispatch = useDispatch();
  const roomList = useSelector((state: RootState) => state.rooms.rooms);
  const [rooms, setRooms] = useState<Room[]>(roomList);
  useEffect(() => {
    const roomsData = localStorage.getItem("rooms");
    const roomsTep = roomsData ? JSON.parse(roomsData) : [];
    setRooms(roomsTep);
  }, [roomList]);
  return (
    <div className="RoomsComponentStyles">
      <div className="header">Rooms Managment</div>
      <div className="button-cont">
        <PrimaryButton
          onClick={() => setIsModalVisible(true)}
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