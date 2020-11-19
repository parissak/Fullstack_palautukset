import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "My submission",
      exerciseCount: 280,
      description: "submission for 9.15",
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content content={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};


const Header: React.FC<{ courseName: string }> = ({ courseName }) => {
  return <h1>{courseName}</h1>
}

const Content: React.FC<{ content: Array<CoursePart> }> = ({ content }) => {
  return (
    <div>
      {content.map(c =>
        <Part key={c.name} course={c} />)}
    </div>
  )
}

const Total: React.FC<{ courses: Array<{ name: string, exerciseCount: number }> }> = ({ courses }) => {
  const total = courses.reduce((carry, part) => carry + part.exerciseCount, 0)
  return (
    <div>
      <br></br>
      <p>Number of exercises: {total}</p>
    </div>
  )
}

const Part: React.FC<{ course: CoursePart }> = ({ course }) => {
  switch (course.name) {
    case "Fundamentals":
      return (
        <div>
          <h2>{course.name}</h2>
          <p>exercises: {course.exerciseCount}</p>
          <p>description: {course.description}</p>
        </div>
      )
    case "Using props to pass data":
      return (
        <div>
          <h2>{course.name}</h2>
          <p>exercises: {course.exerciseCount}</p>
          <p>group project count: {course.groupProjectCount}</p>
        </div>
      )
    case "Deeper type usage":
      return (
        <div>
          <h2> {course.name}</h2>
          <p>exercises: {course.exerciseCount}</p>
          <p>description: {course.description}</p>
          <p>submission link: {course.exerciseSubmissionLink}</p>
        </div>
      )
    case "My submission":
      return (
        <div>
          <h2> {course.name}</h2>
          <p>exercises: {course.exerciseCount}</p>
          <p>description: {course.description}</p>
        </div>
      )
    default:
      return null;
  }
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartBaseExtended {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseExtended {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartOwn extends CoursePartBaseExtended {
  name: "My submission";
}

interface CoursePartBaseExtended extends CoursePartBase {
  description: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartOwn;

ReactDOM.render(<App />, document.getElementById("root"));