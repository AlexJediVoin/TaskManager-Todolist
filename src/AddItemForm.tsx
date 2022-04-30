import {Button} from "@material-ui/core";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (itemTitle: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [titleList, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }
    const addItem = () => {
        if (titleList.trim() !== '') {
            props.addItem(titleList);
            setTitle('');
            setError(null);
        } else {
            setError('Заполни строку!')
        }
    }
    return (<div>
            <TextField variant={"outlined"}
                       value={titleList}
                       onChange={onChangeSetTitle}
                       onKeyPress={onKeyPressAddItem}
                       error={!!error}
                       label={'Title'}
                       helperText={error}
            />
            <IconButton color={"primary"} onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
}