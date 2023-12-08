"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export const AppHeader = () => {
  const { data: session, status } = useSession();

  return (
    <header className="flex flex-row items-center gap-2 justify-between p-2 border-b">
      <h1>ShopAutomate</h1>
      <div className="flex items-center gap-2">
        {session && (
          <>
            <p>{session.user?.name}</p>
            <button onClick={() => signOut()} className="border p-2">
              Sign out
            </button>
          </>
        )}
        {!session && status !== "loading" && (
          <>
            <p>Not signed in</p>
            <button onClick={() => signIn()} className="border p-2">
              Sign in
            </button>
          </>
        )}
      </div>
    </header>
  );
};
