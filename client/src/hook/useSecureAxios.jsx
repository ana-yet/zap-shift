import axios from "axios";
import React from "react";

const secureAxios = axios.create({
  baseURL: import.meta.env.VITE_serverApi,

  headers: { "X-Custom-Header": "foobar" },
});

const useSecureAxios = () => {
  return secureAxios;
};

export default useSecureAxios;
