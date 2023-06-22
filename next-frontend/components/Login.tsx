"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

function Login() {
  return (
    <div className="bg-slate-800 h-screen flex flex-col items-center justify-center text-center">
      <button
        className="text-white font-bold text-3xl animate-pulse"
        onClick={() => signIn("google")}
      >
        Sign in to use Inventory Manager
      </button>
    </div>
  );
}

export default Login;
