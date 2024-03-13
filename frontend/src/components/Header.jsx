import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center">
          Gecko
        </h2>

        <input 
          type="search" 
          placeholder="Buscar Blog"
          className="rounded-lg w-96 block border"
        />

        <div className="flex items-center gap-4">
          <Link 
            to="/blog"
            className="font-bold uppercase"
          >Blogs</Link>

          <button
            type="button"
            className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
          >Cerrar Sesión</button>
        </div>
      </div>
    </header>
  )
}

export default Header