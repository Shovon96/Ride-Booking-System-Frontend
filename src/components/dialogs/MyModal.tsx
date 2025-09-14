import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

type MyModalProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description?: string
    children?: React.ReactNode
    onConfirm?: () => void
    confirmLabel?: string
    cancelLabel?: string
}

export const MyModal = ({
    open,
    onOpenChange,
    title,
    description,
    children,
    onConfirm,
    confirmLabel = "OK",
    // cancelLabel = "Close",
}: MyModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>

                <div className="py-4">{children}</div>

                <DialogFooter>
                    {/* <Button variant="outline" onClick={() => onOpenChange(false)}>
                        {cancelLabel}
                    </Button> */}
                    {onConfirm &&
                        <Link to={"/user/info"}><Button onClick={onConfirm}>{confirmLabel}</Button></Link>
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
