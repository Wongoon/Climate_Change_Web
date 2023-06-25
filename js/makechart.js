function TemperatureGraph(csvdata) {
    const label = csvdata.map(d => d.year);
    const data = csvdata.map(d => d.AverageTemperature);
    const ctx = document.getElementById('temperature_graph').getContext('2d');
    const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient1.addColorStop(0, '#ff5555ff');
    gradient1.addColorStop(1, '#ffff55ff');
    const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient2.addColorStop(0, '#ff5555db');
    gradient2.addColorStop(1, '#ff0000db');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: label,
            datasets: [
                {
                    label: 'Surfacer Temperature',
                    data: data,
                    borderColor: gradient1,
                    backgroundColor: gradient2,
                    pointRadius: 0,
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Spoqa Han Sans Neo',
                            size: 14
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Surface Temperature Change by Year',
                    font: {
                        family: 'Spoqa Han Sans Neo',
                        size: 16
                    }
                }
            },
        },
    })
}

function TemperatureMap(csvdata) {
    const url = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
    fetch(url).then(result => result.json()).then((datapoint) => {
        const countries = ChartGeo.topojson.feature(datapoint, datapoint.objects.countries).features;
        const countrylist = countries.map(country => country.properties.name);
        let max = 0;
        const m = new Map();
        for (let i of countrylist) {
            let t = 0;
            for (let j of csvdata) {
                if (i == j.Country) {
                    let num = Math.round(j.AverageTemperature * 1000) / 1000;
                    t = i;
                    m.set(i, num);
                    if(max < num) {
                        max = num;
                    }
                }
            }
            if (t === 0) m.set(i, 0);
        }
        const data = {
            labels: countrylist,
            datasets: [
                {
                    label: '국가',
                    data: countries.map(country => ({ feature: country, value: m.get(country.properties.name) })),
                    hoverBackgroundColor: '#695cfeff',
                }
            ]
        };
        const ctx = document.getElementById('world_map');
        const chart = new Chart(ctx, {
            type: 'choropleth',
            data,
            options: {
                showOutline: true,
                showGraticule: true,
                scales: {
                    xy: {
                        projection: 'equalEarth'
                    },
                    color: {
                        interpolate: (v) => {
                            if(v / max * 100 < 0.05){
                                return '#f8f8ff';
                            }
                            else if(v / max * 100 < 0.1){
                                return '#f2f1ff';
                            }
                            else if(v / max * 100 < 0.15){
                                return '#eceaff';
                            }
                            else if(v / max * 100 < 0.2){
                                return '#e5e2ff';
                            }
                            else if(v / max * 100 < 0.25){
                                return '#dedbff';
                            }
                            else if(v / max * 100 < 0.3){
                                return '#d7d3ff';
                            }
                            else if(v / max * 100 < 0.35){
                                return '#d0cbfe';
                            }
                            else if(v / max * 100 < 0.4){
                                return '#c9c4ff';
                            }
                            else if(v / max * 100 < 0.45){
                                return '#c2bdff';
                            }
                            else if(v / max * 100 < 0.5){
                                return '#bdb7ff';
                            }
                            else if(v / max * 100 < 0.55){
                                return '#b7b0ff';
                            }
                            else if(v / max * 100 < 0.6){
                                return '#aea7fe';
                            }
                            else if(v / max * 100 < 0.65){
                                return '#a7a0fe';
                            }
                            else if(v / max * 100 < 0.7){
                                return '#a198fe';
                            }
                            else if(v / max * 100 < 0.75){
                                return '#9c93ff';
                            }
                            else if(v / max * 100 < 0.8){
                                return '#938afe';
                            }
                            else if(v / max * 100 < 0.85){
                                return '#8c82fe';
                            }
                            else if(v / max * 100 < 0.9){
                                return '#857bfe';
                            }
                            else if(v / max * 100 < 0.95){
                                return '#8176ff';
                            }
                            else{
                                return '#786cfe';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Surface Temperature Change by Country',
                        font: {
                            family: 'Spoqa Han Sans Neo',
                            size: 16
                        }
                    }
                }
            }
        });
    });
}

function SealevelGraph(csvdata) {
    const label = csvdata.map(d => d.year);
    const data = csvdata.map(d => d.sealevel);
    const ctx = document.getElementById('sealevel_graph').getContext('2d');
    const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient1.addColorStop(0, '#55ffffff');
    gradient1.addColorStop(1, '#5555ffff');
    const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient2.addColorStop(0, '#55ffffff');
    gradient2.addColorStop(1, '#5555ffff');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [
                {
                    label: 'Sea Level Change',
                    data: data,
                    borderColor: gradient1,
                    backgroundColor: gradient2,
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        filter: function (label) {
                            if (label.text === 'Sea Level Change') return true;
                        },
                        font: {
                            family: 'Spoqa Han Sans Neo',
                            size: 14
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Sea Level Change by Year',
                    font: {
                        family: 'Spoqa Han Sans Neo',
                        size: 16
                    }
                }
            },
        },
    });
}

