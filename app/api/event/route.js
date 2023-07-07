import Event from "@/model/Events";

const { default: dbConnect } = require("@/utils/datebase");

async function handler(req, res) {
  console.log(req.query)
  // const { startDate, endDate } = req.query;
  const startDate = '2023-07-02'
  const endDate = '2023-07-08'
  try {
    await dbConnect();
    const events = await Event.find({
      // date: { $gte: new Date(startDate), $lte: new Date(endDate) }
    });
    console.log('server',startDate,endDate,JSON.stringify(events))
    return new Response(JSON.stringify(events), { status: 200 });
    // return res.status(200).json(events);
  } catch (error) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
};

export {handler as GET}
