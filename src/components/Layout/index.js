/** @jsxImportSource theme-ui */

// Page contains the entire viewport
const Page = (props) => (
  <div
    {...props}
    sx={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      maxWidth: "container",
      variant: "layout.root",
    }}
  />
);

// Header contains top nav menu
const Header = (props) => (
  <div
    {...props}
    sx={{
      width: "100%",
      variant: "layout.header",
      mx: "auto",
      px: 3,
    }}
  />
);

// Footer contains bottom nav menu
const Footer = (props) => (
  <div
    {...props}
    sx={{
      width: "100%",
      variant: "layout.footer",
      mx: "auto",
      px: 3,
    }}
  />
);

// Main contains all content delivered by react-router-dom <Outlet>
const Main = (props) => (
  <div
    {...props}
    sx={{
      width: "100%",
      flex: "1 1 auto",
      variant: "layout.main", 
      display: "flex",
      flexDirection: 'column',
      py: 3,
    }}
  />
);

// Re-usable centered, max-width container
const Container = (props) => (
  <div
    {...props}
    sx={{
      maxWidth: "container",
      mx: "auto",
      px: 3,
    }}
  />
);

export { Container, Header, Footer, Main, Page };