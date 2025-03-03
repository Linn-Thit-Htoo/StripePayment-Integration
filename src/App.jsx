import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckOutPage from "./Pages/CheckOutPage";
import PaymentSuccessPage from "./Pages/PaymentSuccessPage";
import CancelPaymentPage from "./Pages/CancelPaymentPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CheckOutPage />} />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/payment/fail" element={<CancelPaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
