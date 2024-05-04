import { ChangeEvent, useState } from "react"

type PropsType = {
  value: string
  onChange: (newTitle: string) => void
}

export const EditableSpan = ({ value, onChange }: PropsType) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(value)

  const activateEditeModeHandler = () => {
    setEditMode(true)
  }
  const deactivateEditModeHandler = () => {
    setEditMode(false)
    onChange(title)
  }
  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return (
    <div>
      {editMode ? (
        <input
          value={title}
          onChange={changeTitleHandler}
          autoFocus
          onBlur={deactivateEditModeHandler}
          />) : (
        <span onDoubleClick={activateEditeModeHandler}>{value}</span>
      )}
    </div>
  
  )
}