import PropTypes from 'prop-types'

function Header({ title }) {
  return (
    <h1 className='pb-8 pt-2 text-center text-5xl font-bold underline'>{title}</h1>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header