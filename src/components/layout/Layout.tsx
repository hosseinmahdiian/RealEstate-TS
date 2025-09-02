import Header from "./Header";
import Footer from "./Footer";
import { ChildrenType } from "src/types/dataType.type";

const Layout = ({ children }: ChildrenType) => {
  return (
    <div className="relative h-fit min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
