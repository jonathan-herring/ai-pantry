"use client";

import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { firestore } from "../firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [pantry, setPantry] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [itemName, setItemName] = useState("");

  useEffect(() => {
    const updatePantry = async () => {
      const snapshot = query(collection(firestore, "pantry"));
      const docs = await getDocs(snapshot);
      const pantryList = [];
      docs.forEach((doc) => {
        pantryList.push(doc.id);
      });
      setPantry(pantryList);
    };
    updatePantry();
  });
  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
        Add
      </Button>
      <Box border={"1px solid #333"}>
        <Box
          width="800px"
          height="100px"
          bgcolor={"#ADD8E6"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant={"h2"} color={"#333"} textAlign={"center"}>
            Pantry Items
          </Typography>
          <Stack direction={"row"} spacing={2}>
            <TextField id="outlined-basic" label="Item" variant="outlined" />
            <Button variant="contained">Search</Button>
          </Stack>
        </Box>
        <Stack width="800px" height="150px" spacing={2} overflow={"auto"}>
          {pantry.map((i) => (
            <Box
              key={i}
              width="100%"
              minHeight="300px"
              bgcolor={"#f0f0f0"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography variant={"h3"} color={"#333"} textAlign={"center"}>
                {i.charAt(0).toUpperCase() + i.slice(1)}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