function DisasterGraph(csvdata) {
    const label = Array.from(new Set(csvdata.map(d => d.Year)));
    function data(str) {
        const d = csvdata.map(function (d) {
            if (d.Type == str) return d.Frequency;
            else return 2e9;
        });
        return d.filter(x => x < 2e9);
    }
    const ctx = document.getElementById('disaster_graph');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: label,
            datasets: [
                {
                    label: 'Flood',
                    data: data('Flood'),
                    borderColor: '#ff5555ff',
                    backgroundColor: '#ff5555db',
                },
                {
                    label: 'Storm',
                    data: data('Storm'),
                    borderColor: '#55ff55ff',
                    backgroundColor: '#55ff55db',
                },
                {
                    label: 'Drought',
                    data: data('Drought'),
                    borderColor: '#5555ffff',
                    backgroundColor: '#5555ffdb',
                },
                {
                    label: 'Earthquake',
                    data: data('Earthquake'),
                    borderColor: '#ff55ffff',
                    backgroundColor: '#ff55ffdb',
                },
                {
                    label: 'Landslide',
                    data: data('Landslide'),
                    borderColor: '#55ffffff',
                    backgroundColor: '#55ffffdb',
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Spoqa Han Sans Neo',
                            size: 14
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Disaster by Year',
                    font: {
                        family: 'Spoqa Han Sans Neo',
                        size: 16
                    }
                }
            },
        },
    });
}

function GreenhouseGraph(csvdata) {
    const label = Array.from(new Set(csvdata.map(d => d.year)));
    function data(str) {
        const d = csvdata.map(function (d) {
            if (d.category == str) return d.value;
            else return 2e9;
        });
        const a = d.filter(x => x < 2e9);
        const m = Math.max(...a);
        const b = a.map(x => x / m * 100);
        return b;
    }
    const ctx = document.getElementById('greenhousegas_graph');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: label,
            datasets: [
                {
                    label: 'CO2',
                    data: data('CO2'),
                    borderColor: '#ff5555ff',
                    backgroundColor: '#ff5555db',
                },
                {
                    label: 'CH4',
                    data: data('CH4'),
                    borderColor: '#ff8c55ff',
                    backgroundColor: '#ff8c55db',
                },
                {
                    label: 'N2O',
                    data: data('N2O'),
                    borderColor: '#ffff00ff',
                    backgroundColor: '#ffff00db',
                },
                {
                    label: 'HFCs',
                    data: data('HFCs'),
                    borderColor: '#55ff55ff',
                    backgroundColor: '#55ff55db',
                },
                {
                    label: 'PFCs',
                    data: data('PFCs'),
                    borderColor: '#55ffffff',
                    backgroundColor: '#55ffffdb',
                },
                {
                    label: 'SF6',
                    data: data('SF6'),
                    borderColor: '#5555ffff',
                    backgroundColor: '#5555ffdb',
                },
                {
                    label: 'NF3',
                    data: data('NF3'),
                    borderColor: '#4b5582ff',
                    backgroundColor: '#4b5582db',
                },
                {
                    label: 'GHG',
                    data: data('GHG'),
                    borderColor: '#805580ff',
                    backgroundColor: '#805580db',
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Spoqa Han Sans Neo',
                            size: 14
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Greenhouse Gas Change by Year',
                    font: {
                        family: 'Spoqa Han Sans Neo',
                        size: 16
                    }
                }
            },
            scales: {
                y: {
                    stacked: true,
                }
            }
        },
    });
}