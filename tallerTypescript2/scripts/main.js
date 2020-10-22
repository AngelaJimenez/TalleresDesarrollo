import { dataEstudiante } from './dataEstudiante.js';
import { dataCourses } from './dataCourses.js';
var coursesTbody = document.getElementById('courses');
var estudiantesTbody = document.getElementById('estudiantes');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCreditos = document.getElementById("button-filterByCreditos");
var inputSearchBox = document.getElementById("search-box");
var inputSearchMin = document.getElementById("search-min");
var inputSearchMax = document.getElementById("search-max");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
renderCoursesInTable(dataCourses);
renderEstudiantesInTable(dataEstudiante);
btnfilterByCreditos.onclick = function () { return applyFilterByCreditos(); };
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderEstudiantesInTable(estudiantes) {
    console.log('Desplegando estudiante');
    estudiantes.forEach(function (estudiante) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + estudiante.tipoDato + "</td>\n                             <td>" + estudiante.contenido + "</td>";
        estudiantesTbody.appendChild(trElement);
    });
}
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCreditos() {
    var max = parseInt(inputSearchMax.value);
    var min = parseInt(inputSearchMin.value);
    max = (max == null) ? 5 : max;
    min = (min == null) ? 0 : min;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCreditos(max, min, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCreditos(max, min, courses) {
    return courses.filter(function (c) { return c.credits >= min && c.credits <= max; });
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
