import ButtonBack from "./ButtonBack"

const Screen = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col gap-8 py-10 px-8">
      <ButtonBack />
      {children}
    </main>
  )
}

export default Screen
