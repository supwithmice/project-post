import { Project, Account } from './app/types'

export const sampleProjects: Project[] = [
  {
    id: 1,
    projectName: 'Sunset Photography',
    projectBriefDescription:
      'A collection of stunning sunset photographs capturing the beauty of nature.',
    projectDescription:
      'This project showcases breathtaking sunsets from around the world. Each image is carefully curated to highlight the vibrant colors and serene moments of twilight. From mountain ranges to tranquil beaches, these photographs evoke a sense of peace and wonder.',
    projectAuthor: {
      id: 101,
      accountName: 'JohnDoe',
      accentColor: 'red',
    },
    bannerUrl: 'https://dummyimage.com/1280x720/874787/fff.jpg',
    images: [
      {
        imageId: 1001,
        imageUrl: 'https://dummyimage.com/1280x720/874787/fff.jpg',
        imageDescription: 'A beautiful sunset over the mountains',
      },
      {
        imageId: 1002,
        imageUrl: 'https://dummyimage.com/1024x768/874787/fff.jpg',
        imageDescription: 'Golden hour at the beach',
      },
    ],
    files: [
      {
        fileName: 'Photography Tips.pdf',
        fileType: 'application/pdf',
        fileUrl: 'https://example.com/files/photography-tips.pdf'
      },
      {
        fileName: 'Sunset Locations.xlsx',
        fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        fileUrl: 'https://example.com/files/sunset-locations.xlsx'
      },
      {
        fileName: 'Editing Workflow.docx',
        fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        fileUrl: 'https://example.com/files/editing-workflow.docx'
      }
    ]
  },
  {
    id: 2,
    projectName: 'Urban Architecture',
    projectBriefDescription:
      'Exploring the beauty of modern and historic urban architecture.',
    projectDescription:
      'This project delves into the intricate designs and structures of urban landscapes. From towering skyscrapers to historic buildings, each photograph captures the essence of human creativity and engineering. The images highlight the contrast between old and new, showcasing the evolution of architectural styles.',
    projectAuthor: {
      id: 102,
      accountName: 'JaneSmith',
      accentColor: 'green',
    },
    bannerUrl: 'https://dummyimage.com/1280x720/874787/fff.jpg',
    images: [
      {
        imageId: 2001,
        imageUrl: 'https://dummyimage.com/1600x900/874787/fff.jpg',
        imageDescription: 'Modern skyscraper in the city',
        aspectRatio: '1.5',
      },
      {
        imageId: 2002,
        imageUrl: 'https://dummyimage.com/1920x1080/874787/fff.jpg',
        imageDescription: 'Historic building with intricate details',
      },
    ],
    files: [
      {
        fileName: 'Architectural Plans.pdf',
        fileType: 'application/pdf',
        fileUrl: 'https://example.com/files/architectural-plans.pdf'
      },
      {
        fileName: 'City Development.pptx',
        fileType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        fileUrl: 'https://example.com/files/city-development.pptx'
      },
      {
        fileName: 'Building Materials.xlsx',
        fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        fileUrl: 'https://example.com/files/building-materials.xlsx'
      }
    ]
  },
  {
    id: 2,
    projectName: 'Urban Architecture',
    projectBriefDescription:
      'Exploring the beauty of modern and historic urban architecture.',
    projectDescription:
      'This project delves into the intricate designs and structures of urban landscapes. From towering skyscrapers to historic buildings, each photograph captures the essence of human creativity and engineering. The images highlight the contrast between old and new, showcasing the evolution of architectural styles.',
    projectAuthor: {
      id: 102,
      accountName: 'JaneSmith',
      accentColor: 'green',
    },
    bannerUrl: 'https://dummyimage.com/1280x720/874787/fff.jpg',
    images: [
      {
        imageId: 2001,
        imageUrl: 'https://dummyimage.com/1600x900/874787/fff.jpg',
        imageDescription: 'Modern skyscraper in the city',
        aspectRatio: '1.5',
      },
      {
        imageId: 2002,
        imageUrl: 'https://dummyimage.com/1920x1080/874787/fff.jpg',
        imageDescription: 'Historic building with intricate details',
      },
    ],
    files: [
      {
        fileName: 'Architectural Plans.pdf',
        fileType: 'application/pdf',
        fileUrl: 'https://example.com/files/architectural-plans.pdf'
      },
      {
        fileName: 'City Development.pptx',
        fileType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        fileUrl: 'https://example.com/files/city-development.pptx'
      },
      {
        fileName: 'Building Materials.xlsx',
        fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        fileUrl: 'https://example.com/files/building-materials.xlsx'
      }
    ]
  },
  {
    id: 2,
    projectName: 'Urban Architecture',
    projectBriefDescription:
      'Exploring the beauty of modern and historic urban architecture.',
    projectDescription:
      'This project delves into the intricate designs and structures of urban landscapes. From towering skyscrapers to historic buildings, each photograph captures the essence of human creativity and engineering. The images highlight the contrast between old and new, showcasing the evolution of architectural styles.',
    projectAuthor: {
      id: 102,
      accountName: 'JaneSmith',
      accentColor: 'green',
    },
    bannerUrl: 'https://dummyimage.com/1280x720/874787/fff.jpg',
    images: [
      {
        imageId: 2001,
        imageUrl: 'https://dummyimage.com/1600x900/874787/fff.jpg',
        imageDescription: 'Modern skyscraper in the city',
        aspectRatio: '1.5',
      },
      {
        imageId: 2002,
        imageUrl: 'https://dummyimage.com/1920x1080/874787/fff.jpg',
        imageDescription: 'Historic building with intricate details',
      },
    ],
    files: [
      {
        fileName: 'Architectural Plans.pdf',
        fileType: 'application/pdf',
        fileUrl: 'https://example.com/files/architectural-plans.pdf'
      },
      {
        fileName: 'City Development.pptx',
        fileType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        fileUrl: 'https://example.com/files/city-development.pptx'
      },
      {
        fileName: 'Building Materials.xlsx',
        fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        fileUrl: 'https://example.com/files/building-materials.xlsx'
      }
    ]
  },
  {
    id: 3,
    projectName: 'Nature Landscapes',
    projectBriefDescription:
      'A journey through the serene and majestic landscapes of nature.',
    projectDescription:
      'This project celebrates the untouched beauty of nature. From dense forests to cascading waterfalls, each image is a testament to the awe-inspiring power of the natural world. The photographs aim to inspire a deeper connection with the environment and a greater appreciation for its preservation.',
    projectAuthor: {
      id: 103,
      accountName: 'AliceGreen',
      accentColor: 'blue',
    },
    bannerUrl: 'https://dummyimage.com/1280x720/874787/fff.jpg',
    images: [
      {
        imageId: 3001,
        imageUrl: 'https://dummyimage.com/1366x768/874787/fff.jpg',
        imageDescription: 'Dense forest with sunlight filtering through',
        aspectRatio: '1',
      },
      {
        imageId: 3002,
        imageUrl: 'https://dummyimage.com/1440x900/874787/fff.jpg',
        imageDescription: 'Majestic waterfall in the jungle',
        aspectRatio: '9 / 16',
      }
    ],
    files: [
      {
        fileName: 'Nature Guide.pdf',
        fileType: 'application/pdf',
        fileUrl: 'https://example.com/files/nature-guide.pdf'
      },
      {
        fileName: 'Wildlife Documentary.mp4',
        fileType: 'video/mp4',
        fileUrl: 'https://example.com/files/wildlife-documentary.mp4'
      },
      {
        fileName: 'Conservation Report.docx',
        fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        fileUrl: 'https://example.com/files/conservation-report.docx'
      }
    ]
  }
]

export const sampleAccounts: Account[] = [
  {
    id: 101,
    accountName: 'TechSavvy',
    accentColor: '#3498db', // Blue
  },
  {
    id: 102,
    accountName: 'GreenThumb',
    accentColor: '#2ecc71', // Green
  },
  {
    id: 103,
    accountName: 'CodeMaster',
    accentColor: '#e74c3c', // Red
  },
]