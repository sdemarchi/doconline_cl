export default Storage = {
  clear: () => clear()
}

const clear = () =>{
  sessionStorage.clear();
  localStorage.clear();
  console.log('Storage: CLEAR');
}