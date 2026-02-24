import Form from "./_ui/Form";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

function Contact() {
  return (
    <div className="p-6 space-y-8">
      <h2 className="text-center text-3xl font-semibold mt-15">Fale Conosco</h2>
      <div>
        <Form />
      </div>

      <div className="w-full h-5 bg-amber-950"></div>
      <div className="space-y-2 text-lg">
        <p className="flex items-center gap-1">
          <FaWhatsapp color="#25D366" size={24} />
          Whatsapp
        </p>
        <p className="flex items-center gap-1">
          <FaInstagram color="#E1306C" size={24} />
          Instagram
        </p>
        <p className="flex items-center gap-1">
          <FaEnvelope color="#EA4335" size={24} />
          Email
        </p>
      </div>
    </div>
  );
}

export default Contact;
