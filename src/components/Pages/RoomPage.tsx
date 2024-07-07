import React, { useState } from "react";
//components
import SideNavbar from "../SideNavbar/SideNavbar";
import AddRoomDialogComponent from "../DialogComponent/AddRoomDialogComponent";
import ContentComponent from "../ContentComponent/ContentComponent";
//scss
import "../../AppStyles.scss";

const RoomPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [navigateFrom, setNavigateFrom] = useState<string>("HOME");
  return (
    <div className="App">
        <SideNavbar />
        <ContentComponent
          setIsModalVisible={setIsModalVisible}
          setNavigateFrom={setNavigateFrom}
        />

        {isModalVisible && (
          <AddRoomDialogComponent
            setIsModalVisible={setIsModalVisible}
            isModalVisible={isModalVisible}
            navigateFrom={navigateFrom}
          />
        )}
    </div>
  );
};

export default RoomPage;
