import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Box, Modal, IconButton, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "../../assets/Image.jpg";
import TextInput from "../textInput/TextInput";
import { collection, getDocs } from "firebase/firestore";
import { textDB } from "../../firebaseConfig/StoreImgText";
import { onSnapshot } from "firebase/firestore";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: 600 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "20px",
};

function MediaCard({ title, date, owner, image, onOpenModal }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        padding: 2,
        boxShadow: "0px 2px 8px rgba(99,99,99,0.2)",
        mt: 2,
        mb: 2,
        borderRadius: 5,
      }}
    >
      <Box sx={{ position: "relative", borderRadius: 5 }}>
        <CardMedia
          sx={{ height: 140, objectFit: "cover", borderRadius: 5 }}
          image={image}
          title={title}
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={onOpenModal}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            padding: "4px 26px",
            textTransform: "capitalize",
            fontSize: "14px",
            fontWeight: 500,
            borderRadius: "45px",
            background: "#7B5AFF",
            color: "#fff",
          }}
        >
          Checked In
        </Button>
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
          {date}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Avatar
            alt="User Avatar"
            src="../../assets/avatar.jpg"
            sx={{ width: 24, height: 24, mr: 1 }}
          />
          <Typography
            variant="body2"
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              fontFamily: "Roboto Flex",
              color: "#000",
            }}
          >
            Owner: {owner}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

const App = () => {
  const [open, setOpen] = React.useState(false);
  const [bookingId, setBookingId] = React.useState("");
  const [rooms, setRooms] = React.useState("");
  const [guests, setGuests] = React.useState("");
  const [date, setDate] = React.useState("");
  const [allData, setAllData] = React.useState([]);

  const handleOpen = (bookingId, date) => {
    setBookingId(bookingId);
    setDate(date);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const getInputWidth = (num) => {
    if (num <= 1) return "100%";
    if (num <= 4) return "75%";
    return "50%";
  };

  const getData = () => {
    const valRef = collection(textDB, "posts");
    onSnapshot(valRef, (snapshot) => {
      const updatedData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAllData(updatedData);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Grid container spacing={2} justifyContent="center">
        {allData.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <MediaCard
              title={card.title || "Untitled"}
              date={card.date || "Invalid Date"}
              owner={card.owner || "John Doer"}
              image={
                card.imgUrl && card.imgUrl.startsWith("data:image")
                  ? card.imgUrl
                  : card.imgUrl
                  ? `data:image/jpeg;base64,${card.imgUrl}`
                  : Image
              }
              onOpenModal={() => handleOpen(card.bookingId, card.date)}
            />
          </Grid>
        ))}
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#F8F8F8",
              padding: "6px 15px",
              width: "100%",
              marginLeft: "-15px",
              marginTop: "-15px",
              borderRadius: "20px 20px 0 0",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                fontFamily: "Roboto Flex",
              }}
            >
              Add Check In
            </Typography>
            <IconButton onClick={handleClose} sx={{ color: "#000" }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 3,
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                gap: 3,
                flexDirection: "column",
              }}
            >
              <TextInput
                label="Booking ID"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                placeholder="6473647364"
                sx={{ width: "100%" }}
              />
              <TextInput
                label="Rooms"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                placeholder="4"
                sx={{ width: "100%" }}
              />
              <TextInput
                label="Number of Guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                placeholder="6"
                sx={{ width: getInputWidth(guests) }}
              />
              <TextInput
                label="Booked Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Box>
            <Box
              component="img"
              src={Image}
              alt="Inbox Image"
              sx={{
                width: "40%",
                height: "40%",
                objectFit: "cover",
                borderRadius: "18px",
              }}
            />
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}
          >
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                padding: "4px 26px",
                fontFamily: "Roboto Flex",
                textTransform: "capitalize",
                fontSize: "14px",
                fontWeight: 500,
                borderRadius: "45px",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{
                padding: "4px 26px",
                fontFamily: "Roboto Flex",
                textTransform: "capitalize",
                fontSize: "14px",
                fontWeight: 500,
                borderRadius: "45px",
                background: "#7B5AFF",
                color: "#fff",
              }}
            >
              Ok
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default App;
