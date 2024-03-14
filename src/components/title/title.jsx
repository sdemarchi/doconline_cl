function Title(props){
  return(
    <div className={'mt-2 '+ props.className} style={{textAlign:'center',paddingBottom:'15px'}}>
      <h2 className="black-title">{props.children}</h2>
  
    </div>
  );
}

export default Title;