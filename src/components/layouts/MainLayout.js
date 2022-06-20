import { Container } from "@mui/material";
import { Header } from "../interface/header/Header";

export const MainLayout = props => {
     const { children } = props;

     return (
          <Container sx = {{ padding: 4, color: "#000" }}>
               <Header />
               { children }
          </Container>
     );
};