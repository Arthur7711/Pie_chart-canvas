let data = [
    {name:'Targaryen', troops:90200},
    {name:'Tully', troops:15000},
    {name:'Stark', troops:50500},
    {name:'Lannister', troops:120800},
    {name:'Mormont', troops:16000}
];

const randomHexColorCode = () => {
    return "#" + Math.random().toString(16).slice(2, 8)
};

document.addEventListener('DOMContentLoaded', ()=>{
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    let total = data.reduce( (ttl, house) => {
        return ttl + house.troops
    }, 0);
    let startAngle = 0; 
    let radius = 100;
    let cx = canvas.width/2;
    let cy = canvas.height/2;
    
    data.forEach( house => {
        //set the styles before beginPath
        ctx.fillStyle = randomHexColorCode();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#333';
        ctx.beginPath();
        // draw the pie wedges
        let endAngle = ((house.troops / total) * Math.PI * 2) + startAngle;
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startAngle, endAngle, false);
        ctx.lineTo(cx, cy);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        
        // add the labels
        ctx.beginPath();
        ctx.font = '20px Helvetica, Calibri';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rebeccapurple';
        // midpoint between the two angles
        // 1.5 * radius is the length of the Hypotenuse
        let theta = (startAngle + endAngle) / 2;
        let deltaY = Math.sin(theta) * 1.5 * radius;
        let deltaX = Math.cos(theta) * 1.5 * radius;
        
        ctx.fillText(house.name, deltaX+cx, deltaY+cy);
        ctx.closePath();
        
        startAngle = endAngle;
    })
});