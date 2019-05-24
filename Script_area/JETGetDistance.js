alert(selection[0].pathPoints[0].anchor);

function getDistance(startPoint,endPoint){
rise=Math.abs(startPoint.anchor[0]-endPoint.anchor[0]);
run=Math.abs(startPoint.anchor[1]-endPoint.anchor[1]);
return(Math.sqrt((rise*rise)+(run*run)));
}
alert(getDistance(selection[0].pathPoints[0],selection[0].pathPoints[1]));
