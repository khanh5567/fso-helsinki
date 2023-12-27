const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ sum }) => <b>Number of exercises {sum}</b>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Course = ({ course }) => {
  let parts = course.parts;
  const sum = parts.reduce((total, part) => {
    return part.exercises + total;
  }, 0);
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </>
  );
};

export default Course;
