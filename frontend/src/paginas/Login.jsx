import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaUser, FaLock } from "react-icons/fa";
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios'
import useAuth from "../hooks/useAuth";

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const { setAuth } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    if([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    try {
      const {data} = await clienteAxios.post('/usuarios/login', {email, password})
      setAlerta({})
      localStorage.setItem('token', data.token)
      setAuth(data)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      {msg && <Alerta alerta={alerta} />}

      <form 
        className="bg-transparent backdrop-blur-[30px] shadow-[0_0_10px_rgba(0,0,0,0.2)] text-white px-10 py-[30px] rounded-[10px] border-2 border-solid border-[rgba(255,255,255,0.2)]"
        onSubmit={handleSubmit}
      >
        <h2 className='text-4xl text-center font-bold'>Login</h2>
        <div className="relative w-full h-[50px] mx-0 my-[30px]">
          <input 
            type="email" 
            placeholder="Email de registro" 
            className="w-full h-full bg-transparent text-base text-white pl-5 pr-[45px] py-5 rounded-[40px] border-2 border-solid border-[rgba(255,255,255,0.2)] outline-none placeholder-white" 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <FaUser className='absolute -translate-y-2/4 text-base right-5 top-2/4' />
        </div>

        <div className="relative w-full h-[50px] mx-0 my-[30px]">
          <input 
            type="password" 
            placeholder="Password de registro" 
            className="w-full h-full bg-transparent text-base text-white pl-5 pr-[45px] py-5 rounded-[40px] border-2 border-solid border-[rgba(255,255,255,0.2)] outline-none placeholder-white" 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <FaLock className='absolute -translate-y-2/4 text-base right-5 top-2/4' />
        </div>

        <input 
          type="submit" 
          value="Iniciar Sesión"
          className="w-full h-[45px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-pointer text-base text-[#333] font-bold rounded-[40px] border-[none] outline-none"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/registrar"
        >¿No tienes una cuenta? Regístrate</Link>

        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/olvide-password"
        >Olvidé mi password</Link>
      </nav>
    </>
  )
}

export default Login