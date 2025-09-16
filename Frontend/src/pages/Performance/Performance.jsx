import React, { useState } from "react";
import "./Performance.css";

const Performance = () => {
  const [ctMarks, setCtMarks] = useState(Array(4).fill({ got: "", max: 10 }));
  const [mid, setMid] = useState({ got: "", max: 20 });
  const [assignment, setAssignment] = useState({ got: "", max: 10 });
  const [attendance, setAttendance] = useState({ got: "", max: 10 });
  const [markResult, setMarkResult] = useState("");
  const [markError, setMarkError] = useState("");

  const calculateMarkMaster = () => {
    setMarkError("");
    // Validate CT marks
    for (let i = 0; i < ctMarks.length; i++) {
      const got = parseFloat(ctMarks[i].got || 0);
      const max = parseFloat(ctMarks[i].max || 1);
      if (got > max) {
        setMarkError(`Error: CT${i + 1} Got mark cannot exceed its Max mark.`);
        setMarkResult("");
        return;
      }
    }
    // Validate Mid
    if (parseFloat(mid.got || 0) > parseFloat(mid.max || 0)) {
      setMarkError("Error: Mid Got mark cannot exceed Mid Max mark.");
      setMarkResult("");
      return;
    }
    // Validate Assignment
    if (parseFloat(assignment.got || 0) > parseFloat(assignment.max || 0)) {
      setMarkError("Error: Assignment Got mark cannot exceed Assignment Max mark.");
      setMarkResult("");
      return;
    }
    // Validate Attendance
    if (parseFloat(attendance.got || 0) > parseFloat(attendance.max || 0)) {
      setMarkError("Error: Attendance Got mark cannot exceed Attendance Max mark.");
      setMarkResult("");
      return;
    }
    if (parseFloat(attendance.got || 0) > 10) {
      setMarkError("Error: Attendance Got mark cannot exceed 10.");
      setMarkResult("");
      return;
    }

    let convertedCTs = ctMarks.map(ct =>
      (parseFloat(ct.got || 0) / parseFloat(ct.max || 1)) * 10
    );
    let best3 = convertedCTs.sort((a, b) => b - a).slice(0, 3);
    let ctAvg = Math.ceil(best3.reduce((a, b) => a + b, 0) / 3);
    let midConverted = (parseFloat(mid.got || 0) / parseFloat(mid.max || 1)) * 20;
    let assignConverted = (parseFloat(assignment.got || 0) / parseFloat(assignment.max || 1)) * 10;
    let attendConverted = parseFloat(attendance.got || 0);
    let totalIncourse = ctAvg + midConverted + assignConverted + attendConverted;

    let AplusNeed = Math.max(0, ((80 - totalIncourse) * 2).toFixed(2));
    let ANeed = Math.max(0, ((75 - totalIncourse) * 2).toFixed(2));
    let AminusNeed = Math.max(0, ((70 - totalIncourse) * 2).toFixed(2));
    let BplusNeed = Math.max(0, ((65 - totalIncourse) * 2).toFixed(2));
    let BNeed = Math.max(0, ((60 - totalIncourse) * 2).toFixed(2));
    let BMinus = Math.max(0, ((55 - totalIncourse) * 2).toFixed(2));
    let CNeed = Math.max(0, ((50 - totalIncourse) * 2).toFixed(2));
    let DNeed = Math.max(0, ((45 - totalIncourse) * 2).toFixed(2));
    let passNeed = Math.max(0, ((40 - totalIncourse) * 2).toFixed(2));
    setMarkResult(
      `Your Incourse Total: ${totalIncourse.toFixed(2)} / 50
      \nTo get A+ you need ${AplusNeed} in final.
      \nTo get A you need ${ANeed} in final.
      \nTo get A- you need ${AminusNeed} in final.
      \nTo get B+ you need ${BplusNeed} in final.
      \nTo get B you need ${BNeed} in final.
      \nTo get B- you need ${BMinus} in final.
      \nTo get C you need ${CNeed} in final.
      \nTo get D you need ${DNeed} in final.
      \nTo get PASS you need ${passNeed} in final.`
    );
  };

  const [attTotal, setAttTotal] = useState("");
  const [attPresent, setAttPresent] = useState("");
  const [attResult, setAttResult] = useState("");
  const [attError, setAttError] = useState("");

  const calculateAttendance = () => {
    setAttError("");
    const total = parseFloat(attTotal || 0);
    const present = parseFloat(attPresent || 0);

    if (present > total) {
      setAttError("Error: Classes Attended cannot exceed Total Classes.");
      setAttResult("");
      return;
    }
    setAttResult(`Attendance: ${((present / total) * 100).toFixed(2)}%`);
  };

  const [courses, setCourses] = useState([]);
  const [predResult, setPredResult] = useState("");
  const [predError, setPredError] = useState("");
  const performanceMap = { good: 40, moderate: 30, poor: 20 };

  const addCourse = () => {
    setCourses([...courses, { credit: 3, incourse: "", level: "moderate" }]);
  };

  const calculatePrediction = () => {
    setPredError("");
    for (let i = 0; i < courses.length; i++) {
      const incourseVal = parseFloat(courses[i].incourse || 0);
      if (incourseVal > 50) {
        setPredError(`Error: Incourse mark for course ${i + 1} cannot exceed 50.`);
        setPredResult("");
        return;
      }
    }
    let totalPoints = 0;
    let totalCredits = 0;
    courses.forEach(c => {
      let finalScore = parseFloat(c.incourse || 0) + performanceMap[c.level];
      let gradePoint =
        finalScore >= 80 ? 4 :
        finalScore >= 75 ? 3.75 :
        finalScore >= 70 ? 3.5 :
        finalScore >= 65 ? 3.25 :
        finalScore >= 60 ? 3 :
        finalScore >= 55 ? 2.75 :
        finalScore >= 50 ? 2.5 :
        finalScore >= 45 ? 2.25 :
        finalScore >= 40 ? 2 : 0;
      totalPoints += gradePoint * parseFloat(c.credit);
      totalCredits += parseFloat(c.credit);
    });
    setPredResult(`Predicted GPA: ${(totalPoints / totalCredits).toFixed(2)}`);
  };

  const [semesters, setSemesters] = useState([]);
  const [cgpaResult, setCgpaResult] = useState("");
  const [cgpaError, setCgpaError] = useState("");

  const addSemester = () => {
    setSemesters([...semesters, { gpa: "", credit: "" }]);
  };

  const calculateCGPA = () => {
    setCgpaError("");
    for (let i = 0; i < semesters.length; i++) {
      const gpa = parseFloat(semesters[i].gpa || 0);
      if (gpa > 4) {
        setCgpaError(`Error: Semester GPA at position ${i + 1} cannot exceed 4.`);
        setCgpaResult("");
        return;
      }
    }
    let totalPoints = 0;
    let totalCredits = 0;
    semesters.forEach(s => {
      totalPoints += parseFloat(s.gpa || 0) * parseFloat(s.credit || 0);
      totalCredits += parseFloat(s.credit || 0);
    });
    setCgpaResult(`Overall CGPA: ${(totalPoints / totalCredits).toFixed(2)}`);
  };

  return (
    <div className="per123-performance-container">
      <h1 className="per123-page-title">🎯 Performance Hub</h1>

      <section className="per123-card">
        <h2>🧮 Mark Master</h2>
        {ctMarks.map((ct, i) => (
          <div key={i} className="per123-input-row">
            <div className="input-group">
              <label>CT{i + 1} Got</label>
              <input
                type="number"
                value={ct.got}
                onChange={e => {
                  let copy = [...ctMarks];
                  copy[i] = { ...copy[i], got: e.target.value };
                  setCtMarks(copy);
                }}
              />
            </div>
            <div className="input-group">
              <label>CT{i + 1} Max</label>
              <input
                type="number"
                value={ct.max}
                onChange={e => {
                  let copy = [...ctMarks];
                  copy[i] = { ...copy[i], max: e.target.value };
                  setCtMarks(copy);
                }}
              />
            </div>
          </div>
        ))}

        <div className="per123-input-row">
          <div className="input-group">
            <label>Mid Got</label>
            <input
              type="number"
              value={mid.got}
              onChange={e => setMid({ ...mid, got: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label>Mid Max</label>
            <input
              type="number"
              value={mid.max}
              onChange={e => setMid({ ...mid, max: e.target.value })}
            />
          </div>
        </div>

        <div className="per123-input-row">
          <div className="input-group">
            <label>Assignment Got</label>
            <input
              type="number"
              value={assignment.got}
              onChange={e => setAssignment({ ...assignment, got: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label>Assignment Max</label>
            <input
              type="number"
              value={assignment.max}
              onChange={e => setAssignment({ ...assignment, max: e.target.value })}
            />
          </div>
        </div>

        <div className="per123-input-row">
          <div className="input-group">
            <label>Attendance Got</label>
            <input
              type="number"
              value={attendance.got}
              onChange={e => setAttendance({ ...attendance, got: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label>Attendance Max</label>
            <input
              type="number"
              value={attendance.max}
              onChange={e => setAttendance({ ...attendance, max: e.target.value })}
            />
          </div>
        </div>

        <button onClick={calculateMarkMaster}>Calculate Mark Master</button>
        {markError && <p className="per123-error">{markError}</p>}
        {markResult && <pre className="per123-result">{markResult}</pre>}
      </section>

      <section className="per123-card">
        <h2>🎯 Attendance Calculator</h2>
        <div className="input-group">
          <label>Total Classes</label>
          <input
            type="number"
            value={attTotal}
            onChange={e => setAttTotal(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Classes Attended</label>
          <input
            type="number"
            value={attPresent}
            onChange={e => setAttPresent(e.target.value)}
          />
        </div>
        <button onClick={calculateAttendance}>Calculate Attendance %</button>
        {attError && <p className="per123-error">{attError}</p>}
        {attResult && <p className="per123-result">{attResult}</p>}
      </section>

      <section className="per123-card">
        <h2>📚 GPA Predictor</h2>
        {courses.map((course, i) => (
          <div key={i} className="per123-course-row">
            <div className="input-group">
        <label>Credit</label>
        <select className="pre123-slt" value={course.credit}
onChange={e => {
  let copy = [...courses];
  copy[i].credit = e.target.value;
  setCourses(copy);
}}
>
          {[0.75, 1, 1.5, 3].map(val => <option key={val} value={val}>{val}</option>)}
        </select>
      </div>
            <div className="input-group">
              <label>Incourse Mark (0-50)</label>
              <input
                type="number"
                min={0}
                max={50}
                value={course.incourse}
                onChange={e => {
                  const val = e.target.value;
                  let copy = [...courses];
                  copy[i].incourse = val;
                  setCourses(copy);
                }}
              />
            </div>
            <div className="input-group">
              <label>Performance Level</label>
              <select className="pre123-slt"
                value={course.level}
                onChange={e => {
                  let copy = [...courses];
                  copy[i].level = e.target.value;
                  setCourses(copy);
                }}
              >
                <option value="good">Good (+40)</option>
                <option value="moderate">Moderate (+30)</option>
                <option value="poor">Poor (+20)</option>
              </select>
            </div>
          </div>
        ))}
        <button onClick={addCourse}>Add Course</button>
        <button onClick={calculatePrediction}>Calculate Predicted GPA</button>
        {predError && <p className="per123-error">{predError}</p>}
        {predResult && <p className="per123-result">{predResult}</p>}
      </section>

      <section className="per123-card">
        <h2>🎓 CGPA Calculator</h2>
        {semesters.map((sem, i) => (
          <div key={i} className="per123-sem-row">
            <div className="input-group">
              <label>Semester GPA (Max 4)</label>
              <input
                type="number"
                min={0}
                max={4}
                step="0.01"
                value={sem.gpa}
                onChange={e => {
                  let copy = [...semesters];
                  copy[i].gpa = e.target.value;
                  setSemesters(copy);
                }}
              />
            </div>
            <div className="input-group">
              <label>Semester Credit</label>
              <input
                type="number"
                min={0}
                value={sem.credit}
                onChange={e => {
                  let copy = [...semesters];
                  copy[i].credit = e.target.value;
                  setSemesters(copy);
                }}
              />
            </div>
          </div>
        ))}
        <button onClick={addSemester}>Add Semester</button>
        <button onClick={calculateCGPA}>Calculate CGPA</button>
        {cgpaError && <p className="per123-error">{cgpaError}</p>}
        {cgpaResult && <p className="per123-result">{cgpaResult}</p>}
      </section>
    </div>
  );
};

export default Performance;
