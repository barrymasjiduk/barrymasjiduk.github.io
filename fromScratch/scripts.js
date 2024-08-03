function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
    } else {
        navMenu.style.display = 'flex';
    }
    
    
}


let dataArray = [];
const date = 0;

document.getElementById('csvFileInput').addEventListener('change', handleFile);

function handleFile() {
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const text = event.target.result;
            dataArray = csvToArray(text);
        };
        reader.readAsText(file);
    } else {
        alert('Please select a CSV file first.');
    }
}

function test(){
    document.getElementById("fajr-begins").innerHTML = dataArray[4,2]; 
}

function csvToArray(csvString) {
    const rows = csvString.trim().split('\n');
    return rows.map(row => row.split(','));
}


function getCurrentMonth() {
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // Get the current month (0-11, adding 1 to make it 1-12)
    return { currentMonth };
}

function getCurrentDate() {
    const now = new Date();
    const currentDate = now.getDate(); // Get the current date (1-31)
    return { currentDate };
}

function updateTime(prayer, type, time) {
    const selector = `[data-time="${prayer}-${type}"]`;
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = time;
    }
}

console.log("done");
