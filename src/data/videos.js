const base = import.meta.env.BASE_URL;
const videos = [
  {
    id: 1,
    url: `${base}videos/video1.mp4`,
    user: {
      name: "user_1",
      avatar: `${base}avatar/avatar1.jpeg`
    },
    description: "Golden sunrise in the mountains 🌄",
    likes: 120,
    comments: 30,
    shares: 10,
    music: "Original Audio"
  },
  {
    id: 2,
    url: `${base}videos/video4.mp4`,
    user: {
      name: "user_2",
      avatar: `${base}avatar/avatar1.jpeg`
    },
    description: "Street food that looks amazing 😋",
    likes: 220,
    comments: 60,
    shares: 25,
    music: "Original Audio"
  },
  {
    id: 3,
    url: `${base}videos/video3.mp4`,
    user: {
      name: "user_3",
      avatar: `${base}avatar/avatar1.jpeg`
    },
    description: "Lost in nature, found in peace",
    likes: 340,
    comments: 80,
    shares: 40,
    music: "Original Audio"
  },
  {
    id: 4,
    url: `${base}videos/video2.mp4`,
    user: {
      name: "user_4",
      avatar: `${base}avatar/avatar1.jpeg`
    },
    description: "Flow like water, drift like leaves 🍃",
    likes: 340,
    comments: 80,
    shares: 40,
    music: "Original Audio"
  },
  {
    id: 5,
    url: `${base}videos/video5.mp4`,
    user: {
      name: "user_5",
      avatar: `${base}avatar/avatar1.jpeg`
    },
    description: "Floating through nature like a dream 🕊️ ",
    likes: 340,
    comments: 80,
    shares: 40,
    music: "Original Audio"
  }
];

export default videos;