import Form from "./_ui/Form";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

function Contact() {
  return (
    <div className="min-h-screen p-6 md:p-12 space-y-12 bg-[#fdfaf8]">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-[#44201F] mt-10">
          Fale Conosco
        </h2>
        <div className="w-20 h-1 bg-[#7dd0c2] mx-auto rounded-full"></div>
      </div>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl shadow-[#44201f]/5 border border-[#44201f]/10">
        <Form />
      </div>
      {/* Divisor Estilizado */}
      <div className="flex items-center justify-center gap-4 max-w-lg mx-auto">
        <div className="h-px bg-[#44201f]/20 flex-1"></div>
        <div className="w-2 h-2 rounded-full bg-[#7dd0c2]"></div>
        <div className="h-px bg-[#44201f]/20 flex-1"></div>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <a
            href="#"
            className="flex flex-col items-center p-4 rounded-xl bg-white border border-gray-100 hover:border-[#7dd0c2] transition-colors shadow-sm group"
          >
            <FaWhatsapp
              className="text-[#25D366] group-hover:scale-110 transition-transform"
              size={32}
            />
            <span className="mt-2 font-medium text-[#44201F]">
              (21) 9 9999-9999
            </span>
          </a>

          <a
            href="#"
            className="flex flex-col items-center p-4 rounded-xl bg-white border border-gray-100 hover:border-[#7dd0c2] transition-colors shadow-sm group"
          >
            <FaInstagram
              className="text-[#E1306C] group-hover:scale-110 transition-transform"
              size={32}
            />
            <span className="mt-2 font-medium text-[#44201F]">
              @docesmabecky
            </span>
          </a>

          <a
            href="#"
            className="flex flex-col items-center p-4 rounded-xl bg-white border border-gray-100 hover:border-[#7dd0c2] transition-colors shadow-sm group"
          >
            <FaEnvelope
              className="text-[#7dd0c2] group-hover:scale-110 transition-transform"
              size={32}
            />
            <span className="mt-2 font-medium text-[#44201F] text-sm md:text-base">
              docesmabecky@gmail.com
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
