interface TestCase {
    input: string | number | boolean | undefined | any[];
    output: string | number| boolean | undefined | null | any[];
    explanation?: string;
}

interface Problem {
    id: number;
    title: string;
    description: string;
    difficulty: string;
    category: 'math' | 'crypto' | 'basic-algebra';
    testCases: TestCase[];
    constraints: string[];
}

export const DSAQuestions: Problem[] = [
    {
        id: 1,
        title: "Quadratic Equation Solver",
        description: "Given three coefficients a, b, and c of a quadratic equation ax² + bx + c = 0, find its roots. Return roots in ascending order. If roots are imaginary, return null.",
        difficulty: "easy",
        category: "math",
        testCases: [
            {
                input: [1, -5, 6],
                output: [2, 3],
                explanation: "x² - 5x + 6 = 0 has roots x = 2 and x = 3"
            },
            {
                input: [1, -4, 4],
                output: [2, 2],
                explanation: "x² - 4x + 4 = 0 has a repeated root x = 2"
            },
            {
                input: [1, 1, 1],
                output: null,
                explanation: "x² + x + 1 = 0 has imaginary roots"
            }
        ],
        constraints: [
            "-100 ≤ a, b, c ≤ 100",
            "a cannot be 0 (would make it linear equation)",
            "All coefficients will be integers"
        ]
    },
    {
        id: 2,
        title: "Exponent Pattern",
        description: "Given a base number n and exponent k, find the last digit of n^k.",
        difficulty: "easy",
        category: "math",
        testCases: [
            {
                input: [2, 5],
                output: 2,
                explanation: "2^5 = 32, last digit is 2"
            },
            {
                input: [3, 4],
                output: 1,
                explanation: "3^4 = 81, last digit is 1"
            },
            {
                input: [7, 3],
                output: 3,
                explanation: "7^3 = 343, last digit is 3"
            }
        ],
        constraints: [
            "1 ≤ n ≤ 20",
            "1 ≤ k ≤ 100",
            "Both n and k will be integers"
        ]
    },
    {
        id: 3,
        title: "Simple Cipher Decoder",
        description: "Each letter in a message is shifted backwards by 3 positions in the alphabet (e.g., 'd' becomes 'a', 'c' becomes 'z'). Decode the given message.",
        difficulty: "easy",
        category: "crypto",
        testCases: [
            {
                input: "khoor",
                output: "hello",
                explanation: "Each letter shifted back 3 positions"
            },
            {
                input: "dqw",
                output: "ant",
                explanation: "Each letter shifted back 3 positions"
            },
            {
                input: "ccc",
                output: "zzz",
                explanation: "Wrapping around the alphabet"
            }
        ],
        constraints: [
            "Input string contains only lowercase letters",
            "1 ≤ string length ≤ 100",
            "Shift value is always 3"
        ]
    },
    {
        id: 4,
        title: "Arithmetic Sequence Sum",
        description: "Given first term 'a', common difference 'd', and number of terms 'n', find the sum of the arithmetic sequence.",
        difficulty: "easy",
        category: "basic-algebra",
        testCases: [
            {
                input: [2, 3, 4],
                output: 26,
                explanation: "Sequence is 2,5,8,11 and sum = 26"
            },
            {
                input: [1, 1, 5],
                output: 15,
                explanation: "Sequence is 1,2,3,4,5 and sum = 15"
            },
            {
                input: [5, -2, 3],
                output: 9,
                explanation: "Sequence is 5,3,1 and sum = 9"
            }
        ],
        constraints: [
            "-50 ≤ a ≤ 50 (first term)",
            "-20 ≤ d ≤ 20 (common difference)",
            "1 ≤ n ≤ 100 (number of terms)",
            "All inputs will be integers"
        ]
    },
    {
        id: 5,
        title: "Binary to Decimal",
        description: "Convert a binary string to its decimal equivalent. The binary string will only contain 0s and 1s.",
        difficulty: "easy",
        category: "math",
        testCases: [
            {
                input: "1010",
                output: 10,
                explanation: "1*2³ + 0*2² + 1*2¹ + 0*2⁰ = 8 + 0 + 2 + 0 = 10"
            },
            {
                input: "1111",
                output: 15,
                explanation: "1*2³ + 1*2² + 1*2¹ + 1*2⁰ = 8 + 4 + 2 + 1 = 15"
            },
            {
                input: "100",
                output: 4,
                explanation: "1*2² + 0*2¹ + 0*2⁰ = 4 + 0 + 0 = 4"
            }
        ],
        constraints: [
            "1 ≤ string length ≤ 16",
            "String contains only '0' and '1'",
            "The decimal value will fit in a 32-bit integer"
        ]
    },
    {
        id: 6,
        title: "Perfect Square Checker",
        description: "Given a number n, determine if it's a perfect square (i.e., if there exists an integer x such that x² = n).",
        difficulty: "easy",
        category: "math",
        testCases: [
            {
                input: 16,
                output: true,
                explanation: "4 * 4 = 16"
            },
            {
                input: 25,
                output: true,
                explanation: "5 * 5 = 25"
            },
            {
                input: 14,
                output: false,
                explanation: "No integer x exists where x * x = 14"
            }
        ],
        constraints: [
            "0 ≤ n ≤ 10000",
            "Input will be an integer"
        ]
    },
    {
        id: 7,
        title: "Factorial Zeros",
        description: "Given a number n, count the number of trailing zeros in n! (n factorial).",
        difficulty: "medium",
        category: "math",
        testCases: [
            {
                input: 5,
                output: 1,
                explanation: "5! = 120, has 1 trailing zero"
            },
            {
                input: 10,
                output: 2,
                explanation: "10! = 3628800, has 2 trailing zeros"
            },
            {
                input: 25,
                output: 6,
                explanation: "25! has 6 trailing zeros"
            }
        ],
        constraints: [
            "0 ≤ n ≤ 100",
            "Input will be an integer"
        ]
    }
];
export default DSAQuestions;
export function findRandomCodingQuestion(difficulty: string) {
    const eligible = DSAQuestions.filter((item) => item.difficulty.toLowerCase() === difficulty.toLowerCase());
    const randomInteger = Math.floor(Math.random() * eligible.length);
    return eligible[randomInteger];
}