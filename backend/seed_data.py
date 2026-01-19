# Initial seed data for database

# Service Categories
SERVICE_CATEGORIES = [
    {
        "id": "cat_stay",
        "name": "Book Stay",
        "description": "Hotel and accommodation bookings",
        "icon": "hotel"
    },
    {
        "id": "cat_cab",
        "name": "Cab",
        "description": "Car/taxi rentals",
        "icon": "car"
    },
    {
        "id": "cat_boat",
        "name": "Boat",
        "description": "Boat rides on the Ganges",
        "icon": "boat"
    },
    {
        "id": "cat_guide",
        "name": "Guide",
        "description": "Local guides",
        "icon": "guide"
    }
]

# Boat Rides
BOAT_SERVICES = [
    {
        "id": "boat_001",
        "categoryId": "cat_boat",
        "name": "Private Motor Boat for Evening Ganga Aarti",
        "description": "Experience the divine Ganga Aarti from a private motor boat with the best views of the ceremony",
        "priceStart": 3999,
        "priceEnd": 4999,
        "duration": "2 Hours",
        "capacity": "Up to 6 persons",
        "image": "https://images.unsplash.com/photo-1625417002358-739de702594c",
        "highlights": [
            "Best view of Ganga Aarti",
            "Private motor boat",
            "Evening ceremony experience",
            "Professional boatman"
        ],
        "active": True
    },
    {
        "id": "boat_002",
        "categoryId": "cat_boat",
        "name": "Lighting Decorated CNG/Motor Boat",
        "description": "Special decorated boat with beautiful lighting for a magical evening on the Ganges",
        "priceStart": 4999,
        "priceEnd": 6499,
        "duration": "2-3 Hours",
        "capacity": "Up to 8 persons",
        "image": "https://images.unsplash.com/photo-1763186534248-d0de60fd81e2",
        "highlights": [
            "Beautifully decorated with lights",
            "CNG/Motor powered",
            "Perfect for special occasions",
            "Evening Ganga Aarti view"
        ],
        "active": True
    },
    {
        "id": "boat_003",
        "categoryId": "cat_boat",
        "name": "Musical Boat Ride",
        "description": "Premium boat ride with live traditional music and cultural performance",
        "priceStart": 12499,
        "priceEnd": 14999,
        "duration": "3 Hours",
        "capacity": "Up to 10 persons",
        "image": "https://images.unsplash.com/photo-1762929968274-a5dff4fd75ef",
        "highlights": [
            "Live traditional music",
            "Cultural performance",
            "Premium boat experience",
            "Refreshments included"
        ],
        "active": True
    },
    {
        "id": "boat_004",
        "categoryId": "cat_boat",
        "name": "Morning Boat Ride at Assi Ghat",
        "description": "Peaceful sunrise boat ride starting from Assi Ghat, witness morning rituals",
        "priceStart": 4999,
        "priceEnd": 4999,
        "duration": "2 Hours",
        "capacity": "Up to 6 persons",
        "image": "https://images.pexels.com/photos/33885084/pexels-photo-33885084.jpeg",
        "highlights": [
            "Sunrise experience",
            "Morning rituals view",
            "Peaceful atmosphere",
            "Starting from Assi Ghat"
        ],
        "active": True
    },
    {
        "id": "boat_005",
        "categoryId": "cat_boat",
        "name": "Private Bajra Boat",
        "description": "Large traditional Bajra boat perfect for groups and special events",
        "priceStart": 12999,
        "priceEnd": 12999,
        "duration": "3-4 Hours",
        "capacity": "Up to 30 persons",
        "image": "https://images.unsplash.com/photo-1665413793087-d58c23e3a177",
        "highlights": [
            "Large capacity (30 persons)",
            "Traditional Bajra boat",
            "Perfect for group events",
            "Full Ghat experience"
        ],
        "active": True
    }
]

