function Footer() {
  return (
    <div className=" bg-amber-900 h-20 flex items-center justify-center">
      <p className="text-sm text-white">
        © {new Date().getFullYear()} Doces Mabecky. Todos os direitos
        reservados.
      </p>
    </div>
  );
}

export default Footer;
