import moment from 'moment';

export const isTaskInFilter = (task, filter) => {
      switch(filter) {
       case "all" :
         return true;
       case "completed" :
         return task.isdone;
       case "incompleted" :
         return !task.isdone;
       default:
         return true;
     }
}

export const isTaskInDate = (task, date) => {
  if  (moment(date).isSame(moment(task.onDateTask), 'day') )   {
    return moment(task.onDateTask).calendar();
  }
  else if (date === null &&
   moment(task.onDateTask).isAfter(moment().subtract(1, 'days')) &&
   moment(task.onDateTask).isBefore(moment().add(6, 'days')) ) {
    return  (moment(task.onDateTask).calendar()) ;
   }
}
