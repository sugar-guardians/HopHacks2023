from titration import titration_matrix, BG_range_to_titration_matrix_row

assert titration_matrix[BG_range_to_titration_matrix_row(460)][0] == 4.4
