import { useNotices } from "@/store/notices"
import { Notice } from "@/types/notice.types"
import { RiDeleteBin7Line } from "react-icons/ri"
import { toast } from "sonner"
import Button from "./Button"

const Notice = ({ data }: { data: Notice }) => {
  const { deleteNotice } = useNotices()

  const handleDelete = async () => {
    try {
      toast.promise(async () => await deleteNotice(data._id), {
        loading: "Eliminando aviso...",
        success: "Aviso eliminado!",
        error: "Ocurrió un error al eliminar el aviso",
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <li className="bg-dark-regular flex flex-col items-center gap-4 p-3 w-full rounded-xl text-yellow-regular">
      <p className="text-sm">{data.title}</p>
      <Button
        type="button"
        style="text-xs bg-yellow-light w-full"
        onClick={handleDelete}
      >
        Eliminar
      </Button>
    </li>
  )
}

export default Notice
