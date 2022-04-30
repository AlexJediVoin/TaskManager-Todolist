import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState(props.title);
    const onEditMode = () => setEditMode(true);
    const offEditMode = () => {
        props.changeTitle(title);
        setEditMode(false);
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyPressOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            offEditMode();
        }
    }
    return (
        <React.Fragment>
            {
                editMode
                    ? <TextField
                        value={title}
                        autoFocus={true}
                        onBlur={offEditMode}
                        onChange={onChangeSetTitle}
                        onKeyPress={onKeyPressOffEditMode}
                    />
                    : <span onDoubleClick={onEditMode}>{props.title}</span>
            }
        </React.Fragment>

    )
};

export default EditableSpan;

