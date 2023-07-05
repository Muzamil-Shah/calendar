import Event from "@/model/Events";
import dbConnect from "@/utils/datebase";

export const POST = async (req) => {
  const { userId, title, description, date, time, notifyBefore } =
    await req.json();

  try {
    await dbConnect();
    const newEvent = await Event.create({
      creator: userId,
      title,
      description,
      date,
      time,
      notifyBefore: Number(notifyBefore),
    });
    return new Response(JSON.stringify(newEvent), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
};
