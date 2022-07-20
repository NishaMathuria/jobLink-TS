import { Schema, model } from "mongoose";

const ProjectSchema = new Schema({
  projectTitle: {
    type: String,
    require: true,
  },
  projectDescription: {
    type: String,
    require: true,
  },
  startDate: {
    type: Date,
    require: true,
  },
  endDate: {
    type: Date,
    require: true,
  },
  projectLocation: {
    type: String,
    require: true,
  },
  selectSupervisor: {
    type: String,
    require: true,
  },
  expectedMember: {
    type: String,
    require: true,
  },
  addUser: {
    type: String,
    require: true,
  },
});

const Project = model("Project", ProjectSchema);
export default Project;
