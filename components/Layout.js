import React from "react";
import { Footer } from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <img src="/assets/logo.svg" />
      {children}
      <Footer />
    </div>
  );
}
