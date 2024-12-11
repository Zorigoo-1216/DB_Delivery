import mysql.connector
import generators
import random

mydb = mysql.connector.connect(
    host="localhost", user="root", password="Zorigt@#1216", database="testdelivery", port=8080
)

mycursor = mydb.cursor()

insert_storage_query = """
INSERT INTO storage(manager_id, address ,phone)
VALUES (%s,%s,%s)
"""
# partner
mycursor.execute("SELECT id from `employee` WHERE position='manager'")
rows = mycursor.fetchall()
for i in range(30):
    mycursor.execute(
        insert_storage_query,
        (
            random.choice(rows)[0],
            generators.address_generator(),
            generators.phone_generator(),
        ),
    )
mydb.commit()
mycursor.close()
mydb.close()

print("Storage Data inserted successfully!")
