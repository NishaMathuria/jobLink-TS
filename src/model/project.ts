import { Schema, model, Date, Document } from "mongoose";

export interface ProjectDocument extends Document {
  projectTitle: string;
  projectDescription: string;
  startDate: Date;
  endDate: Date;
  projectLocation: string;
  selectSupervisor: string;
  rigger: string;
  sacffolder: string;
  instructionTech: string;
  expectedMember: string;
  addUser: string;
}

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
