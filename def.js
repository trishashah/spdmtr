(function () {
    "use strict";
    
}());

var iCurrentSpeed = 20,
    iTargetSpeed = 20,
    bDecrement = null,
    job = null;

function degToRad(angle) {
     return ((angle * Math.PI) / 180);
}



function drawLine(options, line) {
    options.ctx.beginPath();
    options.ctx.globalAlpha = line.alpha;
    options.ctx.lineWidth = line.lineWidth;
    options.ctx.fillStyle = line.fillStyle;
    options.ctx.strokeStyle = line.fillStyle;
    options.ctx.moveTo(line.from.X,
        line.from.Y);
    options.ctx.lineTo(
        line.to.X,
        line.to.Y
    );

    options.ctx.stroke();
}

function createLine(fromX, fromY, toX, toY, fillStyle, lineWidth, alpha) {
    return {
        from: {
            X: fromX,
            Y: fromY
        },
        to:    {
            X: toX,
            Y: toY
        },
        fillStyle: fillStyle,
        lineWidth: lineWidth,
        alpha: alpha
    };
}

function drawOuterMetallicArc(options) {
   }

function drawInnerMetallicArc(options) {
   }

function drawMetallicArc(options) {
    drawOuterMetallicArc(options);
    drawInnerMetallicArc(options);
}

function drawBackground(options) {
   var i = 0;

    options.ctx.globalAlpha = 0.2;
    options.ctx.fillStyle = "rgb(0,0,0)";

    
    for (i = 170; i < 180; i++) {
        options.ctx.beginPath();

        options.ctx.arc(options.center.X,
            options.center.Y,
            i,
            0,
            Math.PI,
            true);

        options.ctx.fill();
    }
    
}

function applyDefaultContextSettings(options) {
     options.ctx.lineWidth = 2;
    options.ctx.globalAlpha = 0.5;
    options.ctx.strokeStyle = "rgb(255, 255, 255)";
    options.ctx.fillStyle = 'rgb(255,255,255)';
}

function drawSmallTickMarks(options) {
     var tickvalue = options.levelRadius - 8,
        iTick = 0,
        gaugeOptions = options.gaugeOptions,
        iTickRad = 0,
        onArchX,
        onArchY,
        innerTickX,
        innerTickY,
        fromX,
        fromY,
        line,
        toX,
        toY;

    applyDefaultContextSettings(options);


    for (iTick = 10; iTick < 180; iTick += 20) {

        iTickRad = degToRad(iTick);

        onArchX = gaugeOptions.radius - (Math.cos(iTickRad) * tickvalue);
        onArchY = gaugeOptions.radius - (Math.sin(iTickRad) * tickvalue);
        innerTickX = gaugeOptions.radius - (Math.cos(iTickRad) * gaugeOptions.radius);
        innerTickY = gaugeOptions.radius - (Math.sin(iTickRad) * gaugeOptions.radius);

        fromX = (options.center.X - gaugeOptions.radius) + onArchX;
        fromY = (gaugeOptions.center.Y - gaugeOptions.radius) + onArchY;
        toX = (options.center.X - gaugeOptions.radius) + innerTickX;
        toY = (gaugeOptions.center.Y - gaugeOptions.radius) + innerTickY;
        line = createLine(fromX, fromY, toX, toY, "rgb(127,127,127)", 3, 0.6);
        drawLine(options, line);

    }
}

function drawLargeTickMarks(options) {
   

    var tickvalue = options.levelRadius - 8,
        iTick = 0,
        gaugeOptions = options.gaugeOptions,
        iTickRad = 0,
        innerTickY,
        innerTickX,
        onArchX,
        onArchY,
        fromX,
        fromY,
        toX,
        toY,
        line;

    applyDefaultContextSettings(options);

    tickvalue = options.levelRadius - 2;

    for (iTick = 20; iTick < 180; iTick += 20) {

        iTickRad = degToRad(iTick);

        onArchX = gaugeOptions.radius - (Math.cos(iTickRad) * tickvalue);
        onArchY = gaugeOptions.radius - (Math.sin(iTickRad) * tickvalue);
        innerTickX = gaugeOptions.radius - (Math.cos(iTickRad) * gaugeOptions.radius);
        innerTickY = gaugeOptions.radius - (Math.sin(iTickRad) * gaugeOptions.radius);

        fromX = (options.center.X - gaugeOptions.radius) + onArchX;
        fromY = (gaugeOptions.center.Y - gaugeOptions.radius) + onArchY;
        toX = (options.center.X - gaugeOptions.radius) + innerTickX;
        toY = (gaugeOptions.center.Y - gaugeOptions.radius) + innerTickY;

        line = createLine(fromX, fromY, toX, toY, "rgb(127,127,127)", 3, 0.6);

        drawLine(options, line);
    }
}

