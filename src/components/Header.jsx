import SiteLogo from "../assets/images/logo.svg";

function Header() {
  return (
    <header className="w-full flex my-4 justify-center gap-5 ">
      <img className="w-30 mx-1" src={SiteLogo} />
      <p className="text-[10px] text-neutral-400 uppercase text-right ">
        55 Currencies · EOD · ECB Data
      </p>
    </header>
  );
}

export default Header;
