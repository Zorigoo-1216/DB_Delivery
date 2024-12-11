import mysql.connector
import generators
import random


mydb = mysql.connector.connect(
    host="localhost", user="root", password="Zorigt@#1216", database="testdelivery", port=8080
)

mycursor = mydb.cursor()

insert_payment_query = """
INSERT INTO delivery(employee_id, order_id)
VALUES (%s,%s)
"""
# driver
mycursor.execute(
    "SELECT id from `order` WHERE `status`='SUCCESS' OR `status`='ON DELIVERY'"
)

rows = mycursor.fetchall()
for row in rows:
    mycursor.execute("SELECT employee_id from `driver`")
    drivers = mycursor.fetchall()
    mycursor.execute(
        insert_payment_query,
        (
            random.choice(drivers)[0],
            row[0],
        ),
    )

mydb.commit()
mycursor.close()
mydb.close()
print("Delivery Data inserted successfully!")
