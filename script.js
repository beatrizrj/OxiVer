// Fetch Patients from Backend
function loadPatients() {
    fetch("http://localhost:3000/patients")
        .then(response => response.json())
        .then(data => {
            const patientList = document.querySelector(".patient-list");
            patientList.innerHTML = "";
            data.forEach(patient => {
                patientList.innerHTML += `
                    <div class="patient">
                        <div class="avatar"></div>
                        <p>${patient.name}</p>
                        <p>SNS: ${patient.sns}</p>
                        <span class="status ${patient.status}" onclick="toggleStatus(${patient.id}, this)"></span>
                    </div>
                `;
            });
        });
}

// Load patients on page load
loadPatients();

// Toggle Activity State
function toggleStatus(id, element) {
    let newStatus = element.classList.contains("active") ? "inactive" : "active";
    fetch(`http://localhost:3000/patients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
    })
    .then(() => loadPatients());
}

// Search SNS Number (Filters patient list)
document.querySelector(".search-btn").addEventListener("click", function() {
    let input = document.getElementById("sns-search").value.trim();
    let patients = document.querySelectorAll(".patient");

    patients.forEach(patient => {
        let snsText = patient.querySelector("p:nth-of-type(2)").textContent;
        if (snsText.includes(input) || input === "") {
            patient.style.display = "flex";
        } else {
            patient.style.display = "none";
        }
    });
});
