import axios from "axios";
import jwtDecode from "jwt-decode";

export const createOrGetGoogleUser = async (response: any) => {
  const decoded = jwtDecode(response.credential);

  console.log(decoded);
};
