import Footer from "@/components/footer";
import NavBar from "@/components/navbar";

export default function LobbyLayout({ children }) {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
