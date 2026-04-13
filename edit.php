<?php
include 'db.php';

$id = $_GET['id'];

// FETCH DATA
$result = mysqli_query($conn, "SELECT * FROM student WHERE id=$id");
$row = mysqli_fetch_assoc($result);

// UPDATE DATA
if (isset($_POST['update'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $department = $_POST['department'];

    $sql = "UPDATE student SET 
            name='$name', 
            email='$email', 
            mobile='$mobile', 
            department='$department' 
            WHERE id=$id";

    mysqli_query($conn, $sql);

    header("Location: index.php");
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Edit Student</title>
</head>
<body>

<h2>Edit Student</h2>

<form method="POST">
    Name: <input type="text" name="name" value="<?php echo $row['name']; ?>" required><br><br>
    Email: <input type="email" name="email" value="<?php echo $row['email']; ?>" required><br><br>
    Mobile: <input type="text" name="mobile" value="<?php echo $row['mobile']; ?>" required><br><br>
    Department: <input type="text" name="department" value="<?php echo $row['department']; ?>" required><br><br>
    <button type="submit" name="update">Update</button>
</form>

</body>
</html>