document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".services-item");
    const viewMoreGarage = document.querySelector(".view-more-garage");
    const viewMoreDoors = document.querySelector(".view-more-doors");
    const viewMoreWindows = document.querySelector(".view-more-windows");
    const viewMoreGates = document.querySelector(".view-more-gates");
    const formAlert = document.getElementById("form-alert");

    // Initial setup - show only the first of each category
    let counters = { garage: 0, doors: 0, windows: 0, gates: 0 };
    items.forEach(item => {
        if (item.classList.contains("garage")) {
            counters.garage++;
            item.style.display = (counters.garage === 1) ? "block" : "none";
        } else if (item.classList.contains("doors")) {
            counters.doors++;
            item.style.display = (counters.doors === 1) ? "block" : "none";
        } else if (item.classList.contains("windows")) {
            counters.windows++;
            item.style.display = (counters.windows === 1) ? "block" : "none";
        } else if (item.classList.contains("gates")) {
            counters.gates++;
            item.style.display = (counters.gates === 1) ? "block" : "none";
        } else {
            item.style.display = "block";
        }
    });

    // Filter buttons
    buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");
            let seen = { garage: 0, doors: 0, windows: 0, gates: 0 };

            items.forEach(function (item) {
                if (filter === "all") {
                    if (item.classList.contains("garage")) {
                        seen.garage++;
                        item.style.display = (seen.garage === 1) ? "block" : "none";
                    } else if (item.classList.contains("doors")) {
                        seen.doors++;
                        item.style.display = (seen.doors === 1) ? "block" : "none";
                    } else if (item.classList.contains("windows")) {
                        seen.windows++;
                        item.style.display = (seen.windows === 1) ? "block" : "none";
                    } else if (item.classList.contains("gates")) {
                        seen.gates++;
                        item.style.display = (seen.gates === 1) ? "block" : "none";
                    } else {
                        item.style.display = "block";
                    }

                    if (viewMoreGarage) viewMoreGarage.style.display = "block";
                    if (viewMoreDoors) viewMoreDoors.style.display = "block";
                    if (viewMoreWindows) viewMoreWindows.style.display = "block";
                    if (viewMoreGates) viewMoreGates.style.display = "block";

                } else {
                    item.style.display = item.classList.contains(filter) ? "block" : "none";

                    if (viewMoreGarage) viewMoreGarage.style.display = "none";
                    if (viewMoreDoors) viewMoreDoors.style.display = "none";
                    if (viewMoreWindows) viewMoreWindows.style.display = "none";
                    if (viewMoreGates) viewMoreGates.style.display = "none";
                }
            });
        });
    });

    // View more for garage
    if (viewMoreGarage) {
        viewMoreGarage.addEventListener("click", function () {
            document.querySelectorAll('.services-item.garage').forEach(item => {
                item.style.display = "block";
            });
            this.style.display = "none";
        });
    }

    // View more for doors
    if (viewMoreDoors) {
        viewMoreDoors.addEventListener("click", function () {
            document.querySelectorAll('.services-item.doors').forEach(item => {
                item.style.display = "block";
            });
            this.style.display = "none";
        });
    }

    // View more for windows
    if (viewMoreWindows) {
        viewMoreWindows.addEventListener("click", function () {
            document.querySelectorAll('.services-item.windows').forEach(item => {
                item.style.display = "block";
            });
            this.style.display = "none";
        });
    }

    // View more for gates
    if (viewMoreGates) {
        viewMoreGates.addEventListener("click", function () {
            document.querySelectorAll('.services-item.gates').forEach(item => {
                item.style.display = "block";
            });
            this.style.display = "none";
        });
    }

    // EmailJS Contact Form Submission with popup confirmation
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Show loading state
            formAlert.classList.remove("d-none", "alert-success", "alert-danger");
            formAlert.classList.add("alert-info");
            formAlert.textContent = "Sending your message...";

            emailjs.sendForm("service_bfr0lcm", "template_bq4g9vn", contactForm)
                .then(function () {
                    // Success message
                    formAlert.classList.remove("alert-info");
                    formAlert.classList.add("alert-success");
                    formAlert.innerHTML = `
                        <i class="bi bi-check-circle-fill me-2"></i>
                        Message sent successfully! We'll get back to you soon.
                    `;
                    contactForm.reset();
                    
                    // Hide the alert after 5 seconds
                    setTimeout(() => {
                        formAlert.classList.add("d-none");
                    }, 5000);
                }, function (error) {
                    // Error message
                    formAlert.classList.remove("alert-info");
                    formAlert.classList.add("alert-danger");
                    formAlert.innerHTML = `
                        <i class="bi bi-exclamation-triangle-fill me-2"></i>
                        Message failed to send. Please try again later.
                    `;
                    
                    // Hide the alert after 5 seconds
                    setTimeout(() => {
                        formAlert.classList.add("d-none");
                    }, 5000);
                });
        });
    }
});