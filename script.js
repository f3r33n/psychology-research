// script.js

document.addEventListener('DOMContentLoaded', () => {
    const brandColors = {
        dark: '#03045E',
        main: '#0077B6',
        light: '#00B4D8',
        soft: '#90E0EF',
        softer: '#CAF0F8',
        white: '#FFFFFF'
    };

    // Function to wrap long labels for Chart.js
    function wrapLabels(label) {
        const maxLen = 16; // Maximum characters per line
        if (typeof label !== 'string' || label.length <= maxLen) {
            return label;
        }
        const words = label.split(' ');
        let lines = [];
        let currentLine = '';
        for (const word of words) {
            // Check if adding the next word exceeds the max length
            if ((currentLine + ' ' + word).length > maxLen && currentLine.length > 0) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                // Add the word to the current line
                currentLine = currentLine ? currentLine + ' ' + word : word;
            }
        }
        lines.push(currentLine); // Add the last line
        return lines;
    }

    // Tooltip callback function for Chart.js to handle wrapped labels
    const tooltipTitleCallback = (tooltipItems) => {
        const item = tooltipItems[0];
        let label = item.chart.data.labels[item.dataIndex];
        if (Array.isArray(label)) {
            // If the label is an array (multiline), join it with spaces for the tooltip
            return label.join(' ');
        }
        return label; // Otherwise, return as is
    };
    
    // Default options for all Chart.js instances
    const defaultChartOptions = {
        responsive: true,
        maintainAspectRatio: false, // Important for charts to respect container dimensions
        plugins: {
            legend: {
                labels: {
                    color: brandColors.dark,
                    font: {
                        family: "'Inter', sans-serif"
                    }
                }
            },
            tooltip: {
                callbacks: {
                    title: tooltipTitleCallback // Apply the custom tooltip title callback
                }
            }
        },
        scales: {
            r: { // Specific for Radar chart
                angleLines: { color: 'rgba(3, 4, 94, 0.2)' },
                grid: { color: 'rgba(3, 4, 94, 0.2)' },
                pointLabels: {
                    color: brandColors.dark,
                    font: { size: 12, family: "'Inter', sans-serif" }
                },
                ticks: {
                    color: brandColors.main,
                    backdropColor: 'rgba(255, 255, 255, 0.75)'
                }
            },
            y: { // For Bar and other charts with Y-axis
                ticks: { color: brandColors.dark },
                grid: { color: 'rgba(3, 4, 94, 0.1)' }
            },
            x: { // For Bar and other charts with X-axis
                ticks: { color: brandColors.dark },
                grid: { color: 'rgba(3, 4, 94, 0.1)' }
            }
        }
    };

    // Attachment Style Chart (Doughnut)
    new Chart(document.getElementById('attachmentStyleChart'), {
        type: 'doughnut',
        data: {
            labels: ['Secure', 'Anxious', 'Avoidant', 'Disorganized'],
            datasets: [{
                label: 'Attachment Styles',
                data: [55, 20, 23, 2], // Example data based on general prevalence
                backgroundColor: [brandColors.main, brandColors.light, brandColors.soft, brandColors.dark],
                borderColor: brandColors.white,
                borderWidth: 4
            }]
        },
        options: { ...defaultChartOptions, cutout: '60%' } // Doughnut specific option
    });
    
    // Self-Efficacy Chart (Radar)
    new Chart(document.getElementById('selfEfficacyChart'), {
        type: 'radar',
        data: {
            labels: [
                wrapLabels('Mastery Experiences'),
                wrapLabels('Vicarious Experiences (Social Modeling)'),
                wrapLabels('Social Persuasion'),
                wrapLabels('Physiological Factors')
            ],
            datasets: [
                {
                    label: 'Low Self-Efficacy',
                    data: [3, 4, 2, 2], // Example data for low self-efficacy
                    backgroundColor: 'rgba(202, 240, 248, 0.5)',
                    borderColor: brandColors.soft,
                    pointBackgroundColor: brandColors.soft
                },
                {
                    label: 'High Self-Efficacy',
                    data: [9, 8, 7, 8], // Example data for high self-efficacy
                    backgroundColor: 'rgba(0, 180, 216, 0.5)',
                    borderColor: brandColors.light,
                    pointBackgroundColor: brandColors.light
                }
            ]
        },
        options: defaultChartOptions
    });

    // Personality Traits Chart (Horizontal Bar)
    new Chart(document.getElementById('personalityTraitsChart'), {
        type: 'bar',
        data: {
            labels: [
                wrapLabels('High Neuroticism'),
                wrapLabels('Low Openness to Experience'),
                wrapLabels('Introversion (Energy Management)')
            ],
            datasets: [{
                label: 'Impact on Avoiding New Situations (Scale 1-10)',
                data: [9, 8, 6], // Example data for impact level
                backgroundColor: [brandColors.dark, brandColors.main, brandColors.light],
                borderRadius: 4
            }]
        },
        options: {
            ...defaultChartOptions,
            indexAxis: 'y', // Make it a horizontal bar chart
            scales: {
                x: {
                    beginAtZero: true,
                    suggestedMax: 10, // Max value for the scale
                    ticks: { color: brandColors.dark },
                    grid: { color: 'rgba(3, 4, 94, 0.1)' }
                },
                y: {
                    ticks: { color: brandColors.dark },
                    grid: { color: 'rgba(3, 4, 94, 0.1)' }
                }
            }
        }
    });

    // Disorder Comparison Chart (Polar Area)
    new Chart(document.getElementById('disorderComparisonChart'), {
        type: 'polarArea',
        data: {
            labels: [
                wrapLabels('Shyness'),
                wrapLabels('Social Anxiety Disorder (SAD)'),
                wrapLabels('Dependent Personality Disorder (DPD)')
            ],
            datasets: [{
                label: 'Severity/Impact Level',
                data: [4, 9, 7], // Example data for severity
                backgroundColor: [
                    'rgba(144, 224, 239, 0.7)', // soft blue
                    'rgba(3, 4, 94, 0.7)',    // dark blue
                    'rgba(0, 119, 182, 0.7)'  // main blue
                ],
                borderColor: brandColors.white,
                borderWidth: 2
            }]
        },
        options: defaultChartOptions
    });
});
