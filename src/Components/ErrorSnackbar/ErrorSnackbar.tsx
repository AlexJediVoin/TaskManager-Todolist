import React, {useEffect, useState} from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {useAppDispatch, useAppSelector} from "../../State/hooks";
import {setAppErrorAC} from "../../State/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {
    let [open, setOpen] = useState(false)
    let error = useAppSelector(state => state.app.error);

    open = error !== null;
    const dispatch = useAppDispatch()

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(setAppErrorAC(null))
            setOpen(false)
        }, 3000)
        return () => clearTimeout(timeout)
    }, [open,dispatch])

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC(null))
        setOpen(false)

    }
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                Error message 😠
            </Alert>
        </Snackbar>
    )
}