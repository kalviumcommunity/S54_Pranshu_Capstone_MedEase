import { getCookie } from "./cookie";

export function loginCheck() {
  let token = getCookie("auth-token");
  if (token) {
    return true;
  } else {
    return false;
  }
}

export function typeCheck() {
  let type = getCookie("type");
  if (type == "Patient") {
    return "Patient";
  } else if (type == "Doctor") {
    return "Doctor";
  } else if (type == "Hospital") {
    return "Hospital";
  } else {
    return "None";
  }
}