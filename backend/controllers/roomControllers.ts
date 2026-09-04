import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room"

export const allRooms = async (req: NextRequest) => {
   const resPerPage: number = 8
   const rooms = await Room.find();

   return NextResponse.json({
     success: true,
     resPerPage,
     rooms
   })
}


export const newRoom = async (req: NextRequest) => {
  const body = await req.json()

  const room = await Room.create(body)

  return NextResponse.json({
    success: true,
    room,
  })
}

export const getRoomDetails = async (req:NextRequest, {params}: {params: Promise<{id: string}>}) => {
    const { id } = await params;

  console.log("ID reçu :", id);
   const room = await Room.findById(id);

  if(!room) {
    return NextResponse.json({
      success: false,
      message: "Room not found"
    },
    {status: 404}
   )
  }

  return NextResponse.json({
    success: true,
    room,
  })
}