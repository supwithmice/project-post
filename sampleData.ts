import { Project, Account } from './app/types'

export const sampleAccounts: Account[] = [
  {
    id: "1",
    username: "CreativeDesigns",
    accentColor: "#3498db",
  },
  {
    id: "2", 
    username: "TechInnovators",
    accentColor: "#2ecc71",
  },
  {
    id: "3",
    username: "NatureExplorers",
    accentColor: "#e74c3c",
  }
]

export const sampleProjects: Project[] = [
  {
    id: "1",
    name: "UI/UX Design Concepts",
    briefDescription: "Modern UI/UX design concepts for web and mobile apps",
    description: "This project showcases cutting-edge UI/UX design patterns and concepts for modern web and mobile applications. It includes wireframes, mockups, and interactive prototypes.",
    authorAccount: sampleAccounts[0],
    bannerUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
    images: [
      {
        imageUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
        imageDescription: "Mobile app design concept"
      },
      {
        imageUrl: "https://dummyimage.com/1024x768/874787/fff.jpg", 
        imageDescription: "Web dashboard design"
      }
    ],
    files: [
      {
        fileName: "Design Concepts.pdf",
        fileType: "application/pdf",
        fileUrl: "https://example.com/files/design-concepts.pdf"
      },
      {
        fileName: "Wireframes.pptx",
        fileType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        fileUrl: "https://example.com/files/wireframes.pptx"
      }
    ]
  },
  {
    id: "2",
    name: "AI Chatbot Development",
    briefDescription: "Building an intelligent AI chatbot using modern NLP techniques",
    description: "This project focuses on developing an AI-powered chatbot using natural language processing and machine learning. It includes the chatbot architecture, training data, and implementation details.",
    authorAccount: sampleAccounts[1],
    bannerUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
    images: [
      {
        imageUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
        imageDescription: "Chatbot architecture diagram"
      },
      {
        imageUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
        imageDescription: "Chatbot interface mockup"
      }
    ],
    files: [
      {
        fileName: "Technical Documentation.docx",
        fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        fileUrl: "https://example.com/files/tech-docs.docx"
      },
      {
        fileName: "Training Data.xlsx",
        fileType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        fileUrl: "https://example.com/files/training-data.xlsx"
      }
    ]
  },
  {
    id: "3",
    name: "Wildlife Photography",
    briefDescription: "Capturing the beauty of wildlife in their natural habitats",
    description: "This project showcases stunning wildlife photography from various ecosystems around the world. It includes images of rare species, their behaviors, and the challenges of wildlife photography.",
    authorAccount: sampleAccounts[2],
    bannerUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
    images: [
      {
        imageUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
        imageDescription: "Lion in the savanna"
      },
      {
        imageUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
        imageDescription: "Eagle in flight"
      }
    ],
    files: [
      {
        fileName: "Photography Guide.pdf",
        fileType: "application/pdf",
        fileUrl: "https://example.com/files/photography-guide.pdf"
      },
      {
        fileName: "Wildlife Documentary.mp4",
        fileType: "video/mp4",
        fileUrl: "https://example.com/files/wildlife-doc.mp4"
      }
    ]
  },
  {
    id: "1",
    name: "Mobile App Prototyping",
    briefDescription: "Rapid prototyping for mobile applications",
    description: "This project demonstrates the process of rapid prototyping for mobile applications, including user flows, interactive prototypes, and usability testing.",
    authorAccount: sampleAccounts[0],
    bannerUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
    images: [
      {
        imageUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
        imageDescription: "User flow diagram"
      },
      {
        imageUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
        imageDescription: "Interactive prototype"
      }
    ],
    files: [
      {
        fileName: "Prototype Assets.zip",
        fileType: "application/zip",
        fileUrl: "https://example.com/files/prototype-assets.zip"
      },
      {
        fileName: "Usability Report.docx",
        fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        fileUrl: "https://example.com/files/usability-report.docx"
      }
    ]
  },
  {
    id: "2",
    name: "Cloud Infrastructure Design",
    briefDescription: "Designing scalable cloud infrastructure for enterprise applications",
    description: "This project outlines the architecture and design of a scalable cloud infrastructure solution, including network topology, security considerations, and deployment strategies.",
    authorAccount: sampleAccounts[1],
    bannerUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
    images: [
      {
        imageUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
        imageDescription: "Cloud architecture diagram"
      },
      {
        imageUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
        imageDescription: "Network topology"
      }
    ],
    files: [
      {
        fileName: "Architecture Design.pdf",
        fileType: "application/pdf",
        fileUrl: "https://example.com/files/architecture-design.pdf"
      },
      {
        fileName: "Security Audit.xlsx",
        fileType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        fileUrl: "https://example.com/files/security-audit.xlsx"
      }
    ]
  },
  {
    id: "3",
    name: "Landscape Photography",
    briefDescription: "Capturing the beauty of natural landscapes",
    description: "This project showcases breathtaking landscape photography from around the world, including mountains, forests, and coastal scenes. It explores various photography techniques and post-processing methods.",
    authorAccount: sampleAccounts[2],
    bannerUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
    images: [
      {
        imageUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
        imageDescription: "Mountain range at sunrise"
      },
      {
        imageUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
        imageDescription: "Forest trail in autumn"
      }
    ],
    files: [
      {
        fileName: "Photography Techniques.pdf",
        fileType: "application/pdf",
        fileUrl: "https://example.com/files/photography-techniques.pdf"
      },
      {
        fileName: "Post-Processing Tutorial.mp4",
        fileType: "video/mp4",
        fileUrl: "https://example.com/files/post-processing.mp4"
      }
    ]
  },
  {
    id: "1",
    name: "Web Design Trends",
    briefDescription: "Exploring the latest trends in web design",
    description: "This project examines current trends in web design, including typography, color schemes, and layout patterns. It includes examples and best practices for modern web design.",
    authorAccount: sampleAccounts[0],
    bannerUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
    images: [
      {
        imageUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
        imageDescription: "Modern web design example"
      },
      {
        imageUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
        imageDescription: "Typography trends"
      }
    ],
    files: [
      {
        fileName: "Design Trends Report.docx",
        fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        fileUrl: "https://example.com/files/design-trends.docx"
      },
      {
        fileName: "Color Palettes.xlsx",
        fileType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        fileUrl: "https://example.com/files/color-palettes.xlsx"
      }
    ]
  },
  {
    id: "2",
    name: "Data Science Project",
    briefDescription: "End-to-end data science project from data collection to model deployment",
    description: "This project demonstrates a complete data science workflow, including data collection, cleaning, analysis, modeling, and deployment. It includes Jupyter notebooks and documentation.",
    authorAccount: sampleAccounts[1],
    bannerUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
    images: [
      {
        imageUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
        imageDescription: "Data visualization example"
      },
      {
        imageUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
        imageDescription: "Model performance metrics"
      }
    ],
    files: [
      {
        fileName: "Project Notebooks.zip",
        fileType: "application/zip",
        fileUrl: "https://example.com/files/notebooks.zip"
      },
      {
        fileName: "Model Documentation.pdf",
        fileType: "application/pdf",
        fileUrl: "https://example.com/files/model-docs.pdf"
      }
    ]
  },
  {
    id: "3",
    name: "Macro Photography",
    briefDescription: "Exploring the world of macro photography",
    description: "This project delves into the techniques and equipment used in macro photography, showcasing stunning close-up images of insects, plants, and other small subjects.",
    authorAccount: sampleAccounts[2],
    bannerUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
    images: [
      {
        imageUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
        imageDescription: "Butterfly wing close-up"
      },
      {
        imageUrl: "https://dummyimage.com/1024x768/874787/fff.jpg",
        imageDescription: "Water droplets on a leaf"
      }
    ],
    files: [
      {
        fileName: "Equipment Guide.pdf",
        fileType: "application/pdf",
        fileUrl: "https://example.com/files/equipment-guide.pdf"
      },
      {
        fileName: "Techniques Tutorial.mp4",
        fileType: "video/mp4",
        fileUrl: "https://example.com/files/techniques.mp4"
      }
    ]
  }
]
