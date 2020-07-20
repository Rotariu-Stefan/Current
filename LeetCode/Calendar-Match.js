const calendarMatch = (calendar1, bound1, calendar2, bound2, minTime) => {
  const result=[];

  let i1=-2, i2=-2;
  let freeTime1={start:0, end:0}, freeTime2={start:0, end:0};
  let nextCal=1;        //NOT NEEDED !!!

  while(freeTime1 && freeTime2){
    console.log("C1",freeTime1, i1);
    console.log("C2",freeTime2, i2, "\n");

    const commonStart=freeTime1.start<=freeTime2.start ? freeTime2.start : freeTime1.start;
    let commonEnd;
    if(freeTime1.end<=freeTime2.end){
      commonEnd=freeTime1.end;
      i1++;
      freeTime1=getNextFreeTime(calendar1, i1, bound1);
    } else {
      commonEnd=freeTime2.end;
      i2++;
      freeTime2=getNextFreeTime(calendar2, i2, bound2);
    }
    if(commonEnd-commonStart>=minTime){
      result.push([convertStr(commonStart), convertStr(commonEnd)]);
    }
  }
  return result;
};

const getNextFreeTime = (calendar, i, bound) => {
  if(i>=calendar.length || i<-1){
    return null;
  }
  const start=convertMins(i===-1?bound[0]:calendar[i][1]);
  const end=convertMins(i===calendar.length-1?bound[1]:calendar[i+1][0]);

  return {start:start, end:end};
};

const convertMins = (timeStr) => {
  const mins=timeStr.split(':');
  return Number(mins[0])*60+Number(mins[1]);
};

const convertStr = (mins) => {
  const hours=Math.floor(mins/60);
  const minsPast=mins%60;
  return `${hours}:${minsPast<10?"0"+minsPast:minsPast}`;
}

const calendar1=[
  ["9:00","10:30"],
  ["12:00","13:00"],
  ["16:00","18:00"],
];
const bound1=["9:00", "20:00"];
const calendar2=[
  ["10:00","11:30"],
  ["12:30","14:30"],
  ["14:30","15:00"],
  ["16:00","17:00"],
  ["19:00","19:30"],
  ["21:00","22:00"],
];
const bound2=["10:00", "23:30"];
const minTime=30;



console.log(calendarMatch(calendar1, bound1, calendar2, bound2, minTime));
