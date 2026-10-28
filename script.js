
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Preselect the service when a service card is clicked.
document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("service").value =
      link.dataset.service;
  });
});

const form = document.getElementById("enquiryForm");
const steps = [...document.querySelectorAll(".form-step")];
const progressBar = document.getElementById("progressBar");
const stepLabel = document.getElementById("stepLabel");
const formMessage = document.getElementById("formMessage");

let currentStep = 0;

function showStep(index) {
  currentStep = index;

  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
  });

  progressBar.style.width = index === 0 ? "50%" : "100%";
  stepLabel.textContent = `STEP ${index + 1} OF 2`;
  formMessage.textContent = "";
  formMessage.classList.remove("error");
}

document.getElementById("nextButton").addEventListener("click", () => {
  const firstStepInputs = steps[0].querySelectorAll("input");

  for (const input of firstStepInputs) {
    if (!input.reportValidity()) {
      return;
    }
  }

  showStep(1);
});

document.getElementById("backButton").addEventListener("click", () => {
  showStep(0);
});

form.addEventListener("submit", event => {
  event.preventDefault();

  if (!form.reportValidity()) {
    return;
  }

  formMessage.classList.remove("error");
  formMessage.textContent =
    "The form is validated, but it has not been sent. Connect a backend to save your enquiry.";

  // No data is saved or transmitted in this demo.
});