# Cab Services
CAB_SERVICES = [
    {
        "id": "cab_001",
        "categoryId": "cat_cab",
        "name": "Swift Dzire - Airport Drop",
        "description": "Comfortable Swift Dzire for airport transfers",
        "priceStart": 1000,
        "priceEnd": 1500,
        "duration": "One Way",
        "capacity": "4 persons",
        "image": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d",
        "highlights": [
            "Airport pickup/drop",
            "AC vehicle",
            "Professional driver",
            "Fixed fare"
        ],
        "active": True
    },
    {
        "id": "cab_002",
        "categoryId": "cat_cab",
        "name": "Swift Dzire - Full Day Local Sightseeing",
        "description": "Full day local sightseeing in comfortable Swift Dzire",
        "priceStart": 2500,
        "priceEnd": 3000,
        "duration": "8-10 Hours",
        "capacity": "4 persons",
        "image": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d",
        "highlights": [
            "Full day service (8-10 hrs)",
            "Local sightseeing",
            "AC vehicle",
            "Fuel included"
        ],
        "active": True
    },
    {
        "id": "cab_003",
        "categoryId": "cat_cab",
        "name": "Innova Car - Full Day Sightseeing",
        "description": "Spacious Innova for comfortable full day local sightseeing",
        "priceStart": 4000,
        "priceEnd": 4000,
        "duration": "8-10 Hours",
        "capacity": "6-7 persons",
        "image": "https://images.unsplash.com/photo-1552345387-e3a2b00e2bb2",
        "highlights": [
            "Spacious SUV",
            "6-7 persons capacity",
            "Full day service",
            "AC vehicle"
        ],
        "active": True
    },
    {
        "id": "cab_004",
        "categoryId": "cat_cab",
        "name": "Tempo Traveller - Group Sightseeing",
        "description": "Large Tempo Traveller for group tours and sightseeing",
        "priceStart": 7500,
        "priceEnd": 7500,
        "duration": "8-10 Hours",
        "capacity": "12-15 persons",
        "image": "https://images.unsplash.com/photo-1570125909232-eb263c188f7e",
        "highlights": [
            "Group capacity (12-15 persons)",
            "Comfortable seating",
            "Full day service",
            "Perfect for family groups"
        ],
        "active": True
    },
    {
        "id": "cab_005",
        "categoryId": "cat_cab",
        "name": "Outstation Trip - Prayagraj/Ayodhya",
        "description": "Comfortable outstation trips to Prayagraj, Ayodhya and nearby cities",
        "priceStart": 8000,
        "priceEnd": 12000,
        "duration": "Full Day",
        "capacity": "Varies by vehicle",
        "image": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d",
        "highlights": [
            "Outstation travel",
            "Prayagraj, Ayodhya, and more",
            "Multiple vehicle options",
            "Driver + fuel included"
        ],
        "active": True
    }
]

# Tour Packages (Updated with package & experience focus)
INITIAL_PACKAGES = [
    {
        "id": "pkg_001",
        "categoryId": "packages",
        "name": "Complete Spiritual Experience",
        "duration": "2 Days / 1 Night",
        "price": 4999,
        "image": "https://images.unsplash.com/photo-1665413791167-6718dcf36773",
        "description": "Experience the complete spiritual journey of Varanasi with comfortable accommodation and sacred rituals.",
        "inclusions": [
            "Hotel Stay (1 Night)",
            "Ganga Aarti Darshan",
            "Guided Ghat Walk",
            "Boat Ride on Ganga",
            "Breakfast"
        ],
        "highlights": [
            "Witness the mesmerizing Ganga Aarti",
            "Experience sunrise boat ride",
            "Explore ancient ghats with guide",
            "Comfortable hotel accommodation"
        ],
        "hasOptionalGhatWalk": False,
        "active": True
    },
    {
        "id": "pkg_002",
        "categoryId": "packages",
        "name": "Divine Darshan Package",
        "duration": "1 Day / 1 Night",
        "price": 3499,
        "image": "https://images.unsplash.com/photo-1763186534248-d0de60fd81e2",
        "description": "Perfect package for those seeking spiritual enlightenment with evening Aarti and peaceful ghat walk.",
        "inclusions": [
            "Hotel Stay (1 Night)",
            "Evening Ganga Aarti",
            "Guided Ghat Walk",
            "Breakfast"
        ],
        "highlights": [
            "Evening Ganga Aarti ceremony",
            "Serene ghat walk experience",
            "Comfortable stay",
            "Expert local guide"
        ],
        "hasOptionalGhatWalk": False,
        "active": True
    },
    {
        "id": "pkg_003",
        "categoryId": "packages",
        "name": "Temple Trail Experience",
        "duration": "Half Day",
        "price": 1499,
        "priceWithGhatWalk": 1999,
        "image": "https://images.unsplash.com/photo-1675506364186-4952f2110966",
        "description": "Explore the sacred temples of Varanasi including Kashi Vishwanath and Durga Temple with optional ghat walk.",
        "inclusions": [
            "Kashi Vishwanath Temple Darshan",
            "Durga Temple Visit",
            "Evening Aarti Darshan",
            "Transportation"
        ],
        "highlights": [
            "Visit ancient Kashi Vishwanath Temple",
            "Durga Temple blessings",
            "Evening Aarti ceremony",
            "Optional: Guided Ghat Walk (+₹500)"
        ],
        "hasOptionalGhatWalk": True,
        "active": True
    }
]

