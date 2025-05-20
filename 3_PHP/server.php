<?php
header('Content-Type: application/json');

function calculate_bill($units) {
    $bill = 0;

    if ($units <= 50) {
        $bill = $units * 3.50;
    } elseif ($units <= 150) {
        $bill = (50 * 3.50) + (($units - 50) * 4.00);
    } elseif ($units <= 250) {
        $bill = (50 * 3.50) + (100 * 4.00) + (($units - 150) * 5.20);
    } else {
        $bill = (50 * 3.50) + (100 * 4.00) + (100 * 5.20) + (($units - 250) * 6.50);
    }

    return $bill;
}

if (isset($_GET['units'])) {
    $units = (int)$_GET['units'];
    $billAmount = calculate_bill($units);
    echo json_encode(['units' => $units, 'bill' => $billAmount]);
}
?>