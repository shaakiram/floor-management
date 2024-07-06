import React, { useState } from "react";
import "./AppStyles.scss";
import SideNavbar from "./components/SideNavbar/SideNavbar";
import { Provider } from "react-redux";
import store from "./store";
import AddRoomDialogComponent from "./components/DialogComponent/AddRoomDialogComponent";
import ContentComponent from "./components/ContentComponent/ContentComponent";

const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  return (
    <div className="App">
      <Provider store={store}>
        <SideNavbar />
        <ContentComponent setIsModalVisible={setIsModalVisible} />
        
        {isModalVisible && <AddRoomDialogComponent setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />}
      </Provider>
    </div>
  );
};

export default App;
