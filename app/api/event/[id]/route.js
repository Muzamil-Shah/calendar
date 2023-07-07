import Event from "@/model/Events";

const { default: dbConnect } = require("@/utils/datebase");

export const GET = async (req,{params}) => {
  
  try {
    await dbConnect();
    const event = await Event.findById(params.id);
    console.log('server',JSON.stringify(event))
    if(!event) return new Response("Event not found",{status:404})
    return new Response(JSON.stringify(event), { status: 200 });
    // return res.status(200).json(events);
  } catch (error) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
};

export const PATCH = async (req,{params}) => {
    const { userId, title, description, date, time, notifyBefore } =
    await req.json();
  try {
    await dbConnect();
    const existingEvent = await Event.findById(params.id);
    console.log('server',JSON.stringify(existingEvent))
    if(!existingEvent) return new Response("Event not found",{status:404})

    existingEvent.creator = userId;
    existingEvent.title = title;
    existingEvent.description = description;
    existingEvent.date = date;
    existingEvent.time = time;
    existingEvent.notifyBefore = notifyBefore;

    await existingEvent.save();

    return new Response(JSON.stringify(existingEvent), { status: 200 });
    // return res.status(200).json(events);
  } catch (error) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
};

export const DELETE = async (req,{params}) => {
  
    try {
      await dbConnect();
      const event = await Event.findByIdAndRemove(params.id);
      console.log('server',JSON.stringify(event))
      if(!event) return new Response("Event not found",{status:404})
      return new Response('Prompt deleted successfully', { status: 200 });
      // return res.status(200).json(events);
    } catch (error) {
      console.log(error);
      return new Response(error.message, { status: 500 });
    }
  };
