import mysql.connector
import generators
import random

mydb = mysql.connector.connect(
    host="localhost", user="root", password="Zorigt@#1216", database="delivery", port=8080
)

mycursor = mydb.cursor()
insert_order_query = """
INSERT INTO `order`(status, product_id, quantity , address)
VALUES (%s,%s,%s,%s)
"""

mycursor.execute("SELECT id FROM product")
product_id = mycursor.fetchall()
for i in range(100000):
    mycursor.execute(
        insert_order_query,
        (
            generators.status_generator(),
            random.choice(product_id)[0],
            random.randint(1, 10),
            generators.address_generator(),
        ),
    )
mydb.commit()
mycursor.close()
mydb.close()

print("Order Data inserted successfully!")
