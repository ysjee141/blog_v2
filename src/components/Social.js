import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as React from "react";
import {faGithub, faInstagram} from "@fortawesome/free-brands-svg-icons";
import {faEnvelopeSquare} from "@fortawesome/free-solid-svg-icons";

const getIcon = (s) => {
  switch (s) {
    case "faGithub":
      return {icon: faGithub, color: '#171516'};
    case "faInstagram":
      return {icon: faInstagram, color: '#517fa4'};
    case "faEnvelopeSquare":
      return {icon: faEnvelopeSquare, color: '#171516'};
    default:
      return undefined;
  }
}

const Social = ({social, isText = true}) => {
  const {icon, color} = getIcon(social.icon);
  return (
    <li>
      <a href={social.url} title={social.name} target="_blank" rel="nofollow noopener noreferrer">
        <FontAwesomeIcon icon={icon} color={color}/>
        { isText && social.name.toUpperCase()}
      </a>
    </li>
  )
}

export default Social
