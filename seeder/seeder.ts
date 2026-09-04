import Room from "../backend/models/room";
import mongoose from "mongoose"
import { rooms } from "./data";

const seedRooms = async () => {
    try {
       await mongoose.connect("mongodb+srv://kevinkalenga10_db_user:xLjPMF1n0ZDCZJXO@hotel.bzmnpie.mongodb.net/nextjs-hotel?appName=hotel")

       await Room.deleteMany()
       console.log("Rooms are deleted")

       await Room.insertMany(rooms)
       console.log("Rooms are inserted")

        process.exit()
    } catch(error) {
       console.log(error);
       process.exit()
    }

    //npm run seeder
}

seedRooms();