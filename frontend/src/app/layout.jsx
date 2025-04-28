import "./globals.css";
import { Foot } from "./ui/footer";
import { NavBar } from "./ui/navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div className="body">{children}</div>
        <Foot />
        <script src="https://website-widgets.pages.dev/dist/sienna.min.js" defer></script>
      </body>
    </html>
  );
}
