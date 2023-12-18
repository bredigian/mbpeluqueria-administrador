import { useNotices } from "@/store/notices"
import { Notice } from "@/types/notice.types"
import { RiDeleteBin7Line } from "react-icons/ri"
import { toast } from "sonner"

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
    <li className="bg-dark-regular flex items-center justify-between p-3 w-full rounded-xl text-yellow-regular">
      <p className="text-sm max-w-[230px]">{data.title}</p>
      <RiDeleteBin7Line onClick={handleDelete} className="w-4 h-4" />
    </li>
  )
}

export default Notice
