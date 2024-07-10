import { Routes, Route } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import CreateWallet from "./pages/CreateWallet";
import AccessWallet from "./pages/AccessWallet";
import HomePage from "./pages/HomePage";
import WalletPage from "./pages/WalletPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomePage />} />
        <Route path="create-wallet" element={<CreateWallet />} />
        <Route path="access-wallet" element={<AccessWallet />} />
      </Route>
      <Route path="/wallet" element={<WalletPage />} />
    </Routes>
  );
}

export default App;
