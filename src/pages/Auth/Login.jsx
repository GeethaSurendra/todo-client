import React,{useState} from 'react'
import styles from './Login.module.css';
import login from '../../assets/login.png';
import {Button, Input, message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import AuthServices from '../../services/authServices';
import { getErrorMessage } from '../../util/GetError';

function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async ()=>{
    
    try{
      setLoading(true);
      let data = {
        email,
        password
      }
      console.log(data)

      const response = await AuthServices.loginUser(data);
      console.log(response.data);
      localStorage.setItem('toDoAppUser',JSON.stringify(response.data));
      message.success("Logged in Successfully!");
      navigate('/to-do-list');
      setLoading(false);
    }catch(err){
      console.log(err);
      message.error(getErrorMessage(err));
      setLoading(false);
    }
  }
  return (
    <div>
      <div className={styles.login__card}>
          <img src={login} alt=".."/>
          <h2>Login</h2>
          <div className={styles.input__wrapper}>
              <Input 
              placeholder="email" 
              value={email} 
              onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className={styles.input__wrapper}>
              <Input.Password 
              placeholder="Password" 
              value={password} 
              onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <div className={styles.input__info}>
            New User? <Link to="/register">Register</Link>
           </div> 
           <Button loading={loading} style={{color:"white"}} type="primary" size="large" disabled={!email || !password} onClick={handleSubmit} >Login</Button>
      </div>
    </div>
  )
}

export default Login

