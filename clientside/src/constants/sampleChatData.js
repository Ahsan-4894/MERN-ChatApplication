export const sampleChatsData = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ahsan",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Sarim",
    _id: "2",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ali",
    _id: "3",
    groupChat: false,
    members: ["3"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ali",
    _id: "4",
    groupChat: false,
    members: ["5"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ali",
    _id: "5",
    groupChat: false,
    members: ["5"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ali",
    _id: "6",
    groupChat: false,
    members: ["6"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ali",
    _id: "7",
    groupChat: false,
    members: ["7"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ali",
    _id: "8",
    groupChat: false,
    members: ["8"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ali",
    _id: "9",
    groupChat: false,
    members: ["9"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ali",
    _id: "10",
    groupChat: false,
    members: ["10"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ali",
    _id: "11",
    groupChat: false,
    members: ["11"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ali",
    _id: "12",
    groupChat: false,
    members: ["12"],
  },
];
export const sampleUsersData = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ahsan",
    _id: "1",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ahsan",
    _id: "4",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ahsan",
    _id: "5",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ahsan",
    _id: "6",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ahsan",
    _id: "7",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Sarim",
    _id: "2",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ali",
    _id: "3",
  },
];
export const sampleNotificationData = [
  {
    sender: {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "Ahsan",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "Sarim",
    },
    _id: "2",
  },
  {
    sender: {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "Ali",
    },
    _id: "3",
  },
];
export const sampleMessages = [
  {
    attachments: [
      {
        public_id: "asda",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "Heelo bhai",
    _id: "asdasdsadasdasd",
    sender: {
      _id: "user._id",
      name: "AHSAN",
    },
    chat: "chatID",
    createdAt: "2024-12-22T10:41:30.630Z",
  },
  {
    attachments: [
      {
        public_id: "asdsad",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "Heelo bhai",
    _id: "asdasdsadasdasd",
    sender: {
      _id: "Asdasda",
      name: "AHSAN",
    },
    chat: "chatID",
    createdAt: "2024-12-22T10:41:30.630Z",
  },
];

export const dashboardManagementData = {
  users: [
    {
      name: "Ahsan",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "1",
      username: "Ahsan-4894",
      friends: 20,
      groups: 5,
    },
    {
      name: "Zubair",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "2",
      username: "Zubair-4894",
      friends: 25,
      groups: 15,
    },
  ],
  chats: [
    {
      name: "AhsanGroup",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "1",
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "Ahsan",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },

    {
      name: "AliGroup",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "2",
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 20,
      totalMessages: 30,
      creator: {
        name: "Ali",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
  ],
  messages: [
    {
      attachments: ["https://www.w3schools.com/howto/img_avatar.png"],
      content: "Hello",
      _id: "1",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "ahsan",
      },
      chat: "chatID",
      groupChat: false,
      createdAt: "2024-12-22T10:41:30.630Z",
    },
    {
      attachments: [],
      content: "Hello2",
      _id: "2",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Ali",
      },
      chat: "chatID",
      groupChat: true,
      createdAt: "2024-12-22T10:41:30.630Z",
    },
  ],
};
