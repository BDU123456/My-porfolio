document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const els = {
    name: document.getElementById("name"),
    male: document.getElementById("male"),
    female: document.getElementById("female"),
    birthdate: document.getElementById("birthdate"),
    phone: document.getElementById("phone_no"),
    email: document.getElementById("email"),
    password: document.getElementById("pwd"),
    message: document.getElementById("message"),
    success: document.getElementById("form-success"),
  };

  const errors = {
    name: document.getElementById("error-name"),
    gender: document.getElementById("error-gender"),
    birthdate: document.getElementById("error-birthdate"),
    phone: document.getElementById("error-phone"),
    email: document.getElementById("error-email"),
    password: document.getElementById("error-password"),
  };

  function setError(input, errorEl, message) {
    if (!input || !errorEl) return false;
    errorEl.textContent = message || "";
    input.setAttribute("aria-invalid", message ? "true" : "false");
    return !message;
  }

  function validateName() {
    const value = (els.name.value || "").trim();
    if (!value) return setError(els.name, errors.name, "Name is required.");
    if (value.length < 2) return setError(els.name, errors.name, "Name must be at least 2 characters.");
    if (!/^[a-zA-Z ]+$/.test(value)) return setError(els.name, errors.name, "Only letters and spaces are allowed.");
    return setError(els.name, errors.name, "");
  }

  function validateGender() {
    const checked = els.male.checked || els.female.checked;
    // Put aria-invalid on both radios for assistive tech
    els.male.setAttribute("aria-invalid", checked ? "false" : "true");
    els.female.setAttribute("aria-invalid", checked ? "false" : "true");
    errors.gender.textContent = checked ? "" : "Please select your gender.";
    return checked;
  }

  function validateBirthdate() {
    const value = els.birthdate.value;
    if (!value) return setError(els.birthdate, errors.birthdate, "Birthdate is required.");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return setError(els.birthdate, errors.birthdate, "Use YYYY-MM-DD format.");
    const date = new Date(value);
    const today = new Date();
    if (Number.isNaN(date.getTime())) return setError(els.birthdate, errors.birthdate, "Invalid date.");
    if (date > today) return setError(els.birthdate, errors.birthdate, "Birthdate cannot be in the future.");
    // Optional sanity range
    if (date.getFullYear() < 1900) return setError(els.birthdate, errors.birthdate, "Please enter a realistic birth year.");
    return setError(els.birthdate, errors.birthdate, "");
  }

  function validatePhone() {
    const value = els.phone.value.trim();
    if (!value) return setError(els.phone, errors.phone, "Phone number is required.");
    const pattern = /^\+2519\d{8}$/;
    if (!pattern.test(value)) return setError(els.phone, errors.phone, "Use a valid Ethiopian mobile: +2519XXXXXXXX");
    return setError(els.phone, errors.phone, "");
  }

  function validateEmail() {
    const value = els.email.value.trim();
    if (!value) return setError(els.email, errors.email, "Email is required.");
    // Let the browser do most checks; fallback pattern as a safety net.
    const ok = els.email.checkValidity() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    if (!ok) return setError(els.email, errors.email, "Enter a valid email address.");
    return setError(els.email, errors.email, "");
  }

  function validatePassword() {
    const value = els.password.value;
    if (!value) return setError(els.password, errors.password, "Password is required.");
    if (value.length < 6) return setError(els.password, errors.password, "At least 6 characters.");
    return setError(els.password, errors.password, "");
  }

  function validateAll() {
    const checks = [
      validateName(),
      validateGender(),
      validateBirthdate(),
      validatePhone(),
      validateEmail(),
      validatePassword(),
    ];
    return checks.every(Boolean);
  }

  // Live validation
  els.name.addEventListener("input", validateName);
  els.male.addEventListener("change", validateGender);
  els.female.addEventListener("change", validateGender);
  els.birthdate.addEventListener("change", validateBirthdate);
  els.phone.addEventListener("input", validatePhone);
  els.email.addEventListener("input", validateEmail);
  els.password.addEventListener("input", validatePassword);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = validateAll();
    if (!ok) {
      // Focus first field with error
      const firstError = Object.entries(errors).find(([key, el]) => el && el.textContent);
      if (firstError) {
        const [k] = firstError;
        const target = k === "gender" ? els.male : els[k];
        if (target && typeof target.focus === "function") target.focus();
      }
      return;
    }

    // Success UX: reset and show a thank-you message
    form.reset();
    Object.values(errors).forEach((el) => el && (el.textContent = ""));
    [els.name, els.birthdate, els.phone, els.email, els.password].forEach((el) => el && el.setAttribute("aria-invalid", "false"));

    if (els.success) {
      els.success.style.display = "block";
      els.success.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      alert("Thank you! Your submission has been received.");
    }
  });

  form.addEventListener("reset", () => {
    Object.values(errors).forEach((el) => el && (el.textContent = ""));
    [els.name, els.birthdate, els.phone, els.email, els.password].forEach((el) => el && el.setAttribute("aria-invalid", "false"));
    if (els.success) els.success.style.display = "none";
  });
});
