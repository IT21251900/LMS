import EmailNotification from "../schemas/notification.schema.js";

async function getNotificationsByUserId(req, res) {
  try {
    const userId = req.params.id; 
    const notifications = await EmailNotification.find({ userId: userId })
                                                .select('message timestamp')
                                                .sort({ timestamp: -1 });
    console.log(notifications);
    return res.json(notifications); 
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json({ error: "Internal Server Error" }); 
  }
}

export { getNotificationsByUserId };


