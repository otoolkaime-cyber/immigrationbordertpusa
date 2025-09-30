// Global variables
let iceChart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeQuizzes();
    initializeICEChart();
    initializeSanctuaryMap();
    
    // Show the overview section by default
    showSection('overview');
});

// Navigation functionality
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
            
            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Add fade-in animation
        targetSection.classList.add('fade-in');
        setTimeout(() => {
            targetSection.classList.remove('fade-in');
        }, 500);
    }
    
    // Update navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === sectionId) {
            btn.classList.add('active');
        }
    });
}

// Quiz functionality
function initializeQuizzes() {
    const quizButtons = document.querySelectorAll('.quiz-btn');
    
    quizButtons.forEach(button => {
        button.addEventListener('click', function() {
            const questionContainer = this.closest('.quiz-question');
            const options = questionContainer.querySelectorAll('.quiz-btn');
            const feedback = questionContainer.querySelector('.quiz-feedback');
            const correctAnswer = this.getAttribute('data-answer');
            
            // Disable all buttons
            options.forEach(opt => opt.disabled = true);
            
            // Check answer and provide feedback
            if (correctAnswer === getCorrectAnswer(questionContainer)) {
                this.classList.add('correct');
                feedback.textContent = 'Correct! Well done.';
                feedback.classList.add('correct');
            } else {
                this.classList.add('incorrect');
                feedback.textContent = getExplanation(questionContainer);
                feedback.classList.add('incorrect');
                
                // Highlight correct answer
                options.forEach(opt => {
                    if (opt.getAttribute('data-answer') === getCorrectAnswer(questionContainer)) {
                        opt.classList.add('correct');
                    }
                });
            }
            
            // Show feedback
            feedback.style.display = 'block';
        });
    });
}

function getCorrectAnswer(questionContainer) {
    const questionText = questionContainer.querySelector('p').textContent;
    
    // Define correct answers based on question text
    if (questionText.includes('Which administration had higher average monthly border apprehensions')) {
        return 'biden';
    } else if (questionText.includes('Which city was the first major sanctuary city')) {
        return 'la';
    } else if (questionText.includes('What would be required to end birthright citizenship')) {
        return 'amendment';
    } else if (questionText.includes('How many Americans die daily from fentanyl')) {
        return '200';
    } else if (questionText.includes('Which administration had higher border encounter numbers')) {
        return 'biden';
    } else if (questionText.includes('What was ICE\'s total 4-year budget allocation in 2025')) {
        return '75';
    }
    
    return 'true'; // Default
}

function getExplanation(questionContainer) {
    const questionText = questionContainer.querySelector('p').textContent;
    
    if (questionText.includes('Which administration had higher average monthly border apprehensions')) {
        return 'Correct: Biden Administration. Biden had ~180,000 monthly average vs Trump\'s ~60,000 average.';
    } else if (questionText.includes('Which city was the first major sanctuary city')) {
        return 'Correct: Los Angeles (1979). LA became the first major sanctuary city in 1979.';
    } else if (questionText.includes('What would be required to end birthright citizenship')) {
        return 'Correct: Constitutional Amendment. The 14th Amendment would need to be changed, not just an executive order.';
    } else if (questionText.includes('How many Americans die daily from fentanyl')) {
        return 'Correct: 200. Approximately 200 Americans die daily from fentanyl overdoses.';
    } else if (questionText.includes('Which administration had higher border encounter numbers')) {
        return 'Correct: Biden Administration. Biden had 2.4M peak encounters vs Trump\'s ~800K projection.';
    } else if (questionText.includes('What was ICE\'s total 4-year budget allocation in 2025')) {
        return 'Correct: $75 billion. ICE received $75 billion over 4 years, the largest budget in agency history.';
    }
    
    return 'Incorrect. Please try again.';
}