function drawTicks(options) {
   
    drawSmallTickMarks(options);
    drawLargeTickMarks(options);
}

function drawTextMarkers(options) {
   
    var innerTickX = 0,
        innerTickY = 0,
        iTick = 0,
        gaugeOptions = options.gaugeOptions,
        iTickToPrint = 00;

    applyDefaultContextSettings(options);

    
    options.ctx.font = 'italic 10px arial';
    options.ctx.textBaseline = 'top';

    options.ctx.beginPath();

    for (iTick = 10; iTick < 180; iTick += 20) {

        innerTickX = gaugeOptions.radius - (Math.cos(degToRad(iTick)) * gaugeOptions.radius);
        innerTickY = gaugeOptions.radius - (Math.sin(degToRad(iTick)) * gaugeOptions.radius);

        if (iTick <= 10) {
            options.ctx.fillText(iTickToPrint, (options.center.X - gaugeOptions.radius - 12) + innerTickX,
                    (gaugeOptions.center.Y - gaugeOptions.radius - 12) + innerTickY + 5);
        } else if (iTick < 50) {
            options.ctx.fillText(iTickToPrint, (options.center.X - gaugeOptions.radius - 12) + innerTickX - 5,
                    (gaugeOptions.center.Y - gaugeOptions.radius - 12) + innerTickY + 5);
        } else if (iTick < 90) {
            options.ctx.fillText(iTickToPrint, (options.center.X - gaugeOptions.radius - 12) + innerTickX,
                    (gaugeOptions.center.Y - gaugeOptions.radius - 12) + innerTickY);
        } else if (iTick === 90) {
            options.ctx.fillText(iTickToPrint, (options.center.X - gaugeOptions.radius - 12) + innerTickX + 4,
                    (gaugeOptions.center.Y - gaugeOptions.radius - 12) + innerTickY);
        } else if (iTick < 145) {
            options.ctx.fillText(iTickToPrint, (options.center.X - gaugeOptions.radius - 12) + innerTickX + 10,
                    (gaugeOptions.center.Y - gaugeOptions.radius - 12) + innerTickY);
        } else {
            options.ctx.fillText(iTickToPrint, (options.center.X - gaugeOptions.radius - 12) + innerTickX + 15,
                    (gaugeOptions.center.Y - gaugeOptions.radius - 12) + innerTickY + 5);
        }

         iTickToPrint += 10;
    }

    options.ctx.stroke();
}

function drawSpeedometerPart(options, alphaValue, strokeStyle, startPos) {
    

    options.ctx.beginPath();

    options.ctx.globalAlpha = alphaValue;
    options.ctx.lineWidth = 5;
    options.ctx.strokeStyle = strokeStyle;

    options.ctx.arc(options.center.X,
        options.center.Y,
        options.levelRadius,
        Math.PI + (Math.PI / 360 * startPos),
        0 - (Math.PI / 360 * 10),
        false);

    options.ctx.stroke();
}

function drawSpeedometerColourArc(options) {
   
    var startOfRed = 10,
        endOfRed = 200,
        endOfMaroon = 280;

    drawSpeedometerPart(options, 1.0, "rgb(255,169,0)", startOfRed);
    drawSpeedometerPart(options, 0.9, "rgb(255,0,0)", endOfRed);
    drawSpeedometerPart(options, 0.9, "rgb(128,0,0) ", endOfMaroon);

}

function drawNeedleDial(options, alphaValue, strokeStyle, fillStyle) {
  
    var i = 0;

    options.ctx.globalAlpha = alphaValue;
    options.ctx.lineWidth = 3;
    options.ctx.strokeStyle = strokeStyle;
    options.ctx.fillStyle = fillStyle;
 for (i = 0; i < 30; i++) {

        options.ctx.beginPath();
        options.ctx.arc(options.center.X,
            options.center.Y,
            i,
            0,
            Math.PI,
            true);

        options.ctx.fill();
        options.ctx.stroke();
    }
}

