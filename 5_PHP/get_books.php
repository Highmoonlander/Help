<?php
include 'config.php';

header('Content-Type: application/json');


$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$search = isset($_GET['search']) ? $conn->real_escape_string($_GET['search']) : '';
$category = isset($_GET['category']) ? $conn->real_escape_string($_GET['category']) : '';
$sort = isset($_GET['sort']) ? $_GET['sort'] : 'title_asc';
$featured = isset($_GET['featured']) ? filter_var($_GET['featured'], FILTER_VALIDATE_BOOLEAN) : false;


$items_per_page = 8;
$offset = ($page - 1) * $items_per_page;


$query = "SELECT * FROM books WHERE 1=1";


if (!empty($search)) {
    $query .= " AND (title LIKE '%$search%' OR author LIKE '%$search%')";
}


if (!empty($category)) {
    $query .= " AND category = '$category'";
}


switch ($sort) {
    case 'title_desc':
        $query .= " ORDER BY title DESC";
        break;
    case 'price_asc':
        $query .= " ORDER BY price ASC";
        break;
    case 'price_desc':
        $query .= " ORDER BY price DESC";
        break;
    case 'title_asc':
    default:
        $query .= " ORDER BY title ASC";
        break;
}


if ($featured) {
    $query = "SELECT * FROM books ORDER BY RAND() LIMIT 4";
    $result = $conn->query($query);
    
    $books = [];
    while ($row = $result->fetch_assoc()) {
        $books[] = $row;
    }
    
    echo json_encode($books);
    $conn->close();
    exit;
}


$count_query = str_replace("SELECT *", "SELECT COUNT(*) as total", $query);
$count_result = $conn->query($count_query);
$total_records = $count_result->fetch_assoc()['total'];
$total_pages = ceil($total_records / $items_per_page);


$query .= " LIMIT $offset, $items_per_page";


$result = $conn->query($query);


$books = [];
while ($row = $result->fetch_assoc()) {
    $books[] = $row;
}

$response = [
    'books' => $books,
    'total_pages' => $total_pages,
    'current_page' => $page,
    'total_records' => $total_records
];

echo json_encode($response);

$conn->close();
?>