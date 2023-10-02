const Button = ({
  style,
  type,
  children,
  onClick,
}: {
  style?: string
  type: "button" | "submit" | "reset" | undefined
  children: React.ReactNode
  onClick?: () => void
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${style} hover:cursor-pointer text-yellow-regular bg-dark-bold px-4 py-3 text-sm font-bold rounded-full`}
    >
      {children}
    </button>
  )
}

export default Button
