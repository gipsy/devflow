import mongoose from "mongoose";

const url = process.env.MONGO_DB_URL;
if (!url?.startsWith("mongodb")) {
  console.log("INVALID", url ? url.slice(0, 30) : "missing");
  process.exit(1);
}

try {
  await mongoose.connect(url, {
    dbName: "devflow",
    serverSelectionTimeoutMS: 10_000,
  });
  await mongoose.connection.db.admin().ping();
  console.log("OK");
} catch (e) {
  console.log("FAIL", e.message);
  process.exit(1);
}
