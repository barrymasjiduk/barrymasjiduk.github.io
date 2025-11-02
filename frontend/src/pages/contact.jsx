// Contact.jsx
import * as React from "react";
import { Mail, Phone, MapPin, Clock, DoorClosed, Car } from "lucide-react";
import { other } from "@/hooks/useData";

const Contact = () => {
  const otherinfo = other();
  const parts = otherinfo.split(".").map(s => s.trim()).filter(Boolean);

  return (
    <div className="items-center justify-center flex flex-col px-4 py-10 text-black">
      <div className="w-full max-w-5xl">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Contact Us</h1>
        <hr className="border-t-3 border-primary mb-6" />

        {/* Two columns: FAQ + Contact info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* FAQ */}
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-primary pb-2">FAQ</h2>
            <div className="space-y-4 pl-2">
              {parts[0] && (
                <div>
                  <p className="text-sm md:text-base font-medium text-gray-900">When is the masjid open?</p>
                  <p className="text-sm md:text-base text-gray-600 mt-1">{parts[0]}</p>
                </div>
              )}
              {parts[1] && (
                <div>
                  <p className="text-sm md:text-base font-medium text-gray-900">Is there parking?</p>
                  <p className="text-sm md:text-base text-gray-600 mt-1">{parts[1]}</p>
                </div>
              )}
              {parts[2] && (
                <div>
                  <p className="text-sm md:text-base font-medium text-gray-900">Sister's prayer facilities?</p>
                  <p className="text-sm md:text-base text-gray-600 mt-1">{parts[2]}</p>
                </div>
              )}
            <ul>
              
            </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-primary mb-3">Get in touch</h2>
            <div className="space-y-5 pl-2">
              <div className="flex items-center gap-4">
                <Phone className="text-primary w-6 h-6" />
                <span className="text-sm md:text-base">01446 745822</span>
              </div>
{/* 
              <div className="flex items-start gap-4">
                <Mail className="text-primary w-6 h-6 mt-0.5" />
                <span className="text-sm md:text-base">info@barrymasjid.org</span>
              </div>
*/}

              <div className="flex items-start gap-4">
                <MapPin className="text-primary w-6 h-6 mt-0.5" />
                <span className="text-sm md:text-base">
                  332 Holton Road Barry, Vale of Glamorgan
                  <br />
                  Wales, United Kingdom
                  <br />
                  CF63 4HY
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Card (unchanged, full width) */}
        <div className="w-full bg-white shadow-md rounded-lg p-3 md:p-5 mt-8">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2488.6085527313753!2d-3.2529654!3d51.4102469!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486e05b917b20f43%3A0xa6e228e4f45d4b1b!2sBarry%20Masjid%20(Mosque)!5e0!3m2!1sen!2suk!4v1755117246832!5m2!1sen!2suk"
            className="w-full h-64 rounded-lg border border-gray-200"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
