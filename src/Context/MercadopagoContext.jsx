import React, { createContext, useContext } from 'react';
import axios from 'axios';

const MercadoPagoContext = createContext();

export function useMercadoPago() {
  return useContext(MercadoPagoContext);
}

export const MercadoPagoProvider = ({ children }) => {
  const createPreference = async (items, payer) => {
    try {
      const { data } = await axios.post('https://proyecto-5-service.vercel.app/mercadopago', {
        items: items.map(item => ({
          title: item.name,
          quantity: item.quantity,
          currency_id: "CLP",
          unit_price: item.price
        })),
        payer: {
          email: payer.email
        }
      });
      return data.checkoutId;
    } catch (error) {
      console.error('Error creating payment preference:', error);
    }
  };

  const value = {
    createPreference
  };

  return (
    <MercadoPagoContext.Provider value={value}>
      {children}
    </MercadoPagoContext.Provider>
  );
};