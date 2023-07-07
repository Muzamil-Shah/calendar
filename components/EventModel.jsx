'use client'
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EventModel = ({ isOpen, onClose, date, time, event }) => {
  const router = useRouter()
  const paramsID = event?._id
  const [editable, setEditable] = useState(event ? true : false)
  const [formData, setFormData] = useState({
    userId: event?.userId || "",
    title: event?.title || "",
    description: event?.description || "",
    date: date,
    time: time,
    notifyBefore: event?.notifyBefore || "30",
  });

  const handleChange = (e) => {
    setFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleEdit = () => {
    setEditable((pre) => !pre)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/event/new", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      onClose()
      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!paramsID) return alert('Prompt ID not found')
    try {
      const response = await fetch(`/api/event/${paramsID}`, {
        method: "PATCH",
        body: JSON.stringify(formData),
      });
      onClose()
      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  const handleDelete = async () => {
    const hasConfirmed = confirm('Are you sure you want to delete this event?')
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/event/${paramsID.toString()}`, {
          method: "DELETE",
        });
        onClose()
        if (response.ok) {
          router.push('/')
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }

 
  

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? "visible" : "invisible"
        }`}
    >
      <div className="bg-white w-80 rounded-lg p-6 shadow-xl">
        {/* Modal content goes here */}
        <div className="w-full flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">Add Event</h2>
          {event && <div><button type="button" onClick={handleDelete} className="text-base font-bold mb-4 p-1 rounded border">Delete</button><button type="button" onClick={handleEdit} className="text-base font-bold mb-4 p-1 rounded border">Edit</button></div>}
        </div>
        <form className="w-full space-y-2" onSubmit={event ? handleUpdate : handleSubmit}>
          <div className="flex justify-start items-center space-x-3">
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
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex flex-col justify-start items-start">
              <p className="text-base font-semibold">{date}</p>
              <p className="text-gray-500 text-sm font-semibold">
                {time.from} - {time.to}
              </p>
            </div>
          </div>
          <input
            disabled={editable}
            name="title"
            placeholder="Event title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-2 border-b bg-gray-100 ${editable ? 'text-gray-500' : 'text-black'} rounded border-blue-200`}
          />
          <input
            disabled={editable}
            name="notifyBefore"
            placeholder="Event notifyBefore"
            value={formData.notifyBefore}
            onChange={handleChange}
            className={`w-full p-2 border-b bg-gray-100 ${editable ? 'text-gray-500' : 'text-black'} rounded border-blue-200`}
          />
          <textarea
            disabled={editable}
            onChange={handleChange}
            value={formData.description}
            name="description"
            placeholder="Event description"
            className={`w-full p-2 border-b bg-gray-100 ${editable ? 'text-gray-500' : 'text-black'} rounded border-blue-200`}
          />
          <div className="w-full flex justify-end items-center space-x-2">
            <button
              className="bg-gray-100 text-gray-500 px-4 py-2 rounded mt-4"
              onClick={onClose}
              type="button"
            >
              Close
            </button>
            {!event ? <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              type="submit"
            >
              Save
            </button> : !editable ? <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              type="submit"
            >
              Update
            </button> : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModel;
