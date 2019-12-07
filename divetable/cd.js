

// second page of dive planner

// top and bottom are strings in array

// top (white) as first string in array
// bottom (blue) as second string in array
// numbers are separated by spaces

reversedPGroups = ['Z', 'Y', 'X', 'W', 'V', 'U', 'T', 'S', 'R', 'Q', 'P', 'O', 'N', 'M', 'L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A']
pGroups = ['A','B','C','D','E','F','G','H','I','J','K','L', 'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']


contDives = {

'd10': ['219 199 178 160 145 133 122 112 104 95 88 82 75 70 64 59 54 50 45 41 37 34 30 26 20 10',
'20 41 59 74 86 97 107 115 124 131 137 144 149 155 160 165 169 174 178 182 185 189 193 199 209'],

'd12': ['147 134 125 116 108 101 94 88 82 76 71 66 62 57 53 49 45 42 38 35 32 29 26 23 17 9',
'13 22 31 39 46 53 59 65 71 76 81 85 90 94 98 102 105 109 112 115 118 121 124 130 138'], 

'd14': ['98 92 87 82 77 73 68 64 61 57 53 50 47 43 40 37 35 32 29 27 24 22 19 15 8',
'6 11 16 21 25 30 34 37 41 45 48 51 55 58 61 63 66 69 71 74 76 79 83 90'],

'd16': ['72 70 67 63 60 56 53 50 48 45 42 39 37 34 32 29 27 25 23 21 19 17 13 7',
'2 5 9 12 16 19 22 24 27 30 33 35 38 40 43 45 47 49 51 53 55 59 65'],

'd18': ['56 55 53 51 48 46 43 41 39 36 34 32 30 28 26 24 22 20 18 16 15 11 6',
'3 5 8 10 13 15 17 20 22 24 26 28 30 32 34 36 38 40 41 45 50'],

'd20': ['45 44 42 40 38 36 34 32 30 28 26 25 23 21 20 18 16 15 13 10 6',
'3 5 7 9 11 13 15 17 19 20 22 24 25 27 29 30 32 35 39'],

'd22': ['37 36 34 32 30 29 27 25 24 22 21 19 18 16 15 13 12 9 5',
'3 5 7 8 10 12 13 15 16 18 19 21 22 24 25 28 32'],

'd25': ['29 28 26 25 23 22 21 19 18 17 15 14 13 11 10 8 4',
'3 4 6 7 8 10 11 12 14 15 16 18 19 21 25'],

'd30': ['20 19 17 16 15 14 13 12 11 10 9 8 6 3',
'3 4 5 6 7 8 9 10 11 12 14 17'],

'd35': ['14 13 12 11 10 9 9 8 7 5 3',
'3 4 5 5 6 7 9 11'],

'd40': ['9 8 7 7 6 5 2',
'4 7'],

}