function convertSpeedToAngle(options) {
   
    var iSpeed = (options.speed / 10),
        iSpeedAsAngle = ((iSpeed * 20) + 10) % 180;
    if (iSpeedAsAngle > 180) {
        iSpeedAsAngle = iSpeedAsAngle - 180;
    } else if (iSpeedAsAngle < 0) {
        iSpeedAsAngle = iSpeedAsAngle + 180;
    }

    return iSpeedAsAngle;
}

function drawNeedle(options) {
    

    var iSpeedAsAngle = convertSpeedToAngle(options),
        iSpeedAsAngleRad = degToRad(iSpeedAsAngle),
        gaugeOptions = options.gaugeOptions,
        innerTickX = gaugeOptions.radius - (Math.cos(iSpeedAsAngleRad) * 20),
        innerTickY = gaugeOptions.radius - (Math.sin(iSpeedAsAngleRad) * 20),
        fromX = (options.center.X - gaugeOptions.radius) + innerTickX,
        fromY = (gaugeOptions.center.Y - gaugeOptions.radius) + innerTickY,
        endNeedleX = gaugeOptions.radius - (Math.cos(iSpeedAsAngleRad) * gaugeOptions.radius),
        endNeedleY = gaugeOptions.radius - (Math.sin(iSpeedAsAngleRad) * gaugeOptions.radius),
        toX = (options.center.X - gaugeOptions.radius) + endNeedleX,
        toY = (gaugeOptions.center.Y - gaugeOptions.radius) + endNeedleY,
        line = createLine(fromX, fromY, toX, toY, "rgb(127, 127, 127)", 5, 0.6);

    drawLine(options, line);
    drawNeedleDial(options, 0.6, "rgb(127, 127, 127)", "rgb(255,255,255)");
    drawNeedleDial(options, 0.2, "rgb(127, 127, 127)", "rgb(127,127,127)");

}

function buildOptionsAsJSON(canvas, iSpeed) {
   

    var centerX = 210,
        centerY = 210,
        radius = 150,
        outerRadius = 200;

    
    return {
        ctx: canvas.getContext('2d'),
        speed: iSpeed,
        center:    {
            X: centerX,
            Y: centerY
        },
        levelRadius: radius - 10,
        gaugeOptions: {
            center:    {
                X: centerX,
                Y: centerY
            },
            radius: radius
        },
        radius: outerRadius
    };
}

function clearCanvas(options) {
    options.ctx.clearRect(0, 0, 800, 600);
    applyDefaultContextSettings(options);
}

function draw() {
      
    console.log('Target: ' + iTargetSpeed);
    console.log('Current: ' + iCurrentSpeed);
    var canvas = document.getElementById('speedometer'),
        options = null;
if (canvas !== null && canvas.getContext) {
        options = buildOptionsAsJSON(canvas, iCurrentSpeed);

        
        clearCanvas(options);
        drawMetallicArc(options);
        drawBackground(options);
        drawTicks(options);
        drawTextMarkers(options);
        drawSpeedometerColourArc(options);
        drawNeedle(options);
        
    } else {
        alert("Canvas not supported by your browser!");
    }
    
    if(iTargetSpeed == iCurrentSpeed) {
        clearTimeout(job);
        return;
    } else if(iTargetSpeed < iCurrentSpeed) {
        bDecrement = true;
    } else if(iTargetSpeed > iCurrentSpeed) {
        bDecrement = false;
    }
    
    if(bDecrement) {
        if(iCurrentSpeed - 10 < iTargetSpeed)
            iCurrentSpeed = iCurrentSpeed - 1;
        else
            iCurrentSpeed = iCurrentSpeed - 5;
    } else {
    
        if(iCurrentSpeed + 10 > iTargetSpeed)
            iCurrentSpeed = iCurrentSpeed + 1;
        else
            iCurrentSpeed = iCurrentSpeed + 5;
    }
    
    job = setTimeout("draw()", 5);
}

function drawWithInputValue() {

    var txtSpeed = document.getElementById('txtSpeed');

    if (txtSpeed !== null) {

        iTargetSpeed = txtSpeed.value;

        // Sanity checks
        if (isNaN(iTargetSpeed)) {
            iTargetSpeed = 0;
        } else if (iTargetSpeed < 0) {
            iTargetSpeed = 0;
        } else if (iTargetSpeed > 80) {
            iTargetSpeed = 80;
        }

        job = setTimeout("draw()", 5);
 
    }
}


