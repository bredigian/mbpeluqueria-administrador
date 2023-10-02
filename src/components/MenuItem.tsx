import Link from "next/link"

const MenuItem = ({
  children,
  href,
}: {
  children: React.ReactNode
  href: string
}) => {
  return (
    <Link
      href={href}
      className="flex items-center justify-center gap-4 bg-dark-bold w-full py-4 rounded-full"
    >
      {children}
    </Link>
  )
}

export default MenuItem
