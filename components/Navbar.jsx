"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getProviders, signIn, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const providerSetter = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    providerSetter();
  }, []);

  return (
    <div className="w-full h-10 z-20 bg-white fixed top-0 flex justify-end items-center space-x-2">
      {providers ? (
        Object.values(providers).map((provider) => <button key={provider.name} onClick={() => signIn(provider.id)}>Sign In</button>)
      ) : (
        <button>Log In</button>
      )}
      <Image width={20} height={20} src={session?.user?.image} />
    </div>
  );
};

export default Navbar;
