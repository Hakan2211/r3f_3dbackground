import "./OverlayTest.css";
import { motion } from "framer-motion";

export default function Overlay() {
  return (
    <div className="container">
      <motion.header
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 60, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 6,
          delay: 6,
        }}
      >
        <h3>ANDERSONMANCINI.DEV</h3>
        <motion.button
          animate={{ translateX: "0%", opacity: 1 }}
          initial={{ translateX: "-120%", opacity: 0 }}
          transition={{
            delay: 2.6,
          }}
          className="ctaButton contact"
          onClick={() => {
            window.open("https://andersonmancini.dev", "tab");
          }}
        >
          GET IN TOUCH
        </motion.button>
      </motion.header>
      <section className="overlay">
        <motion.h1
          animate={{ translateX: "0%", opacity: 1 }}
          initial={{ translateX: "-100%", opacity: 0 }}
          transition={{
            duration: 1.8,
            delay: 2.5,
          }}
        >
          Unlocking your hidden Threejs super powers
        </motion.h1>
        <motion.button
          animate={{ translateX: "0%", opacity: 1 }}
          initial={{ translateX: "-120%", opacity: 0 }}
          transition={{
            delay: 2.6,
          }}
          className="ctaButton"
          onClick={() => {
            window.open("https://andersonmancini.dev", "tab");
          }}
        >
          BROWSE MY RECENT WORK
        </motion.button>
      </section>
      <footer>Website under development. Tap anywhere to change colors</footer>
    </div>
  );
}
