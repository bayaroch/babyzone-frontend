interface HeaderProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const Header: React.FC<HeaderProps> = ({ open, setOpen }) => {
  console.log(open)
  return <div className="header">header</div>
}
