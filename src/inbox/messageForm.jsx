import React, { useEffect} from "react";
import { useTranslation } from "react-i18next";
import { sockService } from "@/_services";

const MessageForm = (props) => {
  //handleExpand();
  const { t } = useTranslation();
  const { sendMessage ,conversation} = props;
  const submit = () => {
    sendMessage(
      conversation.isSender ? conversation.recipientId : conversation.senderId,
      $("#message").val()
    );
    document.getElementById("message").value = "";
  }
  
  return (
    <div className="row">
      <div className="container p-2">
        <form>
          <div className="input-group ">
            <div style={{ width: "80%" }} className="pr-1">
              <textarea
                id="message"
                type="text"
                rows="2"
                ma
                className="form-control p-1"
              />
            </div>
            <div style={{ width: "20%" }}>
              <span className="input-group-btn">
                <button className="btn btn-lg bg-violet-medium text-white m-1" type="button" onClick={submit}>
                  <i className="fa fa-paper-plane"></i>
                  <span className="d-none d-md-inline">
                    &nbsp;{t("inbox.send-btn")}
                  </span>
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
/*
const handleExpand = () => {
  $(document).ready(() => {
    //console.log("loaded");
    $("#message").keydown((e) => {
      console.log($(e.target).parent().height() + "  :  " + e.which);
      var el = e.target;
      setTimeout(() => {
        el.style.cssText = "height:auto; padding:0";
        // for box-sizing other than "content-box" use:
        // el.style.cssText = '-moz-box-sizing:content-box';
        //console.log(el.scrollHeight);
        el.style.cssText =
          "height:" + ($(e.target).parent().height() - 5) + "px";
      }, 0);
    });
  });
};*/

export default MessageForm;
