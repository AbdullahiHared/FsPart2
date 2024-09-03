import React from "react";

// Component for displaying the parts of the course
const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

// Component for displaying the course details and total exercises
const Course = ({ course }) => {
  // Calculate the total exercises by using reduce
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <p><strong>Total exercises: {totalExercises}</strong></p>
    </div>
  );
};

export default Course;
