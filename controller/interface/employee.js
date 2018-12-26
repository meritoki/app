/*
 * employee.js
 */
var user = require('./user.js');
var relational = require('../../model/relational.js');

var getParam = function(req,callback){
  var idEmployee = req.params.idEmployee;
  relational.getEmployeeUser(idEmployee, function(error, u) {
    if (!error) {
      req.params.idUser = u.idUser;
      callback(error,req);
    }else{
      callback(error,null);
    }
  });
}

// exports.getElement = function(req, res, next) {
//   console.log('employee.getElement');
//   getParam(req, function(error, r) {
//     if (!error) {
//       user.getElement(r, res, next);
//     }else{
//       res.end('{"status":500}');
//     }
//   });
// }


exports.getElement = function(req, res, next) {
  console.log('employee.getElement');
  var idEmployee = req.params.idEmployee;
  relational.getEmployeeUser(idEmployee, function(error, u) {
    if (!error) {
      req.params.idUser = u.idUser;
    }
    user.getElement(req, res, next);
  });
}

exports.getFile = function(req, res, next) {
  console.log('employee.getFile');
  var idEmployee = req.params.idEmployee;
  relational.getEmployeeUser(idEmployee, function(error, u) {
    if (!error) {
      req.params.idUser = u.idUser;
    }
    user.getFile(req, res, next);
  });
};

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

exports.getProcedure = function(req, res, next) {
  console.log('employee.getProcedure');
  var idEmployee = req.params.idEmployee;
  relational.getEmployeeUser(idEmployee, function(error, u) {
    if (!error) {
      req.params.idUser = u.idUser;
    }
    user.getProcedure(req, res, next);
  });
};

exports.getProcedure = function(req, res, next) {
  console.log('employee.getProcedure');
    getParam(req, function(error, r) {
      if (!error) {
        user.getElement(r, res, next);
      }else{
        res.end('{"status":500}');
      }
    });
};

exports.getProject = function(req, res, next) {
  console.log('employee.getProject');
  var idEmployee = req.params.idEmployee;
  relational.getEmployeeUser(idEmployee, function(error, u) {
    if (!error) {
      req.params.idUser = user.idUser;
    }
    user.getProject(req, res, next);
  });
};

exports.getProjectProcedure = function(req, res, next) {
  console.log('employee.getProjectProcedure');
  var idEmployee = req.params.idEmployee;
  relational.getEmployeeUser(idEmployee, function(error, u) {
    if (!error) {
      req.params.idUser = u.idUser;
    }
    user.getProjectProcedure(req, res, next);
  });
};

exports.getProperties = function(req, res, next) {
  console.log('employee.getProperties');
  var idEmployee = req.params.idEmployee;
  relational.getEmployeeUser(idEmployee, function(error, u) {
    if (!error) {
      req.params.idUser = u.idUser;
    }
    user.getProperties(req, res, next);
  });
}

exports.getRecord = function(req, res, next) {
  console.log('employee.getRecord');
  var idEmployee = req.params.idEmployee;
  relational.getEmployeeUser(idEmployee, function(error, u) {
    if (!error) {
      req.params.idUser = u.idUser;
    }
    user.getRecord(req, res, next);
  });
}

exports.getTraining = function(req, res, next) {
  console.log('employee.getTraining');
  var idEmployee = req.params.idEmployee;
  relational.getEmployeeUser(idEmployee, function(error, u) {
    if (!error) {
      req.params.idUser = u.idUser;
    }
    user.getTraining(req, res, next);
  });
};

exports.postProcedure = function(req, res, next) {
  console.log('employee.postProcedure');
  var paramIDEmployee = (typeof(req.params.idEmployee)!==undefined)?req.params.idEmployee:null;
  var bodyIDEmployee = (typeof(req.body.idEmployeeA)!==undefined)?req.body.idEmployeeA:null;
  console.log('employee.postProcedure idEmployee=' + idEmployee);
  console.log('employee.postProcedure idEmployeeA=' + idEmployeeA);
  //    console.log('employee.postProcedure permissionA=' + permissionA);
  //    console.log('employee.postProcedure idUserB=' + idUserB);
  //    console.log('employee.postProcedure ownerB=' + ownerB);
  //    console.log('employee.postProcedure permissionB=' + permissionB);
  if (paramIDEmployee !== null) {
    relational.getEmployeeUser(paramIDEmployee, function(error, userB) {
      if (error) {
        res.end('{"status":500}');
      }
      if (bodyIDEmployee !== null) {
        console.log('employee.postProcedure bodyIDEmployee='+bodyIDEmployee);
        relational.getEmployeeUser(bodyIDEmployee, function(error, userA) {
          if (error) throw error;
          req.params.idUserA = userA.idUser;
          req.params.permissionA = req.body.permissionA;
          req.params.ownerA = req.body.ownerA;
          req.params.idUserB = userB.idUser;
          req.params.permissionB = req.body.permissionB;
          req.params.ownerB = req.body.ownerB;
          if (req.params.ownerA == 1) {
            if (req.params.ownerA < 3) {
              req.params.label = userA.name;
            } else {
              req.params.label = null;
            }
          } else if (req.params.ownerB == 1) {
            if (req.params.ownerB < 3) {
              req.params.label = userB.name;
            } else {
              req.params.label = null;
            }
          }
          user.postEmployeeProcedure(req, res, next);
        });
      } else {
        console.log('employee.postProcedure bodyIDEmployee=null');
        req.params.idUserA = userB.idUser;
        req.params.permissionA = req.body.permissionB;
        req.params.ownerA = req.body.ownerB;
        if (req.params.permissionA < 3) {
          req.params.label = userB.name;
        } else {
          req.params.label = null;
        }
        req.params.idUserB = null;
        req.params.permissionB = null;
        req.params.ownerB = null;
        user.postEmployeeProcedure(req, res, next);
      }
    });
  }
};

exports.postProject = function(req, res, next) {
  console.log('employee.postProject');
  var idEmployee = req.params.idEmployee;
  if (typeof(idEmployee) !== undefined) {
    relational.getEmployeeUser(idEmployee, function(error, u) {
      if (error) throw error;
      req.params.idUser = u.idUser;
      user.postEmployeeProject(req, res, next);
    });
  }
};

exports.postProjectProcedure = function(req, res, next) {
  console.log('employee.postProjectProcedure');
  var idEmployee = req.params.idEmployee;
  if (typeof(idEmployee) !== undefined) {
    relational.getEmployeeUser(idEmployee, function(error, u) {
      if (error) throw error;
      req.params.idUser = u.idUser;
      user.postEmployeeProjectProcedure(req, res, next);
    });
  }
};

exports.postProperties = function(req, res, next) {
  console.log('employee.postProperties');
  var idEmployee = req.params.idEmployee;
  if (typeof(idEmployee) !== undefined) {
    relational.getEmployeeUser(idEmployee, function(error, u) {
      if (error) throw error;
      req.params.idUser = u.idUser;
      user.postProperties(req, res, next);
    });
  }
}

exports.postTraining = function(req, res, next) {
  console.log('employee.postTraining');
  var idEmployee = req.params.idEmployee;
  if (typeof(idEmployee) !== undefined) {
    relational.getEmployeeUser(idEmployee, function(error, u) {
      if (error) throw error;
      req.params.idUser = u.idUser;
      user.postTraining(req, res, next);
    });
  }
}
