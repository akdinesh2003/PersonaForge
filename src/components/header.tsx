import { PersonaForgeLogo } from './icons';
import { SidebarTrigger } from './ui/sidebar';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
         <div className="md:hidden">
            <SidebarTrigger />
         </div>
        <PersonaForgeLogo />
        <h1 className="text-xl font-bold tracking-tighter">PersonaForge</h1>
      </div>
    </header>
  );
}
