import React from "react";
import { Modal, Backdrop, Fade, Paper, Button } from "@mui/material";
import "./style.css";

interface Props {
  message: string;
  modalHeader: string;
  modalMessage: string;
  id: string;
  func: Function;
}

const TransitionsModal: React.FC<Props> = ({
  message,
  modalHeader,
  modalMessage,
  func,
  id,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Paper onClick={handleOpen} className="modal_container">
        {message}
      </Paper>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <div className="modal_paper">
            <h2 id="transition-modal-title">{modalHeader}</h2>
            <p id="transition-modal-description">{modalMessage}</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                size="small"
                onClick={handleClose}
                variant="outlined"
                color="primary"
                style={{ padding: 0 }}
              >
                Close
              </Button>
              <Button
                size="small"
                onClick={() => {
                  handleClose();
                  func(id);
                }}
                variant="outlined"
                color="secondary"
                style={{ padding: 0 }}
              >
                {message}
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransitionsModal;
