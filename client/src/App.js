import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Newsletter from "./components/Newsletter";
import Portfolio from "./components/Portfolio";
import Products from "./components/Products";
import ScrollToTop from "./components/ScrollToTop";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import scrollreveal from "scrollreveal";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
export default function App() {
  useEffect(() => {
    const sr = scrollreveal({
      origin: "top",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        nav,
        #home,
        #services,
        #portfolio,
        #testimonials,
        #products,
        #newsletter,
        .footer
    `,
      {
        opacity: 0,
        interval: 200,
      }
    );
  }, []);
  const [loginState, setLoginState] = useState(false);
  const [registerState, setRegisterState] = useState(false);
  return (
    <>
      <ScrollToTop />
      <Navbar
        setRegisterState={setRegisterState}
        setLoginState={setLoginState}
      />
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
      <Products />
      <Newsletter />
      <Footer />
      <RegisterModal
        setMainLoginModalState={setLoginState}
        setLoginState={setRegisterState}
        loginState={registerState}
      />
      <LoginModal setLoginState={setLoginState} loginState={loginState} />
    </>
  );
}