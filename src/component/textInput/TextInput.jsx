import React from "react";
import { Box, Typography } from "@mui/material";

const TextInput = ({ label, value, onChange, placeholder, type = "text" }) => (
  <Box sx={{ display: "flex", gap: 5, width: "330px" }}>
    <Typography
      variant="h6"
      component="h2"
      sx={{
        fontSize: "16px",
        fontWeight: 500,
        fontFamily: "Roboto Flex",
        display: "inline-block",
        width: "140px",
      }}
    >
      {label}
    </Typography>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: "40%",
        padding: "6px",
        fontFamily: "Roboto Flex",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "14px",
        display: "block",
      }}
    />
  </Box>
);

export default TextInput;
