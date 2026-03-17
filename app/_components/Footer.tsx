function Footer() {
  return (
    <div className="bg-[#44201F] h-20 flex items-center justify-center">
      <p className="text-sm text-white">
        © {new Date().getFullYear()} Doces Mabecky. Todos os direitos
        reservados.
      </p>
    </div>
  );
}

export default Footer;
