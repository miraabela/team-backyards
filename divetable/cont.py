#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Dec  7 19:16:21 2019

@author: EvanYoung
"""


# depths, residual nitrogen minutes,  maximum planned bottom time

data = {

    10: ['219 199 178 160 145 133 122 112 104 95 88 82 75 70 64 59 54 50 45 41 37 34 30 26 20 10',
    '20 41 59 74 86 97 107 115 124 131 137 144 149 155 160 165 169 174 178 182 185 189 193 199 209'],
    
    12: ['147 134 125 116 108 101 94 88 82 76 71 66 62 57 53 49 45 42 38 35 32 29 26 23 17 9',
    '13 22 31 39 46 53 59 65 71 76 81 85 90 94 98 102 105 109 112 115 118 121 124 130 138'], 
    
    14: ['98 92 87 82 77 73 68 64 61 57 53 50 47 43 40 37 35 32 29 27 24 22 19 15 8',
    '6 11 16 21 25 30 34 37 41 45 48 51 55 58 61 63 66 69 71 74 76 79 83 90'],
    
    16: ['72 70 67 63 60 56 53 50 48 45 42 39 37 34 32 29 27 25 23 21 19 17 13 7',
    '2 5 9 12 16 19 22 24 27 30 33 35 38 40 43 45 47 49 51 53 55 59 65'],
    
    18: ['56 55 53 51 48 46 43 41 39 36 34 32 30 28 26 24 22 20 18 16 15 11 6',
    '3 5 8 10 13 15 17 20 22 24 26 28 30 32 34 36 38 40 41 45 50'],
    
    20: ['45 44 42 40 38 36 34 32 30 28 26 25 23 21 20 18 16 15 13 10 6',
    '3 5 7 9 11 13 15 17 19 20 22 24 25 27 29 30 32 35 39'],
    
    22: ['37 36 34 32 30 29 27 25 24 22 21 19 18 16 15 13 12 9 5',
    '3 5 7 8 10 12 13 15 16 18 19 21 22 24 25 28 32'],
    
    25: ['29 28 26 25 23 22 21 19 18 17 15 14 13 11 10 8 4',
    '3 4 6 7 8 10 11 12 14 15 16 18 19 21 25'],
    
    30: ['20 19 17 16 15 14 13 12 11 10 9 8 6 3',
    '3 4 5 6 7 8 9 10 11 12 14 17'],
    
    35: ['14 13 12 11 10 9 9 8 7 5 3',
    '3 4 5 5 6 7 9 11'],
    
    40: ['9 8 7 7 6 5 2',
    '4 7'],
    
}


# end result
# reverse arrays, split by space. 
# array starts with A


def process(key, value):
    nitrogenMins = value[0].split(' ')
    nitrogenMins.reverse()
    maxPlanTime = value[1].split(' ')
    maxPlanTime.reverse()
    res = []
    
    res.append(nitrogenMins)
    res.append(maxPlanTime)
    return (key, res)


newData = {}

for (key,value) in data.items():
    k, val = process(key, value)
    newData[k] = val


print(newData)


res = {10: [['10', '20', '26', '30', '34', '37', '41', '45', '50', '54', '59', '64', '70', '75', '82', '88', '95', '104', '112', '122', '133', '145', '160', '178', '199', '219'],
            ['209', '199', '193', '189', '185', '182', '178', '174', '169', '165', '160', '155', '149', '144', '137', '131', '124', '115', '107', '97', '86', '74', '59', '41', '20']],
    12: [['9', '17', '23', '26', '29', '32', '35', '38', '42', '45', '49', '53', '57', '62', '66', '71', '76', '82', '88', '94', '101', '108', '116', '125', '134', '147'], 
         ['138', '130', '124', '121', '118', '115', '112', '109', '105', '102', '98', '94', '90', '85', '81', '76', '71', '65', '59', '53', '46', '39', '31', '22', '13']], 
    14: [['8', '15', '19', '22', '24', '27', '29', '32', '35', '37', '40', '43', '47', '50', '53', '57', '61', '64', '68', '73', '77', '82', '87', '92', '98'], 
         ['90', '83', '79', '76', '74', '71', '69', '66', '63', '61', '58', '55', '51', '48', '45', '41', '37', '34', '30', '25', '21', '16', '11', '6']],
    16: [['7', '13', '17', '19', '21', '23', '25', '27', '29', '32', '34', '37', '39', '42', '45', '48', '50', '53', '56', '60', '63', '67', '70', '72'],
         ['65', '59', '55', '53', '51', '49', '47', '45', '43', '40', '38', '35', '33', '30', '27', '24', '22', '19', '16', '12', '9', '5', '2']],
    18: [['6', '11', '15', '16', '18', '20', '22', '24', '26', '28', '30', '32', '34', '36', '39', '41', '43', '46', '48', '51', '53', '55', '56'],
         ['50', '45', '41', '40', '38', '36', '34', '32', '30', '28', '26', '24', '22', '20', '17', '15', '13', '10', '8', '5', '3']],
    20: [['6', '10', '13', '15', '16', '18', '20', '21', '23', '25', '26', '28', '30', '32', '34', '36', '38', '40', '42', '44', '45'],
         ['39', '35', '32', '30', '29', '27', '25', '24', '22', '20', '19', '17', '15', '13', '11', '9', '7', '5', '3']],
    22: [['5', '9', '12', '13', '15', '16', '18', '19', '21', '22', '24', '25', '27', '29', '30', '32', '34', '36', '37'],
         ['32', '28', '25', '24', '22', '21', '19', '18', '16', '15', '13', '12', '10', '8', '7', '5', '3']],
    25: [['4', '8', '10', '11', '13', '14', '15', '17', '18', '19', '21', '22', '23', '25', '26', '28', '29'],
         ['25', '21', '19', '18', '16', '15', '14', '12', '11', '10', '8', '7', '6', '4', '3']],
    30: [['3', '6', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '19', '20'],
         ['17', '14', '12', '11', '10', '9', '8', '7', '6', '5', '4', '3']],
    35: [['3', '5', '7', '8', '9', '9', '10', '11', '12', '13', '14'],
         ['11', '9', '7', '6', '5', '5', '4', '3']],
    40: [['2', '5', '6', '7', '7', '8', '9'],
         ['7', '4']]}


    c10 = [[10, 20, 26, 30, 34, 37, 41, 45, 50, 54, 59, 64, 70, 75, 82, 88, 95, 104, 112, 122, 133, 145, 160, 178, 199, 219],
    [209, 199, 193, 189, 185, 182, 178, 174, 169, 165, 160, 155, 149, 144, 137, 131, 124, 115, 107, 97, 86, 74, 59, 41, 20]],
    
    c12 = [[9, 17, 23, 26, 29, 32, 35, 38, 42, 45, 49, 53, 57, 62, 66, 71, 76, 82, 88, 94, 101, 108, 116, 125, 134, 147], 
    [138, 130, 124, 121, 118, 115, 112, 109, 105, 102, 98, 94, 90, 85, 81, 76, 71, 65, 59, 53, 46, 39, 31, 22, 13]], 
    
    c14 = [[8, 15, 19, 22, 24, 27, 29, 32, 35, 37, 40, 43, 47, 50, 53, 57, 61, 64, 68, 73, 77, 82, 87, 92, 98], 
    [90, 83, 79, 76, 74, 71, 69, 66, 63, 61, 58, 55, 51, 48, 45, 41, 37, 34, 30, 25, 21, 16, 11, 6]],
    
    c16 = [[7, 13, 17, 19, 21, 23, 25, 27, 29, 32, 34, 37, 39, 42, 45, 48, 50, 53, 56, 60, 63, 67, 70, 72],
    [65, 59, 55, 53, 51, 49, 47, 45, 43, 40, 38, 35, 33, 30, 27, 24, 22, 19, 16, 12, 9, 5, 2]],
    
    c18 =  [[6, 11, 15, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 39, 41, 43, 46, 48, 51, 53, 55, 56],
    [50, 45, 41, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 17, 15, 13, 10, 8, 5, 3]],
    
    c20 =  [[6, 10, 13, 15, 16, 18, 20, 21, 23, 25, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 45],
    [39, 35, 32, 30, 29, 27, 25, 24, 22, 20, 19, 17, 15, 13, 11, 9, 7, 5, 3]],
    
    c22 = [[5, 9, 12, 13, 15, 16, 18, 19, 21, 22, 24, 25, 27, 29, 30, 32, 34, 36, 37],
    [32, 28, 25, 24, 22, 21, 19, 18, 16, 15, 13, 12, 10, 8, 7, 5, 3]],
    
    c25 = [[4, 8, 10, 11, 13, 14, 15, 17, 18, 19, 21, 22, 23, 25, 26, 28, 29],
    [25, 21, 19, 18, 16, 15, 14, 12, 11, 10, 8, 7, 6, 4, 3]],
    
    c30 = [[3, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20],
    [17, 14, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3]],
    
    c35 =[[3, 5, 7, 8, 9, 9, 10, 11, 12, 13, 14],
    [11, 9, 7, 6, 5, 5, 4, 3]],
    
    c40 = [[2, 5, 6, 7, 7, 8, 9],
    [7, 4]]
    