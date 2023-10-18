"use client";

import RegisterDomain from "@/components/registerDomain";
import { useIsMounted } from "@/hooks/useIsMounted";
import { Fragment } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected, address} = useAccount();

  const isMounted = useIsMounted();

  if(!isMounted) {
    return null;
  }

  return (
    <main className="flex flex-col py-6">
      <div className="flex flex-col h-full gap-6 justify-center items-center">
        <h1 className="text-2x1 font-bold"> Register Your Web3 Domain</h1>
        <Fragment>
          {isConnected ? (
            <div className="flex flex-,col gap-6 justify-center items-center">
              <p className="text-lg"> Your address is: {address}</p>
              <RegisterDomain />
            </div>
          ) : (
            <div className="flex flex-col gap-6 justify-center items-center">
              <p className="text-lg">Please connect your wallet to continue</p>
            </div>
          )}
        </Fragment>
      </div>
    </main>
  );
}