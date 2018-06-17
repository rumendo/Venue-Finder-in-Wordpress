import pprint, json, requests, MySQLdb

# Read 'wordlist.txt' line by line and store in a list.
with open('places.txt', 'r') as f:
    content = f.readlines()
content = [x.strip() for x in content]

id = 0
url = 'https://api.foursquare.com/v2/venues/search'

for place in content: # Makes a request for every place in the wordlist and stores it the wordpress DB.
    params = dict(
        client_id= 'CNLIDPQFCT1402GBCRHRC4ZVEKOQQRYQKVAQORKLDDROMTLU',
        client_secret= 'LDY4H5FEHD415NVYZRXKKSZAAAXNEDMM4Z2KM2ALQKQAJDEB',
        ll= '42.696622, 23.322290', #Sofia
        #ll= '51.489844, -0.061804', #London
        #ll= '36.165950, -115.185310', #Las Vegas
        #ll= '38.8935124,-77.1550048', #Washington
        radius= 7000,
        query= place,
        intent= 'browse',
        v= '20180323',
        limit= 50
    )

    con = MySQLdb.connect(
    	host="localhost",
    	user="wordpressuser",
    	passwd="root",
    	db="wordpress")
    x = con.cursor()

    try:
        x.execute("""SELECT id FROM `markers` ORDER BY id desc limit 1""")
        id = x.fetchone()[0]
        id += 1
        print(id)
        con.commit()
    except:
        con.rollback()


    resp = requests.get(url=url, params=params)
    data = json.loads(resp.text)


    response = data["response"]
    response = response["venues"]
    type = params["query"]

    for venue in response: # Inserts every venue in the database.
    	name = venue["name"]
        venue_id = venue["id"]

        if venue.get("name"):
            name = venue["name"]
        else:
            name = 'Not stated'

        if venue.get("id"):
            venue_id = venue["id"]
        else:
            venue_id = 'Not stated'

        if venue.get("location"):
            location = venue["location"]
        else:
            location = 'Not stated'

        if location.get("address"):
            address = location["address"]
    	else:
            address = 'Not stated'

        if location.get("city"):
            city = location["city"]
        else:
            city = 'Not stated'

        if location.get("cc"):
            country = location["cc"]
        else:
            country = 'Not stated'

        if location.get("lat"):
            lat = location["lat"]
        else:
            lat = 0

        if location.get("lng"):
            lng = location["lng"]
        else:
            lng = 0


    	try:
    		x.execute("""INSERT INTO markers VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)""", (id, name, address, lat, lng, type, city, country, venue_id))
                id += 1
                con.commit()
    	except:
            con.rollback()
