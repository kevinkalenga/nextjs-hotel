import ErrorPage from "@/app/error";

import RoomDetails from "@/components/room/RoomDetails";

interface Props {
  params: Promise<{
    id: string;
  }>;
}


const getRoom = async (id: string) => {
 
  const res = await fetch(`${ process.env.API_URL}/api/rooms/${id}`);
  if (!res.ok) { 
     throw new Error("Unable to fetch rooms");
   }
  return res.json()
}


export default async function RoomDetailPage({params}: Props) {

   const { id } = await params;
  
   const data = await getRoom(id);

    if (data?.message) {
     throw new Error(data.message);
    }

 

  console.log(data)
  
  return (
    <RoomDetails data={data} />
  );
}


export async function generateMetadata({params}: Props) {
   const { id } = await params;
  
   const data = await getRoom(id);

   return {
     title: data?.room?.name
   }
}
