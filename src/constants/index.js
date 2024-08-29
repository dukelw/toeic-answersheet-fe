const CONSTANTS = {
  listeningScores: [
    5,
    5,
    5,
    10,
    15,
    20,
    25,
    30,
    35,
    40, // 0-9
    45,
    50,
    55,
    60,
    65,
    70,
    75,
    80,
    85,
    90, // 10-19
    95,
    100,
    105,
    110,
    115,
    120,
    125,
    130,
    135,
    140, // 20-29
    145,
    150,
    155,
    160,
    165,
    170,
    175,
    180,
    185,
    190, // 30-39
    195,
    200,
    205,
    210,
    215,
    220,
    225,
    230,
    235,
    240, // 40-49
    245,
    250,
    255,
    260,
    265,
    270,
    275,
    280,
    285,
    290, // 50-59
    295,
    300,
    305,
    310,
    315,
    320,
    325,
    330,
    335,
    340, // 60-69
    345,
    350,
    355,
    360,
    365,
    370,
    375,
    380,
    385,
    390, // 70-79
    395,
    400,
    405,
    410,
    415,
    420,
    425,
    430,
    435,
    440, // 80-89
    445,
    450,
    455,
    460,
    465,
    470,
    475,
    480,
    485,
    490,
    495, // 90-100
  ],
  readingScores: [
    5,
    15,
    20,
    25,
    30,
    35,
    40,
    45,
    50,
    55, // 0-9
    60,
    65,
    70,
    75,
    80,
    85,
    90,
    95,
    100,
    105, // 10-19
    110,
    115,
    120,
    125,
    130,
    135,
    140,
    145,
    150,
    155, // 20-29
    160,
    165,
    170,
    175,
    180,
    185,
    190,
    195,
    200,
    205, // 30-39
    210,
    215,
    220,
    225,
    230,
    235,
    240,
    245,
    250,
    255, // 40-49
    260,
    265,
    270,
    275,
    280,
    285,
    290,
    295,
    300,
    305, // 50-59
    310,
    315,
    320,
    325,
    330,
    335,
    340,
    345,
    350,
    355, // 60-69
    360,
    365,
    370,
    375,
    380,
    385,
    390,
    395,
    400,
    405, // 70-79
    410,
    415,
    420,
    425,
    430,
    435,
    440,
    445,
    450,
    455, // 80-89
    460,
    465,
    470,
    475,
    480,
    485,
    490,
    495,
    495,
    495, // 90-100
  ],
  suggestion: [
    {
      image:
        "https://res.cloudinary.com/lewisshop/image/upload/v1724922778/toeic/answers/1724922773068-1.png.png",
      content:
        "In the header, click Account Icon, then choose Sign up if you are new to this site, or Sign in if you already have an account.",
    },
    {
      image:
        "https://res.cloudinary.com/lewisshop/image/upload/v1724922808/toeic/answers/1724922804681-2.jpg.jpg",
      content: "Provide your information and click Submit.",
    },
    {
      image:
        "https://res.cloudinary.com/lewisshop/image/upload/v1724922842/toeic/answers/1724922837199-3.png.png",
      content:
        "When you have signed in, click your Avatar and choose Profile to update your information, click Account to change password or Logout to sign out.",
    },
    {
      image:
        "https://res.cloudinary.com/lewisshop/image/upload/v1724922872/toeic/answers/1724922868395-4.png.png",
      content: "Update information at Profile page.",
    },
    {
      image:
        "https://res.cloudinary.com/lewisshop/image/upload/v1724922894/toeic/answers/1724922890408-5.png.png",
      content: "Change password at Account page.",
    },
  ],
  stepOne: [
    {
      image:
        "https://res.cloudinary.com/lewisshop/image/upload/v1724921166/toeic/answers/1724921160977-1.png.png",
      content: "In the header, click Document to go to Document page.",
    },
    {
      image:
        "https://res.cloudinary.com/lewisshop/image/upload/v1724921247/toeic/answers/1724921244264-2.png.png",
      content: "Click to download the document you need.",
    },
  ],
  stepTwo: [
    {
      image:
        "https://res.cloudinary.com/lewisshop/image/upload/v1724921398/toeic/answers/1724921394364-3.png.png",
      content: "In the header, click Test to go to Test page.",
    },
    {
      image:
        "https://res.cloudinary.com/lewisshop/image/upload/v1724921430/toeic/answers/1724921425595-4.png.png",
      content: "The test page will be like that.",
    },
    {
      image:
        "https://res.cloudinary.com/lewisshop/image/upload/v1724921454/toeic/answers/1724921450927-4.1.png.png",
      content:
        "The header now will be the place for playing the Listening audio, count the Reading time. You do the test and please remind that you can only here the audio once. And 75 minutes is counted when you start the Reading part.",
    },
    {
      image:
        "https://res.cloudinary.com/lewisshop/image/upload/v1724921473/toeic/answers/1724921469535-4.2.png.png",
      content:
        "After completing the test, you click Submit and the answer will appear. You can also comment if something is wrong, the administrator will be notified.",
    },
    {
      image:
        "https://res.cloudinary.com/lewisshop/image/upload/v1724921492/toeic/answers/1724921488230-4.3.png.png",
      content:
        "The result will be like that and you correct and wrong answer is explicitly displayed. If you want to save the result, you can click Print result and the answer will be exported as a PDF file.",
    },
  ],
  stepThree: [
    {
      image:
        "https://res.cloudinary.com/lewisshop/image/upload/v1724921509/toeic/answers/1724921505957-6.png.png",
      content: "You can see your history trial by clicking History.",
    },
    {
      image:
        "https://res.cloudinary.com/lewisshop/image/upload/v1724921531/toeic/answers/1724921527537-7.png.png",
      content:
        "Also your highest ranking will be recorded, you can click Rank and choose a test to see top 10 of this test.",
    },
    {
      image:
        "https://res.cloudinary.com/lewisshop/image/upload/v1724921550/toeic/answers/1724921546901-8.png.png",
      content: "Note the the ranking list only get your highest trial.",
    },
  ],
};

export default CONSTANTS;
