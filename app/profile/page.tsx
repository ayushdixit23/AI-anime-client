import { auth, signOut } from "@/auth";
import React, { FormEvent } from "react";

const Page = async () => {
  const data = await auth();

  if (data && !data.user) {
    return null; // Or you can show a loading state or some error message
  }

  return (
    <>
      <div>{JSON.stringify(data?.user)}</div>
      <form
        action={async () => {
        "use server"
        console.log("log out")
          await signOut({ redirect: true, redirectTo: "/login" }); // Ensure you await the sign out function
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </>
  );
};

export default Page;
