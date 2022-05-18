import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormattedMessage } from "react-intl";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#064663",
  color: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "15rem",
};

interface IProps {
  value?: any;
}

const Popup: React.FC<IProps> = ({ value }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <FormattedMessage
          id="popup.detailedView"
          defaultMessage={"Detailed View"}
        />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-description"
            sx={{
              lineHeight: "1.5rem",
              fontWeight: "100",
            }}
          >
            <ul>
              <li>
                <FormattedMessage
                  id="popup.humidity"
                  defaultMessage={"Humidity: "}
                />
                {value.humidity}%
              </li>
              <li>
                <FormattedMessage
                  id="popup.feelsLike"
                  defaultMessage={"Feels Like: "}
                />
                {value.feelslike_c}℃
              </li>
              <li>
                <FormattedMessage
                  id="popup.uvLevel"
                  defaultMessage={"UV Level: "}
                />
                {value.uv}
              </li>
              <li>
                <FormattedMessage
                  id="popup.cloud"
                  defaultMessage={"Cloud Cover: "}
                />
                {value.cloud}
              </li>
              <li>
                <FormattedMessage
                  id="popup.windSpeed"
                  defaultMessage={"Wind Speed: "}
                />
                {value.wind_kph} km/h
              </li>
              <li>
                <FormattedMessage
                  id="popup.chanceOfRain"
                  defaultMessage={"Chance of Rain: "}
                />
                {value.chance_of_rain}%
              </li>
              <li>
                <FormattedMessage
                  id="popup.chanceOfSnow"
                  defaultMessage={"Chance of Snow: "}
                />
                {value.chance_of_snow}%
              </li>
            </ul>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Popup;
