import mongoose from "mongoose";

interface connection {
  isConnnect: number;
}

const connection = {
  isConnected: 0,
};

export async function connect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
}

export default connect;
