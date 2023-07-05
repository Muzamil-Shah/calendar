import React, { useState } from "react";
import EventModel from "./EventModel";

const EventContainer = ({ date, time }) => {
  const [openModel, setOpenModel] = useState(false);
  const handleClose = () => {
    setOpenModel(false);
  };
  return (
    <>
      <div
        onClick={() => setOpenModel(true)}
        className="w-2/12 h-full border cursor-pointer"
      ></div>
      {openModel && (
        <EventModel
          date={date}
          time={time}
          isOpen={openModel}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default EventContainer;
