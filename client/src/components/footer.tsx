import { Link } from "wouter";
import { Instagram, Facebook, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] border-t border-[#333] py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-6 md:gap-0 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-start mb-2">
              <span className="text-[#beff00] font-bold text-xl">CASINO BOTS</span>
            </div>
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} CasinoBot. Todos os direitos reservados.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-0">
            <div className="flex flex-wrap justify-center gap-4 md:space-x-6">
              <Link href="/" className="text-white/60 hover:text-white transition-colors text-sm md:text-base">
                Início
              </Link>
              <Link href="/sobre" className="text-white/60 hover:text-white transition-colors text-sm md:text-base">
                Sobre Nós
              </Link>
              <Link href="/produtos" className="text-white/60 hover:text-white transition-colors text-sm md:text-base">
                Produtos
              </Link>
              <Link href="/contato" className="text-white/60 hover:text-white transition-colors text-sm md:text-base">
                Contatos
              </Link>
            </div>
          </div>
        </div>
        
        {/* Redes sociais e contato */}
        <div className="mt-8 flex flex-col md:flex-row justify-center md:justify-between items-center pt-6 border-t border-[#333]">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="https://wa.me/351936880192" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-white/60 hover:text-[#beff00] transition-colors">
              <MessageCircle size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/60 hover:text-[#beff00] transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/60 hover:text-[#beff00] transition-colors">
              <Facebook size={20} />
            </a>
          </div>
          <div className="text-center md:text-right">
            <p className="text-white/60 text-sm">
              <span className="block md:inline">Design by Joel Machado</span>
              <span className="hidden md:inline"> | </span>
              <span className="block md:inline">+351 936 880 192</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