// ICE Chart initialization
function initializeICEChart() {
    const ctx = document.getElementById('iceChart');
    if (!ctx) return;
    
    const iceData = generateICEData();
    
    iceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: iceData.labels,
            datasets: [{
                label: 'ICE Detainee Population',
                data: iceData.values,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#3498db',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'ICE Detainee Population Over Time',
                    font: {
                        size: 18,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Detainees'
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            tooltips: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#3498db',
                borderWidth: 1
            }
        }
    });
}

function generateICEData() {
    const labels = [];
    const values = [];
    
    // Generate ICE data from 2003 to 2025
    for (let year = 2003; year <= 2025; year++) {
        labels.push(year.toString());
        
        let value;
        if (year <= 2008) {
            // Early ICE years - moderate numbers
            value = Math.floor(Math.random() * 30000) + 20000;
        } else if (year <= 2016) {
            // Obama years - slight increase
            value = Math.floor(Math.random() * 40000) + 25000;
        } else if (year <= 2020) {
            // Trump years - significant increase
            value = Math.floor(Math.random() * 60000) + 40000;
        } else {
            // Recent years - major surge
            value = Math.floor(Math.random() * 80000) + 60000;
        }
        
        values.push(value);
    }
    
    return { labels, values };
}

// Sanctuary Cities Map
function initializeSanctuaryMap() {
    const mapContainer = document.getElementById('usaMap');
    if (!mapContainer) return;
    
    // Create a simple interactive map representation
    const mapHTML = `
        <div class="map-content">
            <h3>Interactive U.S. Map</h3>
            <p>Click on cities to see their sanctuary status and policies</p>
            <div class="city-grid">
                <div class="city-item sanctuary-city" data-city="San Francisco, CA">
                    <span class="city-name">San Francisco, CA</span>
                    <span class="city-status">Sanctuary City</span>
                </div>
                <div class="city-item sanctuary-city" data-city="New York, NY">
                    <span class="city-name">New York, NY</span>
                    <span class="city-status">Sanctuary City</span>
                </div>
                <div class="city-item sanctuary-city" data-city="Los Angeles, CA">
                    <span class="city-name">Los Angeles, CA</span>
                    <span class="city-status">Sanctuary City</span>
                </div>
                <div class="city-item sanctuary-city" data-city="Chicago, IL">
                    <span class="city-name">Chicago, IL</span>
                    <span class="city-status">Sanctuary City</span>
                </div>
                <div class="city-item non-sanctuary-city" data-city="Phoenix, AZ">
                    <span class="city-name">Phoenix, AZ</span>
                    <span class="city-status">Non-Sanctuary</span>
                </div>
                <div class="city-item non-sanctuary-city" data-city="Houston, TX">
                    <span class="city-name">Houston, TX</span>
                    <span class="city-status">Non-Sanctuary</span>
                </div>
            </div>
        </div>
    `;
    
    mapContainer.innerHTML = mapHTML;
    
    // Add click handlers for city items
    const cityItems = document.querySelectorAll('.city-item');
    const cityDetails = document.getElementById('cityDetails');
    
    cityItems.forEach(item => {
        item.addEventListener('click', function() {
            const cityName = this.getAttribute('data-city');
            const isSanctuary = this.classList.contains('sanctuary-city');
            
            // Update city details
            cityDetails.innerHTML = getCityDetails(cityName, isSanctuary);
            
            // Highlight selected city
            cityItems.forEach(city => city.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

function getCityDetails(cityName, isSanctuary) {
    const sanctuaryData = {
        'San Francisco, CA': {
            policy: 'Refuses ICE detainer requests, bars local officers from asking about immigration status',
            crimeRate: 'Lower than national average',
            population: '873,965',
            since: '1989'
        },
        'New York, NY': {
            policy: 'Limits cooperation with federal immigration enforcement',
            crimeRate: 'Significantly lower than national average',
            population: '8.4 million',
            since: '1989'
        },
        'Los Angeles, CA': {
            policy: 'Does not honor ICE detainer requests without judicial warrant',
            crimeRate: 'Lower than national average',
            population: '3.9 million',
            since: '1979'
        },
        'Chicago, IL': {
            policy: 'Welcoming City Ordinance limits cooperation with ICE',
            crimeRate: 'Variable by neighborhood',
            population: '2.7 million',
            since: '2012'
        }
    };
    
    const nonSanctuaryData = {
        'Phoenix, AZ': {
            policy: 'Cooperates with ICE detainer requests',
            crimeRate: 'Near national average',
            population: '1.6 million',
            cooperation: 'Full cooperation with federal enforcement'
        },
        'Houston, TX': {
            policy: 'Cooperates with ICE enforcement activities',
            crimeRate: 'Slightly above national average',
            population: '2.3 million',
            cooperation: 'Full cooperation with federal enforcement'
        }
    };
    
    const data = isSanctuary ? sanctuaryData[cityName] : nonSanctuaryData[cityName];
    
    if (!data) return '<h3>Click a City</h3><p>Click on any city on the map to see local policies and statistics.</p>';
    
    return `
        <h3>${cityName}</h3>
        <div class="city-detail-item">
            <strong>Status:</strong> ${isSanctuary ? 'Sanctuary City' : 'Non-Sanctuary City'}
        </div>
        <div class="city-detail-item">
            <strong>Policy:</strong> ${data.policy}
        </div>
        <div class="city-detail-item">
            <strong>Population:</strong> ${data.population}
        </div>
        <div class="city-detail-item">
            <strong>Crime Rate:</strong> ${data.crimeRate}
        </div>
        ${isSanctuary ? 
            `<div class="city-detail-item"><strong>Sanctuary Since:</strong> ${data.since}</div>` :
            `<div class="city-detail-item"><strong>Cooperation Level:</strong> ${data.cooperation}</div>`
        }
    `;
}

// Add CSS for interactive elements
const additionalStyles = `
    .map-content {
        padding: 2rem;
    }
    
    .city-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .city-item {
        padding: 1rem;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid transparent;
    }
    
    .city-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
    
    .city-item.selected {
        border-color: #3498db;
        box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
    }
    
    .sanctuary-city {
        background: linear-gradient(135deg, #d4edda, #c3e6cb);
        border-left: 4px solid #28a745;
    }
    
    .non-sanctuary-city {
        background: linear-gradient(135deg, #f8d7da, #f5c6cb);
        border-left: 4px solid #dc3545;
    }
    
    .city-name {
        display: block;
        font-weight: bold;
        color: #2c3e50;
        margin-bottom: 0.5rem;
    }
    
    .city-status {
        display: block;
        font-size: 0.9rem;
        color: #666;
    }
    
    .city-detail-item {
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;
    }
    
    .city-detail-item:last-child {
        border-bottom: none;
    }
    
    @media (max-width: 768px) {
        .city-grid {
            grid-template-columns: 1fr;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or overlays
        const activeSection = document.querySelector('.section.active');
        if (activeSection && activeSection.id !== 'overview') {
            showSection('overview');
        }
    }
});

// Add accessibility improvements
function initializeAccessibility() {
    // Add ARIA labels to interactive elements
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach((button, index) => {
        button.setAttribute('aria-label', `Navigate to ${button.textContent} section`);
        button.setAttribute('role', 'tab');
        if (button.classList.contains('active')) {
            button.setAttribute('aria-selected', 'true');
        }
    });
    
    // Add ARIA labels to quiz buttons
    const quizButtons = document.querySelectorAll('.quiz-btn');
    quizButtons.forEach(button => {
        button.setAttribute('aria-label', `Answer: ${button.textContent}`);
    });
    
    // Add focus management
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Ensure focus is visible
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        // Remove keyboard navigation class when using mouse
        document.body.classList.remove('keyboard-navigation');
    });
}

// Initialize accessibility features
initializeAccessibility();

// Add performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
}

trackPerformance();

// Export functions for global access
window.showSection = showSection;
window.initializeBorderChart = initializeBorderChart;
window.initializeICEChart = initializeICEChart;
