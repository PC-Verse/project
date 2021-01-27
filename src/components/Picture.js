import React from "react";
import ReactDOM from "react-dom";


function Picture(props) {
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
  
    const handleImageUpload = e => {
      const [file] = e.target.files;
      if (file) {
        const reader = new FileReader();
        const { current } = uploadedImage;
        current.file = file;
        reader.onload = e => {
          current.src = e.target.result;
        };

        //try to set props Picture varibale to the file ???
        Object.assign(this.props.Picture, file);
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={imageUploader}
          style={{
            display: "none"
          }}
        />
        <div
          style={{
            height: "60px",
            width: "60px",
            border: "1px dashed black"
          }}
          onClick={() => imageUploader.current.click()}
        >
          <img
            ref={uploadedImage}
            style={{
              width: "60px",
              height: "60px",
              position: "absolute"
            }}
          />
        </div>{

        }
        Click to upload Image
      </div>
    );
  }

export default Picture;