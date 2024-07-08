import { Link, LinkProps, useLocation } from 'react-router-dom'

export function SheetNavLink(props: LinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      data-current={pathname === props.to}
      className="flex w-full cursor-pointer items-center rounded-md bg-background px-4 py-2 text-lg font-semibold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none data-[current=true]:bg-accent/90"
      {...props}
    />
  )
}
