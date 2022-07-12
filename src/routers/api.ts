import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Employee, { EmployeeDocument } from "../model/emplyee";
import Project, { ProjectDocument } from "../model/project";

const router = express.Router();
// ------------------ employee -------------------------

// for GET request (get the list of employee database)
router.get(
  "/employee",
  async (req: Request, res: Response, next: NextFunction) => {
    Employee.find({})
      .then((employees: any) => {
        res.send({ employees });
      })
      .catch(next);
  },
);

// for GET request Employee by Id
router.get(
  "/employee/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.id;

    Employee.findOne({_id})
      .then((employee: any) => {
        res.send({ employee });
      })
      .catch(next);
  },
);

// for GET request Project by Id
router.get(
  "/project/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.id;

    Project.findOne({_id})
      .then((project: any) => {
        res.send({ project });
      })
      .catch(next);
  },
);

// for POST request (add new employee in the database)
router.post(
  "/newEmployee",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      const {
        firstName,
        lastName,
        phoneNumber,
        email,
        docFile,
        welder,
        fitter,
        rigger,
        sacffolder,
        instrumentTech,
        election,
        mechanic,
        craneOperator,
      } = req.body;

      if (
        !(
          firstName &&
          lastName &&
          phoneNumber &&
          email &&
          welder &&
          fitter &&
          rigger &&
          sacffolder &&
          instrumentTech &&
          docFile &&
          election &&
          mechanic &&
          craneOperator
        )
      ) {
        res.status(400).send("All input is required");
      }

      const employee = await Employee.create({
        firstName,
        lastName,
        phoneNumber,
        email: email.toLowerCase(),
        certificate: docFile,
        welder,
        fitter,
        rigger,
        sacffolder,
        instrumentTech,
        election,
        mechanic,
        craneOperator,
      });

      const token = jwt.sign({ employee_id: employee._id }, "joblink");

      // employee.token = token;
      res.status(200).send({ employee, token });
    } catch (err) {
      console.log(err);
    }
  },
);

// for PUT request (update of employee in the database)
router.patch("/employee/:id", async (req, res, next) => {
  try {
    await Employee.findOneAndUpdate({ _id: req.params.id }, req.body);
    const employee = await Employee.findOne({ _id: req.params.id });
    res.send({ employee });
    // const employee_id = req.params.id;

    // const updates = Object.keys(req.body);
    // const allowedUpdates = [
    //   "firstName",
    //   "lastName",
    //   "phoneNumber",
    //   "email",
    //   "certificate",
    //   "welder",
    //   "fitter",
    //   "rigger",
    //   "sacffolder",
    //   "instructionTech",
    //   "election",
    //   "mechanic",
    //   "craneOperator",
    // ];
    // const isValidOperation = updates.every((update) =>
    //   allowedUpdates.includes(update),
    // );
    // if (!isValidOperation) {
    //   res.status(400).send({ error: "Invalid request" });
    // }

    // if (!mongoose.Types.ObjectId.isValid(employee_id)) {
    //   return res.status(404).send();
    // }
    // const employee: EmployeeDocument = await Employee.findOne({
    //   _id: employee_id,
    // });
    // console.log(typeof employee);

    // updates.forEach((update) => (employee[update] = req.body[update]));
    // await employee?.save();
    // res.send(employee);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

// for DELETE request (delete the employee in the database)
router.delete("/employee/:id", async (req, res, next) => {
  try {
    const employee = await Employee.findOneAndDelete({ _id: req.params.id });
    await employee.remove();
    res.send(employee);
  } catch (error) {
    res.status(500).send();
  }
});

// ----------------- project -------------------------

// for GET request (get the list of project database)
router.get(
  "/project",
  async (req: Request, res: Response, next: NextFunction) => {
    Project.find({})
      .then((projects: any) => {
        res.send({ projects });
      })
      .catch(next);
  },
);

// for POST request (add new project in the database)
router.post(
  "/newProject",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body)
      // get use input
      const {
        projectTitle,
        projectDescription,
        startDate,
        endDate,
        projectLocation,
        selectSupervisor,
        expectedMember,
        addUser,
      } = req.body;

      // validation
      if (
        !(
          projectTitle ||
          projectDescription ||
          startDate ||
          endDate ||
          projectLocation ||
          selectSupervisor ||
          expectedMember ||
          addUser
        )
      ) {
        return res.status(400).send("All input is required");
      }

      // create project in database
      const project = await Project.create({
        projectTitle,
        projectDescription,
        startDate,
        endDate,
        projectLocation,
        selectSupervisor,
        expectedMember,
        addUser,
      });

      // return new project
      res.status(201).json(project);
    } catch (err) {
      console.log(err);
    }
  },
);

// for PATCH request (update of project in the database)
router.patch(
  "/project/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Project.findOneAndUpdate({ _id: req.params.id }, req.body);
      const project = await Project.findOne({ _id: req.params.id });
      res.send({ project });
    } catch (error) {
      console.log(error);
      res.status(400).send();
    }
  },
);

// for DELETE request (delete the project in the database)
router.delete(
  "/project/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await Project.findOneAndDelete({
        _id: req.params.id,
      });
      await project.remove();
      res.send(project);
    } catch (error) {
      res.status(500).send();
    }
  },
);

export default router;
