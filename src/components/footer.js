import React from "react";

export default function Footer(){
    return (
            <div className="Footer">
            <a href="https://github.com/Sampad-Adhikary/dsa-coach" target="blank"><img className="iconFoo" src="./resources/github.png" alt="github"/></a>
            <a href="https://www.linkedin.com/in/sampad-adhikary-b09051196/" target="blank"><img className="iconFoo" src="/resources/linkedin.png" alt="linkedIn"/></a>
            <p className="linkPara" id="footerP">Designed and developed by <a className="linkPage" href="https://sampadadhikary.cyclic.app/" target="blank">Sampad Adhikary</a> ©️ 2023</p>
            </div>
    );
}