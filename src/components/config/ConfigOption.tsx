interface props {
  label: string
  text: string
  value: boolean
  onChange: (value: boolean) => void
}

export default function ConfigOption({label, value, text, onChange}: props) {
  return (
    <label className={`config-item ${value ? '--active' : ''}`}>
      <span className={"__checkbox"}>{value ? '+' : '-'}</span>
      <span className={"__name"}>{label}</span>
      <input type="checkbox" checked={value} onChange={e => onChange(e.target.checked)}/>
      <i>{text}</i>
    </label>
  )
}