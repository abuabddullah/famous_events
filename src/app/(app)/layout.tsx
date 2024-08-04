"use client";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import store from "@/rtk/app/store";
import React from "react";
import { Provider } from "react-redux";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        {children}
        <Footer />
      </Provider>
    </>
  );
};

export default layout;
