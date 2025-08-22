// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })
})

// Smooth scrolling for anchor links
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

// Payment method selection (for billing page)
document.addEventListener("DOMContentLoaded", () => {
  const paymentOptions = document.querySelectorAll(".payment-option")
  const formSections = document.querySelectorAll(".form-section")

  function updateRequiredFields() {
    // Remove required from all file inputs
    document.querySelectorAll('input[type="file"]').forEach((input) => {
      input.removeAttribute("required")
    })

    // Remove required from crypto address
    const cryptoAddress = document.getElementById("cryptoAddress")
    if (cryptoAddress) cryptoAddress.removeAttribute("required")

    // Add required to visible section inputs
    const visibleSection = document.querySelector('.form-section[style*="block"]')
    if (visibleSection) {
      if (visibleSection.id === "cryptoSection") {
        const cryptoInput = visibleSection.querySelector("#cryptoAddress")
        if (cryptoInput) cryptoInput.setAttribute("required", "")
      } else if (visibleSection.id === "razerSection") {
        visibleSection.querySelectorAll('input[type="file"]').forEach((input) => {
          input.setAttribute("required", "")
        })
      } else if (visibleSection.id === "itunesSection") {
        visibleSection.querySelectorAll('input[type="file"]').forEach((input) => {
          input.setAttribute("required", "")
        })
      }
    }
  }

  // Initialize required fields for default visible section
  updateRequiredFields()

  paymentOptions.forEach((option) => {
    option.addEventListener("click", function () {
      if (this.classList.contains("dormant")) return

      // Remove active class from all options
      paymentOptions.forEach((opt) => opt.classList.remove("selected"))
      // Add active class to clicked option
      this.classList.add("selected")

      // Hide all form sections
      formSections.forEach((section) => {
        if (section.id !== "cryptoSection" && section.id !== "razerSection" && section.id !== "itunesSection") return
        section.style.display = "none"
      })

      // Show relevant form section
      const method = this.dataset.method
      if (method === "crypto") {
        document.getElementById("cryptoSection").style.display = "block"
      } else if (method === "razer") {
        document.getElementById("razerSection").style.display = "block"
      } else if (method === "itunes") {
        document.getElementById("itunesSection").style.display = "block"
      }

      updateRequiredFields()
    })
  })
})

// Copy wallet address function
function copyWalletAddress() {
  const walletAddress = document.getElementById("ourWalletAddress").textContent
  navigator.clipboard.writeText(walletAddress).then(() => {
    const copyBtn = document.querySelector(".copy-btn")
    const originalHTML = copyBtn.innerHTML
    copyBtn.innerHTML = '<i class="fas fa-check"></i>'
    setTimeout(() => {
      copyBtn.innerHTML = originalHTML
    }, 2000)
  })
}

// File upload preview
document.addEventListener("DOMContentLoaded", () => {
  const fileInputs = document.querySelectorAll('input[type="file"]')

  fileInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const file = this.files[0]
      const placeholder = this.nextElementSibling

      if (file) {
        placeholder.innerHTML = `<i class="fas fa-check"></i><span>File selected: ${file.name}</span>`
        placeholder.style.color = "#10b981"
      }
    })
  })
})

// Testimonials carousel
let currentTestimonial = 0
const testimonials = document.querySelectorAll(".testimonial-card")
const dots = document.querySelectorAll(".dot")

function showTestimonial(index) {
  testimonials.forEach((testimonial) => testimonial.classList.remove("active"))
  dots.forEach((dot) => dot.classList.remove("active"))

  if (testimonials[index]) {
    testimonials[index].classList.add("active")
    dots[index].classList.add("active")
  }
}

function currentSlide(index) {
  currentTestimonial = index - 1
  showTestimonial(currentTestimonial)
}

// Auto-rotate testimonials
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length
  showTestimonial(currentTestimonial)
}, 5000)

// Form submission handling
document.addEventListener("DOMContentLoaded", () => {
  const subscriptionForm = document.getElementById("subscriptionForm")
  const billingForm = document.getElementById("billingForm")

  if (subscriptionForm) {
    subscriptionForm.addEventListener("submit", (e) => {
      e.preventDefault()
      // Get selected payment method
      const selectedPayment = document.querySelector('input[name="payment"]:checked')
      if (selectedPayment) {
        // Redirect to billing page
        window.location.href = "billing.html"
      } else {
        alert("Please select a payment method")
      }
    })
  }

  if (billingForm) {
    billingForm.addEventListener("submit", (e) => {
      e.preventDefault()
      showPendingPayment()
    })
  }
})

function showPendingPayment() {
  // Generate random transaction ID
  const transactionId = "TXN-" + new Date().getFullYear() + "-" + Math.random().toString(36).substr(2, 6).toUpperCase()
  document.getElementById("transactionId").textContent = transactionId

  // Show the pending overlay
  document.getElementById("pendingOverlay").style.display = "flex"

  // Simulate payment processing (optional - for demo purposes)
  setTimeout(() => {
    // You could update the status here or redirect to a success page
    console.log("Payment processing simulation complete")
  }, 10000) // 10 seconds simulation
}

function closePendingScreen() {
  document.getElementById("pendingOverlay").style.display = "none"
}
