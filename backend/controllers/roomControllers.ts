import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room"
import ErrorHandler from "../utils/errorHandler";

// Get all rooms => /api/rooms
export const allRooms = async (req: NextRequest) => {
   const resPerPage: number = 8
   const rooms = await Room.find();

   return NextResponse.json({
     success: true,
     resPerPage,
     rooms
   })
}

// Create new room  => /api/admin/rooms
export const newRoom = async (req: NextRequest) => {
  const body = await req.json()

  const room = await Room.create(body)

  return NextResponse.json({
    success: true,
    room,
  })
}

// Get room details => /api/rooms/:id
export const getRoomDetails = async (req:NextRequest, {params}: {params: Promise<{id: string}>}) => {
     const { id } = await params;

      console.log("ID reçu :", id);
    
   try {
     
       const room = await Room.findById(id);

       throw new ErrorHandler("Hello", 400);

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
   } catch(error: any) {
    
      return NextResponse.json(
        {
          message: error.message
        },
        {status: error.statusCode}
      )
   }
}

// Update room details => /api/admin/rooms/:id

export const updateRoom = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  const body = await req.json();

  let room = await Room.findById(id);

  if (!room) {
    return NextResponse.json(
      {
        success: false,
        message: "Room not found",
      },
      { status: 404 }
    );
  }

  room = await Room.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  return NextResponse.json({
    success: true,
    room,
  });
};


// Delete room details => /api/admin/rooms/:id


export const deleteRoom = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  const room = await Room.findById(id);

  if (!room) {
    return NextResponse.json(
      {
        success: false,
        message: "Room not found",
      },
      { status: 404 }
    );
  }

  // Todo - Delete images associated with the room

  await Room.findByIdAndDelete(id);

  return NextResponse.json({
    success: true,
    message: "Room deleted successfully",
  });
};




