import express, { Request, Response, NextFunction } from "express";
import Employee from "../model/emplyee";
import Project from "../model/project";
import mongoose from "mongoose";

const router = express.Router();
// ------------------ employee -------------------------

// for GET request (get the list of employee database)
router.get("/employee", (req: Request, res: Response, next: NextFunction) => {
  Employee.find({})
    .then((employees: any) => {
      console.log(employees, "ff");
      res.send({ employees });
    })
    .catch(next);
});

// for GET request Employee by Id
router.get(
  "/employee/:id",
  (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.id;

    Employee.findOne({ _id })
      .then((employee: any) => {
        res.send({ employee });
      })
      .catch(next);
  },
);

// for POST request (add new employee in the database)
router.post(
  "/newEmployee",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
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
        instructionTech,
        election,
        mechanic,
        craneOperator,
      } = req.body.data;

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
          instructionTech &&
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
        instructionTech,
        election,
        mechanic,
        craneOperator,
      });
      // add created user to project addUser array
      // const employeeId = new mongoose.Types.ObjectId(employee._id);
      // await Project.updateOne(
      //   { _id: req.body.projectId },
      //   { $push: { addUser: "" } },
      // );
      res.status(200).send({ employee });
    } catch (err) {
      console.log(err);
    }
  },
);

// for PUT request (update of employee in the database)
router.patch(
  "/employee/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Employee.findOneAndUpdate({ _id: req.params.id }, req.body);
      const employee = await Employee.findOne({ _id: req.params.id });
      res.send({ employee });
    } catch (error) {
      console.log(error);
      res.status(400).send();
    }
  },
);

// for DELETE request (delete the employee in the database)
router.delete(
  "/employee/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee = await Employee.findOneAndDelete({ _id: req.params.id });
      await employee.remove();
      res.send(employee);
    } catch (error) {
      res.status(500).send();
    }
  },
);

// ----------------- project -------------------------

// for GET request (get the list of project database)
router.get("/project", (req: Request, res: Response, next: NextFunction) => {
  Project.find({})
    .sort({ _id: -1 })
    .populate("selectSupervisor")
    .then((projects: any) => {
      res.send({ projects });
    })
    .catch(next);
});

// for GET request Project by Id
router.get(
  "/project/:id",
  (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.id;

    Project.findOne({ _id })
      .populate("addUser")
      .populate("selectSupervisor")
      .then((project: any) => {
        res.send({ project });
      })
      .catch(next);
  },
);

// for POST request (add new project in the database)
router.post(
  "/newProject",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
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
