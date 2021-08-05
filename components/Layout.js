import React from "react";
import { Footer } from "./Footer";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <Link href="/">
        <a className="logo-link">
          <img src="/assets/logo.svg" />
        </a>
      </Link>
      {children}
      <Footer />
    </div>
  );
}
