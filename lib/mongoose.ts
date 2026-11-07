import * as mongoose from "mongoose";

mongoose.set("strictQuery", true);

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var __devflowMongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.__devflowMongoose ?? {
  conn: null,
  promise: null,
};
global.__devflowMongoose = cached;

export const connectToDatabase = async () => {
  const url = process.env.MONGO_DB_URL;
  if (!url) {
    throw new Error("MISSING MONGO_DB_URL");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(url, {
      dbName: "devflow",
      bufferCommands: false,
      serverSelectionTimeoutMS: 8_000,
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    console.error("MongoDB connection failed", error);
    throw error;
  }
};
