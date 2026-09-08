import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room"
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";

// Get all rooms => /api/rooms
export const allRooms =  catchAsyncErrors(async (req: NextRequest) => {
   const resPerPage: number = 8
   const rooms = await Room.find();

   return NextResponse.json({
     success: true,
     resPerPage,
     rooms
   })
})

// Create new room  => /api/admin/rooms
export const newRoom =  catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json()

  const room = await Room.create(body)

  return NextResponse.json({
    success: true,
    room,
  })
})

// Get room details => /api/rooms/:id
export const getRoomDetails = catchAsyncErrors(async (req:NextRequest, {params}: {params: Promise<{id: string}>}) => {
     const { id } = await params;

      console.log("ID reçu :", id);
    
   
     
       const room = await Room.findById(id);

      //throw new ErrorHandler("Hello", 404);

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

})

// Update room details => /api/admin/rooms/:id

export const updateRoom =  catchAsyncErrors(async (
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
});


// Delete room details => /api/admin/rooms/:id


export const deleteRoom =  catchAsyncErrors(async (
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
});




