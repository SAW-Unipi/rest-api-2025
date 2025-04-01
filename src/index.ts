
export interface Todo {
    id: string;
    completed: "done" | "ongoing";
    text: string;
}

export interface List {
    id: string;
    name: string;
    todos: Todo[];
}

let db: List[] = [
    {
        id: "l-1",
        name: "Checklist Progetto",
        todos: [
            {
                id: "t-1",
                text: "Inviare mail proposta progetto",
                completed: "done",
            },
            { id: "t-2", text: "Attendere Ack", completed: "ongoing" },
            { id: "t-3", text: "Sviluppare progetto", completed: "ongoing" },
            {
                id: "t-4",
                text: "Iscriversi ad un appello",
                completed: "ongoing",
            },
            {
                id: "t-5",
                text: "Rispondere correttamente all'esame",
                completed: "ongoing",
            },
            { id: "t-6", text: "Festeggiare", completed: "ongoing" },
        ],
    },
    {
        id: "l-2",
        name: "Dev Roadmap",
        todos: [
            {
                id: "t-7",
                text: "Scegliere un linguaggio di progammazione",
                completed: "done",
            },
            { id: "t-8", text: "Imparare linguaggio", completed: "done" },
            {
                id: "t-9",
                text: "Sviluppare un progetto di esempio",
                completed: "ongoing",
            },
        ],
    },
];