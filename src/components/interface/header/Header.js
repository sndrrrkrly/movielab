import { AppBar, Toolbar, Typography, Box } from "@mui/material";

export const Header = () => {
     return (
          <Box sx = {{ flexGrow: 1, mt: 8 }}>
               <AppBar position = "fixed" color = "primary">
                    <Toolbar>
                         <Typography variant = "h6" noWrap component = "div" sx = {{ display: { xs: 'none', sm: 'block' }, fontWeight: 700, letterSpacing: ".3rem", color: "inherit", textDecoration: "none" }}>
                              <a href = "/" style = {{ color: "#fff" }}>
                                   movielab
                              </a>
                         </Typography>
                    </Toolbar>
               </AppBar>
          </Box>
     );
};