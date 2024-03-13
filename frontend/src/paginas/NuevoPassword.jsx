import { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import { FaLock } from "react-icons/fa";
import clienteAxios from '../config/clienteAxios'
import Alerta from '../components/Alerta'

const NuevoPassword = () => {

  const [password, setPassword] = useState('')
  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams()
  const { token } = params

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault();

    if(password.length < 6) {
      setAlerta({
        msg: 'El password debe ser minimo de 6 caracteres',
        error: true
      })
      return

    }

    try {
      const url = `/usuarios/olvide-password/${token}`
      const {data} = await clienteAxios.post(url, {password})
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPasswordModificado(true)
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

      { tokenValido && (
        <form 
          className="bg-transparent backdrop-blur-[30px] shadow-[0_0_10px_rgba(0,0,0,0.2)] text-white px-10 py-[30px] rounded-[10px] border-2 border-solid border-[rgba(255,255,255,0.2)]"
          onSubmit={handleSubmit}
        >
          <h2 className='text-4xl text-center font-bold'>Nuevo password</h2>
          <div className="relative w-full h-[50px] mx-0 my-[30px]">
            <input 
              type="password" 
              placeholder="Escribe tu nuevo password" 
              className="w-full h-full bg-transparent text-base text-white pl-5 pr-[45px] py-5 rounded-[40px] border-2 border-solid border-[rgba(255,255,255,0.2)] outline-none placeholder-white" 
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <FaLock className='absolute -translate-y-2/4 text-base right-5 top-2/4' />
          </div>

          <input 
            type="submit" 
            value="Guardar nuevo password"
            className="w-full h-[45px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-pointer text-base text-[#333] font-bold rounded-[40px] border-[none] outline-none"
          />
        </form>
      ) }

      {passwordModificado && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >Inicia Sesión</Link>
      )}
    </>
  )
}

export default NuevoPassword