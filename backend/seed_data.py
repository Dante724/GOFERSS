# Initial seed data for database

INITIAL_PACKAGES = [
    {
        "id": "pkg_001",
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