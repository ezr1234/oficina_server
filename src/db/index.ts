import mongoose from "mongoose";

let testing = false;

const isTesting = () => {
  testing = true;
};

async function connectToMongoose() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw "Sem url do mongo";
  }
  return mongoose.connect(mongoUri);
}

mongoose.connection.on("disconnected", function (error) {
  console.log("Desconectado do database");
  if (error) {
    console.error(error);
  }
  if (!testing) {
    console.log("Reconectando");
    connectToMongoose();
  }
});

mongoose.connection.on("error", function (error) {
  console.log("Erro ao conectar ao database, irá reconectar");
  console.error(error);
  connectToMongoose();
});
export default {
  connect: connectToMongoose,
  disconnect: mongoose.disconnect,
  isTesting,
};
