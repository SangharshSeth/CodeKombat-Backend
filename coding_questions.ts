export const DSAQuestions = [
    // Easy Questions
    {
        description: "Given a string, return the length of the longest substring without repeating characters.",
        difficulty: "Easy",
        testCases: [
            { input: "abcabcbb", output: 3, explanation: "The answer is 'abc', with length 3" },
            { input: "bbbbb", output: 1, explanation: "The answer is 'b', with length 1" },
            { input: "pwwkew", output: 3, explanation: "The answer is 'wke', with length 3" },
            { input: "", output: 0, explanation: "Empty string" },
            { input: " ", output: 1, explanation: "Single space" },
            { input: "au", output: 2, explanation: "Two different characters" },
            { input: "aab", output: 2, explanation: "Repeating character at start" },
            { input: "dvdf", output: 3, explanation: "Repeating character in middle" }
        ],
        functionSignature: "function lengthOfLongestSubstring(s: string): number"
    },
    {
        description: "Given a sorted array of integers, return an array of the squares of each number sorted in ascending order.",
        difficulty: "Easy",
        testCases: [
            { input: [-4,-1,0,3,10], output: [0,1,9,16,100], explanation: "Squared and sorted" },
            { input: [-7,-3,2,3,11], output: [4,9,9,49,121], explanation: "Handles negative numbers" },
            { input: [0,0,0], output: [0,0,0], explanation: "All zeros" },
            { input: [-2,-1], output: [1,4], explanation: "All negative" },
            { input: [1,2], output: [1,4], explanation: "All positive" },
            { input: [-1], output: [1], explanation: "Single negative" },
            { input: [], output: [], explanation: "Empty array" },
            { input: [-10,-5,0,5,10], output: [0,25,25,100,100], explanation: "Symmetric around zero" }
        ],
        functionSignature: "function sortedSquares(nums: number[]): number[]"
    },

    // Medium Questions
    {
        description: "Given a string containing digits from 2-9, return all possible letter combinations that the number could represent (like on a phone keypad).",
        difficulty: "Medium",
        testCases: [
            { 
                input: "23", 
                output: ["ad","ae","af","bd","be","bf","cd","ce","cf"], 
                explanation: "2=abc, 3=def" 
            },
            { 
                input: "2", 
                output: ["a","b","c"], 
                explanation: "Single digit" 
            },
            { 
                input: "", 
                output: [], 
                explanation: "Empty string" 
            },
            { 
                input: "234", 
                output: ["adg","adh","adi","aeg","aeh","aei","afg","afh","afi","bdg","bdh","bdi","beg","beh","bei","bfg","bfh","bfi","cdg","cdh","cdi","ceg","ceh","cei","cfg","cfh","cfi"], 
                explanation: "Three digits" 
            },
            { 
                input: "92", 
                output: ["wa","wb","wc","xa","xb","xc","ya","yb","yc","za","zb","zc"], 
                explanation: "Starting with 9" 
            }
        ],
        functionSignature: "function letterCombinations(digits: string): string[]"
    },
    {
        description: "Given an array of integers heights representing the height of bars in a histogram, return the area of the largest rectangle that can be formed using these bars.",
        difficulty: "Medium",
        testCases: [
            { 
                input: [2,1,5,6,2,3], 
                output: 10, 
                explanation: "The largest rectangle has area = 5 * 2 = 10 units" 
            },
            { 
                input: [2,4], 
                output: 4, 
                explanation: "Two bars" 
            },
            { 
                input: [1], 
                output: 1, 
                explanation: "Single bar" 
            },
            { 
                input: [], 
                output: 0, 
                explanation: "Empty array" 
            },
            { 
                input: [1,1,1,1], 
                output: 4, 
                explanation: "All same height" 
            },
            { 
                input: [2,1,2], 
                output: 3, 
                explanation: "Valley pattern" 
            },
            { 
                input: [1,2,3,4,5], 
                output: 9, 
                explanation: "Ascending heights" 
            }
        ],
        functionSignature: "function largestRectangleArea(heights: number[]): number"
    },

    // Hard Questions
    {
        description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
        difficulty: "Hard",
        testCases: [
            { 
                input: { nums1: [1,3], nums2: [2] }, 
                output: 2.0, 
                explanation: "Merged array = [1,2,3] and median is 2" 
            },
            { 
                input: { nums1: [1,2], nums2: [3,4] }, 
                output: 2.5, 
                explanation: "Merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5" 
            },
            { 
                input: { nums1: [], nums2: [1] }, 
                output: 1.0, 
                explanation: "One empty array" 
            },
            { 
                input: { nums1: [2], nums2: [] }, 
                output: 2.0, 
                explanation: "Other empty array" 
            },
            { 
                input: { nums1: [1,1,1], nums2: [1,1,1] }, 
                output: 1.0, 
                explanation: "All same numbers" 
            },
            { 
                input: { nums1: [1,2,3,4,5], nums2: [6,7,8,9,10] }, 
                output: 5.5, 
                explanation: "No overlap between arrays" 
            }
        ],
        functionSignature: "function findMedianSortedArrays(nums1: number[], nums2: number[]): number"
    },
    {
        description: "Given a string s and a pattern p, implement regular expression matching with support for '.' and '*' where '.' matches any single character and '*' matches zero or more of the preceding element.",
        difficulty: "Hard",
        testCases: [
            { 
                input: { s: "aa", p: "a" }, 
                output: false, 
                explanation: "Single 'a' doesn't match 'aa'" 
            },
            { 
                input: { s: "aa", p: "a*" }, 
                output: true, 
                explanation: "a* means zero or more 'a's" 
            },
            { 
                input: { s: "ab", p: ".*" }, 
                output: true, 
                explanation: ".* matches any sequence" 
            },
            { 
                input: { s: "", p: ".*" }, 
                output: true, 
                explanation: "Empty string matches .*" 
            },
            { 
                input: { s: "", p: "" }, 
                output: true, 
                explanation: "Empty matches empty" 
            },
            { 
                input: { s: "aab", p: "c*a*b" }, 
                output: true, 
                explanation: "c* can match zero occurrences" 
            },
            { 
                input: { s: "mississippi", p: "mis*is*p*." }, 
                output: false, 
                explanation: "Complex pattern matching" 
            },
            { 
                input: { s: "aaa", p: "a*a" }, 
                output: true, 
                explanation: "Combination of * and literal" 
            }
        ],
        functionSignature: "function isMatch(s: string, p: string): boolean"
    }
];

export function findRandomCodingQuestion(difficulty: string) {
    const eligible = DSAQuestions.filter((item) => item.difficulty === difficulty);
    const randomInteger = Math.floor(Math.random() * eligible.length);
    return eligible[randomInteger];
}