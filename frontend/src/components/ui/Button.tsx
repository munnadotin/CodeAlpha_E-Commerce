type buttonType = {
  text: string,
  onClick: () => void,
  type: 'button' | 'submit' | 'reset'
}

export default function Button({ text, onClick, type = "button" }: buttonType) {
  return (
    <button type={type} onClick={onClick} className="px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-800 cursor-pointer">
      {text}
    </button>
  )
}
