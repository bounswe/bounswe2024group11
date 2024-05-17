const users = [
    {
        "username": "jdoe",
        "password": "JDoe@2024",
        "fullName": "John Doe",
        "email": "jdoe@example.com"
    },
    {
        "username": "asmith",
        "password": "ASmith@2024",
        "fullName": "Alice Smith",
        "email": "asmith@example.com"
    },
    {
        "username": "bthomas",
        "password": "BThomas@2024",
        "fullName": "Brian Thomas",
        "email": "bthomas@example.com"
    },
    {
        "username": "ljohnson",
        "password": "LJohnson@2024",
        "fullName": "Laura Johnson",
        "email": "ljohnson@example.com"
    },
    {
        "username": "kmiller",
        "password": "KMiller@2024",
        "fullName": "Kevin Miller",
        "email": "kmiller@example.com"
    },
    {
        "username": "cwilliams",
        "password": "CWilliams@2024",
        "fullName": "Carla Williams",
        "email": "cwilliams@example.com"
    },
    {
        "username": "danderson",
        "password": "DAnderson@2024",
        "fullName": "David Anderson",
        "email": "danderson@example.com"
    },
    {
        "username": "mjones",
        "password": "MJones@2024",
        "fullName": "Maria Jones",
        "email": "mjones@example.com"
    },
    {
        "username": "rwhite",
        "password": "RWhite@2024",
        "fullName": "Robert White",
        "email": "rwhite@example.com"
    },
    {
        "username": "tmartin",
        "password": "TMartin@2024",
        "fullName": "Tina Martin",
        "email": "tmartin@example.com"
    },
    {
        "username": "jsmith",
        "password": "JSmith@2024",
        "fullName": "Jane Smith",
        "email": "jsmith@example.com"
    },
    {
        "username": "mjohnson",
        "password": "MJohnson@2024",
        "fullName": "Michael Johnson",
        "email": "mjohnson@example.com"
    },
    {
        "username": "jwilliams",
        "password": "JWilliams@2024",
        "fullName": "Jessica Williams",
        "email": "jwilliams@example.com"
    },
    {
        "username": "rsmith",
        "password": "RSmith@2024",
        "fullName": "Richard Smith",
        "email": "rsmith@example.com"
    },
    {
        "username": "kthompson",
        "password": "KThompson@2024",
        "fullName": "Karen Thompson",
        "email": "kthompson@example.com"
    },
    {
        "username": "jlee",
        "password": "JLee@2024",
        "fullName": "Jennifer Lee",
        "email": "jlee@example.com"
    },
    {
        "username": "tjackson",
        "password": "TJackson@2024",
        "fullName": "Thomas Jackson",
        "email": "tjackson@example.com"
    },
    {
        "username": "srodriguez",
        "password": "SRodriguez@2024",
        "fullName": "Samantha Rodriguez",
        "email": "srodriguez@example.com"
    },
    {
        "username": "jroberts",
        "password": "JRoberts@2024",
        "fullName": "James Roberts",
        "email": "jroberts@example.com"
    },
    {
        "username": "mthomas",
        "password": "MThomas@2024",
        "fullName": "Michelle Thomas",
        "email": "mthomas@example.com"
    },
    {
        "username": "jhall",
        "password": "JHall@2024",
        "fullName": "Jonathan Hall",
        "email": "jhall@example.com"
    },
    {
        "username": "sanders",
        "password": "Sanders@2024",
        "fullName": "Sarah Sanders",
        "email": "sanders@example.com"
    },
    {
        "username": "jstewart",
        "password": "JStewart@2024",
        "fullName": "Jason Stewart",
        "email": "jstewart@example.com"
    },
    {
        "username": "mrodriguez",
        "password": "MRodriguez@2024",
        "fullName": "Melissa Rodriguez",
        "email": "mrodriguez@example.com"
    },
    {
        "username": "jrodriguez",
        "password": "JRodriguez@2024",
        "fullName": "Joseph Rodriguez",
        "email": "jrodriguez@example.com"
    },
    {
        "username": "awilson",
        "password": "AWilson@2024",
        "fullName": "Amy Wilson",
        "email": "awilson@example.com"
    },
    {
        "username": "jmartinez",
        "password": "JMartinez@2024",
        "fullName": "Jessica Martinez",
        "email": "jmartinez@example.com"
    },
    {
        "username": "mroberts",
        "password": "MRoberts@2024",
        "fullName": "Matthew Roberts",
        "email": "mroberts@example.com"
    }
];

