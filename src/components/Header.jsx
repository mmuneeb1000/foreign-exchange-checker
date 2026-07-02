import SiteLogo from "../assets/images/logo.svg";

function Header() {
  return (
    <header className="w-full flex my-4 justify-center gap-6 lg:px-4">
      <img className="w-30 mx-1" src={SiteLogo} />
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
