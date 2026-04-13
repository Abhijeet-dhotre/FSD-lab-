<?php
include 'db.php';

// INSERT DATA
if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $department = $_POST['department'];

    $sql = "INSERT INTO student (name, email, mobile, department)
            VALUES ('$name', '$email', '$mobile', '$department')";
    mysqli_query($conn, $sql);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Student CRUD</title>
    <meta charset="UTF-8">

    <!-- Bootstrap CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        body {
            background: linear-gradient(to right, #4facfe, #00f2fe);
        }
        .card {
            border-radius: 15px;
        }
        .table {
            border-radius: 10px;
            overflow: hidden;
        }
        h2 {
            font-weight: bold;
        }
    </style>
</head>

<body>

<div class="container mt-5">

    <!-- Title -->
    <div class="text-center mb-4 text-white">
        <h1>🎓 Student Management System</h1>
    </div>

    <div class="row">

        <!-- Form Section -->
        <div class="col-md-4">
            <div class="card shadow p-4">
                <h4 class="text-center mb-3">Add Student</h4>

                <form method="POST">
                    <input type="text" name="name" class="form-control mb-3" placeholder="Name" required>
                    <input type="email" name="email" class="form-control mb-3" placeholder="Email" required>
                    <input type="text" name="mobile" class="form-control mb-3" placeholder="Mobile" required>
                    <input type="text" name="department" class="form-control mb-3" placeholder="Department" required>

                    <button type="submit" name="submit" class="btn btn-primary w-100">
                        ➕ Add Student
                    </button>
                </form>
            </div>
        </div>

        <!-- Table Section -->
        <div class="col-md-8">
            <div class="card shadow p-4">
                <h4 class="text-center mb-3">Student Records</h4>

                <table class="table table-hover table-bordered text-center">
                    <thead class="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Department</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                    <?php
                    $result = mysqli_query($conn, "SELECT * FROM student");

                    while ($row = mysqli_fetch_assoc($result)) {
                        echo "<tr>
                            <td>{$row['id']}</td>
                            <td>{$row['name']}</td>
                            <td>{$row['email']}</td>
                            <td>{$row['mobile']}</td>
                            <td>{$row['department']}</td>
                            <td>
                                <a href='edit.php?id={$row['id']}' class='btn btn-warning btn-sm'>Edit</a>
                                <a href='delete.php?id={$row['id']}' class='btn btn-danger btn-sm'
                                   onclick=\"return confirm('Are you sure?')\">Delete</a>
                            </td>
                        </tr>";
                    }
                    ?>
                    </tbody>

                </table>
            </div>
        </div>

    </div>

</div>

</body>
</html>