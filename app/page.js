"use client";
import EventContainer from "@/components/EventContainer";
import EventHandler from "@/components/EventHandler";
import { getYearDates } from "@/utils";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const timeslot = {
  "12:00 am": {
    from: "12:00 am",
    to: "01:00 am",
  },
  "01:00 am": {
    from: "01:00 am",
    to: "02:00 am",
  },
  "02:00 am": {
    from: "02:00 am",
    to: "03:00 am",
  },
  "03:00 am": {
    from: "03:00 am",
    to: "04:00 am",
  },
  "04:00 am": {
    from: "04:00 am",
    to: "05:00 am",
  },
  "05:00 am": {
    from: "05:00 am",
    to: "06:00 am",
  },
  "06:00 am": {
    from: "06:00 am",
    to: "07:00 am",
  },
  "07:00 am": {
    from: "07:00 am",
    to: "08:00 am",
  },
  "08:00 am": {
    from: "08:00 am",
    to: "09:00 am",
  },
  "09:00 am": {
    from: "09:00 am",
    to: "10:00 am",
  },
  "10:00 am": {
    from: "10:00 am",
    to: "11:00 am",
  },
  "11:00 am": {
    from: "11:00 am",
    to: "12:00 pm",
  },
  "12:00 pm": {
    from: "12:00 pm",
    to: "01:00 pm",
  },
  "01:00 pm": {
    from: "01:00 pm",
    to: "02:00 pm",
  },
  "02:00 pm": {
    from: "02:00 pm",
    to: "03:00 pm",
  },
  "03:00 pm": {
    from: "03:00 pm",
    to: "04:00 pm",
  },
  "04:00 pm": {
    from: "04:00 pm",
    to: "05:00 pm",
  },
  "05:00 pm": {
    from: "05:00 pm",
    to: "06:00 pm",
  },
  "06:00 pm": {
    from: "06:00 pm",
    to: "07:00 pm",
  },
  "07:00 pm": {
    from: "07:00 pm",
    to: "08:00 pm",
  },
  "08:00 pm": {
    from: "08:00 pm",
    to: "09:00 pm",
  },
  "09:00 pm": {
    from: "09:00 pm",
    to: "10:00 pm",
  },
  "10:00 pm": {
    from: "10:00 pm",
    to: "11:00 pm",
  },
  "11:00 pm": {
    from: "11:00 pm",
    to: "12:00 am",
  },
  // "12:00 pm": {
  //   from: "12:00 pm",
  //   to: "1:00 pm",
  // },
};

export default function Home() {
  const currentDate = dayjs();
  const yearDates = getYearDates(2023);
  const [events, setEvents] = useState([])
  const [selectedMonth,setSelectedMonth] = useState(dayjs().month()+1)
  const [startAndEnd, setStartAndEnd] = useState({
    start: yearDates.indexOf(
      dayjs(currentDate).startOf("week").format('YYYY-MM-DD')
    ),
    end:
      yearDates.indexOf(dayjs(currentDate).endOf("week").format('YYYY-MM-DD')) +
      1,
  });
  const [weekDays, setWeekDays] = useState(
    yearDates.slice(startAndEnd.start, startAndEnd.end)
  );
  const months = Array.from({ length: 12 }, (_, index) => ({
    name: dayjs().month(index).format("MMMM"),
    index: index + 1, // Adding 1 to match the actual month numbers (1-12)
  }));

  const handlePre = () => {
    setStartAndEnd((pre) => ({ start: pre.start - 7, end: pre.end - 7 }));
  };
  const handleNext = () => {
    setStartAndEnd((pre) => ({ start: pre.start + 7, end: pre.end + 7 }));
  };

  const findCurrentMonth = (value) => {
    console.log('selectedMonth',value)
    setStartAndEnd({
      start: yearDates.indexOf(
        dayjs(`2023-${value}-01`).startOf("week").format('YYYY-MM-DD')
      ),
      end:
        yearDates.indexOf(dayjs(`2023-${value}-01`).endOf("week").format('YYYY-MM-DD')) +
        1,
    })
  };

  useEffect(() => {
    setWeekDays(yearDates.slice(startAndEnd.start, startAndEnd.end));
  }, [startAndEnd]);

  useEffect(() => {
    setSelectedMonth(dayjs(weekDays[0]).month()+1)
    const fetchData = async () => {
      try {
        const startDate = encodeURIComponent(weekDays[0]);
        const endDate = encodeURIComponent(weekDays[6]);
        const response = await fetch(`/api/event?startDate=${startDate}&endDate=${endDate}`);
        const data = await response.json();
        console.log("data: ", data);
        setEvents(data)
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData()
  }, [weekDays])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="w-full h-32 fixed z-20 top-10 flex flex-col justify-end items-start z-10 bg-white top-0">
        <div className="w-full h-10 flex justify-start items-start space-x-2">
          <div className="p-2">
            <select className="p-1" onChange={(e) => findCurrentMonth(e.target.value)}>
              {months.map((month, i) => (
                <option key={i} value={month.index} selected={month.index === selectedMonth} >
                  {month.name}
                </option>
              ))}
            </select>
          </div>
          <div className="p-2 flex justify-center items-center space-x-2">
            <button onClick={handlePre}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button onClick={handleNext}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="w-full h-20 flex justify-between items-center">
          <div className="w-2/12 h-full flex flex-col justify-center items-center"></div>
          {weekDays?.map((date, i) => (
            <div
              key={i}
              className="w-2/12 h-full flex flex-col justify-center items-center"
            >
              <span className="text-base text-gray-500 ">
                {dayjs(date).format("ddd")}
              </span>
              <span
                className={`w-10 h-10 flex justify-center items-center rounded-full ${date === currentDate.format('YYYY-MM-DD') && "bg-blue-500 text-white"
                  } text-gray-500 font-semibold text-lg`}
              >
                {dayjs(date).format("DD")}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full mt-44 flex flex-col justify-start items-start">
        {Object.keys(timeslot).map((time, i) => (
          <div
            key={i}
            className="w-full h-16 flex justify-between items-center"
          >
            <div className="relative w-2/12 h-full border">
              <div className="w-10/12 absolute z-10 p-2 flex justify-center items-center -bottom-5 bg-white ">{time}</div></div>
            {weekDays.map((date, i) => (
              <EventContainer key={i} date={date} time={timeslot[time]} event={events.find(event => event.time.from === timeslot[time].from && dayjs(event.date).add(1,'day').format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD')) && events.find(event => event.time.from === timeslot[time].from && dayjs(event.date).add(1,'day').format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD'))} />
            ))}
          </div>
        ))}
      </div>
      <ToastContainer />
    </main>
  );
}
