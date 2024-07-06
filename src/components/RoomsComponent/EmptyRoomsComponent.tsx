import React from "react";
import "./RoomsComponentStyles.scss";
import PrimaryButton from "../Button/PrimaryButton";
interface EmptyRoomsComponentProps {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const EmptyRoomsComponent: React.FC<EmptyRoomsComponentProps> = ({
  setIsModalVisible,
}) => {
  return (
    <div className="EmptyRoomsComponentStyles">
      <div className="container">
        <div className="header">WELCOME !</div>
        <PrimaryButton
          onClick={() => setIsModalVisible(true)}
          icon
          buttonText="Add Room"
        />
      </div>
    </div>
  );
};

export default EmptyRoomsComponent;
