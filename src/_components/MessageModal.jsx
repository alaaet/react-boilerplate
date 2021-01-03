import React, { useState,useEffect,useCallback} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import Cropper from 'react-easy-crop';
import {getCroppedImg,getResizedImg} from '@/_helpers';


const MessageModal = ({handleAction,disabled, image}) => {
  const [show, setShow] = useState(false);
    const { t } = useTranslation();
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [initialImage, setInitialImage] = useState(null);
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  //const image ='https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const reader = new FileReader();
  reader.addEventListener('load',async () => setInitialImage(await getResizedImg(reader.result)));

  useEffect(() => {
    
    if (show && image)
    {
      console.log("Modal loaded")
      reader.readAsDataURL(image);
    }
  }, [show])

  const handleClose = async(doAction) => {
      setShow(false);
      const croppedImage = await getCroppedImg(
        initialImage,
        croppedAreaPixels,
        rotation
      )
    if (doAction) handleAction(croppedImage);
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <Button
              variant="success"
              style={{ width: "100%" }}
              disabled={disabled}
        onClick={handleShow}
      >
        <i className="fa fa-crop" aria-hidden="true"></i>
        <span className="d-none d-md-inline">&nbsp;Crop &amp; Upload</span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body >
                  
            

        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose(false);
            }}
          >
            {t("modal.close")}
          </Button>
          <Button
            variant={ "primary"}
            onClick={() => {
              handleClose(true);
                      }}
                  >
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { MessageModal };
