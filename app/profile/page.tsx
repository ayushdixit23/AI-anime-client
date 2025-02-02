import { logOut } from "@/actions/auth";
import { auth } from "@/auth";
import Image from "next/image";
import React from "react";

const Page = async () => {
  const data = await auth();

  if (data && !data.user) {
    return null
  }

  console.log("runnded")

  return (
    <>
      <div>{JSON.stringify(data?.user)}</div>
      <div className="w-[400px] h-[400px]">
        <Image src={data?.user?.image || ""} width={400} height={200} alt={data?.user?.name || ""} className="w-full h-full object-cover" />
      </div>

      <form
        action={logOut}
      >
        <button type="submit">Sign Out</button>
      </form>
    </>
  );
};

export default Page;
