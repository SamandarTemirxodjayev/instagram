import Cookies from 'universal-cookie';
const cookies = new Cookies();

export function logOut(){
  cookies.remove('accessToken');
  localStorage.removeItem('accessToken')
  localStorage.removeItem("id");
  localStorage.removeItem("username");
}

