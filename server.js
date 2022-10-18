let express = require("express");
let app = express();
let moduleA = require("./test2_moduleA.js")

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log(`Express http server listening on: ${HTTP_PORT}`)
}

app.get("/", (req, res) => {
    let htmlString = "";
    htmlString += "<h2>Declaration (text size in heading 2)</h2>";
    htmlString += "<p>The rest text is displayed in paragraph as shown in screenshot</p>"
    htmlString += "<p>I acknowledge the College's academic integrity policy - and my own integrity - remain in effect whether my work is done remotely or onsite. Any test or assignment is an act of trust between me and my instructor, and especially with my classmates... even when no one is watching. I declare I will not break that trust.</p>"
    htmlString += "<p>Name: <b><span style=\"background-color: yellow;\">Ben Mehic</span></b></p>"
    htmlString += "<p>Student Number: <b><span style=\"background-color: yellow;\">159304203</span></b></p>"
    htmlString += "<p><a href=\"/BSD\">Click to visit BSD students</a></p>"
    htmlString += "<p><a href=\"/highGPA\">Click to see who has the highest GPA</a></p>"
    res.send(htmlString);
});

app.get("/BSD", (req, res) => {
    moduleA.getBSD().then((students) => {
        res.json(students);
    })
});

app.get("/highGPA", (req, res) => {
    moduleA.highGPA().then((highestGPAStudent) => {
        let htmlString = "";
        htmlString += "<h2>Highest GPA:</h2>";
        htmlString += `<p>Student ID: ${highestGPAStudent.studId}</p>`
        htmlString += `<p>Name: ${highestGPAStudent.name}</p>`
        htmlString += `<p>Program: ${highestGPAStudent.program}</p>`
        htmlString += `<p>GPA: ${highestGPAStudent.gpa}</p>`
        res.send(htmlString);
    })
});

app.use((req, res) => {
    res.status(404).send("<p>Error 404: page not found</p>");
});

moduleA.init().then(() => {
    app.listen(HTTP_PORT, onHttpStart);
}).catch((data) => {
    console.log(data);
});