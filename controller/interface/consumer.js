var user = require('./user.js');
var relational = require('../../model/relational.js');

exports.getIndex = function(req, res, next) {
  console.log('employee.getIndex');
  var idEmployee = req.params.idEmployee;
  var role;
  relational.getEmployee(idEmployee, function(error, employee) {
    if (error) {
      relational.getEmployeeList(role, function(error, employeeList) {
        req.params.employeeList = employeeList;
        user.getIndex(req, res, next);
      });
    } else {
      req.params.employee = employee;
      user.getIndex(req, res, next);
    }

  });
};


exports.getIndex = function(req, res, next) {
  console.log("user.getIndex");
  var api = ((req.url).indexOf("api") > -1) ? true : false;
  var slideshow = ((req.url).indexOf("slideshow") > -1) ? true : false;
  var statisticRole = 'supervisor'; //req.headers.role;
  var user = req.user;
  var role = typeof user !== "undefined" ? user.role : '';
  var url = getURL();
  var menu = getMenu(role);
  var idUserA = typeof user !== "undefined" ? user.idUser : null;
  var idUserB = idUserA;
  //    req.params.idUser;

  var employee = req.params.employee;
  var employeeList = req.params.employeeList;
  var contractor = req.params.contractor;
  var contractorList = req.params.contractorList;

  if (isAuthorized(role, "general-manager")) {
    if (typeof employee !== "undefined") {
      if (api) {
        res.end('{"status":200,"employee":' + JSON.stringify(employee) + "}");
      } else {
        relational.getUserFileProfileImage(employee.idUser, function(error, file) {
          if (error) throw error;
          fs.readFile('./model' + file.path + file.name + '.' + file.extension, function(error, image) {
            if (error) {
              fs.readFile('./model/media/merit-builders/image/employee/0/profile.jpg', function(error, image) {
                var userMenu = getUserMenu(employee.idEmployee, role);
                if (error) {

                  res.render('account/employee', {
                    title: 'EMPLOYEE',
                    employee: employee,
                    employeeMenu: userMenu,
                    menu: menu,
                    user: user
                  });

                } else {
                  var base64Image = image.toString('base64');
                  res.render('account/employee', {
                    title: 'EMPLOYEE',
                    employee: employee,
                    employeeMenu: userMenu,
                    image: base64Image,
                    menu: menu,
                    user: user
                  });
                }
              });
            } else {
              var base64Image = image.toString('base64');
              res.render('account/employee', {
                title: 'EMPLOYEE',
                employee: employee,
                image: base64Image,
                employeeMenu: userMenu,
                menu: menu,
                user: user
              });
            }
          });
        });

      }
    } else if (typeof contractor !== "undefined") {
      relational.getUserFileProfileImage(contractor.idUser, function(error, file) {
        if (error) throw error;
        fs.readFile('./model' + file.path + file.name + '.' + file.extension, function(error, image) {
          if (error) {
            fs.readFile('./model/media/merit-builders/image/contractor/0/profile.jpg', function(error, image) {
              if (error) {
                res.render('account/employee', {
                  title: 'CONTRACTOR',
                  employee: employee,
                  menu: menu,
                  user: user
                });
              } else {
                var base64Image = image.toString('base64');
                res.render('account/employee', {
                  title: 'EMPLOYEE',
                  employee: employee,
                  image: base64Image,
                  menu: menu,
                  user: user
                });
              }
            });
          } else {
            var base64Image = image.toString('base64');
            res.render('account/employee', {
              title: 'EMPLOYEE',
              employee: employee,
              image: base64Image,
              menu: menu,
              user: user
            });
          }
        });
      });
    } else if (typeof employeeList !== "undefined") {
      if (api) {
        res.end('{"status":200,"employeeList":' + JSON.stringify(employeeList) + "}");
      } else if (slideshow) {
        res.render('account/slideshow', {
          title: 'EMPLOYEES',
          employeeList: employeeList,
          url: url,
          menu: menu,
          generalManager: isAuthorized(role, "general-manager"),
          assessor: isAuthorized(role, "assessor"),
          user: user
        })
      } else {
        idUserB = idUserA;
        relational.getUserProcedureList(idUserA, idUserB, null, 0, function(error, procedureList) {
          if (error) throw error;
          relational.getUserProjectList(idUserA, idUserB, function(error, projectList) {
            if (error) throw error;
            res.render('account/employee', {
              title: 'EMPLOYEES',
              employeeList: employeeList,
              procedureList: procedureList,
              projectList: projectList,
              url: url,
              menu: menu,
              generalManager: isAuthorized(role, "general-manager"),
              assessor: isAuthorized(role, "assessor"),
              user: user
            })
          });
        });
      }
    } else if (typeof contractorList !== "undefined") {
      if (api) {
        res.end('{"status":200,"contractorList":' + JSON.stringify(contractorList) + "}");
      } else {
        idUserB = idUserA;
        relational.getUserProcedureList(idUserA, idUserB, null, 0, function(error, procedureList) {
          if (error) throw error;
          relational.getUserProjectList(idUserA, idUserB, function(error, projectList) {
            if (error) throw error;
            res.render('account/contractor', {
              title: 'EMPLOYEES',
              employeeList: employeeList,
              procedureList: procedureList,
              projectList: projectList,
              url: url,
              menu: menu,
              generalManager: isAuthorized(role, "general-manager"),
              assessor: isAuthorized(role, "assessor"),
              user: user
            })
          });
        });
      }
    }
  } else if (isAuthorized(role, "supervisor,training-manager,safety-manager,quality-manager,assessor")) {
    if (typeof employeeList !== "undefined") {
      res.render('account/employee', {
        title: 'EMPLOYEES',
        employeeList: employeeList,
        url: url,
        menu: menu,
        generalManager: false,
        assessor: isAuthorized(role, "assessor"),
        user: user
      })
    } else if (typeof contractorList !== "undefined") {
      res.render('account/employee', {
        title: 'EMPLOYEES',
        employeeList: employeeList,
        url: url,
        menu: menu,
        generalManager: isAuthorized(role, "general-manager"),
        assessor: isAuthorized(role, "assessor"),
        user: user
      })
    } else {
      res.redirect("/not-authorized");
    }
  } else {
    res.redirect("/not-authorized");
  }
};
