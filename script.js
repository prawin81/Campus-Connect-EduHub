let students = [];
let idCounter = 1;
let editId = null;

// Add or update student
function addStudent() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const age = document.getElementById('age').value.trim();
  const grade = document.getElementById('grade').value.trim();
  const degree = document.getElementById('degree').value.trim();
  const session = document.getElementById('session').value.trim();
  const fileInput = document.getElementById('profilePic');
  const file = fileInput.files[0];

  if (!name || !email) {
    alert('Please enter at least name and email');
    return;
  }

  if (editId !== null) {
    // UPDATE existing student
    const student = students.find(s => s.id === editId);
    student.name = name;
    student.email = email;
    student.age = age;
    student.grade = grade;
    student.degree = degree;
    student.session = session;

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        student.profilePic = e.target.result;
        renderTable();
        clearInputs();
        editId = null;
      };
      reader.readAsDataURL(file);
    } else {
      renderTable();
      clearInputs();
      editId = null;
    }
    return;
  }

  // ADD new student
  let student = {
    id: idCounter++,
    name,
    email,
    age,
    grade,
    degree,
    session,
    profilePic: null
  };

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      student.profilePic = e.target.result;
      students.push(student);
      addStudentToTable(student);
      clearInputs();
    };
    reader.readAsDataURL(file);
  } else {
    students.push(student);
    addStudentToTable(student);
    clearInputs();
  }
}

function addStudentToTable(student) {
  const tbody = document.getElementById('student-list');
  const tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${student.id}</td>
    <td>${student.name}</td>
    <td>${student.email}</td>
    <td>${student.age}</td>
    <td>${student.grade}</td>
    <td>${student.degree}</td>
    <td>${student.session}</td>
    <td>${student.profilePic ? `<img src="${student.profilePic}" alt="Profile Pic" style="height:50px;" />` : 'N/A'}</td>
    <td>
      <button onclick="editStudent(${student.id})" style="color:blue; cursor:pointer;">Edit</button>
      <button onclick="deleteStudent(${student.id})" style="color:red; cursor:pointer;">Delete</button>
    </td>
  `;

  tbody.appendChild(tr);
}

function editStudent(id) {
  const student = students.find(s => s.id === id);
  if (!student) return;

  document.getElementById('name').value = student.name;
  document.getElementById('email').value = student.email;
  document.getElementById('age').value = student.age;
  document.getElementById('grade').value = student.grade;
  document.getElementById('degree').value = student.degree;
  document.getElementById('session').value = student.session;

  editId = id;
  window.scrollTo(0, 0); // UX: Scroll to top
}

function clearInputs() {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('age').value = '';
  document.getElementById('grade').value = '';
  document.getElementById('degree').value = '';
  document.getElementById('session').value = '';
  document.getElementById('profilePic').value = '';
}

function deleteStudent(id) {
  students = students.filter(s => s.id !== id);
  renderTable();
}

function renderTable() {
  const tbody = document.getElementById('student-list');
  tbody.innerHTML = '';
  students.forEach(addStudentToTable);
}

function search() {
  const input = document.getElementById('search').value.toLowerCase();
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(input) ||
    s.email.toLowerCase().includes(input) ||
    s.degree.toLowerCase().includes(input) ||
    s.session.toLowerCase().includes(input)
  );

  const tbody = document.getElementById('student-list');
  tbody.innerHTML = '';
  filteredStudents.forEach(addStudentToTable);
}
