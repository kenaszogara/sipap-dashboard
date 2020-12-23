// get data user 
export const getUser = () => {
    if(process.browser){
        const userStr = sessionStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr)
        }else{
            return null
        } 
    }
}
 
// get data token
// export const getToken = () => {
//   return sessionStorage.getItem('token') || null;
// }
 
// hapus session user
export const removeUserSession = () => {  
  if(process.browser){
    sessionStorage.removeItem('user');
  }
}
 
// set session user
export const setUserSession = (user) => {
  if(process.browser){
    sessionStorage.setItem('user', JSON.stringify(user));
  }
}