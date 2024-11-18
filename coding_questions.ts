export const DSAQuestions = [
    {
        description: "Implement a function to check if a given string is a valid palindrome, ignoring non-alphanumeric characters.",
        difficulty: "Easy",
    },
    {
        description: "Write a function to perform a level-order traversal of a binary tree.",
        difficulty: "Easy",
    },
    {
        description: "Design and implement a stack that supports `push`, `pop`, and retrieving the minimum element in constant time.",
        difficulty: "Medium",
    },
    {
        description: "Given a list of intervals, merge all overlapping intervals and return the result.",
        difficulty: "Medium",
    },
    {
        description: "Implement a Trie (prefix tree) with `insert`, `search`, and `startsWith` methods.",
        difficulty: "Medium",
    },
    {
        description: "Find the shortest path in a weighted graph using Dijkstra's algorithm.",
        difficulty: "Hard",
    },
    {
        description: "Implement the KMP (Knuth-Morris-Pratt) string matching algorithm.",
        difficulty: "Hard",
    },
    {
        description: "Solve the N-Queens problem for an N x N chessboard using backtracking.",
        difficulty: "Hard",
    },
    {
        description: "Determine the number of strongly connected components in a directed graph using Tarjan's algorithm.",
        difficulty: "Expert",
    },
    {
        description: "Implement a balanced binary search tree (e.g., AVL Tree) with insertion, deletion, and balancing operations.",
        difficulty: "Expert",
    },
];

export function findRandomCodingQuestion(difficulty: string) {
    const eligible = DSAQuestions.map((item) => item.difficulty === difficulty);
    const randomInteger = Math.floor(Math.random() * eligible.length);
    return DSAQuestions[randomInteger];
}