import { addNotifications, deleteNotifications, getAllNotifications, updateNotificationsServices } from "../Servicess/notifications.services.js"

export const addNotificationsCOntroller = async (req, res) => {
    try {
        const { notificationsData } = req.body
        const response = await addNotifications(notificationsData);
        return res.status(200).json({ status: 200, sucess: true, message: "sucess", data: response })
    } catch (error) {
        console.log("ERROR", error.message)
        return res.status(500).json({ status: 500, sucess: false, message: "internal server error", error: error.message })
    }
}

export const getNotificationsController = async (req, res) => {
    try {
        const response = await getAllNotifications();
        return res.status(200).json({ status: 200, sucess: true, message: "sucess", data: response })
    } catch (error) {
        console.log("ERROR", error.message)
        return res.status(500).json({ status: 500, sucess: false, message: "internal server error", error: error.message })
    }
}

export const updateNotificationsController = async (req, res) => {
    try {
        const {userId, agent_notification, manager_notification } = req.body;
        const response = await updateNotificationsServices(userId, agent_notification, manager_notification);
        return res.status(200).json({ statsu: 200, message: "sucessfully", data: response })
    } catch (error) {
        return res.status(500).json({ statsu: 500, message: "server error", error: error.message })
    }
}
export const deleteNotificationsByIdController = async (req, res) => {
    try {
        const {id} = req.body;
        const response = await deleteNotifications(id);
        return res.status(200).json({ statsu: 200, message: "sucessfully", data: response })
    } catch (error) {
        return res.status(500).json({ statsu: 500, message: "server error", error: error.message })
    }
}