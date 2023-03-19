import Cookies from 'universal-cookie';

const Test = () => {
  const cookies = new Cookies();
  cookies.set('myCat', 'Pacman');
  const cookie = (cookies.get('myCat'))
  return (
    <div>
      {cookie}
    </div>
  )
}

export default Test