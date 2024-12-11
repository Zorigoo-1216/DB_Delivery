import mysql.connector
import generators


mydb = mysql.connector.connect(
    host="localhost", user="root", password="Zorigt@#1216", database="testdelivery", port=8080
)

mycursor = mydb.cursor()

insert_driver_query = """
INSERT INTO driver(employee_id, transportation_type, delivery_area)
VALUES (%s,%s,%s)
"""
# driver
mycursor.execute("SELECT id from `employee` WHERE position='driver'")
rows = mycursor.fetchall()
for row in rows:
    mycursor.execute("SELECT * from `employee` WHERE id = %s", row)
    ans = mycursor.fetchall()
    if len(ans) != 0:
        mycursor.execute(
            insert_driver_query,
            (
                row[0],
                generators.transoprtation_generator(),
                generators.delivery_area_generator(),
            ),
        )
mydb.commit()
mycursor.close()
mydb.close()

print("Driver Data inserted successfully!")
