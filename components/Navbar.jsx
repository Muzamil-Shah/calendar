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
    <div className="w-full h-10 bg-white z-20 p-2 border-b fixed top-0 flex justify-between items-center space-x-2">
      <div className="flex justify-start items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
        </svg>

        <p>Calender Events</p>
      </div>
      <div className="flex justify-end items-center space-x-2">
      {providers ? (
        Object.values(providers).map((provider) => <button key={provider.name} onClick={() => signIn(provider.id)}>Sign In</button>)
      ) : (
        <button>Log In</button>
      )}
      <Image width={20} height={20} src={session?.user?.image ? session?.user?.image : 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'} alt="image" />
      </div>
    </div>
  );
};

export default Navbar;
