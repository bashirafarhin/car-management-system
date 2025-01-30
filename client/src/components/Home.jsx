import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
    <div>Seller-Dashboard-Home</div>
    <Button variant="contained" onClick={()=>{navigate('products')}}>Browse Your products</Button>
    </>
  )
}

export default Home