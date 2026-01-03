import { useState } from "react";

export default function ContactForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // 🔹 Validation (used for disabling submit + submit check)
  const isValid =
    form.name.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    /^[0-9]{10}$/.test(form.phone);

  const validate = () => {
    const e = {};

    if (!form.name.trim()) e.name = "Name is required";

    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address";
    }

    if (!form.phone.trim()) {
      e.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      e.phone = "Phone must be exactly 10 digits";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = await fetch("http://localhost:5000/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    onAdd(data);

    // ✅ Success message
    setSuccess("Contact added successfully");

    // Reset form
    setForm({ name: "", email: "", phone: "", message: "" });
    setErrors({});

    // Auto-hide success message
    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <form onSubmit={submit}>
      {/* ✅ Success Message */}
      {success && (
        <p style={{ color: "green", marginBottom: "10px" }}>
          {success}
        </p>
      )}

      {/* Name */}
      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      {errors.name && <small style={{ color: "red" }}>{errors.name}</small>}

      {/* Email */}
      <input
        placeholder="Gmail (example@gmail.com)"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}

      {/* Phone */}
      <input
        placeholder="Phone"
        value={form.phone}
        maxLength={10}
        onChange={e =>
          setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })
        }
      />
      {errors.phone && <small style={{ color: "red" }}>{errors.phone}</small>}

      {/* Message */}
      <textarea
        placeholder="Message"
        value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })}
      />

      {/* Submit */}
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
