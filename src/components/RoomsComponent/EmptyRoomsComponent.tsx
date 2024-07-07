import React from "react";
import "./RoomsComponentStyles.scss";
import PrimaryButton from "../Button/PrimaryButton";
interface EmptyRoomsComponentProps {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setNavigateFrom: React.Dispatch<React.SetStateAction<string>>;
}
const EmptyRoomsComponent: React.FC<EmptyRoomsComponentProps> = ({
  setIsModalVisible,
  setNavigateFrom,
}) => {
  return (
    <div className="EmptyRoomsComponentStyles">
      <div className="container">
        <div className="header">WELCOME !</div>
        <PrimaryButton
          onClick={() => {
            setNavigateFrom("HOME");
            setIsModalVisible(true);
          }}
          icon
          buttonText="Add Room"
        />
      </div>
    </div>
  );
};

export default EmptyRoomsComponent;
