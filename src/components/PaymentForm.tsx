'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutForm = ({ amount, onSuccess }: { amount: number; onSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (result.error) {
      setError(result.error.message || 'An error occurred');
    } else {
      onSuccess();
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <CardElement className="border p-3 rounded mb-4" />
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
      >
        {processing ? 'Processing...' : `Pay $${amount}`}
      </button>
    </form>
  );
};

const PaymentForm = ({ amount, onSuccess }: { amount: number; onSuccess: () => void }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm amount={amount} onSuccess={onSuccess} />
  </Elements>
);

export default PaymentForm;