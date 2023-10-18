import { useEthersSigner } from "../../hooks/useEthersSigner";
import SIDRegister from "@web3-name-sdk/register";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "viem/window";
import { getAccount, switchNetwork } from "wagmi/actions";
import { arbitrumGoerli, bscTestnet } from "wagmi/chains";

export default function RegisterDomain() {
  const [sld, setSLD] = useState("");
  const [tld, setTld] = useState(".bnb");
  const { address } = getAccount();
  const signer = useEthersSigner();
  const [loading, setLoading] = useState(false);

  async function registerDomain() {
    try {
      setLoading(true);
      const chainId = tld === ".bnb" ? bscTestnet.id : arbitrumGoerli.id;
      //@ts-ignore
      const register = new SIDRegister({
          signer,
          chainId: chainId,
      });

      const available = await register.getAvailable(sld);
      if(!available) {
        throw new Error("Domain is not available");
      }

      // register for one year, params[label, address, duration, [setPrimaryName]]
      await register.register(sld, address, 1, {
        setPrimary: true,
      });

      toast.success("Registered Successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
        });
      }
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className=" flex flex-col gap-10 justify-center items-center">
      <div className="flex gap-3">
        <input
          className="rounded-lg p-2 text-slate-700"
          placeholder="abcd"
          value={sld}
              onChange={(e) => {
            setSLD(e.target.value);
            switchNetwork?.({
              chainId: tld === ".bnb" ? bscTestnet.id : arbitrumGoerli.id,
            });
          }}
        />
        <select
          className="rounded-lg p-2 text-slate-70 bg-slate-700"
          onChange={(e) => {
            setTld(e.target.value);
            switchNetwork?.({
              chainId:
                e.target.value === ".bnb" ? bscTestnet.id : arbitrumGoerli.id,
            });
          }}
          value={tld}
        >
          <option value=".arb">.arb</option>
          <option value=".bnb">.bnb</option>
        </select>
      </div>
      {loading ? (
        <div className="rounded-lg p-2 w-36 bg-blue-700 text-white">
          Loading...
        </div>
      ) : (
        <button
          className="rounded-lg p-2 w-36 bg-blue-700 text-white"
          onClick={registerDomain}
        >
          Register
        </button>
      )}

      <ToastContainer />
    </div>
  );
}



