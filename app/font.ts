import { Poppins, Pacifico } from "next/font/google";

export const poppins = Poppins({ weight: "300", subsets: ["latin"] });

export const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  display: "swap",
});
