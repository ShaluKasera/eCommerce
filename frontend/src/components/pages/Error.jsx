import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-4 text-gray-800" >
    <p className="text-4xl md:text-7xl font-bold">404</p>
    <p className="text-xl md:text-3xl font-semibold">Oops ! Page not found</p>
    <Link to="/" className="link">
      Go to Home
    </Link>
  </div>
  
  
  )
}

export default Error