const posts = [
    {
        "title": "The Evolution of Spider-Man",
        "content": "Hey everyone! Check out how Spider-Man has changed over the years. From his first comic appearance to the latest movies, his costume and powers have evolved so much. What’s your favorite Spider-Man look?",
        "image_src": "https://example.com/images/spiderman_evolution.jpg",
        "qid": "Q1741",
        "qtitle": "Spider-Man"
    },
    {
        "title": "Batman: The Dark Knight's Legacy",
        "content": "Batman fans, this one's for you! Dive into the world of the Dark Knight, from his origin story to his epic battles in Gotham. Who's your favorite Batman villain?",
        "image_src": "https://example.com/images/batman_legacy.jpg",
        "qid": "Q8683",
        "qtitle": "Batman"
    },
    {
        "title": "The X-Men: Heroes and Outcasts",
        "content": "Let's talk about the X-Men! These heroes fight for acceptance and battle some of the toughest enemies. Which X-Men character do you relate to the most?",
        "image_src": "https://example.com/images/xmen_heroes.jpg",
        "qid": "Q200616",
        "qtitle": "X-Men"
    },
    {
        "title": "Wonder Woman: A Symbol of Strength",
        "content": "Wonder Woman is such a badass! From her origins as an Amazonian princess to her role as a feminist icon, she's inspired so many. Who's your favorite Wonder Woman ally?",
        "image_src": "https://example.com/images/wonder_woman.jpg",
        "qid": "Q154521",
        "qtitle": "Wonder Woman"
    },
    {
        "title": "Superman: The Man of Steel",
        "content": "Superman, the OG superhero! He's been a symbol of hope and justice for decades. What’s your favorite Superman story or moment?",
        "image_src": "https://example.com/images/superman.jpg",
        "qid": "Q9208",
        "qtitle": "Superman"
    },
    {
        "title": "The Avengers: Earth's Mightiest Heroes",
        "content": "Assemble, Avengers fans! From Iron Man to Captain America, get to know Earth's mightiest heroes and their epic battles. Who's your favorite Avenger?",
        "image_src": "https://example.com/images/avengers.jpg",
        "qid": "Q173597",
        "qtitle": "Avengers (comics)"
    },
    {
        "title": "The Joker: Clown Prince of Crime",
        "content": "The Joker is one of the most iconic villains ever. From his twisted origins to his craziest schemes, he's always unpredictable. What's your favorite Joker moment?",
        "image_src": "https://example.com/images/joker.jpg",
        "qid": "Q34040",
        "qtitle": "Joker (character)"
    },
    {
        "title": "Iron Man: The Genius Behind the Armor",
        "content": "Tony Stark is the genius billionaire playboy philanthropist behind Iron Man. His tech and battles are legendary. Which Iron Man suit is your favorite?",
        "image_src": "https://example.com/images/ironman.jpg",
        "qid": "Q75338",
        "qtitle": "Iron Man"
    },
    {
        "title": "Captain America: The First Avenger",
        "content": "Captain America is the ultimate symbol of bravery and patriotism. From his scrawny beginnings to becoming a super-soldier, his story is epic. What's your favorite Cap moment?",
        "image_src": "https://example.com/images/captain_america.jpg",
        "qid": "Q8685",
        "qtitle": "Captain America"
    },
    {
        "title": "The Fantastic Four: Pioneers of Marvel",
        "content": "The Fantastic Four were Marvel's first superhero team! Their adventures are full of scientific wonder and family drama. Who’s your favorite member of the Fantastic Four?",
        "image_src": "https://example.com/images/fantastic_four.jpg",
        "qid": "Q243643",
        "qtitle": "Fantastic Four"
    },
    {
        "title": "Black Panther: King of Wakanda",
        "content": "Black Panther is a king, a hero, and a legend. His story mixes superhero action with political intrigue. What's your favorite Black Panther moment?",
        "image_src": "https://example.com/images/black_panther.jpg",
        "qid": "Q647",
        "qtitle": "Black Panther"
    },
    {
        "title": "The Flash: Fastest Man Alive",
        "content": "The Flash is the fastest man alive! With his super speed, he protects Central City from all sorts of threats. Who's your favorite speedster in the Flash family?",
        "image_src": "https://example.com/images/flash.jpg",
        "qid": "Q754",
        "qtitle": "Flash (comics)"
    },
    {
        "title": "Green Lantern: Guardians of the Universe",
        "content": "The Green Lantern Corps is an intergalactic police force, protecting the universe from evil. Each Lantern wields a power ring fueled by their willpower. Which Green Lantern is your favorite?",
        "image_src": "https://example.com/images/green_lantern.jpg",
        "qid": "Q3500",
        "qtitle": "Green Lantern"
    },
    {
        "title": "Thor: God of Thunder",
        "content": "Thor, the Norse god of thunder, is a powerful Avenger. With his mighty hammer Mjolnir, he defends Asgard and Earth from all threats. What's your favorite Thor moment?",
        "image_src": "https://example.com/images/thor.jpg",
        "qid": "Q27280",
        "qtitle": "Thor (Marvel Comics)"
    },
    {
        "title": "Hulk: The Incredible Green Goliath",
        "content": "The Hulk is a green-skinned behemoth with immense strength. Dr. Bruce Banner transforms into the Hulk when he gets angry. Who's your favorite Hulk villain?",
        "image_src": "https://example.com/images/hulk.jpg",
        "qid": "Q131334",
        "qtitle": "Hulk (comics)"
    },
    {
        "title": "Aquaman: King of Atlantis",
        "content": "Aquaman is the king of Atlantis and a powerful superhero. He can communicate with sea creatures and has superhuman strength. What's your favorite Aquaman story?",
        "image_src": "https://example.com/images/aquaman.jpg",
        "qid": "Q16521",
        "qtitle": "Aquaman"
    },
    {
        "title": "Doctor Strange: Master of the Mystic Arts",
        "content": "Doctor Strange is a sorcerer supreme, protecting Earth from mystical threats. He wields powerful magic and travels between dimensions. What's your favorite Doctor Strange spell?",
        "image_src": "https://example.com/images/doctor_strange.jpg",
        "qid": "Q168550",
        "qtitle": "Doctor Strange"
    },
    {
        "title": "Spider-Woman: Arachnid Avenger",
        "content": "Spider-Woman is a powerful superhero with spider-like abilities. She fights crime and protects the innocent. Who's your favorite Spider-Woman villain?",
        "image_src": "https://example.com/images/spider_woman.jpg",
        "qid": "Q11027",
        "qtitle": "Spider-Woman"
    },
    {
        "title": "Black Widow: Deadly Assassin",
        "content": "Black Widow is a highly skilled spy and assassin. She's a key member of the Avengers and has a complex past. What's your favorite Black Widow moment?",
        "image_src": "https://example.com/images/black_widow.jpg",
        "qid": "Q647",
        "qtitle": "Black Widow"
    },
    {
        "title": "Green Arrow: The Emerald Archer",
        "content": "Green Arrow is a skilled archer and vigilante. He fights for justice in Star City and is known for his trick arrows. Who's your favorite Green Arrow ally?",
        "image_src": "https://example.com/images/green_arrow.jpg",
        "qid": "Q3500",
        "qtitle": "Green Arrow"
    },
    {
        "title": "Catwoman: The Feline Femme Fatale",
        "content": "Catwoman is a skilled thief and antihero. She walks the line between good and bad, often teaming up with Batman. What's your favorite Catwoman heist?",
        "image_src": "https://example.com/images/catwoman.jpg",
        "qid": "Q34040",
        "qtitle": "Catwoman"
    },
    {
        "title": "Supergirl: The Girl of Steel",
        "content": "Supergirl is Superman's cousin and a powerful superhero in her own right. She protects National City and fights for justice. What's your favorite Supergirl moment?",
        "image_src": "https://example.com/images/supergirl.jpg",
        "qid": "Q9208",
        "qtitle": "Supergirl"
    },
    {
        "title": "Wolverine: The Adamantium Mutant",
        "content": "Wolverine is a mutant with retractable claws and a healing factor. He's a member of the X-Men and has a dark past. Who's your favorite Wolverine enemy?",
        "image_src": "https://example.com/images/wolverine.jpg",
        "qid": "Q173597",
        "qtitle": "Wolverine"
    },
    {
        "title": "Deadpool: The Merc with a Mouth",
        "content": "Deadpool is a wisecracking mercenary with a regenerative healing factor. He breaks the fourth wall and is known for his humor. What's your favorite Deadpool joke?",
        "image_src": "https://example.com/images/deadpool.jpg",
        "qid": "Q34040",
        "qtitle": "Deadpool"
    },
    {
        "title": "Storm: Mistress of the Elements",
        "content": "Storm is a mutant with the power to control the weather. She's a member of the X-Men and a strong leader. What's your favorite Storm moment?",
        "image_src": "https://example.com/images/storm.jpg",
        "qid": "Q200616",
        "qtitle": "Storm (Marvel Comics)"
    },
    {
        "title": "Hawkeye: The Master Marksman",
        "content": "Hawkeye is a highly skilled archer and member of the Avengers. He never misses his target and is known for his loyalty. Who's your favorite Hawkeye trick shot?",
        "image_src": "https://example.com/images/hawkeye.jpg",
        "qid": "Q75338",
        "qtitle": "Hawkeye (comics)"
    },
    {
        "title": "Ant-Man: The Tiny Titan",
        "content": "Ant-Man can shrink in size and communicate with ants. He's a member of the Avengers and has a unique perspective on the world. What's your favorite Ant-Man size-changing moment?",
        "image_src": "https://example.com/images/antman.jpg",
        "qid": "Q8685",
        "qtitle": "Ant-Man"
    },
    {
        "title": "Vision: The Synthezoid Avenger",
        "content": "Vision is an android with superhuman abilities. He's a member of the Avengers and has a unique perspective on humanity. What's your favorite Vision moment?",
        "image_src": "https://example.com/images/vision.jpg",
        "qid": "Q243643",
        "qtitle": "Vision (Marvel Comics)"
    },
    {
        "title": "Scarlet Witch: Mistress of Chaos",
        "content": "Scarlet Witch has reality-warping powers and is a member of the Avengers. She's a complex character with a tragic past. What's your favorite Scarlet Witch moment?",
        "image_src": "https://example.com/images/scarlet_witch.jpg",
        "qid": "Q647",
        "qtitle": "Scarlet Witch"
    },
    {
        "title": "Black Canary: The Sonic Siren",
        "content": "Black Canary is a skilled martial artist with a powerful sonic scream. She fights for justice and is a member of the Birds of Prey. Who's your favorite Black Canary team-up?",
        "image_src": "https://example.com/images/black_canary.jpg",
        "qid": "Q11027",
        "qtitle": "Black Canary"
    }
];

