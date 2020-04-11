const mockData = [
  {
      id: 1,
      title: 'flower1',
      description: 'flower1 description',
      link: '/flower1',
      pictureURL: './assets/images/flower1.jpeg',
      date: 'March 10 2020',
      sideImage1: './assets/images/sample1.jpeg',
      sideImage2: './assets/images/sample2.jpeg',
      sideImage3: './assets/images/sample3.jpeg',
      sideImage4: './assets/images/sample4.jpeg',
      sideImage: [
        {sample1:'./assets/images/sample1.jpeg'},
        {sample2:'./assets/images/sample2.jpeg'},
        {sample3:'./assets/images/sample3.jpeg'}
      ]
  },
  {
      id: 2,
      title: 'flower2',
      description: 'flower2 description',
      link: '/flower2',
      pictureURL: '/assets/images/flower1.jpeg',
      date: 'March 10 2020',
      sideImage1: './assets/images/sample1.jpeg',
      sideImage2: './assets/images/sample2.jpeg',
      sideImage3: '',
      sideImage4: './assets/images/sample4.jpeg',
      sideImage: [
        {sample1:'./assets/images/sample1.jpeg'},
        {sample2:'./assets/images/sample2.jpeg'},
        {sample3:'./assets/images/sample3.jpeg'}
      ]
  },
  {
      id: 3,
      title: 'flower3',
      description: 'flower3 description',
      link: '/flower3',
      pictureURL: '/assets/images/flower1.jpeg',
      date: 'March 10 2020',
      sideImage1: './assets/images/sample1.jpeg',
      sideImage2: './assets/images/sample2.jpeg',
      sideImage3: './assets/images/sample3.jpeg',
      sideImage4: './assets/images/sample4.jpeg',
      sideImage: [
        {sample1:'./assets/images/sample1.jpeg'},
        {sample2:'./assets/images/sample2.jpeg'},
        {sample3:'./assets/images/sample3.jpeg'}
      ]
  },
]

