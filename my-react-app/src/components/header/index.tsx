import { MenuIcon, MountainIcon } from 'lucide-react'

import { ThemeToggle } from '~/components/theme/theme-toggle'
import { Button } from '~/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '~/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet'

import { NavLink } from './_components/nav-link'
import { SheetNavLink } from './_components/sheet-nav-link'

export function Header() {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>

          <a href="#">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Icon</span>
          </a>

          <div className="grid gap-2 py-6">
            <SheetNavLink to="/">Início</SheetNavLink>
            <SheetNavLink to="/my-pdf">Meus PDFs</SheetNavLink>
            <SheetNavLink to="/search">Pesquisar</SheetNavLink>
            <SheetNavLink to="/dashboard">Dashboard</SheetNavLink>
          </div>
        </SheetContent>
      </Sheet>

      <a href="#" className="mr-6 hidden lg:flex">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Icon</span>
      </a>

      <div className="flex w-full justify-center">
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavLink to="/">Início</NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink to="/my-pdf">Meus PDFs</NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem asChild>
              <NavLink to="/search">Pesquisar</NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem asChild>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  )
}