const tokens = {
    jstewart: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE4LCJpYXQiOjE3MTU5MDIyMTgsImp0aSI6IjU2MTljMTJkYzBlMTQ5YWNhYTY2ZjU3ZDMzOTk1OGMxIiwidXNlcl9pZCI6Mjd9.UDk1f7QFQRF26VLDr4D5pOjnEGxT_TqeWC_aNA7FZb4',
    mrodriguez: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE4LCJpYXQiOjE3MTU5MDIyMTgsImp0aSI6IjZjYjc3ZjVkNWRkZDQwZTY4ODk0ZDhjZmJiZDFmM2MzIiwidXNlcl9pZCI6MjN9.rH0-gfPHX76Ud9N5aZ3bLZApcftY7-of0oBTZJmzu-8',
    mthomas: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE4LCJpYXQiOjE3MTU5MDIyMTgsImp0aSI6IjdiYjc4MjI1Y2QxMzQ0MzVhZTVkYWZkMTcxMjZmNzJmIiwidXNlcl9pZCI6Mjh9.0dbhDGT-aUbJB0sxuCrRWM6FViTvm6gHmiW2JwZ4JS0',
    rwhite: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE4LCJpYXQiOjE3MTU5MDIyMTgsImp0aSI6ImRmYmI3NjBhNmVlZTRjYjdhOWY4YTZjNDE1YzY3NTAxIiwidXNlcl9pZCI6MTJ9.O-TFkOkXFBNsZD3C2wl6CJkccEOxzO5pLXNTT-5iKH8',
    jmartinez: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE4LCJpYXQiOjE3MTU5MDIyMTgsImp0aSI6IjY3ZGQ2MjE5MDBjMzQ3NmU4ZDMyZGU3ZmI5YzJjMDhhIiwidXNlcl9pZCI6MTF9.G95a0Eb_C-jpXGU0GkXHP88AiG59t8wmgrtiFmBEFmA',
    jsmith: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE4LCJpYXQiOjE3MTU5MDIyMTgsImp0aSI6Ijc1OTg0ODllYjUzMjQ2NDdhM2M0ODM5ODhjOWFkZDA0IiwidXNlcl9pZCI6MTV9.22wlSwj83yyTv0vovIP8DBqfofthBfATEwJpkdUxFNA',
    cwilliams: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE4LCJpYXQiOjE3MTU5MDIyMTgsImp0aSI6ImNlZDJlMTFmYjI1MjQwNWVhMGFjNWYxNzhhMTkxYmZkIiwidXNlcl9pZCI6Nn0.Vwx6_vnBPArJRVj2Ciz-3nfGQLNdJ4WIzPUKYi1_kdg',
    rsmith: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE4LCJpYXQiOjE3MTU5MDIyMTgsImp0aSI6IjBhM2M5YmNjMDM2MjQ3NDM4YTYwY2U3MTAwODJlMjgzIiwidXNlcl9pZCI6MTN9.k4l4UoQFV4pd7QSTIi25URWVbNuKhE2xdSGqNTM5PIU',
    jdoe: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE4LCJpYXQiOjE3MTU5MDIyMTgsImp0aSI6IjczNDA3NmMzYzU3NjQ4NDc4ZDA0ZDIyZGU5OGU3NGQwIiwidXNlcl9pZCI6MzF9.i7GywUVgWAJ8q2XTlc9qm2WkR8XFV6-L50DTOw5OU0c',
    ljohnson: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE4LCJpYXQiOjE3MTU5MDIyMTgsImp0aSI6ImQ2NzFkNGRkMGM3NTQ2YzhhY2M1NjM2MmQ4ZGE0Y2M2IiwidXNlcl9pZCI6MTB9._sJg6TRqc0eRgJ-arYj-qv1kR4jOyira0kVC2eOP0F0',
    asmith: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE4LCJpYXQiOjE3MTU5MDIyMTgsImp0aSI6ImE1MjQ5MjRmNWM3OTQzNGFiYjNkM2ZhMDAzMDIxMWU5IiwidXNlcl9pZCI6MjV9.0V_J93YpQ2wfL6Q1rkjmjUmedW952R8IYM1XOAKuUNE',
    kmiller: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE4LCJpYXQiOjE3MTU5MDIyMTgsImp0aSI6IjFiM2NjMWU0M2I0YjQwNjZhMTM2NDg3ZWE0ZmMyYTk5IiwidXNlcl9pZCI6MTR9.tLE-YSw4FtTZ7Sm4cdtP60mMqu8nw4f8nYCYsAhrEpo',
    danderson: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE4LCJpYXQiOjE3MTU5MDIyMTgsImp0aSI6IjdhMTUwMWQyOWEzZjQ3ZmRiZTM5ZGM4OTFiYzg5MzFkIiwidXNlcl9pZCI6Mjl9.WStDZWeYJWMGcdoH8ZynJKvLIRb24BbIXqyQefCBTYk',
    sanders: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE4LCJpYXQiOjE3MTU5MDIyMTgsImp0aSI6IjcwZjliYWZmMTFhOTRhN2E4Yjg0MjFhMTM4MzViNTJmIiwidXNlcl9pZCI6MTZ9.TP2g548hArF4VkAlQzyLPJcmvXNedkHrirHl0mAXdXg',
    tmartin: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE4LCJpYXQiOjE3MTU5MDIyMTgsImp0aSI6IjgzMTA2MWRkOWU5ZjQzMWM5MjUxYWVmN2RkMThmYzJhIiwidXNlcl9pZCI6MTd9.hREGfmm2ujqqXGm2kZZOkbmapN07IDAroGJIu37ehgA',
    mjohnson: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE4LCJpYXQiOjE3MTU5MDIyMTgsImp0aSI6IjEyYThiOTg1ZThlYjQ4NTFiNGY1NzgwNDFkMGYzZjE4IiwidXNlcl9pZCI6OH0.dAJ6N9xlnn67cxEsEWjEDoPHIVenJpTDYbqwJHE-WAk',
    jlee: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE5LCJpYXQiOjE3MTU5MDIyMTksImp0aSI6IjdiNjQxNWVjZGNjZjQwMmRhM2YyY2FkYThlYTkyZjI4IiwidXNlcl9pZCI6MjJ9.89iZqwSkTCvvDsiUF4TQGmJzEVOHWeznmqkJ4L2cFSA',
    bthomas: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE5LCJpYXQiOjE3MTU5MDIyMTksImp0aSI6ImM5ZDc3MDcyNDdmMDRiMWY5OGI3Y2UwNTU2ZjVkNDA4IiwidXNlcl9pZCI6OX0.4UeufMew2Fl3TIhIs8KMi-_7EHSYrqQqJNNt3_50wn8',
    jroberts: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE5LCJpYXQiOjE3MTU5MDIyMTksImp0aSI6ImUwMWNlZGRiYzIzZTQzN2VhYTBlNmMzNWY1YjhiZTI2IiwidXNlcl9pZCI6MjF9.3VEKw0jHGNKjtXsKP2XYE4uBW0vJweTyHnTu8-n9UNc',
    awilson: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE5LCJpYXQiOjE3MTU5MDIyMTksImp0aSI6ImMzMjRiNGE0OWJhODQyNmVhMzFmMzEyOTdiYjAwMDNmIiwidXNlcl9pZCI6MzJ9.cC8gdvcyCLNe_UQVG8KbhucrjONvXYgTZgXxBGvQ57k',
    kthompson: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE5LCJpYXQiOjE3MTU5MDIyMTksImp0aSI6ImMzYTUzNmY0ODJkZjQ4Y2ZhMTRmNTM5OTEyZGMxZWM5IiwidXNlcl9pZCI6MjZ9.m_E0tkGOWFy2tmADktwAAHuQ4jmNRNtAi7BVps8rjOA',
    mjones: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE5LCJpYXQiOjE3MTU5MDIyMTksImp0aSI6IjJkMWUyNGIxYjU5ZjRjN2M4Y2MxNGUxZjc2ZjI1YTNhIiwidXNlcl9pZCI6MTl9.M9Ov2kgqgl_12jEQbzZSRH1N30_4PVUC7Zs_pD-a5WA',
    tjackson: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE5LCJpYXQiOjE3MTU5MDIyMTksImp0aSI6IjMzNzdhMWNhNmE4NDQ5MzhiMzI2NDIzMjE5YTVhNTk2IiwidXNlcl9pZCI6MjB9.uPZ0T6DVz3KhKNkdYqzlRWziO3vx1AFl8aMLHTjo9Fw',
    srodriguez: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE5LCJpYXQiOjE3MTU5MDIyMTksImp0aSI6ImFhMDFlMmYwZDU4MTQ2YzZiMWFiMDUwMDMzYTQ5NDBmIiwidXNlcl9pZCI6MTh9.nrxwChT8mWMZuVFpB5PSkHez59O4fkhMfGJSb4F8H3E',
    jhall: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE5LCJpYXQiOjE3MTU5MDIyMTksImp0aSI6IjZjZTA5ZTgxMTAyMDQzYzFhMWNhOWYwYjZjZWFhOGQ4IiwidXNlcl9pZCI6MjR9.qhaPG8gORKyNzngb-5_M4UVyG5kfveZfCgaEQwvya5M',
    jrodriguez: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE5LCJpYXQiOjE3MTU5MDIyMTksImp0aSI6IjhhNGQzMzJkZmUyZjQ3OTA4ZjAyMzg1Y2I3MzRhNDYwIiwidXNlcl9pZCI6NX0.l5ecpXBOn1VsSlr3xRzd6RrxlypxxE8C4tiqiJ-LicM',
    mroberts: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE5LCJpYXQiOjE3MTU5MDIyMTksImp0aSI6ImI2OTVmZjE0MjUwZDQ4YTViN2VjY2ViMGY2YzM2ZDkxIiwidXNlcl9pZCI6MzB9.-dwofNI00IawbJiiUPJFDqkg9CXp7BEl7hQIb5H72N8',
    jwilliams: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTg4NjE5LCJpYXQiOjE3MTU5MDIyMTksImp0aSI6ImY0YWYwMGRiMDZlZjRiMmM5NDdjOTljZGU2NzJjZGJiIiwidXNlcl9pZCI6N30.4UBlR4UZG4RtIy_NyCzFTnU8CAsthzhwH5PXvfJCHU4'
};


const register = () => {
 users.forEach(user => {
    fetch('http://164.90.189.150:8000/api/v2/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        console.log('User registered:', data);
    })
    .catch((error) => {
        console.error('Error registering user:', user.username, error);
    });
});
};


const login = () => {
    users.forEach(user => {
        fetch('http://164.90.189.150:8000/api/v2/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // only send username and password
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        })
            .then(response => response.json())
            .then(data => {
                // console.log('User logged in:', data);
                tokens[user.username] = data.token;
                console.log(tokens);
            }).catch((error) => {
                console.error('Error logging in user:', user.username, error);
            });
    });
};

const doit = () => {
    for (const post of posts) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const token = tokens[randomUser.username];

        fetch('http://164.90.189.150:8000/api/v2/posts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(post)
        }).then(response => response.json())
        .then(data => {
            console.log('Post created:', data);
        })
        .catch((error) => {
            console.error('Error creating post:', error);
        });
    }
};

//sirayla yapilmali
// once register yapilacak diger islemler comment edilecek
// sonra login yapilacak diger islemler comment edilecek ve tokenlar kaydedilecek
// en son doit yapilacak
register();
login();
doit();