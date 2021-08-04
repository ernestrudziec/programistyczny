export const Footer = () => {
  return (
    <footer className="footer">
      <img className="logo" src="/assets/logo.svg" />

      <div className="background">
        <img src="/assets/main-bg.jpg" />
      </div>
      <div className="container">
        <span>Made by</span>
        <img className="logo-ernest" src="/assets/logo-black-blue.svg" />
      </div>
      <div className="links">
        <a target="_blank" href="https://ernestrudziec.com/">
          Portfolio
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/ernest-rudziec-4225231a7/"
        >
          LinkedIn
        </a>
        <a target="_blank" href="https://ernestrudziec.com/">
          Instagram
        </a>
      </div>
      <img
        className="signature"
        src="/assets/author/signature.png"
        alt="Ernest Rudziec podpis odręczny"
      />
    </footer>
  );
};
