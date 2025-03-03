import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";

const CheckOutPage = () => {
  async function btnCheckOut() {
    const stripe = await loadStripe(
      "pk_test_51QaMdlJdWkGnHfsvW7bzrDCnFR0S5pqx1cliIZmcVIzF1uhQFj9TQCDkh5SDARTXFVhT5KMTg60ou7GbQ3z7rszu00Q4GKPKHR"
    );

    if (!stripe) {
      console.error("Stripe failed to initialize.");
      return;
    }

    fetch("https://localhost:7191/checkout/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName: document.getElementById("productName").value,
        productDescription: document.getElementById("productDescription").value,
        amount: document.getElementById("amount").value,
        currency: document.getElementById("currency").value,
      }),
    })
      .then((response) => response.json())
      .then((session) => {
        if (!session.sessionId) {
          throw new Error("Session ID is missing.");
        }
        return stripe.redirectToCheckout({ sessionId: session.sessionId }); // ✅ Works now
      })
      .then((result) => {
        if (result.error) {
          alert(result.error.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <>
      <form id="payment-form">
        <div className="form-group pt-2">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            name="productName"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="form-group pt-2">
          <label htmlFor="productDescription">Product Description</label>
          <input
            type="text"
            className="form-control"
            id="productDescription"
            name="productDescription"
            placeholder="Enter product description"
            required
          />
        </div>
        <div className="form-group pt-2">
          <label htmlFor="amount">Amount (in cents)</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="Enter amount"
            required
          />
        </div>
        <div className="form-group pt-2">
          <label htmlFor="currency">Currency</label>
          <select
            className="form-control"
            id="currency"
            name="currency"
            required>
            <option value="inr">INR</option>
          </select>
        </div>
        <button
          type="button"
          className="btn btn-primary mt-2"
          id="checkout-button"
          onClick={() => {
            btnCheckOut();
          }}>
          Checkout
        </button>
      </form>
    </>
  );
};
export default CheckOutPage;
