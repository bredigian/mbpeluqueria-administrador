import ButtonBack from "./ButtonBack"

const Screen = ({
  children,
  style,
}: {
  children: React.ReactNode
  style?: string
}) => {
  return (
    <main className={`flex flex-col gap-8 py-10 px-8 ${style}`}>
      <ButtonBack />
      {children}
    </main>
  )
}

export default Screen