const initData = [
  {
      id: 1,
      title: 'Energy It Becomes a Tree',
      description: '',
      link: '/assets/images/1-1_Energy-it-becomes-a-tree_2015_20x24.JPG',
      pictureURL: '/assets/images/1-1_Energy-it-becomes-a-tree_2015_20x24.JPG',
      date: '',
      sideImage: [
        {sample1:'./assets/images/1-2_Energy-it-becomes-a-tree_2015_20x24.JPG'},
        {sample2:'./assets/images/1-3_Energy-it-becomes-a-tree_2015_20x24.JPG'},
        {sample3:'./assets/images/1-4_Energy-it-becomes-a-tree_2015_20x24.JPG'},
        {sample4:'/assets/images/1-1_Energy-it-becomes-a-tree_2015_20x24.JPG',}
      ]
  },
  {
      id: 2,
      title: 'Energy in FD',
      description: '',
      link: '',
      pictureURL: '/assets/images/Energy-in-FD_2015_20x24.JPG',
      date: '',
      sideImage: [
        {sample1:'./assets/images/Energy-in-here_2015_24x36.JPG'},
        {sample2:'./assets/images/Energy-in-Tribeca_2015_20x24.JPG'},
        {sample3:'/assets/images/Energy-in-FD_2015_20x24.JPG'},
      ]
  },
  {
      id: 3,
      title: 'Energy It Becomes a Tree',
      description: '',
      link: '',
      pictureURL: '/assets/images/Energy-it-becomes-a-tree-1_2019_11x14.jpeg',
      date: '',
      sideImage: [
        {sample1:''},
        {sample2:''},
      ]
  },
  {
      id: 4,
      title: 'Enter The Dream',
      description: '',
      link: '',
      pictureURL: '/assets/images/Enter-the-dream_2018_10x15.5.jpeg',
      date: '',
      sideImage: [
        {sample1:''},
        {sample2:''},
      ]
  },
  {
      id: 5,
      title: 'Flowers Life 1 & 2',
      description: '',
      link: '',
      pictureURL: '/assets/images/Flowers-life-1_2018_14x11.jpeg',
      date: '',
      sideImage: [
        {sample1:'/assets/images/Flowers-life-2_2018_14x11.jpeg'},
        {sample2:'/assets/images/Flowers-life-1_2018_14x11.jpeg'},
      ]
  },
  {
      id: 6,
      title: 'Footprints of Life',
      description: '',
      link: '',
      pictureURL: '/assets/images/footprints-of-life_2018_8x8.jpeg',
      date: '',
      sideImage: [
        {sample1:''},
        {sample2:''},
      ]
  },
  {
      id: 7,
      title: 'It Becomes Covered With Bluelight',
      description: '',
      link: '',
      pictureURL: '/assets/images/It-becomes-covered-with-blue light_2016_36x48.JPG',
      date: '',
      sideImage: [
        {sample1:''},
        {sample2:''},
      ]
  },
  {
      id: 8,
      title: 'Leave a Trace',
      description: '',
      link: '',
      pictureURL: '/assets/images/Leave-a-trace_2015_11x14.JPG',
      date: '',
      sideImage: [
        {sample1:''},
        {sample2:''},
      ]
  },
  {
      id: 9,
      title: 'Memory1',
      description: '',
      link: '',
      pictureURL: '/assets/images/memory1_2012_15x18.JPG',
      date: '',
      sideImage: [
        {sample1:''},
        {sample2:''},
      ]
  },
  {
      id: 9,
      title: 'Memory2',
      description: '',
      link: '',
      pictureURL: '/assets/images/memory2_2012_15x18.JPG',
      date: '',
      sideImage: [
        {sample1:''},
        {sample2:''},
      ]
  },
  {
      id: 10,
      title: 'Small Flowers Life1',
      description: '',
      link: '',
      pictureURL: '/assets/images/Small-flowers-life-1_2019_4.5x6.5.jpeg',
      date: '',
      sideImage: [
        {sample1:''},
        {sample2:''},
      ]
  },
  {
      id: 11,
      title: 'Small Flowers Life2',
      description: '',
      link: '',
      pictureURL:'/assets/images/Small-flowers-life-2_2019_4.5x6.5.jpeg',
      date: '',
      sideImage: [
        {sample1:''},
        {sample2:''},
      ]
  },
  {
      id: 12,
      title: 'Transformation of Energy to Flower',
      description: '',
      link: '',
      pictureURL: '/assets/images/Transformation-of-Energy-to-Flower1_2016_20x24.JPG',
      date: '',
      sideImage: [
        {sample1:''},
        {sample2:''},
      ]
  },
  {
      id: 13,
      title: 'Transformation of Energy to Flower2',
      description: '',
      link: '',
      pictureURL: '/assets/images/Transformation-of-Energy-to-Flower2_2016_20x24.JPG',
      date: '',
      sideImage: [
        {sample1:''},
        {sample2:''},
      ]
  },
  {
      id: 14,
      title: 'Two Persons and Tree',
      description: '',
      link: '',
      pictureURL: '/assets/images/Two-persons-and-Tree_2015_12x12.JPG',
      date: '',
      sideImage: [
        {sample1:''},
        {sample2:''},
      ]
  },
  {
      id: 15,
      title: 'Two Tree',
      description: '',
      link: '',
      pictureURL: '/assets/images/two-tree_2016_8x20.JPG',
      date: '',
      sideImage: [
        {sample1:''},
        {sample2:''},
      ]
  },
  {
      id: 16,
      title: 'Work in Harmony',
      description: '',
      link: '',
      pictureURL: '/assets/images/Work-in-harmony1_2015_12x12.JPG',
      date: '',
      sideImage: [
        {sample1:''},
        {sample2:''},
      ]
  },
  {
      id: 17,
      title: 'Work in Harmony2',
      description: '',
      link: '',
      pictureURL: '/assets/images/Work-in-harmony2_2015_12x12.JPG',
      date: '',
      sideImage: [
        {sample1:''},
        {sample2:''},
      ]
  },
  {
      id: 18,
      title: 'Yellow Flowers Dream',
      description: '',
      link: '',
      pictureURL: '/assets/images/Yellow-flowers-dream_2018_9.5x13.jpeg',
      date: '',
      sideImage: [
        {sample1:''},
        {sample2:''},
      ]
  },

]

export default initData;
