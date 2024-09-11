import { courses } from "./courses.js";
import fs from "fs/promises";

const add = async (req, res) => {
  try {
    const newCourse = {
      id: idAdder(),
      title: req.body.title,
      description: req.body.description,
    };

    courses.push(newCourse);

    const updatedCourses = `export let courses = ${JSON.stringify(
      courses,
      null,
      2
    )};`;

    await fs.writeFile("./courses.js", updatedCourses);

    res.status(200).json({ message: "Course Added", data: newCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding course", error: error.message });
  }
};

const idAdder = () => {
  let max = 0;
  for (const course of courses) {
    console.log(course);
    if (course && course.id > max) {
      max = course.id;
    }
  }
  return max + 1;
};

const update = async (req, res) => {
  const id = parseInt(req.params.id);
  const courseId = courses.findIndex((course) => course.id === id);
  if (courseId !== id) {
    return res.status(404).json({ error: `No course with Id=${id}` });
  }
  courses[courseId] = {
    ...courses[courseId],
    title: req.body.title || courses[courseId].title,
    description: req.body.description || courses[courseId].description,
  };

  const updatedCourse = `export let courses=${JSON.stringify(
    courses,
    null,
    2
  )}`;

  await fs.writeFile("./courses.js", updatedCourse);

  return res
    .status(200)
    .json({ data: courses[courseId], message: `course updates with Id=${id}` });
};

const remove = async (req, res) => {
  const id = parseInt(req.params.id);
  const courseId = courses.findIndex((course) => course.id === id);

  if (courseId !== id) {
    return res.status(404).json({ error: `No course with Id=${id}` });
  }

  courses.splice(courseId, 1);

  const updatedCourse = `export let courses=${JSON.stringify(courses)}`;

  fs.writeFile("./courses.js", updatedCourse);

  return res
    .status(200)
    .json({ message: `course deleted successfully with Id=${id}` });
};

const get = async (req, res) => {
  if (courses.length > 0) {
    return res
      .status(200)
      .json({ data: courses, message: "fetched course data!" });
  }
  res.status(404).json({ error: "no course found" });
};

const getById = async (req, res) => {
  const id = parseInt(req.params.id);
  const courseId = courses.find((course) => course.id === id);

  if (courseId !== id) {
    return res.status(404).json({ error: `No course with Id=${id}` });
  }
  return res
    .status(200)
    .json({ data: courseId, message: `course with id: ${id}` });
};

export { add, update, remove, get, getById };
