<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Manage Courses</title>
  <link rel="stylesheet" href="test.css">
</head>
<body>
  <?php
  include 'db_connection.php'; // Include the database connection
  ?>

  <header>
    <div class="header-content">
      <ul class="bullet">
        <li>
          <img src="DYCI LOGO.png" alt="Logo" class="logo">
        </li>
        <li>
          <p class="DYCI">Dr. Yanga's College Inc.</p>
        </li>
      </ul>
    </div>
  </header>

  <nav class="navbar">
    <ul>
      <li><a href="courses.php">Courses</a></li>
      <li><a href="settings.php">Settings</a></li>
      <li><a href="profile.php">Your Profile</a></li>
      <li><a href="index_login.php" id="logout-link">Logout</a></li>
    </ul>
  </nav>

  <main>
    <h3>Manage Courses</h3>
    <div class="course-selection">
      <label for="course">Select a Course:</label>
      <select id="course" name="course" onchange="fetchSubjects()">
        <option value="">Select a Course</option> <!-- Placeholder option -->
      
        <?php
        // Fetch courses from the database
        $query = "SELECT * FROM courses"; // Assuming you have a 'courses' table
        $result = $conn->query($query);

        while ($row = $result->fetch_assoc()) {
          echo "<option value='{$row['id']}'>{$row['course_name']}</option>";
        }
        ?>
      </select>

      <label for="year">Select Year:</label>
      <select id="year" name="year" onchange="fetchSubjects()">
        <option value="">Select Year</option>
        <option value="all">All Years</option> <!-- Option for all years -->
        <option value="1">1st Year</option>
        <option value="2">2nd Year</option>
        <option value="3">3rd Year</option>
        <option value="4">4th Year</option>
        <option value="summer">Summer</option>
      </select>

      <label for="semester">Select Semester:</label>
      <select id="semester" name="semester" onchange="fetchSubjects()">
        <option value="">Select Semester</option>
        <option value="all">All Semesters</option> <!-- Option for all semesters -->
        <option value="1st">1st Semester</option>
        <option value="2nd">2nd Semester</option>
      </select>

      <button type="button" onclick="fetchSubjects()">Confirm</button>
    </div>

    <div id="subjectTable" class="subject-table">
      <h4>Subjects:</h4>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Type</th>
            <th>Units</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="subjectsBody">
          <!-- Subjects will be populated here using JavaScript -->
        </tbody>
      </table>
    </div>
  </main>

  <script>
    function fetchSubjects() {
      const courseId = document.getElementById('course').value;
      const year = document.getElementById('year').value;
      const semester = document.getElementById('semester').value;

      // Perform AJAX request to fetch subjects based on selected course, year, and semester
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `fetch_subjects.php?course_id=${courseId}&year=${year}&semester=${semester}`, true);
      xhr.onload = function() {
        if (this.status === 200) {
          const subjects = JSON.parse(this.responseText);
          const subjectsBody = document.getElementById('subjectsBody');
          subjectsBody.innerHTML = '';
          
          subjects.forEach(subject => {
            subjectsBody.innerHTML += `
              <tr>
                <td>${subject.code}</td>
                <td>${subject.type}</td>
                <td>${subject.units}</td>
                <td>${subject.description}</td>
                <td>${subject.status}</td>
                <td>
                  <button onclick="toggleStatus(${subject.id}, '${subject.status}')">${subject.status === 'Active' ? 'Deactivate' : 'Activate'}</button>
                </td>
              </tr>
            `;
          });
        }
      };
      xhr.send();
    }

    function toggleStatus(subjectId, currentStatus) {
      const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';

      // Perform AJAX request to update subject status
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'update_subject_status.php', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onload = function() {
        if (this.status === 200) {
          fetchSubjects(); // Refresh subjects
        }
      };
      xhr.send(`subject_id=${subjectId}&status=${newStatus}`);
    }
  </script>
</body>
</html>
