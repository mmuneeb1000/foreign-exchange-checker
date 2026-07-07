import SiteLogo from "../assets/images/logo.svg";

function Header() {
  return (
    <header className="w-full flex px-3 my-4 items-center justify-between  lg:px-4">
      <img
        className="w-36 mx-1"
        alt="Lime Green FX Checker Site Logo"
        src={SiteLogo}
      />
      <p
        className="text-[10px] text-neutral-200 uppercase 
      w-full text-right lg:text-sm"
      >
        55 Currencies · EOD · ECB Data
      </p>
    </header>
  );
}

export default Header;
