export default Session = {
  clear: () => clear()
}

const clear = () =>{
  sessionStorage.clear();
}