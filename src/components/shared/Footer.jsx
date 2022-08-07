import { FaGithubSquare } from 'react-icons/fa'

function
  footer() {
  return (
    <div className="lg:w-10/12 mx-auto p-10">
      <footer>
        <p className='text-xs lg:text-sm text-slate-500'>This tool app is a compilation of a few smaller apps I had been working on. The dive log (if signed in) and dive map pages are connected to a database.</p>
        <a href="https://github.com/stars/louisep1/lists/portfolio" target="_blank"><FaGithubSquare className='text-3xl mt-2' /></a>
      </footer>
    </div>
  )
}

export default
  footer