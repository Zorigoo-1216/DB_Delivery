import mysql.connector
import generators


mydb = mysql.connector.connect(
    host="localhost", user="root", password="Zorigt@#1216", database="testdelivery", port=8080
)

mycursor = mydb.cursor()

insert_partner_query = """
INSERT INTO partner(name, password, address, phone, email,business_type)
VALUES (%s,%s,%s,%s,%s,%s)
"""
# partner
for i in range(30):
    name = generators.partner_name_generator()
    mycursor.execute(
        insert_partner_query,
        (
            name,
            generators.passport_generator(),
            generators.address_generator(),
            generators.phone_generator(),
            generators.email_generator(name, str(i)),
            generators.business_type_generator(),
        ),
    )
mydb.commit()
mycursor.close()
mydb.close()

print("Partner Data inserted successfully!")
