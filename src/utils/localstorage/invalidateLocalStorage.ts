import { TOKEN,LOGGED_IN,CURRENT_PROJECT,CURRENT_USER } from "./localStorage";

const clearStorage=()=>{
    localStorage.setItem(TOKEN,JSON.stringify(''));
    localStorage.setItem(LOGGED_IN,JSON.stringify(false));
    localStorage.setItem(CURRENT_PROJECT,JSON.stringify(''));
    localStorage.setItem(CURRENT_USER,JSON.stringify(undefined));
}
 
export default clearStorage;