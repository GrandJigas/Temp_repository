let canvas = document.getElementById('sandbox');
let context = canvas.getContext('2d');
let R = 300 / 2,
    d, angle, pX, pY, qX, qY;

function drawWatch() {
    context.clearRect(0, 0, 300, 300);

    let circle = new Path2D();

    circle.arc(150, 150, 150, 0, 2 * Math.PI);
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.stroke(circle);


    for (d = 0; d < 60; d++) {
        angle = (d / 60) * (2 * Math.PI);
        pX = Math.cos(angle) * R;
        pY = -Math.sin(angle) * R;
        qX = 0.9 * pX;
        qY = 0.9 * pY;
        pX += R;
        pY += R;
        qX += R;
        qY += R;

        let division = new Path2D();
        division.moveTo(pX, pY);
        division.lineTo(qX, qY);

        context.lineWidth = d % 5 == 0 ? 2 : 1;
        context.stroke(division);
    }

    let date = new Date();
    let hours, minutes, seconds;
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();

    let secondsArrow = new Path2D(),
        minutesArrow = new Path2D(),
        hoursArrow = new Path2D();

    let secondsAngle = (seconds / 60) * (2 * Math.PI);
    let minutesAngle = (minutes / 60) * (2 * Math.PI);
    let hoursAngle = ((hours % 12) / 12) * (2 * Math.PI);

    secondsAngle = Math.PI / 2 - secondsAngle;
    minutesAngle = Math.PI / 2 - minutesAngle;
    hoursAngle = Math.PI / 2 - hoursAngle;

    drawArrow(secondsArrow, secondsAngle, 1, "red", 1);
    drawArrow(minutesArrow, minutesAngle, 0.7, "black", 3);
    drawArrow(hoursArrow, hoursAngle, 0.5, "black", 5);

    setTimeout(drawWatch, 1000);
}

function drawArrow(arrow, angle, length, color, width) {
    pX = Math.cos(angle) * R;
    pY = -Math.sin(angle) * R;
    qX = R;
    qY = R;
    pX *= length;
    pY *= length;
    pX += R;
    pY += R;

    arrow.moveTo(qX, qY);
    arrow.lineTo(pX, pY);
    context.strokeStyle = color;
    context.lineWidth = width;
    context.stroke(arrow);
}

drawWatch();