INITIAL_BLOGS = [
    {
        "id": "blog_001",
        "title": "वाराणसी: आध्यात्मिकता की नगरी",
        "excerpt": "वाराणसी, जिसे काशी और बनारस के नाम से भी जाना जाता है, भारत की सबसे प्राचीन और पवित्र नगरियों में से एक है। यहां की गंगा आरती देखने लायक है...",
        "content": "वाराणसी, जिसे काशी और बनारस के नाम से भी जाना जाता है, भारत की सबसे प्राचीन और पवित्र नगरियों में से एक है। गंगा नदी के किनारे बसा यह शहर हजारों वर्षों से आध्यात्मिकता और संस्कृति का केंद्र रहा है। यहां की गंगा आरती विश्व प्रसिद्ध है जो हर शाम दशाश्वमेध घाट पर आयोजित की जाती है।",
        "author": "Gofers Team",
        "date": "15 Jan 2025",
        "image": "https://images.unsplash.com/photo-1665413793087-d58c23e3a177",
        "category": "Culture",
        "published": True
    },
    {
        "id": "blog_002",
        "title": "Best Time to Visit Varanasi",
        "excerpt": "Discover the ideal months to experience Varanasi's spiritual essence. October to March offers pleasant weather perfect for ghats exploration and ceremonies...",
        "content": "Planning your Varanasi trip? The best time to visit is between October and March when the weather is pleasant and perfect for exploring the ghats and attending ceremonies. The winter months offer clear skies and comfortable temperatures, making it ideal for boat rides and walking tours.",
        "author": "Travel Expert",
        "date": "10 Jan 2025",
        "image": "https://images.unsplash.com/photo-1625417002358-739de702594c",
        "category": "Travel Tips",
        "published": True
    },
    {
        "id": "blog_003",
        "title": "गंगा आरती: एक दिव्य अनुभव",
        "excerpt": "दशाश्वमेध घाट पर होने वाली गंगा आरती वाराणसी का सबसे प्रसिद्ध आध्यात्मिक अनुभव है। हर शाम सैकड़ों श्रद्धालु इस दिव्य आरती में शामिल होते हैं...",
        "content": "दशाश्वमेध घाट पर प्रतिदिन होने वाली गंगा आरती वाराणसी का सबसे प्रसिद्ध आध्यात्मिक आयोजन है। सात पुजारी एक साथ बड़े-बड़े दीपों से गंगा मैया की आरती करते हैं। यह दृश्य अत्यंत मनमोहक और दिव्य होता है।",
        "author": "Gofers Team",
        "date": "5 Jan 2025",
        "image": "https://images.unsplash.com/photo-1762929968274-a5dff4fd75ef",
        "category": "Spiritual",
        "published": True
    }
]