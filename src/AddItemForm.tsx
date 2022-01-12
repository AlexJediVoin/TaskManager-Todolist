import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (itemTitle: string) => void
}
export function AddItemForm (props:AddItemFormPropsType) {
    let [titleList, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyPressAddItem= (e: KeyboardEvent<HTMLInputElement>) => {
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
            <input value={titleList}
                   onChange={onChangeSetTitle}
                   onKeyPress={onKeyPressAddItem}
                   className={error ? "error" : ''}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={"error_message"}>Заполни строку!</div>}
        </div>
    )
}