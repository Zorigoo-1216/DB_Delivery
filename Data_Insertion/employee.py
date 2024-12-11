import mysql.connector
import generators

mydb = mysql.connector.connect(
    host="localhost", user="root", password="Zorigt@#1216", database="testdelivery", port=8080
)
mycursor = mydb.cursor()
insert_employee_query = """
INSERT INTO employee (Last_name, First_name,  sex, position, email, phone, date_of_brith, passport, home_address, salary)
VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
"""

# employee
for i in range(200):
    fname = generators.name_generator()
    lname = generators.name_generator()
    position = generators.position_generator()
    mycursor.execute(
        insert_employee_query,
        (
            lname,
            fname,
            generators.sex_generator(),
            position,
            generators.email_generator(lname, fname),
            generators.phone_generator(),
            generators.date_generator(),
            generators.passport_generator(),
            generators.address_generator(),
            generators.salary_generator(position),
        ),
    )

mydb.commit()
mycursor.close()
mydb.close()

print("Employee Data inserted successfully!")
