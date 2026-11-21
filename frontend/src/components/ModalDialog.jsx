import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { MessageCircle, MoreHorizontal } from "lucide-react"

const ModalDialog = () => {
  const [open, setOpen] = useState(false)
  return (
    <div open={open} onClick={()=>setOpen(false)}>
            <Dialog>
                <DialogTrigger>
                  <MoreHorizontal className='cursor-pointer'></MoreHorizontal>
                </DialogTrigger>
                <DialogContent className={'flex flex-col items-center text-sm text-center'}>
                  <div className='cursor-pointer w-full text-[#ed4956] font-bold'>
                    unfollow
                  </div>
                  <div className='cursor-pointer w-full'>
                    add to favorites
                  </div>
                </DialogContent>
            </Dialog>

      </div>
  )
}

export default ModalDialog

