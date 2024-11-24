import random
import string


def date_generator():
    year = random.randint(1990, 2010)
    month = random.randint(1, 12)
    
    # Determine the maximum valid day for the given month and year
    if month == 2:  # February
        # Check if it's a leap year
        if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
            max_day = 29
        else:
            max_day = 28
    elif month in {4, 6, 9, 11}:  # Months with 30 days
        max_day = 30
    else:  # Months with 31 days
        max_day = 31
    
    day = random.randint(1, max_day)
    return f"{year}-{month:02d}-{day:02d}"  # Format with leading zeros for consistency

def name_generator():
    ners = [
        "Bat",
        "Bold",
        "Shine",
        "Sukh",
        "Saikhan",
        "Erdene",
        "Dorj",
        "Od",
        "Bileg",
        "Suvd",
        "Eldev",
        "Otgon",
        "Bolor",
        "Amar",
        "Chin",
        "Sanaa",
        "Tseren",
        "Enkh",
        "Gan",
    ]
    return random.choice(ners) + random.choice(ners)


def sex_generator():
    return random.choice(["M", "F"])


def phone_generator():
    return random.randint(80000000, 99999999)


def address_generator():
    duureg = [
        "Chingeltei",
        "Sukhbaatar",
        "Songino khairkhan",
        "Bayan Zurkh",
        "Khan uul",
        " Bayan Gol",
    ]
    return (
        random.choice(duureg)
        + " duureg "
        + str(random.randint(1, 14))
        + "-r khoroo "
        + str(random.randint(1, 50))
        + "-r khoroolol "
        + str(random.randint(1, 10000))
        + "-r bair "
        + str(random.randint(1, 1000))
        + " toot"
    )


def passport_generator():
    return (
        random.choice(string.ascii_letters)
        + random.choice(string.ascii_letters)
        + random.choice(string.ascii_letters)
        + str(random.randint(1000000, 9999999))
    )


def position_generator():
    pos = [
        "Driver",
        "Packer",
        "Manager",
        "Chief",
        "Ceo",
        "IT engineer",
        "Logistics Coordinator",
    ]
    w = [60, 20, 5, 3, 2, 3, 7]
    return random.choices(pos, weights=w)[0]


def salary_generator(position):
    sal = {
        "Driver": 1400000,
        "Packer": 1300000,
        "Manager": 2000000,
        "Chief": 1600000,
        "Ceo": 3000000,
        "IT engineer": 2500000,
        "Logistics Coordinator": 1900000,
    }
    return sal[position]


generated_emails = set()  # A set to keep track of generated emails

def email_generator(lname, fname):
    global generated_emails
    base_email = lname + fname + "@gmail.com"
    unique_email = base_email
    counter = 1

    # Loop until a unique email is found
    while unique_email in generated_emails:
        unique_email = f"{lname}{fname}{counter}@gmail.com"
        counter += 1

    generated_emails.add(unique_email)  # Add the unique email to the set
    return unique_email


def transoprtation_generator():
    return random.choice(["CAR", "BIKE", "MOTORCYCLE"])


def delivery_area_generator():
    duureg = [
        "Chingeltei",
        "Sukhbaatar",
        "Songino khairkhan",
        "Bayan Zurkh",
        "Khan uul",
        " Bayan Gol",
    ]
    return random.choice(duureg)


def partner_name_generator():
    names = online_shop_names = [
        "Tenger Daatgal",  # Sky Marketplace
        "Erdene Garah",  # Treasure Shop
        "Amjilt Bazar",  # Success Bazaar
        "Chandmani Khun",  # Jewel Goods
        "Bayan Tovch",  # Wealth Button
        "Zorig Online",  # Courage Online
        "Khulan Harah",  # Wild Horse View
        "Sain Zahius",  # Good Products
        "Ikh Bichig",  # Great Write (Goods)
        "Turgen Zar",  # Fast Sale
        "Munkh Tovchoo",  # Eternal Corner
        "Zuunbayan Shop",  # Prosperity Shop
        "Gal Tsal",  # Fire Glow
        "Soyombo Goods",  # Soyombo Goods
        "Altan Zahius",  # Golden Products
        "Khatanbaatar Mart",  # Queen Warrior Mart
        "Sod Harah",  # Unique View
        "Erchim Shop",  # Energy Shop
        "Chuluun Khar",  # Stone Look
        "Naidvar Zahius",  # Trust Products
        "Shine Oron",  # New Place
        "Baatar Gazar",  # Hero Land
        "Zorig Uil",  # Courage Works
        "Turgen Gada",  # Fast Turn
        "Khugjil Online",  # Development Online
        "Delger Baiz",  # Prosperous Store
        "Tsolmon Garah",  # Venus Shop
        "Khuvsgul Zahius",  # Khuvsgul Products
        "Sain Sanhuu",  # Good Savings
        "Uilchlegch Shop",  # Service Shop
        "Ikh Delguur",  # Great Store
        "Zorig Garah",  # Courage Shop
        "Bayan Uil",  # Wealth Work
        "Erdene Gazar",  # Treasure Land
        "Khurgelt Mart",  # Delivery Mart
        "Zuunbayan Bazar",  # Prosperity Bazaar
        "Naidvartai Khun",  # Reliable Goods
        "Sod Harah",  # Unique Look
    ]
    return random.choice(names)


