import { Course } from './course.js';
import { dataEstudiante } from './dataEstudiante.js';
import { dataCourses } from './dataCourses.js';
import { Estudiante } from './estudiante.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let estudiantesTbody: HTMLElement = document.getElementById('estudiantes')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCreditos: HTMLElement = document.getElementById("button-filterByCreditos")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputSearchMin: HTMLInputElement = <HTMLInputElement> document.getElementById("search-min")!;
const inputSearchMax: HTMLInputElement = <HTMLInputElement> document.getElementById("search-max")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();

renderCoursesInTable(dataCourses);
renderEstudiantesInTable(dataEstudiante);


btnfilterByCreditos.onclick = () => applyFilterByCreditos();



totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

function renderEstudiantesInTable(estudiantes: Estudiante[]): void {
    console.log('Desplegando estudiante');
    estudiantes.forEach((estudiante) => {
      let trElement = document.createElement("tr");
      trElement.innerHTML = `<td>${estudiante.tipoDato}</td>
                             <td>${estudiante.contenido}</td>`;
      estudiantesTbody.appendChild(trElement);
    });
  }
  

function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByCreditos() { 
    let max = parseInt(inputSearchMax.value);
    let min = parseInt(inputSearchMin.value);
    
    max = (max == null) ? 6 : max;
    min = (min == null) ? 0 : min;

    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByCreditos(max, min, dataCourses);
    renderCoursesInTable(coursesFiltered);
  }
  
  function searchCourseByCreditos(max: number, min: number, courses: Course[]) {
    return  courses.filter( c => c.credits>=min && c.credits<=max);
  }
  

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}