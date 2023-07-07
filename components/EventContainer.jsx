import React, { useState } from "react";
import EventModel from "./EventModel";
import EventHandler from "./EventHandler";
import dayjs from "dayjs";

const EventContainer = ({ date, time ,event}) => {
  const [openModel, setOpenModel] = useState(false);
  const handleClose = () => {
    setOpenModel(false);
  };
  return (
    <>
      <div
        onClick={() => setOpenModel(true)}
        className="w-2/12 h-full border cursor-pointer"
      >
        {event && <EventHandler event={event}/>}
      </div>
      {openModel && (
        <EventModel
          date={date}
          time={time}
          isOpen={openModel}
          onClose={handleClose}
          event={event}
        />
      )}
    </>
  );
};

export default EventContainer;
