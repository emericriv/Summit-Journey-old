// import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer text-center text-lg-start sticky-bottom">
      <div className="footer-div container-fluid">
        <div className="container p-2">
          <p className="m-0">
            &copy; 2024 Summit Journey. Tous droits réservés.
          </p>
          <p className="m-0">
            Arrière plan de{" "}
            <a
              href="https://unsplash.com/fr/@mtlwebdesign?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
              className="text-decoration-underline"
            >
              Jonathan Ouimet
            </a>{" "}
            sur{" "}
            <a
              href="https://unsplash.com/fr/photos/homme-escalade-qcXff4UhZ-4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
              className="text-decoration-underline"
            >
              Unsplash
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
