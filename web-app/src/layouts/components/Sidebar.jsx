import React, { useContext } from "react";
import bgCard from "../../assets/images/bg-card.png";
import WalletContext from "../../context/WalletContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IoWalletSharp } from "react-icons/io5";
import {
  RiMoneyDollarCircleFill,
  RiChatHistoryFill,
  RiLogoutCircleRLine,
} from "react-icons/ri";

const SideBar = () => {
  const walletCtx = useContext(WalletContext);
  const navigate = useNavigate();

  function copyAddress(add) {
    navigator.clipboard.writeText(add);
    toast.success("Copied your address to clipboard");
  }

  function Logout() {
    if (walletCtx.setWallet) {
      walletCtx.setWallet({
        publicKey: "",
        privateKey: "",
        balance: 0,
      });
    }

    navigate("/", { replace: true });
  }

  return (
    <div className="w-full h-screen bg-[#071e40] text-white">
      <div className="w-full px-4">
        <div className="flex justify-center items-center text-5xl py-6">
          <Link to={"/"}>
            <div className="flex justify-center items-center">
              <img src="/images/LogoDark.svg" className="size-14" />
              <div className="text-3xl font-semibold ml-2 select-none text-indigo-100">
                MyCoin
              </div>
            </div>
          </Link>
        </div>

        <div className="relative w-full mb-10">
          <div className="w-full">
            <img src={bgCard} className="w-full rounded-xl block" alt="" />
          </div>
          <div className="absolute h-full top-0 w-full py-5 px-4">
            <div className="flex h-full flex-col justify-between">
              <div className="font-semibold">My Wallet</div>
              <div className="text-xl 2xl:text-2xl font-bold text-center text-[#071E40]">
                {walletCtx.wallet.balance?.toLocaleString() || 0} MC
              </div>
              <div
                className="flex justify-center items-center cursor-pointer"
                onClick={() => copyAddress(walletCtx.wallet.publicKey)}
              >
                <div className="truncate text-sm">
                  {walletCtx.wallet.publicKey}
                </div>
                <div className="ml-2">
                  <svg width="1em" height="1em" viewBox="0 0 20 20">
                    <path
                      fill="currentColor"
                      d="M6.644 2.983a.252.252 0 0 0-.253.252c0 .139.113.251.253.251h3.713c.14 0 .253-.112.253-.251a.252.252 0 0 0-.253-.252H6.644Zm3.713-1.342c.734 0 1.353.49 1.544 1.16l2.175.001c.621.004 1.122.205 1.432.638c.266.372.372.85.345 1.387L15.85 17.84c.042.552-.062 1.04-.328 1.445c-.312.473-.821.71-1.452.716H3.14c-.76-.03-1.323-.209-1.675-.609c-.327-.371-.47-.88-.464-1.5V4.84c-.013-.6.154-1.106.518-1.48c.376-.384.932-.554 1.647-.559h1.935c.19-.67.809-1.16 1.543-1.16h3.713Zm0 3.187H6.644c-.546 0-1.027-.27-1.317-.684H3.17c-.383.002-.602.07-.682.152c-.091.093-.144.252-.138.531v13.07c-.003.325.052.522.13.61c.054.061.286.135.685.151h10.9c.2-.002.28-.04.326-.109c.091-.138.133-.334.11-.658l.001-13.096c.014-.293-.027-.482-.096-.578c-.026-.035-.116-.072-.336-.073h-2.397c-.29.414-.771.684-1.317.684ZM17.2 0c.994 0 1.8.801 1.8 1.79v14.082c0 .988-.806 1.79-1.8 1.79h-1.958v-1.343h1.957c.249 0 .45-.2.45-.447V1.789a.449.449 0 0 0-.45-.447H9.643c-.248 0-.45.2-.45.447v.157h-1.35v-.157C7.843.801 8.649 0 9.643 0H17.2ZM8.196 11.751c.373 0 .675.3.675.671c0 .37-.302.671-.675.671H4.145a.673.673 0 0 1-.676-.67c0-.371.303-.672.676-.672h4.051Zm4.052-2.684c.372 0 .675.3.675.671c0 .37-.303.671-.675.671H4.145a.673.673 0 0 1-.676-.67c0-.371.303-.672.676-.672h8.103Zm0-2.684c.372 0 .675.3.675.671a.673.673 0 0 1-.675.671H4.145a.673.673 0 0 1-.676-.67c0-.371.303-.672.676-.672h8.103Z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-2 space-y-[1px]">
        <SideBarButton
          path="/wallet"
          label="Wallet infomation"
          icon={<IoWalletSharp />}
        />

        <SideBarButton
          path="/make-transaction"
          label="Make a transaction"
          icon={<RiMoneyDollarCircleFill />}
        />

        <SideBarButton
          path="/transaction-history"
          label="Transaction history"
          icon={<RiChatHistoryFill />}
        />

        <div
          className="flex items-center rounded hover:bg-slate-200 hover:bg-opacity-20 py-3 px-4 cursor-pointer"
          onClick={Logout}
        >
          <div className="mr-3 w-8">
            <RiLogoutCircleRLine className="size-6" />
          </div>
          <div className="text-sm">Logout</div>
        </div>
      </div>
    </div>
  );
};

function SideBarButton({ path, label, icon }) {
  const location = useLocation();

  return (
    <Link to={path}>
      <div
        className={`flex items-center rounded hover:bg-slate-200 hover:bg-opacity-20  py-4 px-4 cursor-pointer ${
          location.pathname === path ? "bg-slate-200 bg-opacity-20" : ""
        }`}
      >
        <div className="mr-3 w-8 text-[24px]">{icon}</div>
        <div className="text text-[15px]">{label}</div>
      </div>
    </Link>
  );
}

export default SideBar;
