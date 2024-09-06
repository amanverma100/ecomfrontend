import React from "react";
import { createContext } from "react";
import { useContext } from "react";
const verifyContext= createContext(null);
const useVerifyContext=()=>useContext(verifyContext);
export default verifyContext;