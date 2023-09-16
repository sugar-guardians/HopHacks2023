# from pymongo import MongoClient


def BG_range_to_titration_matrix_row(blood_glucose_measurement):
    # given a blood glucose measurement, output
    if blood_glucose_measurement > 450:
        return 20
    elif 385 <= blood_glucose_measurement <= 450:
        return 19
    elif 334 <= blood_glucose_measurement <= 384:
        return 18
    elif 290 <= blood_glucose_measurement <= 333:
        return 17
    elif 251 <= blood_glucose_measurement <= 289:
        return 16
    elif 217 < blood_glucose_measurement <= 250:
        return 15
    elif 188 <= blood_glucose_measurement <= 216:
        return 14
    elif 163 <= blood_glucose_measurement <= 187:
        return 13
    elif 151 <= blood_glucose_measurement <= 162:
        return 12
    elif 141 <= blood_glucose_measurement <= 150:
        return 11
    elif 131 <= blood_glucose_measurement <= 140:
        return 10
    elif 121 <= blood_glucose_measurement <= 130:
        return 9
    elif 111 <= blood_glucose_measurement <= 120:
        return 8
    elif 106 <= blood_glucose_measurement <= 110:
        return 7
    elif 101 <= blood_glucose_measurement <= 105:
        return 6
    elif 96 <= blood_glucose_measurement <= 100:
        return 5
    elif 90 <= blood_glucose_measurement <= 95:
        return 4
    elif 80 <= blood_glucose_measurement <= 89:
        return 3
    elif 70 <= blood_glucose_measurement <= 79:
        return 2
    elif 60 <= blood_glucose_measurement <= 69:
        return 1
    elif blood_glucose_measurement < 60:
        return 0

def make_titration_matrix():
    # Given col_1 values
    col_1 = [0, 0.1, 0.2, 0.3, 0.3, 0.4, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.2, 1.4, 1.7, 2.1, 2.5, 3, 3.6, 4.4]

    # Initialize an empty matrix
    titration_matrix = []

    # Iterate through col_1 values
    for val in col_1:
        # Initialize a row for the current col_1 value
        row = [val]

        # Calculate and append col_2 to col_16 values
        for i in range(2, 17):
            row.append(round(val * i, 2))

        # Append the row to the matrix
        titration_matrix.append(row)

    titration_matrix[6] = [0.4, 0.9, 1.3, 1.8, 2.2, 2.7, 3.1, 3.6, 4, 4.5, 4.9, 5.4, 5.9, 6.4, 6.9, 7.4]
    titration_matrix[4] = [0.3, 0.7, 1, 1.4, 1.7, 2.1, 2.4, 2.8, 3.2, 3.5, 3.8, 4.1, 4.4, 4.7, 5, 5.3]
    return titration_matrix

TITRATION_MATRIX = make_titration_matrix()

# Print the matrix
# for row in titration_matrix:
#     print(row)

# print(titration_matrix[BG_range_to_titration_matrix_row(200)][7])
# print(titration_matrix[BG_range_to_titration_matrix_row(140)][0])


def D50W_table(blood_glucose_measurement):
    # input: BG measurement
    if 80 <= blood_glucose_measurement <= 89:
        return 0
    elif 70 <= blood_glucose_measurement <= 79:
        return 10
    elif 60 <= blood_glucose_measurement <= 69:
        return 15
    elif 50 <= blood_glucose_measurement <= 59:
        return 20
    elif 30 <= blood_glucose_measurement <= 49:
        return 25
    elif blood_glucose_measurement < 30:
        return 30





# tests
# if __name__ == "__main__":
    # patients_collection = db["patients"]
    # calculate_titration_rate('3662', 135)
    
