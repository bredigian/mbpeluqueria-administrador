const MenuItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center gap-4 bg-dark-bold w-full py-4 rounded-full">
      {children}
    </div>
  )
}

export default MenuItem
