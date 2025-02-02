import { logOut } from "@/actions/auth";
import { auth } from "@/auth";
import React from "react";

const Page = async () => {
  const data = await auth();

  if (data && !data.user) {
    return null;
  }

  return (
    <>
      <div>{JSON.stringify(data?.user)}</div>
      <form
        action={logOut}
      >
        <button type="submit">Sign Out</button>
      </form>
    </>
  );
};

export default Page;
