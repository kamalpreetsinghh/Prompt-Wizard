import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "prompt_wizard",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      isConnected = true;
    });

    connection.on("error", (error) => {
      console.log("Error conecting to MongoDB" + error);
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
};
