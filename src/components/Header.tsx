import { Link } from "react-router-dom";
import { BookOpen, Calculator, Home, Users, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const navItems = [
    { name: "الصفحة الرئيسية", href: "/", icon: Home },
    { name: "الموارد التعليمية", href: "/resources", icon: BookOpen },
    { name: "حاسبة المعدل", href: "/calculator", icon: Calculator },
    { name: "لوحة المعلومات", href: "/dashboard", icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          Ecl BTEC
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </nav>

    
        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-4 mt-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-foreground hover:bg-muted transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
             
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;