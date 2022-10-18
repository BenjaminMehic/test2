let fs = require('fs');

let students = [];

module.exports.init = () => {
    return new Promise ((resolve, reject) => {
        fs.readFile('./students.json',(err, data)=>{
            if (err) reject("unable to read file");
            else resolve();
            students = JSON.parse(data);
        });
    });
};

module.exports.getBSD = () => {
    return new Promise ((resolve, reject) => {
        if (students.length == 0) {
            reject("no results returned");
        }
        else {
            resolve(students);
        }
    });
};

module.exports.highGPA = () => {
    return new Promise ((resolve, reject) => {
        if (students.length == 0) {
            reject("Failed finding the student with the highest GPA");
        }
        else {
            let highestGPAStudent = students[0];

            students.forEach((student) => {
                if (highestGPAStudent.gpa < student.gpa) {
                    highestGPAStudent = student;
                }
            });

            resolve(highestGPAStudent);
        };
    });
};