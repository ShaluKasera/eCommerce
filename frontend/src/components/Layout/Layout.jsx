import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Layout = ({ children, description, title, keywords, author }) => {
  return (
    <div>
      <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={description || "mern stack project"}
        />
        <meta
          name="keywords"
          content={keywords || "reactjs,nodejs,mongoDB,express"}
        />
        <meta name="author" content={author || "Shalu Kasera"} />
        <title>{title || "Sasha"}</title>
      </Helmet>
      </HelmetProvider>
      <Header />
      <main className="min-h-[90vh]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
