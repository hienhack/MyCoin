import Banner from "../components/HomePage/Banner";
import MakeTransactionBtn from "../components/HomePage/MakeTransactionBtn";
import TransactionHistoryBtn from "../components/HomePage/TransactionHistoryBtn";

function HomePage() {
  return (
    <div className="mb-20">
      <Banner />
      <div className="w-full sm:flex space-x-4 mt-10">
        <MakeTransactionBtn />
        <TransactionHistoryBtn />
      </div>
    </div>
  );
}

export default HomePage;
