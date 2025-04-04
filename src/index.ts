import express, { json, text } from "express";

const app = express();
const PORT = 1234;

const v1 = express.Router();

app.use(json());
app.use(text());
app.use("/v1", v1);
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

// GET /lists
v1.get("/lists", (req, res) => {
    const lists = db.map(({ id, name }) => ({ id, name }));
    res.send(lists);
});

// POST /lists
v1.post("/lists", (req, res) => {
    const name = req.body;
    const newList: List = {
        id: crypto.randomUUID(),
        name,
        todos: [],
    };
    db.push(newList);
    res.status(201).send(newList);
});

v1.get("/lists/:id", (req, res) => {
    const l = db.find((l) => l.id === req.params.id);
    if (l === undefined) {
        res.sendStatus(404);
        return;
    }

    res.status(200).send(l);
});

v1.put("/lists/:id", (req, res) => {
    const newList: List = req.body;

    if (newList.id !== req.params.id) {
        res.sendStatus(400);
        return;
    }

    db = db.map((l) => l.id === req.params.id ? newList : l);

    res.sendStatus(204);
});

v1.patch("/lists/:id", (req, res) => {
    const isList = (o: object) =>
        Object.keys(o).every((k) => ["id", "name", "todos"].includes(k));

    const newList: Partial<List> = req.body;

    if (newList.id !== undefined || !isList(req.body)) {
        res.sendStatus(400);
        return;
    }

    db = db.map((l) => l.id === req.params.id ? { ...l, ...newList } : l);

    res.sendStatus(204);
});

v1.delete("/lists/:id", (req, res) => {
    const list = db.find((l) => l.id === req.params.id);
    if (list === undefined) {
        res.sendStatus(404);
        return;
    }
    db = db.filter((l) => l.id !== req.params.id);
    res.sendStatus(200);
});

v1.get("/lists/:id/todos", (req, res) => {
    const list = db.find((l) => l.id === req.params.id);
    if (list === undefined) {
        res.sendStatus(404);
        return;
    }

    res.status(200).send(list.todos || []);
});

v1.get("/todos/:id", (req, res) => {
    const todo = db.map(({ todos }) => todos)
        .flat()
        .find((t) => t.id === req.params.id);
    if (todo === undefined) {
        res.sendStatus(404);
        return;
    }
    res.status(200).send(todo);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
