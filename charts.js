
document.getElementById("solde").innerHTML = moneyAtStart;
document.getElementById("bet").innerHTML = firstBet;
document.getElementById("iteration").innerHTML = iteration;
document.getElementById("sequence").innerHTML = sequence;

if (!isTest) {

    Highcharts.chart('container', {

        title: {
            text: 'Evolution des gains (technique Martingale)'
        },
        subtitle: {
            text: 'Sur ' + iteration + ' lancé de roulette'
        },
        yAxis: {
            title: {
                text: 'Gains en $'
            }
        },
        xAxis: {
            title: {
                text: 'Nombre de lancé de roulette'
            }
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom'
        },

        series: [{
            name: 'Tirage 1',
            data: dataCollected
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });

} else {
    document.getElementById("container").innerHTML = "No graph ... [isTest = true]";
}