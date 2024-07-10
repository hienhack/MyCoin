function Banner() {
  return (
    <div className="w-full sm:flex items-center mt-10">
      <div className="sm:w-1/2">
        <div className="text-4xl font-bold mb-10 text-slate-700">
          MyCoin's Original Wallet
        </div>
        <div className="text-justify mr-4 text-slate-700">
          MyCoin (our friends call us MC) is a free, client-side interface
          helping you interact with blockchain. Our easy-to-use, open-source
          platform allows you to generate wallets and access your personal
          wallet.
        </div>
      </div>
      <div className="sm:w-1/2 my-6 sm:my-0">
        <img src="/images/banner.png" />
      </div>
    </div>
  );
}

export default Banner;
