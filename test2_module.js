var fs = require("fs");
var students = [];

module.exports.init = function() {
    return new Promise(function(resolve, reject){
        fs.readFile('./students.json',(err,data)=>{
            if (err) reject("Failure to read file students.json!");
            students = JSON.parse(data);
        })

        resolve();
    });
}

module.exports.getBSD = function() {
    return new Promise(function(resolve, reject){
        var bsdStudents = [];
        for (var i = 0; i < students.length; i++)
        {
            if (students[i].program == "BSD")
            {
                bsdStudents.push(students[i]);
            }
        } 
        if (bsdStudents.length == 0)
        {
            reject("no results returned");
        }
        else
        {
            resolve(bsdStudents);
        }
    });
}


module.exports.highGPA = function() {
    return new Promise(function(resolve, reject){
        var highest = students[0];
        for (var i = 1; i < students.length; i++)
        {
            
            if (students[i].gpa > highest.gpa)
            {
                highest = students[i];
            }
            
        }

        if (highest == 0)
        {
            reject("Failed finding the student with the highest GPA");
        }
        else
        {
            resolve(highest);
        }
        
        resolve(highest);
    });
}

module.exports.allStudents = function() {
    return new Promise(function(resolve, reject){
        if (students.length == 0)
        {
            reject("no results returned");
        }
        else
        {
            resolve(students);
        }
    });
}