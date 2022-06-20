import { Board, Data } from "../models";

import { DataI } from "models/DataModel";
import mqtt from "mqtt";

const client = mqtt.connect(process.env.MQTT_URI);
client.on("connect", function () {
  console.log("Conectado");
});

client.subscribe("EspNow/tstRq/#");

client.on("message", async function (topic, message) {
  // message is Buffer
  const converted = parseInt(message.toString());
  const serial = topic.split("/")[2];
  if (converted !== NaN) {
    console.log(converted);
    const board = await Board.findOne({ serial });
    if (board) {
      let dataType: DataI["dataType"];
      switch (converted) {
        case 0:
          dataType = "CALL";
          break;
        case 1:
          dataType = "CHECK";
          break;
        case 2:
          dataType = "CANCEL";
          break;
        default:
          dataType = "CALL";
          break;
      }
      console.log(dataType, "type");
      await Data.create({ data: converted, board, dataType });
    }
  }
  console.log(message.toString(), topic, serial);
});

export default client;
