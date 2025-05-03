import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useMobile } from "@/hooks/use-mobile";
import { MenuIcon, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMobile();
  const [location] = useLocation();
  
  const navigationLinks = [
    { name: "Produtos", href: "/produtos" },
    { name: "Início", href: "/" },
    { name: "Sobre nos", href: "/sobre" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Fecha o menu quando a rota mudar
  useEffect(() => {
    closeMenu();
  }, [location]);

  // Impede scroll quando menu mobile está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-5 flex items-center justify-between md:justify-center relative">
        {/* Logo ou similar que seria visível em dispositivos móveis */}
        {isMobile && (
          <Link href="/">
            <span className="text-[#beff00] font-bold text-xl">CASINO BOTS</span>
          </Link>
        )}
        
        {/* Links de navegação - ocultos em mobile, visíveis em desktop */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-14">
          {navigationLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="text-white font-medium hover:text-[#beff00] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Botão de contatos - oculto em mobile, visível em desktop */}
        <div className="hidden md:block absolute right-6">
          <Link href="/contato">
            <button className="comprar-button hover:bg-opacity-90 transition-all">
              Contatos
            </button>
          </Link>
        </div>

        {/* Botão do menu mobile */}
        {isMobile && (
          <button 
            onClick={toggleMenu} 
            className="text-white p-1"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        )}
      </div>
      
      {/* Navegação Mobile - slide down animation */}
      {isMobile && (
        <div 
          className={`fixed inset-0 bg-[#1a1a1a] pt-20 z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
        >
          <div className="px-6 py-4 space-y-6">
            {navigationLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="block text-xl text-white font-medium py-2 border-b border-gray-800"
              >
                {link.name}
              </Link>
            ))}
            
            <Link 
              href="/contato" 
              onClick={closeMenu}
              className="block text-xl text-white font-medium py-2 border-b border-gray-800"
            >
              Contatos
            </Link>
            
            <div className="hidden">
              <Link 
                href="/admin" 
                onClick={closeMenu}
                className="block text-white font-medium"
              >
                Admin
              </Link>
            </div>

            {/* Botão de compra para mobile */}
            <div className="pt-4">
              <Link href="/produtos">
                <button className="comprar-button w-full py-3 text-center">
                  Ver Produtos
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
