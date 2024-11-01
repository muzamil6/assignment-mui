import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Inbox from "../../assets/Inbox.png";
import MediaCard from "../card/Card";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { textDB, app } from "../../firebaseConfig/StoreImgText";
import containerImage from "../../assets/Container.jpg";
import { v4 } from "uuid";
import { saveImageToFirestore } from "../saveImage/saveImageToFirestore";
import moment from "moment";
import Resizer from "react-image-file-resizer";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 2,
  borderRadius: "20px",
};

const storage = getStorage(app);

const DEFAULT_IMAGE_URL = "https://example.com/default-image.jpg";

const HeroSection = ({ onOpenModal }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "300px",
          width: "100%",
          backgroundImage: `url(${containerImage})`,
          backgroundSize: "cover",
          position: "relative",
          borderRadius: "20px",
          boxShadow: "none",
          mt: 3,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: 1,
            width: "61%",
            height: "300px",
            borderRadius: "10px",
            background:
              "linear-gradient(to right, rgb(0 0 0), rgb(19 20 20 / 0%))",
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            color: "white",
            textAlign: "left",
            padding: "40px",
            paddingLeft: "60px",
          }}
        >
          <Typography
            variant="h1"
            sx={{ mb: 2, fontSize: "36px", fontWeight: 600 }}
          >
            Hi! 👋 James Doe
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              fontFamily: "Roboto Flex",
              fontWeight: 400,
              fontSize: "16px",
            }}
          >
            Your journey to success starts here.
          </Typography>
          <Button
            variant="contained"
            onClick={onOpenModal}
            sx={{
              borderRadius: 10,
              background: "#7B5AFF",
              color: "#fff",
              fontSize: "16px",
              fontFamily: "Roboto Flex",
              textTransform: "capitalize",
              padding: "8px 25px",
            }}
          >
            Add Check In
          </Button>
        </Box>
      </Box>
      <MediaCard />
    </>
  );
};

const App = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(DEFAULT_IMAGE_URL);
  const fileInputRef = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        let base64String = reader.result.split(",")[1];
        Resizer.imageFileResizer(
          file,
          640,
          480,
          "JPEG",
          80,
          0,
          async (uri) => {
            const resizedReader = new FileReader();
            resizedReader.onloadend = async () => {
              const resizedBase64String = resizedReader.result.split(",")[1];

              if (resizedBase64String.length * (3 / 4) < 1 * 1024 * 1024) {
                setImage(resizedBase64String);
              } else {
                alert("Image exceeds 1MB, please choose a smaller file.");
                return;
              }
              const imgRef = ref(storage, `images/${v4()}`);
              await uploadBytes(imgRef, uri);
              const url = await getDownloadURL(imgRef);
              console.log("Uploaded image URL:", url);
              setImage(url);
            };
            resizedReader.readAsDataURL(uri);
          },
          "file"
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const postsCollection = collection(textDB, "posts");
      const newBookingId = generateBookingId();
      await addDoc(postsCollection, {
        title,
        imgUrl: image,
        date: moment().format("Do MMM YYYY"),
        bookingId: newBookingId,
      });
      alert("Data saved successfully!");
      setTitle("");
      setImage(DEFAULT_IMAGE_URL);
      handleClose();
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data. Please try again.");
    }
  };

  const generateBookingId = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  return (
    <div>
      <HeroSection onOpenModal={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
              id="modal-modal-title"
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
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              fontSize: "16px",
              fontWeight: 500,
              fontFamily: "Roboto Flex",
            }}
          >
            Title
          </Typography>

          <TextField
            label="Enter Title"
            placeholder="Enter title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={handleTitleChange}
            sx={{ mt: 2, mb: 2 }}
          />
          <Typography
            variant="body1"
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              fontFamily: "Roboto Flex",
            }}
          >
            Upload Image
          </Typography>
          <Box
            sx={{
              border: "2px dashed #D9D9D9",
              borderRadius: "8px",
              padding: "16px",
              marginTop: 2,
              textAlign: "center",
              mt: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <IconButton
              onClick={handleFileUpload}
              sx={{ color: "#7B5AFF", display: "block", marginBottom: 1 }}
            >
              <img
                src={Inbox}
                alt="Upload"
                style={{ width: "50px", height: "50px" }}
              />
            </IconButton>
            Click or drag file to this area to upload
            <Typography
              variant="subtitle1"
              sx={{
                marginTop: 2,
                fontSize: "14px",
                cursor: "pointer",
                color: "#B4B4B4",
                mb: 3,
              }}
            >
              Support for a single or bulk upload. Strictly prohibit from <br />
              uploading company data or other banned files.
            </Typography>
          </Box>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                padding: "4px 26px",
                color: "#000",
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
              variant="contained"
              onClick={handleSubmit}
              sx={{
                padding: "4px 26px",
                background: "#7B5AFF",
                color: "#fff",
                fontFamily: "Roboto Flex",
                textTransform: "capitalize",
                fontSize: "14px",
                fontWeight: 500,
                borderRadius: "45px",
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default App;
