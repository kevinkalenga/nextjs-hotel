import Home from "@/components/Home";

export const metadata = {
   title: "HomePage - BookIT"
}


const getRooms = async () => {
 
  const res = await fetch(`${ process.env.API_URL}/api/rooms`);
  if (!res.ok) { 
     throw new Error("Unable to fetch rooms");
   }
  return res.json()
}


export default async function HomePage() {
  
  const data = await getRooms();

 

  console.log(data)
  
  return (
    <Home data={data} />
  );
}
