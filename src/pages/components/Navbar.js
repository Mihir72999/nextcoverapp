'use client'
import { AppBar, Button, Container, Fab, Toolbar, Typography } from '@mui/material'
import { CloseOutlined, MenuOutlined ,ShoppingCartRounded} from '@material-ui/icons'
import Link from 'next/link'

import React, { useEffect,  useState } from 'react'


const Navbar = () => {
  const [getclass, setGetclass] = useState('none')
const[cart ,setCart] = useState()

useEffect(()=>{
  
  setCart(JSON.parse(localStorage.getItem('length')))
},[cart])

console.log(cart)

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
<Link style={{color:'whitesmoke'}} href='/cart'><ShoppingCartRounded style={{background:'navy', color:'white' }} /><Fab size="small" color="secondary" >{cart}</Fab></Link>
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