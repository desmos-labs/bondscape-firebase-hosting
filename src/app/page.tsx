import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <>
      <body className="home">
        <div className="logo"></div>
        <div className="tagline">
          <h2>Create real bonds with engaging event experiences.</h2>
        </div>
        <footer>
          <div className="footer-links">
            <Link href="privacy">Privacy</Link>
            <Link href="terms">Terms</Link>
          </div>
        </footer>
      </body>
    </>
  );
}
