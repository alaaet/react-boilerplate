import React, { useState,useEffect } from "react"
import axios from "axios";

const Quote = () => {
    const [images, setImages] = useState([]);
    const [current, setCurrent] = useState(quotes[0])
    const [active, setActive] = useState(0)
    useEffect(() => {
        let imgs = []
        Object.keys(quotes).forEach(element => {
            axios.get("https://picsum.photos/200").then((res) => {
                imgs.push(res.request.responseURL);
                //console.log(res.request.responseURL);
              });
        });
        console.log(imgs)
        setImages(imgs);
    }, []);
 


  const handleSetClick = event => {
    setCurrent(quotes[event.target.getAttribute("data-quote")])
    setActive(event.target.getAttribute("data-quote"))
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "40px auto",
        maxWidth: "700px",
      }}
      >
          <img
            className="img-fluid  img-thumbnail rounded-circle "
            src={images[active]}
            alt="image"
          />
        <p
            style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#45454d",
            }}>{current.quote}</p>
        <p
            style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#45454d",
            }}>
            {current.client}
        </p>
      <div
        style={{
          display: "flex"
        }}
      >
        {Object.keys(quotes).map(index => (
            <span
                style={{
                    backgroundColor: index == active ? "#45454d" : "#d4d4d4",
                    height: "20px",
                    width: "20px",
                    borderRadius: "50%",
                    transition: "background-color 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin:"5px"
                }}
            onClick={event => handleSetClick(event)}
            data-quote={index}
                key={index}                
          />
        ))}
      </div>
    </div>
  )
}

const quotes = {
    0: {
      client: "Awesome Client, Acme Co",
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit sapien vulputate ante pellentesque aliquam fermentum. Interdum nunc arcu interdum at adipiscing pellentesque.",
    },
    1: {
      client: "Sweet Client, Acme Inc.",
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit sapien vulputate ante pellentesque aliquam fermentum.",
    },
    2: {
      client: "Dope Client, Acme LLC",
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit sapien vulputate ante pellentesque aliquam fermentum. Interdum nunc arcu interdum at adipiscing pellentesque.",
    },
    3: {
      client: "Cool Client, Acme LTD",
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit sapien vulputate ante pellentesque aliquam fermentum.",
    },
  }
export default Quote
