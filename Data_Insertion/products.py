import mysql.connector
import generators
import random

mydb = mysql.connector.connect(
    host="localhost", user="root", password="Zorigt@#1216", database="delivery", port=8080
)

mycursor = mydb.cursor()

insert_product_query = """
INSERT INTO product(quantity, storage_id ,partner_id,name ,price)
VALUES (%s,%s,%s,%s,%s)
"""
# partner
mycursor.execute("SELECT id FROM storage")
storage_id = mycursor.fetchall()
mycursor.execute("SELECT id FROM partner")
partner_id = mycursor.fetchall()
for i in range(1000):
    mycursor.execute(
        insert_product_query,
        (
            random.randint(0, 100),
            random.choice(storage_id)[0],
            random.choice(partner_id)[0],
            generators.product_name_generator(),
            random.randrange(5000, 500000, 5000),
        ),
    )
mydb.commit()
mycursor.close()
mydb.close()

print("Products Data inserted successfully!")
