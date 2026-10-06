
import Home from "@/components/Home";

export const metadata = {
  title: "HomePage - BookIT",
};

type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

const getRooms = async (searchParams: SearchParams) => {
  const params = await searchParams;

  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string") {
      urlParams.set(key, value);
    }
  });

  const queryString = urlParams.toString();

  const res = await fetch(
    `${process.env.API_URL}/api/rooms?${queryString}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Unable to fetch rooms");
  }

  return res.json();
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const data = await getRooms(searchParams);

  console.log(data);

  return <Home data={data} />;
}

