import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";

const Header = (props ) => {
  const title = props.title

  const theme=useTheme();
  const isSmallScreen=useMediaQuery(theme.breakpoints.down("sm"));
  
  const navigate = useNavigate();
  
  /* return (
    <Paper 
      component="div" 
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        marginBottom: 1.5,
      }}
      >
       <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3">
        {title}
      </Typography>

      <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>

    </Paper>
  ); */

  return(
    <Box
     sx={{
      display:"flex",
      alignItems:"center",
      justifyContent:"space-between",
      backgroundColor: "primary.main",
      color: "white",
      padding: isSmallScreen ? "10px" : "20px",
      borderRadius: "8px",
      marginBottom: "16px",
      boxShadow: 3,
     }} 
    >
      <IconButton aria-label="go back" onClick={() => navigate(-1)} 
      sx={{color:"white"}}
      >
        <ArrowBackIcon  fontSize="large" />
      </IconButton>

      <Typography variant={isSmallScreen ? "h5" : "h4"} component="h3"
      sx={{
        textAlign: "center",
        flex: 1,}}
      > 
        {title}
      </Typography>
      
      <IconButton aria-label="go forward" onClick={() => navigate(+1)}
        sx={{color:"white"}}
      >
        <ArrowForwardIcon  fontSize="large" />
      </IconButton>

    </Box>
  );
};

export default Header;