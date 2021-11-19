interface HeaderProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const Header: React.FC<HeaderProps> = () => {
  return <div className="header"></div>
}
