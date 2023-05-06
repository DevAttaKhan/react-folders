import { v4 as uuid } from "uuid";

export const folderList = [
  {
    id: uuid(),
    name: "photos",
  },
  {
    id: uuid(),
    name: "videos",
  },
  {
    id: uuid(),
    name: "movies",
  },
  {
    id: uuid(),
    name: "documents",
    childrens: [
      {
        id: uuid(),
        name: "medias",
      },
      {
        id: uuid(),
        name: "novels",
        childrens: [
          {
            id: uuid(),
            name: "fiction",
          },
          {
            id: uuid(),
            name: "fantasy",
            childrens: [
              { id: uuid(), name: "dystopian" },
              { id: uuid(), name: "science" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: uuid(),
    name: "philosophy",
  },
];
