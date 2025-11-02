// madrassah.jsx
import * as React from "react";
import { jsPDF } from "jspdf";
// import emailjs from "emailjs-com";

// const SERVICE_ID = "your_service_id";
// const TEMPLATE_ID = "your_template_id";
// const PUBLIC_KEY = "your_public_key";

// npm i emailjs-com
/* 

    Set up EmailJS (one-time)

    Go to emailjs.com → create a Service and an Email Template.

    In the template, include variables like from_name, guardian_email, message, and an attachment field.

    Note your Service ID, Template ID, and Public Key.

*/

const Madrassah = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [pdfUrl, setPdfUrl] = React.useState("");

  const buildPayloadFromForm = (form) => {
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    payload.preferred_days = Array.from(
      form.querySelectorAll("input[name='preferred_days']:checked")
    ).map((el) => el.value);
    payload.consents = Array.from(
      form.querySelectorAll("input[name='consents']:checked")
    ).map((el) => el.value);
    return payload;
  };

  const generatePdf = (payload) => {
    const doc = new jsPDF({ unit: "pt" });
    let y = 40;

    doc.setFontSize(18);
    doc.text("Madrassah Application", 40, y);
    doc.setFontSize(11);
    y += 20;

    const put = (label, value) => {
      doc.text(`${label}: ${value || "-"}`, 40, y);
      y += 15;
    };

    // Student
    doc.setFont(undefined, "bold");
    doc.text("Student Details", 40, y);
    y += 15;
    doc.setFont(undefined, "normal");
    put("First name", payload.student_first_name);
    put("Last name", payload.student_last_name);
    put("Date of birth", payload.student_dob);
    put("Gender", payload.student_gender);
    put("School year", payload.student_year);

    // Guardian
    doc.setFont(undefined, "bold");
    doc.text("Parent/Guardian", 40, y);
    y += 15;
    doc.setFont(undefined, "normal");
    put("Name", payload.guardian_name);
    put("Relationship", payload.guardian_relationship);
    put("Phone", payload.guardian_phone);
    put("Email", payload.guardian_email);
    put("Address", payload.address_line);
    put("City", payload.city);
    put("Postcode", payload.postcode);

    // Emergency & Medical
    doc.setFont(undefined, "bold");
    doc.text("Emergency & Medical", 40, y);
    y += 15;
    doc.setFont(undefined, "normal");
    put("Emergency name", payload.emergency_name);
    put("Emergency phone", payload.emergency_phone);
    put("Medical info", payload.medical_info);

    // Preferences
    doc.setFont(undefined, "bold");
    doc.text("Preferences", 40, y);
    y += 15;
    doc.setFont(undefined, "normal");
    put("Preferred days", (payload.preferred_days || []).join(", "));
    put("Preferred time", payload.preferred_time);

    // Consents
    doc.setFont(undefined, "bold");
    doc.text("Consents", 40, y);
    y += 15;
    doc.setFont(undefined, "normal");
    put("Consents", (payload.consents || []).join(", "));

    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    // const base64 = doc.output("datauristring"); // would be used for emailing

    return { blob, url };
  };

  // const sendEmailWithAttachment = async (payload, pdfDataUri) => {
  //   const templateParams = {
  //     from_name: `${payload.guardian_name} (for ${payload.student_first_name} ${payload.student_last_name})`,
  //     guardian_email: payload.guardian_email,
  //     message: "New Madrassah application attached as PDF.",
  //     attachment: pdfDataUri,
  //     to_email: "applications@your-masjid.org",
  //   };
  //   return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const payload = buildPayloadFromForm(form);

    const ok = window.confirm("Submit application and generate PDF?");
    if (!ok) return;

    setLoading(true);
    try {
      const { url } = generatePdf(payload);
      setPdfUrl(url);

      // await sendEmailWithAttachment(payload, base64);
      setSubmitted(true);
      // form.reset();
    } catch (err) {
      console.error(err);
      setError("Could not generate PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] px-4 py-8 text-black">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-primary">Madrassah Application</h1>
        <p className="text-gray-600 mt-1">
          Please complete the form below. You’ll be asked to confirm submission, then we’ll generate a PDF for you to download.
        </p>

        {submitted && (
          <div className="mt-4 rounded-lg bg-green-50 text-green-800 border border-green-200 p-3">
            Application submitted. A PDF has been generated below.
          </div>
        )}
        {error && (
          <div className="mt-4 rounded-lg bg-red-50 text-red-800 border border-red-200 p-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-8">
          {/* Example of Student Details */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Student Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First name *</label>
                <input name="student_first_name" required className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last name *</label>
                <input name="student_last_name" required className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of birth *</label>
                <input type="date" name="student_dob" required className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender *</label>
                <select name="student_gender" required className="mt-1 w-full rounded-md border px-3 py-2">
                  <option value="">Select…</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
            </div>
          </section>

          {/* Add other sections here... */}

          <div className="flex items-center justify-end gap-3">
            <button type="reset" className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-50">Clear</button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-md bg-primary text-white hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? "Submitting…" : "Submit & Generate PDF"}
            </button>
          </div>
        </form>

        {pdfUrl && (
          <div className="mt-6">
            <a
              href={pdfUrl}
              download="madrassah_application.pdf"
              className="inline-block px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
            >
              Download generated PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Madrassah;
