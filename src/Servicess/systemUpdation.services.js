import db from '../modules/index.js';

const { auth: Auth } = db;

export const systemUpdationServices = async (updateMessage) => {
    try {
      const response = await Auth.updateMany(
        {}, // This matches ALL users
        {
          $set: {
            hasNewUpdate: true,
            updateMessage: updateMessage || "New features have been deployed!",
            updateDate: new Date(),
            isActive: true
          }
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
  


export const systemUpdatedServices = async (_id) => {
    try {
      const response = await Auth.findByIdAndUpdate(
        _id,
        {
          $set: {
            hasNewUpdate: false,
            isActive: true,
          },
        },
        { new: true } // ✅ Return the updated document
      );
      return response;
    } catch (error) {
      console.error("Error updating system status:", error);
      throw error;
    }
  };