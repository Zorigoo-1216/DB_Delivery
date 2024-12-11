import mysql.connector
import generators
import random


mydb = mysql.connector.connect(
    host="localhost", user="root", password="Zorigt@#1216", database="testdelivery", port=8080
)

mycursor = mydb.cursor()

insert_payment_query = """
INSERT INTO payment(order_id, `type`, `status`)
VALUES (%s,%s,%s)
"""
# driver
mycursor.execute("SELECT id from `order` WHERE `status`='SUCCESS'")
rows = mycursor.fetchall()
for row in rows:
    mycursor.execute(
        insert_payment_query,
        (
            row[0],
            generators.type_generator(),
            generators.payment_status_generator(),
        ),
    )
mydb.commit()
mycursor.close()
mydb.close()

print("Payment Data inserted successfully!")
