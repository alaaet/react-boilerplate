import React from 'react'
import InformForm from "./informForm"
import Login from "./login"
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

function FirstSection({ history,path,location}) {
    //const { path } = match;
    //console.log("FirstSection path:",path)
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        localStorage.setItem("lang", language);
      };
    return (
        <React.Fragment>
            <div className={"component pb-3 bg-light"} >
                <div className={"container text-center "} >
                    <div className="row">
                    <h1 className="ml-auto"
                        style={{
                            display: "flex",
                        }}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </h1> 
              {isMobile ? <h2
                style={{
                  display: "flex",
                }}>
                ClaviTag
                    </h2>:<h1
                style={{
                  display: "flex",
                }}>
                ClaviTag
                    </h1>}
                <div
                  className="ml-auto"
                  style={{
                      display: "flex",
                      maxWidth:"100"
                  }}
                >
                  <NavDropdown
                    title={i18n.languages[0]}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item
                      onClick={() => {
                        changeLanguage("en");
                      }}
                    >
                      <span className="flag-icon flag-icon-us"> </span> English
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => {
                        changeLanguage("es");
                      }}
                    >
                      <span className="flag-icon flag-icon-es"> </span> Español
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </div> 
            {isMobile?<h3 className="pb-2 text-dark">Encourage Goodwill</h3>:<h2 className="pb-2 text-dark">Encourage Goodwill</h2>}
            <InformForm path={path} history={history} isMobile={isMobile} />
            <div className={"card text-white bg-light card-two col-xl-8 col-md-10 shadow pt-2 "+(isMobile?"mb-1":"mb-3")}>
                        {/* <h5>ACTIVATE A TAG</h5> */}
                        <Link to={{
          pathname: `/account/login`,
          state: { alert: null },
        }}
          className=""><h5>ACTIVATE A TAG</h5></Link>
                    </div>
            <Login path={path} history={history} location={location} isMobile={isMobile}/>
                </div>  
            </div>
        </React.Fragment>
    )
}

export { FirstSection }
