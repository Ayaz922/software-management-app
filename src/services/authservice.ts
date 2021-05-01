const isLoggedIn = () => {
  //add a method to verify token tooo
  // Can we add a api call that checks if token is valid then decides according if user is logged in
  return true;
};

const setLoggedIn = (loggedin:boolean) => {
  sessionStorage.setItem("loggedIn", loggedin.toString());
};

const storeToken = (token:string) => {
  // console.log('Storing token: '+token)
  sessionStorage.setItem("authToken", token);
};

const getToken = () => {
  //DEV
  //TESTER
  //PM
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTXIuIFBST0pFQ1RfTUFOQUdFUiIsInVzZXJuYW1lIjoicG1AYWlyYnVzLmNvbSIsImVtYWlsIjoicG1AYWlyYnVzLmNvbSIsInVzZXJUeXBlIjoiUFJPSkVDVF9NQU5BR0VSIiwiYXNzaWduZWRQcm9qZWN0cyI6W10sImlhdCI6MTYxOTQzMDMyN30.L5NgwWI3L-bSl76nnYbFw22Ir7gE6J5bC3Wu4Gj1W68"
  //ADMIN
  //return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTXIuIEFkbWluaXN0cmF0b3IiLCJ1c2VybmFtZSI6ImF5YXpAYWlyYnVzLmNvbSIsImVtYWlsIjoiYXlhekBhaXJidXMuY29tIiwidXNlclR5cGUiOiJBRE1JTiIsImFzc2lnbmVkUHJvamVjdHMiOltdLCJpYXQiOjE2MTkxMDE4NTV9.O4X4GaOBzZ4kfYu6ksJSUuZkwyPOXHQ1davdFC4ScOs";
  //    return sessionStorage.getItem('authToken')
};

export { isLoggedIn, storeToken, getToken, setLoggedIn };
