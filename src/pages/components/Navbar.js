
import {Link, AppBar, Button, Container, Fab, Toolbar, Typography } from '@mui/material'
import { CloseOutlined, MenuOutlined ,ShoppingCartRounded} from '@material-ui/icons'
import React, {   useState } from 'react'
import { useSelector } from 'react-redux'


const Navbar = () => {
const {cart}= useSelector(state=>state.add)
  const [getclass, setGetclass] = useState('none')






return (
    <>
    <AppBar position='fixed'>
<Container>
    <Toolbar style={{display:'flex' ,justifyContent:'space-between',textAlign:'center'}}>
        <div className='navmain' style={{display:'flex',flexDirection:"row" ,gap:'20px',alignItems:'center'}}>
  {getclass === 'none' ?  <MenuOutlined style={{color:'white', cursor:'pointer'}} onClick={()=>setGetclass('flex')}/> :  <CloseOutlined style={{color:'white'}} onClick={()=>setGetclass('none')}/> } 
<Link style={{textDecoration:'none', color:'white' ,  }} className='navbar' href='/'><h1 className='navhead'  variant='h6'>Navbar</h1></Link>
</div>
<div style={{display:'flex', alignItems:'center'}} >
<Button style={{color:'white' }} >Login</Button>
<Button style={{color:'white',background:'navy'  }} variant='outlined' >Register</Button>
<Link href='/cart' style={{color:'white'}}><ShoppingCartRounded  style={{background:'navy', color:'white', margin:'0 10px' ,marginTop:'10px' }} /></Link>{cart.length > 0 && <div className='cart_length'>{cart.length}</div>}
</div>
</Toolbar>
</Container>
    </AppBar>
    <Container style={{display:`${getclass}`,flexDirection:'column',background:'white', position:'fixed', top:'55px' ,left:'15%',boxShadow:'0 4px 4px  navy',zIndex:'2',maxWidth:"200px",margin:'0px',fontSize:'20px', listStyle:"none" , textAlign:"start" ,hover:'color' }}>
      <Typography style={{width:"200px",padding:'10px'}}>snap cases<span style={{color:'white',background:'#8185d0', padding:'7px',fontSize:'.7rem',margin:'5px'}}>New</span></Typography>
      <hr style={{color:'blue'}}/>
      <Typography style={{width:"150%",padding:'10px'}}>snap cases</Typography>
      <hr/>
      <Typography style={{width:"150%",padding:'10px'}}>snap cases</Typography>
      <hr/>
      <Typography style={{width:"150%",padding:'10px'}}>snap cases</Typography>
      <hr/>
      <Typography style={{width:"150%",padding:'10px'}}>snap cases</Typography>
      <hr/>
      <Typography style={{width:"150%",padding:'10px'}}>snap cases</Typography>
      
    </Container>
    </>
  )
}

export default Navbar
