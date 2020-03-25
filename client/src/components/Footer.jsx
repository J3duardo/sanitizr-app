import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import BehanceIcon from "../assets/behance-icon.png";

const Footer = () => {
  return (
    <Box boxShadow={1}>
      <div className="footer-wrapper">
        <div className="footer-content">
          <div className="footer-text">
            <Typography variant="body1">
              &copy;{new Date().getFullYear()} - Desarrollado por Jesús Guzmán.
            </Typography>
          </div>
          <div className="footer-icons">
            <a href="https://www.facebook.com/jesus.e.guzman.q" target="_blank" rel="noopener noreferrer">
              <FacebookIcon color="secondary" style={{marginRight: "10px", fontSize: "32px"}} />
            </a>
            <a href="https://github.com/J3duardo" target="_blank" rel="noopener noreferrer">
              <GitHubIcon color="secondary" style={{width: "27px"}} />
            </a>
            <a href="https://www.behance.net/J3duardo" target="_blank" rel="noopener noreferrer" style={{width: "32px", height: "32px", marginLeft: "10px"}}>
              <img src={BehanceIcon} style={{display: "block", width: "100%"}} alt="Behance icon"/>
            </a>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default Footer;
