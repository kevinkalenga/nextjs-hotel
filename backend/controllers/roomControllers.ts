import { NextRequest, NextResponse } from "next/server";
import Room, { IRoom } from "../models/room"
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import APIFilters from "../utils/apiFilters";

// Get all rooms => /api/rooms
export const allRooms =  catchAsyncErrors(async (req: NextRequest) => {
   const resPerPage: number = 8
  
   //get the value for the url
   const {searchParams} = new URL(req.url)

   //console.log(searchParams)


  //  query string
   const queryStr: any = {}

   searchParams.forEach((value, key) => {
      queryStr[key] = value
   })

  //console.log(queryStr)
  
  

   const apiFilters = new APIFilters(Room, queryStr).search().filter()

   let rooms: IRoom[] = await apiFilters.query
    // room count we will need in the frontend
    const filteredRoomsCount: number = rooms.length
    // the pagination
    apiFilters.pagination(resPerPage)

    rooms = await apiFilters.query.clone()

   return NextResponse.json({
     success: true,
     filteredRoomsCount,
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
        throw new ErrorHandler('Room not found', 404)
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
     throw new ErrorHandler('Room not found', 404)
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
    throw new ErrorHandler('Room not found', 404)
  }

  // Todo - Delete images associated with the room

  await Room.findByIdAndDelete(id);

  return NextResponse.json({
    success: true,
    message: "Room deleted successfully",
  });
});




