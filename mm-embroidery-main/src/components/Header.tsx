import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="w-full py-4 px-6 bg-cream border-b border-gold/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-playfair text-maroon">MM Embroidery</h1>
        <nav className="space-x-6">
          <Button variant="ghost" className="text-maroon hover:text-gold">Virtual Try-On</Button>
          <Button variant="ghost" className="text-maroon hover:text-gold">Customize</Button>
          <Button variant="ghost" className="text-maroon hover:text-gold">About</Button>
          <Button variant="ghost" className="text-maroon hover:text-gold">Contact</Button>
        </nav>
      </div>
    </header>
  );
};