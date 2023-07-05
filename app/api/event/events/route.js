import Event from "@/model/Events";

const { default: dbConnect } = require("@/utils/datebase");

export const GET = async () => {
  try {
    await dbConnect();
    const newEvent = await Event.find({});
    return new Response(JSON.stringify(newEvent), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
};
