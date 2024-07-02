import { Link } from "react-router-dom"

const Button = ({children, disabled, to, type, onClick}) => {
  // const className = "bg-yellow-500 uppercase font-semibold text-stone-800 py-3 px-4 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4"

  const base = " bg-yellow-500 uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed "

  const styles = {
    primary : base + ' px-4 py-3 sm:px-6 sm:py-4  text-sm',
    small : base + ' px-4 py-3 md:px-5 md:py-3.5 text-xs' ,
    round : base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-xs',
    secondary: "uppercase font-semibold text-stone-500 inline-block tracking-wide rounded-full hover:bg-stone-300 transition-colors duration-300 focus:outline-none hover:text-stone-800 focus:text-stone-800 focus:ring focus:ring-stone-200 focus:bg-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed border-2 border-stone-300 px-4 py-2.5 sm:px-6 sm:py-3.5 text-sm"
  }
if(to) return (
  <Link to={to} className={styles[type]}>{children}</Link>
)

if(onClick)
  return (
    <button onClick={onClick} className={styles[type]} disabled={disabled}>
{children}
    </button>
  )

  if(!to || !onClick) return ( <button className={styles[type]}>{children}</button>)
}

export default Button