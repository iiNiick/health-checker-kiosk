const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw5EXghNxkPNNJpUWPdv5GiYtLmPnMMFWajVkwZXcUlufm_lCsAjsi18_ZDnWrvjJoQIA/exec';

const slides = document.querySelectorAll('.hero-slider .slide');
let currentSlideIndex = 0;

function rotateSlides() {
    slides[currentSlideIndex].classList.remove('active');
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    slides[currentSlideIndex].classList.add('active');
}
setInterval(rotateSlides, 4000); 

document.getElementById('bmiForm').addEventListener('reset', function () {
    document.getElementById('meterDisplay').classList.add('hidden');
    document.getElementById('meterPrompt').classList.remove('hidden');
});

document.getElementById('bmiForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const sexInput = document.getElementById('sex');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');

    const elementsList = [
        { el: nameInput, tag: 'Full Name' },
        { el: ageInput, tag: 'Age' },
        { el: sexInput, tag: 'Sex' },
        { el: weightInput, tag: 'Weight' },
        { el: heightInput, tag: 'Height' }
    ];

    let missingElements = [];
    elementsList.forEach(item => {
        if (!item.el.value.trim()) {
            missingElements.push(item.tag);
        }
    });

    if (missingElements.length > 0) {
        alert('Please fill out the missing fields:\n• ' + missingElements.join('\n• '));
        return;
    }

    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value);
    const sex = sexInput.value;
    const weight = parseFloat(weightInput.value);
    const heightCm = parseFloat(heightInput.value);

    if (isNaN(age) || age < 1 || age > 120) {
        alert('Please provide a valid institutional age parameter (1 - 120).');
        return;
    }
    if (weight <= 0 || heightCm <= 0) {
        alert('Weight and height parameters must be greater than zero.');
        return;
    }

    const heightM = heightCm / 100;
    const bmi = +(weight / (heightM * heightM)).toFixed(1);

    let category = '';
    let message = '';
    let color = '';
    let pointerPercentage = 0;

    switch (true) {
        case (bmi < 18.5):
            category = 'Underweight';
            color = '#f97316'; 
            message = 'Your weight is below the standard index. Consider consulting a nutritionist to build a nutrient-dense meal regimen.';
            pointerPercentage = Math.min(Math.max((bmi / 18.5) * 25, 3), 23);
            break;
            
        case (bmi < 25.0):
            category = 'Normal';
            color = '#10b981'; 
            message = 'Excellent baseline metrics! Your values indicate ideal height-to-weight alignment. Keep maintaining a balanced active lifestyle.';
            pointerPercentage = 25 + ((bmi - 18.5) / (25.0 - 18.5)) * 35;
            break;
            
        case (bmi < 30.0):
            category = 'Overweight';
            color = '#f97316'; 
            message = 'Your index indicates a slightly elevated profile. Small increases in functional movement or cardiovascular routines can provide wonderful health dividends.';
            pointerPercentage = 60 + ((bmi - 25.0) / (30.0 - 25.0)) * 20;
            break;
            
        default:
            category = 'Obese';
            color = '#ef4444'; 
            message = 'For personalized systemic guidance, consider scheduling a comprehensive wellness baseline consultation with a primary health care provider.';
            pointerPercentage = 80 + Math.min(((bmi - 30.0) / 15) * 20, 17);
            break;
    }
    
    renderGaugeDisplay(name, bmi, category, message, color, pointerPercentage);
    
    syncWithDatabase({ name, age, sex, weight, heightCm, bmi, category });
});

function renderGaugeDisplay(name, bmi, category, message, color, percentage) {
    document.getElementById('meterPrompt').classList.add('hidden');

    const display = document.getElementById('meterDisplay');
    display.classList.remove('hidden');

    document.getElementById('resultName').innerText = `Assessment for ${name}`;
    document.getElementById('bmiScore').innerText = bmi;

    const badge = document.getElementById('categoryBadge');
    badge.innerText = category;
    badge.style.backgroundColor = color;

    document.getElementById('recommendationText').innerText = message;

    const pointer = document.getElementById('gaugePointer');
    pointer.style.left = `${percentage}%`;
}

function syncWithDatabase(payload) {
    const statusAlert = document.getElementById('statusAlert');
    const btn = document.getElementById('submitBtn');

    btn.disabled = true;
    btn.innerHTML = `<span>Syncing...</span>`;

    fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(() => {
        statusAlert.className = "status-alert status-success";
        statusAlert.innerText = "Assessment successfully logged to secure telemetry matrix.";
        statusAlert.classList.remove('hidden');
        setTimeout(() => statusAlert.classList.add('hidden'), 4000);
    })
    .catch(err => {
        console.error('Remote storage failure:', err);
        statusAlert.className = "status-alert status-error";
        statusAlert.innerText = "Local processing ready, telemetry upload timed out.";
        statusAlert.classList.remove('hidden');
    })
    .finally(() => {
        btn.disabled = false;
        btn.innerHTML = `<span>Check My BMI</span><span class="btn-arrow">&rarr;</span>`;
    });
}