def business_type_generator():
    online_shop_business_types = [
        "Food ",
        "Fashion clothing",
        "Beauty and Personal Care",
        "Health and Wellness",
        "Home Goods",
        "Electronics",
        "Toys and Games",
        "Pet Supplies",
        "Craft Supplies",
        "Automotive Parts",
        "Sports Equipment",
        "Books",
        "Garden and Outdoor",
        "Jewelry and Accessories",
    ]
    return random.choice(online_shop_business_types)


def product_name_generator():
    product_names = [
        "EcoBlend Water Bottle",
        "ZenBrew Coffee Maker",
        "SwiftCharge Power Bank",
        "AirPure Humidifier",
        "FlexFit Yoga Mat",
        "GlowSkin Facial Cleanser",
        "ComfyCloud Pillow",
        "SnapGrip Phone Holder",
        "SparkFit Resistance Bands",
        "PulseTrack Fitness Watch",
        "EcoFlow Shower Filter",
        "SmartTherm Thermostat",
        "Lumina Desk Lamp",
        "AuraSleep Sound Machine",
        "EverFresh Air Purifier",
        "ActiveVibe Foam Roller",
        "PureHydro Water Filter",
        "SlimTone Scale",
        "QuietBuds Earplugs",
        "WaveLight Projector",
        "GripMax Hand Strengthener",
        "LuxeChill Towel",
        "TechGuard Screen Protector",
        "ZenWave Soundbar",
        "HydroPulse Water Flosser",
        "SootheHeat Back Massager",
        "FitFlex Resistance Loop",
        "UltraClean Toothbrush",
        "VivaFit Exercise Ball",
        "AirEase Diffuser",
        "EcoWrap Food Storage",
        "ProGlide Razor",
        "ZenTime Meditation Pillow",
        "FreshGuard Mask",
        "CoolBreeze Fan",
        "ActiveBoost Protein Shaker",
        "QuickFix Tool Kit",
        "LightMax Headlamp",
        "SnapChill Cooler",
        "ChargeCore Wireless Charger",
        "AquaGlow Pool Lights",
        "SoundWave Bluetooth Speaker",
        "GlowFit Reflective Vest",
        "HeatWrap Neck Warmer",
        "ActiveGrip Gloves",
        "SkyView Binoculars",
        "JetSet Travel Pillow",
        "CalmSpace Night Light",
        "PureWave Hair Dryer",
        "FlexFold Laundry Basket",
        "EasyChop Vegetable Chopper",
        "CleanBeam UV Sanitizer",
        "FreshSeal Vacuum Storage",
        "WaveGuard Umbrella",
        "EverCool Ice Pack",
        "SmartBrew Kettle",
        "EcoSoothe Heating Pad",
        "FastTrack Bike Mount",
        "EasyBrew Tea Infuser",
        "HydraGlow Facial Steamer",
        "CoreBalance Board",
        "FitStep Pedometer",
        "ZenBlend Aromatherapy",
        "SnapLock Storage",
        "QuickDry Hair Wrap",
        "SafeSip Bottle",
        "CalmRest Weighted Blanket",
        "SmoothSkin Razor",
        "HeatFlow Heater",
        "CleanWave Mop",
        "FitTrack Body Analyzer",
        "AirGuard Face Shield",
        "SnapGrip Wallet",
        "EcoGrip Cup Holder",
        "QuickScan Thermometer",
        "PowerFit Jump Rope",
        "PulseLite Keychain Light",
        "SootheEase Neck Pillow",
        "PureShine Jewelry Cleaner",
        "WaveGuard Shower Curtain",
        "SunSafe UV Detector",
        "MaxCool Portable Fan",
        "QuickGlow Lantern",
        "SonicClean Toothbrush",
        "AirMax Purifier",
        "GripTight Door Stop",
        "HeatMate Heating Blanket",
        "ClearView Goggles",
        "SnapFresh Food Sealer",
        "PulseFit Arm Band",
        "EcoGuard Gloves",
        "SmartSync Charger",
        "CleanFlow Water Filter",
        "FitLight Motion Sensor",
        "ChillWave Cooling Towel",
        "QuickClick Pen",
        "GlowGuard Safety Light",
        "ProFlex Wrist Support",
        "ActiveTone Belt",
        "AquaSafe Swim Cap",
        "SnapClip Organizer",
        "PureBreeze Air Cooler",
        "WaveFit Ankle Weights",
        "CalmGlow Candle",
        "ChargeEase Adapter",
    ]
    return random.choice(product_names)


def status_generator():
    s = ["SUCCESS", "CANCELED", "WAITING", "ON DELIVERY"]
    return random.choice(s)


def payment_status_generator():
    s = ["SUCCESS", "REFUNDED"]
    bias = [90, 10]
    return random.choices(s, weights=bias)[0]


def type_generator():
    payment = ["CARD", "QPAY", "CASH"]
    return random.choice(payment)
