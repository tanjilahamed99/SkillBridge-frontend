import Image from "next/image";
import logo from "@/public/png-logo.png";
const Logo = () => {
  return <Image alt="image not found" src={logo} height={500} width={500} />;
};

export default Logo;
