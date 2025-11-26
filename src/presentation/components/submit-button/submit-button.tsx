import React from 'react'
interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  text: string
  disabled?: boolean
}

const SubmitButton: React.FC<Props> = ({ text, disabled = false, ...props }: Props) => {
  return (
    <button data-testid="submit" disabled={disabled} type="submit" {...props}>{text}</button>
  )
}

export default SubmitButton
