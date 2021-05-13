import {TOKEN} from "../utils/localstorage/localStorage";

const getToken = () => {
  let token = localStorage.getItem(TOKEN)
  token = token?token.replace(/['"]+/g, ''):'';
  console.log('TOKEN',token)
  return token
};

export { getToken };
