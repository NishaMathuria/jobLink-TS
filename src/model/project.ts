import { Schema, model } from "mongoose";

const ProjectSchema = new Schema({
  status: {
    type: Number,
    require: true,
  },
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
    type: Schema.Types.ObjectId,
    ref: "Employee",
  },
  expectedMember: {
    type: String,
    require: true,
  },
  addUser: [
    {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
});

const Project = model("Project", ProjectSchema);
export default Project;
